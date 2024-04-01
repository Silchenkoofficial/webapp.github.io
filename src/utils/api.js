import { request } from './request';
const apiVersion = '/api/v1';

const prepareParams = (data) => {
  const params = new URLSearchParams();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (Array.isArray(value)) {
        value.map((val) => params.append(key, val));
      } else {
        params.append(key, value);
      }
    }
  }
  return params;
};

export const API = {
  get: (url, id, params) =>
    request(
      apiVersion +
        url +
        (id ? `${id}/` : '') +
        (params ? '?' + prepareParams(params) : ''),
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    ),
  patch: (url, id, params) =>
    request(`${apiVersion}${url}${id ? `${id}/` : ''}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: params ? JSON.stringify(params) : undefined,
    }),
  delete: (url, id) =>
    request(`${apiVersion}${url}${id ? `${id}/` : ''}`, {
      method: 'DELETE',
      credentials: 'include',
    }),
  post: (url, body) =>
    request(apiVersion + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: (url, body) =>
    request(apiVersion + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    }),
  addFiles: (url, id, queryParams, data) =>
    request(
      apiVersion +
        url +
        (id ? `${id}/` : '') +
        (queryParams ? '?' + prepareParams(queryParams) : ''),
      {
        method: 'PATCH',
        credentials: 'omit',
        body: data,
      }
    ),
  patchFiles: (url, id, params) =>
    request(`${apiVersion}${url}${id ? `${id}/` : ''}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'omit',
      body: params ? JSON.stringify(params) : undefined,
    }),
};
