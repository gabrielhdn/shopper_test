export interface IPackItem {
  id: number;
  pack_id: number;
  product_id: number;
  qty: number;
}

export interface IPackRepository {
  getPack(productCode: number): Promise<IPackItem[] | null>;
  getProductPack(productCode: number): Promise<IPackItem | null>;
}
