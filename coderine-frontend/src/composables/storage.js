import { encryptData, decryptData } from '../utils/encrypt-data';

const saveStorage = (key, value) => {
    const encryptedValue = encryptData(value);
    localStorage.setItem(key, encryptedValue);
};

const getStorage = (key) => {
    if (!localStorage.getItem(key)) {
        return null;
    }

    const encryptedValue = localStorage.getItem(key);
    const decryptedValue = decryptData(encryptedValue);
    return decryptedValue;
};

const removeStorage = (key) => {
    localStorage.removeItem(key);
};

export { saveStorage, getStorage, removeStorage };
