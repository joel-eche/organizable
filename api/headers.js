import {getToken} from "./../utils/storage.js";

export const initGet = () => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': getToken(),
  },
});

export const initPatch = (body) => ({
  method: 'PATCH',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': getToken(),
  },
});