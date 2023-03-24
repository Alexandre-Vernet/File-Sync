import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";

export const environment = {
    production: false,
    backendUrl: 'http://localhost:3000/api',
    authUri: () => `${ environment.backendUrl }/users`,
    fileUri: () => `${ environment.backendUrl }/files`,
    CAPTCHA: '6LftSM0fAAAAAAxGp4Ll0BqxP31OFrYhRnPAHUUa',
    publicKey: 'BIpTNnuLGI0cH7M-vUW4mN8Zt0hUTIliAElwR9onUDO-EYPOdhlKs_p7d6dyfjqh2TvIibfYP94mpsinjZiBbBU',
    APP_NAME: 'File-Sync - LOCAL',
    vapidKey: 'BJQb79bqUoSL9AGLfJYP-SGdEXD4jZjt6IY1H4iPVvratKhSlJ6NSNEZojpRQaHMpBytAnu4DWgCWNQLUohjv1Y'
};


const firebaseConfig = {
    apiKey: 'AIzaSyBmuPgfCUx87_Kvlqv0Vk_xRYmR3-IJsGI',
    authDomain: 'media-share-4f34a.firebaseapp.com',
    projectId: 'media-share-4f34a',
    storageBucket: 'media-share-4f34a.appspot.com',
    messagingSenderId: '1042809386770',
    appId: '1:1042809386770:web:6383de70f022d8516ca5cb',
    measurementId: 'G-ETV10EBRGG'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
