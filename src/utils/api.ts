import axios from 'axios';

class Api {
  private readonly _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  async getDrinks() {
    try {
      const drinks = await axios.get(`${this._baseUrl}/drinks`);
      return drinks.data;
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new Api({
  baseUrl: 'http://localhost:8000'
});

export default api;
