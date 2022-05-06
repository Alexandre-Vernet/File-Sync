import { initializeApp } from 'firebase/app';

const { initializeAppCheck, ReCaptchaV3Provider } = require('firebase/app-check');


export const environment = {
    production: false,
    SOCKET_ENDPOINT: 'http://localhost:3000',
    CAPTCHA: '6LftSM0fAAAAAAxGp4Ll0BqxP31OFrYhRnPAHUUa'
};


export const firebaseConfig = {
    apiKey: 'AIzaSyBmuPgfCUx87_Kvlqv0Vk_xRYmR3-IJsGI',
    authDomain: 'media-share-4f34a.firebaseapp.com',
    projectId: 'media-share-4f34a',
    storageBucket: 'media-share-4f34a.appspot.com',
    messagingSenderId: '1042809386770',
    appId: '1:1042809386770:web:6383de70f022d8516ca5cb',
    measurementId: 'G-ETV10EBRGG'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Check
initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(environment.CAPTCHA),
    isTokenAutoRefreshEnabled: true
});
