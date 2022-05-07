export const setItemInLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getItemFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const modifyItemInLocalStorage = (key, data) => {
    let tmp = JSON.parse(localStorage.getItem(key))
    tmp = data;
    localStorage.setItem(key, tmp);
}