import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
    return encryptedData;
};

const decryptData = (encryptedData) => {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
    const decryptedJSON = JSON.parse(decryptedString);
    return decryptedJSON;
};

export { encryptData, decryptData };
