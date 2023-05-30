class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkValidAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async _request(endpoint, options) {
    const res = await fetch(`${this._baseUrl}${endpoint}`, options);
    return this._checkValidAnswer(res);
  }

  getUserInfo() {
    return this._request('/users/me', {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request('/cards', {
      headers: this._headers,
    });
  }

  editProfile({ name, about }) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  addNewCard({ name, link }) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked
      ? this._request(`/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers,
        })
      : this._request(`/cards/${id}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        });
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  editAvatarProfile({ link }) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }
}

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-63`,
  headers: {
    authorization: 'cadaf3e6-12d4-47e6-8927-b77a2c64004a',
    'Content-Type': 'application/json',
  },
});

export default api;
