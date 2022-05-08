const LOCAL_STORAGE_KEY = "weather-app"

export const setItemInLocalStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export const getItemFromLocalStorage = (key) => {
  const tmp = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return tmp?.hasOwnProperty(key) ? tmp[key] : null;
}

export const modifyFavoriteInLocalStorage = (city) => {
  let isDelete = false;
  let tmp = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  const index = tmp.favorites.findIndex(elem => elem.cityName === city.cityName);
  if (index < 0) 
    tmp.favorites.push(city)
  else {
    tmp.favorites.splice(index, 1);
    isDelete = true;
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tmp));
  return isDelete;
}

export const isCityInFavorite = (cityName) => {
  let tmp = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  return tmp.favorites.findIndex(elem => elem.cityName === cityName) !== -1
}

export const getAllFavorites = () => {
  let tmp = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return tmp.favorites;
}