export const getLocalStorageArray = (key) => {
  const storedArray = localStorage.getItem(key);
  return storedArray ? JSON.parse(storedArray) : false;
};

export const setLocalStorageArray = (key, arr) => {
  localStorage.setItem(key, JSON.stringify(arr));
};

export const deleteFromLocalStorageById = (key, id) => {
  const arr = getLocalStorageArray(key);
  const index = arr.findIndex((obj) => obj.id === id);
  if (index !== -1) {
    arr.splice(index, 1);
    setLocalStorageArray(key, arr);
    return true;
  }
  return false;
};

export const updateLocalStorageById = (id, key, value) => {
  const arr = getLocalStorageArray(key);
  const index = arr.findIndex((obj) => obj.id === id);
  if (index !== -1) {
    arr[index] = value;
    setLocalStorageArray(key, arr);
    return true;
  }
  return false;
};

export const createLocalStorageTodo = (key, newObj) => {
  const arr = getLocalStorageArray(key);
  const lastObj = arr[arr.length - 1];
  const newId = lastObj ? lastObj.id + 1 : 1;
  const newObject = { ...lastObj, id: newId, ...newObj };
  arr.push(newObject);
  setLocalStorageArray(key, arr);
  return newObject;
};
