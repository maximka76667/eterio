import axios from 'axios';

class Auth {
  private readonly _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  signIn = async (email: string) => {
    return await axios.post(`${this._baseUrl}/login`, { email });
  };

  signInWithLink = async (email: string, magicLink: string) => {
    return await axios.post(`${this._baseUrl}/login`, {
      email,
      magicLink,
    });
  };

  getUser = async (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return await axios.get(`${this._baseUrl}/me`);
  };
}

const auth = new Auth({
  baseUrl: 'https://alcopedia-api.deta.dev',
});

export default auth;
