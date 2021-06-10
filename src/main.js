import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire' // Added to make vuefire work
import {auth} from './firebaseConfig.js' // for authentication

Vue.config.productionTip = false
Vue.use(firestorePlugin); // added to make vuefire work

let app // for authentication
auth.onAuthStateChanged(() => { // for authentication
  if (!app) { // for authentication
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})