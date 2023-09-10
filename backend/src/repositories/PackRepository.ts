import conn from './connection';
import { Pool, RowDataPacket } from 'mysql2/promise';
import { IPackItem, IPackRepository } from "../interfaces/pack.interfaces";

class PackRepository implements IPackRepository {
  private conn: Pool;

  constructor() {
    this.conn = conn;
  }

  async getPack(productCode: string): Promise<IPackItem[] | null> {
    const [rows] = await this.conn.execute<RowDataPacket[]>(
      'SELECT * FROM ShopperDatabase.packs WHERE pack_id = ?',
      [productCode],
    );

    if (!rows.length) {
      return null;
    }

    const packItems = rows.map((row) => ({
      id: row.id,
      pack_id: row.pack_id,
      product_id: row.product_id,
      qty: row.qty,
    }));

    return packItems;
  }

  async getProductPack(productCode: string): Promise<IPackItem | null> {
    const [[rows]] = await this.conn.execute<RowDataPacket[]>(
      'SELECT * FROM ShopperDatabase.packs WHERE product_id = ?',
      [productCode]
    );

    if (!rows) return null;

    const productPack = {
      id: rows.id,
      pack_id: rows.pack_id,
      product_id: rows.product_id,
      qty: rows.qty,
    };

    return productPack;
  }
}

export default PackRepository;
