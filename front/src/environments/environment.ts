export const environment = {
    production: false,
    SOCKET_ENDPOINT: 'http://localhost:3000'
};

import { initializeApp } from 'firebase/app';

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
initializeApp(firebaseConfig);
