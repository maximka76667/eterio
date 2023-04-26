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

  async getCurrentUser(token: string) {
    axios.defaults.headers.get.Authorization = `Bearer ${token}`;
    const response = await axios.get(`${this._baseUrl}/users/me`);
    return response.data;
  }
}

const api = new Api({
  baseUrl: 'http://localhost:8000'
});

export default api;
