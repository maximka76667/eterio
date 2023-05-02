import axios, { CancelTokenSource } from 'axios';
import UserUpdate from '../interfaces/UserUpdate';

class Api {
  private readonly _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  async getDrinks(source: CancelTokenSource) {
    try {
      const drinks = await axios.get(`${this._baseUrl}/drinks`, {
        cancelToken: source.token
      });
      return drinks.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getCurrentUser(token: string) {
    const response = await axios.get(`${this._baseUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async updateUser(token: string, newUser: UserUpdate) {
    const response = await axios.put(`${this._baseUrl}/users/me`, newUser, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  }

  async toggleFavorite(isFavorite: boolean, token: string, id: string) {
    if (!isFavorite) {
      const response = await axios.put(
        `${this._baseUrl}/users/favs/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    }

    const response = await axios.delete(`${this._baseUrl}/users/favs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
}

const api = new Api({
  baseUrl: 'http://localhost:8000'
});

export default api;
