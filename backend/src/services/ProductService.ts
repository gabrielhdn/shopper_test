import { IPackRepository } from "../interfaces/pack.interfaces";
import { INewProduct, IProductInfo, IProductRepository, IProductService } from "../interfaces/product.interfaces";
import PackRepository from "../repositories/PackRepository";
import ProductRepository from "../repositories/ProductRepository";

class ProductService implements IProductService {
  productRepo: IProductRepository;
  packRepo: IPackRepository;

  constructor() {
    this.productRepo = new ProductRepository();
    this.packRepo = new PackRepository();
  }

  public async validateProducts(products: INewProduct[]) {
    const productsInformation = await Promise.all(
      products.map(async ({product_code, new_price}) => {
        if (!product_code && !new_price) {
          return {
            errors: ['Preencha os campos com as informações do produto (código e novo preço).'],
          }
        }

        if (!product_code && new_price) {
          return {
            new_price,
            errors: ['Informação incompleta. Por favor, adicione o código do produto.'],
          }
        }

        if (product_code && !new_price) {
          return {
            product_code,
            errors: ['Informação incompleta. Por favor, adicione o novo preço do produto.'],
          }
        }

        const product = await this.productRepo.getProduct(product_code);

        if (!product) {
          return {
            product_code,
            new_price,
            errors: ['Código inválido. Produto não encontrado.'],
          }
        }

        const productInfo: IProductInfo = {
          product_code,
          name: product.name,
          new_price,
          sales_price: product.sales_price,
          errors: [],
        };

        // regex que verifica se a string contém apenas caracteres numéricos válidos
        if (!/^\d+(\.\d{1,2})?$/.test(new_price)) {
          productInfo.errors.push('Novo preço inválido.');
        }

        const currentPrice = product.sales_price;
        const costPrice = product.cost_price;
        const newPrice = parseFloat(new_price);
        const priceChangePercentage = ((newPrice - currentPrice) /  currentPrice) * 100;

        if (newPrice < costPrice) {
          productInfo.errors.push('O novo preço está abaixo do preço de custo do produto.');
        }

        if (Math.abs(priceChangePercentage) > 10) {
          productInfo.errors.push('O reajuste, seja para baixo ou para cima, não pode ser superior a 10% do valor do produto.');
        }

        // retorno diferente de null significa que o produto faz parte de um pacote
        const productPack = await this.packRepo.getProductPack(product_code);

        // retorno diferente de null significa que o produto é um pacote
        const packDetails = await this.packRepo.getPack(product_code);

        if (productPack) {
          if (!products.find((p) => p.product_code === productPack.pack_id)) {
            productInfo.errors.push('Este produto faz parte de um pack, mas o preço do pack não foi reajustado.');
          }
        }

        if (packDetails) {
          const packPrice = parseFloat(new_price);
          let componentsPrice = 0;

          packDetails.forEach((component: any) => {
            if (!products.find((p) => p.product_code === component.product_id)) {
              productInfo.errors.push(`O reajuste também precisa ser feito para o componente do pack com código ${component.product_id}.`);
            }

            products.forEach((p) => {
              if (p.product_code === component.product_id) {
                componentsPrice += (parseFloat(p.new_price) * parseFloat(component.qty));
              }
            });
          });

          if (packPrice !== componentsPrice) {
            productInfo.errors.push('O novo preço do pack é diferente da soma de preços dos seus componentes.');
          }
        }

        return productInfo;
      })
    );

    return productsInformation;
  }

  public async updateProducts(products: INewProduct[]) {
    await Promise.all(products.map((product) => {
      this.productRepo.updateProduct(product);
    }));
  }
}

export default ProductService;
