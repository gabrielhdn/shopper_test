export interface IPackRepository {
  getPack(productCode: number): Promise<any>;
  getProductPack(productCode: number): Promise<any>;
}
