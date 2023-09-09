import { IPricingData } from '../interfaces/pricing';
import HttpClient from './utils/HttpClient';

class PricingService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  validateData(body: IPricingData[]) {
    return this.httpClient.post('/products', { body });
  }

  updatePricing(body: IPricingData[]) {
    return this.httpClient.put('/products', { body });
  }
}

export default new PricingService();
