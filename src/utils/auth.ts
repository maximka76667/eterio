import axios from 'axios';

class Auth {
  private readonly _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  private static async _checkResponse(res: Response) {
    if (res.ok) return await res.json();
    return await Promise.reject(new Error(`Error ${res.status}`));
  }

  //   async getDrinks() {
  //     return await fetch(`${this._baseUrl}/drink`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }).then(Auth._checkResponse);
  //   }

  signIn = async (email: string) => {
    return await axios.post(`${this._baseUrl}/login`, { email });
  };

  signInWithLink = async (email: string, magicLink: string) => {
    return await axios.post(`${this._baseUrl}/login`, {
      email,
      magicLink,
    });
  };

  async verifyToken(token: string) {
    axios.defaults.headers.common.Authorization = token;
    return await axios.post(`${this._baseUrl}/verify`);
  }
}

const auth = new Auth({
  baseUrl: 'http://localhost:3001',
});

export default auth;
