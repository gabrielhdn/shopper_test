export interface IPricingData {
  product_code: string;
  new_price: string;
}

export interface IProduct {
  product_code?: number;
  name?: string;
  new_price?: string;
  sales_price?: string;
  errors: [];
}
