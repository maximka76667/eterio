import axios, { CancelTokenSource } from 'axios';
import UserUpdate from '../interfaces/UserUpdate';
import { DrinkCreate } from '../interfaces';

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

  async getUsers(source: CancelTokenSource) {
    try {
      const users = await axios.get(`${this._baseUrl}/users`, {
        cancelToken: source.token
      });
      return users.data;
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

  async getBottles() {
    const response = await axios.get(`${this._baseUrl}/bottles`);
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
        `${this._baseUrl}/drinks/favs/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    }

    const response = await axios.delete(`${this._baseUrl}/drinks/favs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async createDrink(token: string, newDrink: DrinkCreate) {
    const response = await axios.post(`${this._baseUrl}/drinks`, newDrink, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  }

  async deleteDrink(token: string, id: string) {
    const response = await axios.delete(`${this._baseUrl}/drinks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  }

  async getCategories(source: CancelTokenSource) {
    const response = await axios.get(`${this._baseUrl}/categories`, {
      cancelToken: source.token
    });

    return response.data;
  }
}

const api = new Api({
  baseUrl: 'https://eterioapi-1-f7989107.deta.app'
});

export default api;
