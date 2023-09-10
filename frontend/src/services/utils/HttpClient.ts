import { IPricingData } from '../../interfaces/pricing';

class HttpClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  post(endpoint: string, options?: { body?: IPricingData[] }) {
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: options?.body,
    });
  }

  put(endpoint: string, options?: { body?: IPricingData[] }) {
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: options?.body,
    });
  }

  async makeRequest(endpoint: string, options: {
    method: string;
    body?: IPricingData[];
  }) {
    let data = null;
    const headers = new Headers();

    // permite a leitura do body no back-end
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    // será undefined se a resposta não tiver corpo (204 No Content)
    const contentType = response.headers.get('Content-Type');

    // garante que existe um body com conteúdo JSON na resposta
    if (contentType?.includes('application/json')) {
      data = await response.json();
    }

    return data;
  }
}

export default HttpClient;
