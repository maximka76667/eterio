import axios from 'axios';

class Api {
  private readonly _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  async getDrinks() {
    return await axios.get(`${this._baseUrl}/drink`);
  }
}

const api = new Api({
  baseUrl: 'https://alcopedia-api.deta.dev',
});

export default api;
