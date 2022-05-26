import { initializeApp } from 'firebase/app';

export const environment = {
    production: true,
    CAPTCHA: '6LftSM0fAAAAAAxGp4Ll0BqxP31OFrYhRnPAHUUa',
    publicKey: 'BIpTNnuLGI0cH7M-vUW4mN8Zt0hUTIliAElwR9onUDO-EYPOdhlKs_p7d6dyfjqh2TvIibfYP94mpsinjZiBbBU'
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
initializeApp(firebaseConfig);
