import Vue from 'vue';
import * as Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA0Fbj8fsbrrpfFaFArtWcpdy5xF8FhWuQ",
  authDomain: "shoong-user-app.firebaseapp.com",
  databaseURL: "https://shoong-user-app.firebaseio.com",
  projectId: "shoong-user-app",
  storageBucket: "shoong-user-app.appspot.com",
  messagingSenderId: "414911007240",
  appId: "1:414911007240:web:dc7190fad3c1dc21e21fbd"
};
// Initialize Firebase
Firebase.initializeApp(firebaseConfig).firebase_;
