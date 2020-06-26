export const getToken = () => {
  //return localStorage.getItem("");
  return 'Token token="ywvRmuFxJpWb94KudpS8jf3P"';
}

export const getStoredItem = (item) => {
  const data = localStorage.getItem(item);
  return JSON.parse(data ? data : "{}");
}

export const setStoredItem = (item, data={}) => {
  localStorage.setItem(item, JSON.stringify(data));
}