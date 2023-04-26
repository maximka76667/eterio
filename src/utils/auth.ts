import axios from 'axios';

class AuthApi {
  private readonly _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${this._baseUrl}/auth/login`, {
        email,
        password
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}

const authApi = new AuthApi({
  baseUrl: 'http://localhost:8000'
});

export default authApi;
