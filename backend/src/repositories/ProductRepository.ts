import { Pool, RowDataPacket } from 'mysql2/promise';
import { INewProduct, IProduct, IProductRepository } from '../interfaces/product.interfaces';
import conn from './connection';

class ProductRepository implements IProductRepository {
  private conn: Pool;

  constructor() {
    this.conn = conn;
  }

  async getProduct(productCode: string): Promise<IProduct | null> {
    const [[row]] = await this.conn.execute<RowDataPacket[]>(
      'SELECT * FROM ShopperDatabase.products WHERE code = ?',
      [productCode],
    );

    if (!row) {
      return null;
    }

    return row as IProduct;
  }

  async updateProduct({product_code, new_price}: INewProduct): Promise<void> {
    await this.conn.execute(
      'UPDATE ShopperDatabase.products SET sales_price = ? WHERE code = ?',
      [new_price, product_code],
    );
  }
}

export default ProductRepository;
