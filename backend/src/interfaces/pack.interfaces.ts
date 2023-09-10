export interface IPackItem {
  id: string;
  pack_id: string;
  product_id: string;
  qty: string;
}

export interface IPackRepository {
  getPack(productCode: string): Promise<IPackItem[] | null>;
  getProductPack(productCode: string): Promise<IPackItem | null>;
}
