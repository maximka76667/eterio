import axios from 'axios';

class AuthApi {
  private readonly _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  async login(email: string, password: string) {
    const response = await axios.post(`${this._baseUrl}/auth/login`, {
      email,
      password
    });
    return response.data;
  }

  async register(email: string, name: string, password: string) {
    const response = await axios.post(`${this._baseUrl}/users/`, {
      email,
      name,
      password
    });
    return response.data;
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://eterio-api-489286482375.europe-southwest1.run.app'
  // baseUrl: 'http://localhost:8000'
});

export default authApi;
