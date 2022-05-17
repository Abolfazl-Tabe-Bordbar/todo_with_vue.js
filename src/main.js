import { createApp } from 'vue';
import App from './App.vue';
import './../index.css';
import axios from 'axios';
axios.defaults.baseURL = "https://learnvue-c2af3-default-rtdb.europe-west1.firebasedatabase.app";
const father = createApp(App);
father.mount('#app');