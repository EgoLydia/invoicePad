import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './router'
// import firebase from 'firebase/app'
// import 'firebase/auth'
import App from './App.vue'

// let app;
// firebase.auth().onAuthStateChanged(() => {
//     if(!app){}
// })

createApp(App).use(createPinia()).use(router).mount("#app");
