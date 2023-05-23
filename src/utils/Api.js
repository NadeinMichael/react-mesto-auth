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

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkValidAnswer);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkValidAnswer);
  }

  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkValidAnswer);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkValidAnswer);
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked
      ? fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers,
        }).then(this._checkValidAnswer)
      : fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        }).then(this._checkValidAnswer);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkValidAnswer);
  }

  editAvatarProfile({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkValidAnswer);
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
