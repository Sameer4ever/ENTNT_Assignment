// localStorageHelpers.js

export const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addItem = (key, item) => {
  const data = getData(key);
  data.push(item);
  setData(key, data);
};

export const updateItem = (key, updatedItem, id) => {
  const data = getData(key).map((item) =>
    item.id === id ? updatedItem : item
  );
  setData(key, data);
};

export const deleteItem = (key, id) => {
  const data = getData(key).filter((item) => item.id !== id);
  setData(key, data);
};
