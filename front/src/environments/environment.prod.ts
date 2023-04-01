import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

export const environment = {
    production: true,
    backendUrl: 'https://file-sync.onrender.com/api',
    authUri: () => `${ environment.backendUrl }/users`,
    fileUri: () => `${ environment.backendUrl }/files`,
    notificationUri: () => `${ environment.backendUrl }/notifications`,
    APP_NAME: 'File-Sync',
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
