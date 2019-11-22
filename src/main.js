import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { firebaseConfig } from "../firebase.config";
import axios from 'axios'
import VueAxios from 'vue-axios'
import UUID from 'vue-uuid'
import VueQRCodeComponent from 'vue-qrcode-component'

let app = "";
Vue.use(VueAxios, axios)
Vue.use(UUID)
Vue.config.productionTip = false; 
Vue.component('qr-code', VueQRCodeComponent)

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
