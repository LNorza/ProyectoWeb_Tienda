import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Comienza Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRtsz0yEFjOygl3cpONjWtzHxRGugW0e4",
  authDomain: "programacion-web-311cd.firebaseapp.com",
  projectId: "programacion-web-311cd",
  storageBucket: "programacion-web-311cd.appspot.com",
  messagingSenderId: "684136598662",
  appId: "1:684136598662:web:df155dd3b935529ae01507"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//Termina Firebase

const app = createApp(App)

app.use(router)

app.mount('#app')
