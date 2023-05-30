import checkResponse from './checkResponse';

export const baseUrl = 'https://auth.nomoreparties.co';

async function request(endpoint, options) {
  const res = await fetch(`${baseUrl}${endpoint}`, options);
  return checkResponse(res);
}

export const register = (password, email) => {
  return request('/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  });
};

export const authorize = (password, email) => {
  return request('/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  });
};

export const checkJwt = (token) => {
  return request('/users/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
