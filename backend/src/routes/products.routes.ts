import { Router } from "express";
import ProductController from "../controllers/ProductController";
import ProductService from "../services/ProductService";

const router = Router();
const productService = new ProductService();
const productController = new ProductController(productService);

router.post(
  '/products',
  (req, res) => productController.validateProducts(req, res),
)

router.put(
  '/products',
  (req, res) => productController.updateProducts(req, res),
)

export default router;
