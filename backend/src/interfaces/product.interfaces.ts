import { IPackRepository } from "./pack.interfaces";

export interface INewProduct {
  product_code: string;
  new_price: string;
}

export interface IProduct {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
}

export interface IProductInfo {
  product_code: string;
  name: string;
  new_price: string;
  sales_price: number;
  errors: string[],
}

export interface IProductRepository {
  getProduct(productCode: string): Promise<IProduct | null>;
  updateProduct(product: INewProduct): Promise<void>;
}

export interface IProductService {
  productRepo: IProductRepository;
  packRepo: IPackRepository;
  validateProducts(products: INewProduct[]): Promise<Partial<IProductInfo>[]>;
  updateProducts(products: INewProduct[]): Promise<void>;
}
