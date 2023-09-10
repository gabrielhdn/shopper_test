export interface IPackItem {
  id: number;
  pack_id: number;
  product_id: number;
  qty: number;
}

export interface IPackRepository {
  getPack(productCode: string): Promise<IPackItem[] | null>;
  getProductPack(productCode: string): Promise<IPackItem | null>;
}
