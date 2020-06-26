export const getParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param); // null if doesn't exits
}