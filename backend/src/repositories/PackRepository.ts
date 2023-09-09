import conn from './connection';
import { Pool, RowDataPacket } from 'mysql2/promise';
import { IPackRepository } from "../interfaces/pack.interfaces";

class PackRepository implements IPackRepository {
  private conn: Pool;

  constructor() {
    this.conn = conn;
  }

  async getPack(productCode: number): Promise<any | null> {
    const [rows] = await this.conn.execute<RowDataPacket[]>(
      'SELECT * FROM ShopperDatabase.packs WHERE pack_id = ?',
      [productCode],
    );

    if (!rows.length) {
      return null;
    }

    return rows;
  }

  async getProductPack(productCode: number): Promise<any | null> {
    const [[rows]] = await this.conn.execute<RowDataPacket[]>(
      'SELECT * FROM ShopperDatabase.packs WHERE product_id = ?',
      [productCode]
    );

    if (!rows) return null;

    return rows;
  }
}

export default PackRepository;
