class Api {
  private readonly _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  private static async _checkResponse(res: Response) {
    if (res.ok) return await res.json();
    return await Promise.reject(new Error(`Error ${res.status}`));
  }

  async getDrinks() {
    return await fetch(`${this._baseUrl}/drink`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(Api._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://alcopedia-api.deta.dev',
});

export default api;
