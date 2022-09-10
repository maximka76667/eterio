class Api {
  private _baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  private static _checkResponse(res: Response) {
    if (res.ok) return res.json();
    return Promise.reject(new Error(`Error ${res.status}`));
  }

  getDrinks() {
    return fetch(`${this._baseUrl}/drink`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(Api._checkResponse)
  }
}

const api = new Api({
  baseUrl: "https://apqr5t.deta.dev",
})

export default api;