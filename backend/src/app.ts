import express from 'express';
import productsRouter from './routes/products.routes';
import 'express-async-errors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    }

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(productsRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}!`));
  }
}

export { App };

export default new App();
