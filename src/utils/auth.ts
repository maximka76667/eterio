// import axios from 'axios';

class AuthApi {
  private readonly _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }
}

const authApi = new AuthApi({
  baseUrl: 'http://localhost:8000'
});

export default authApi;
