import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDSIsOqQlxPZJYexOzmtaQ7YCLMVOuPVUs",
    authDomain: "vue-http-demo-b1991.firebaseapp.com",
    databaseURL: "https://vue-http-demo-b1991-default-rtdb.firebaseio.com",
    projectId: "vue-http-demo-b1991",
    storageBucket: "vue-http-demo-b1991.appspot.com",
    messagingSenderId: "592689070447",
    appId: "1:592689070447:web:22769a16223256858b689a"
};


// export default db;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
