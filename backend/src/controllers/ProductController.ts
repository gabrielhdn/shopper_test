import { Request, Response } from "express";
import { IProductService } from "../interfaces/product.interfaces";

class ProductController {
  private service: IProductService;

  constructor(service: IProductService) {
    this.service = service;
  }

  public async validateProducts(req: Request, res: Response) {
    try {
      const products = req.body;
      const productsInformation = await this.service.validateProducts(products);

      res.status(200).json(productsInformation);
    } catch {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async updateProducts(req: Request, res: Response) {
    try {
      const products = req.body;
      await this.service.updateProducts(products);

      res.status(200).json({ message: 'Products successfully updated!' });
    } catch {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default ProductController;
