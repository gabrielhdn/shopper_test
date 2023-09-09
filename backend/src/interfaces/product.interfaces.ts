import { IPackRepository } from "./pack.interfaces";

export interface INewProduct {
  product_code: number;
  new_price: string;
}

export interface IProduct {
  code: number;
  name: string;
  cost_price: string;
  sales_price: string;
}

export interface IProductInfo {
  product_code: number;
  name: string;
  new_price: string;
  sales_price: string;
  errors: string[],
}

export interface IProductRepository {
  getProduct(productCode: number): Promise<any>;
  updateProduct(product: INewProduct): Promise<any>;
}

export interface IProductService {
  productRepo: IProductRepository;
  packRepo: IPackRepository;
  validateProducts(products: INewProduct[]): Promise<any>;
  updateProducts(products: INewProduct[]): Promise<void>;
}
