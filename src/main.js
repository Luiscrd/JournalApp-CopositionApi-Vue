import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cloudinary from 'cloudinary-vue';
;

import './styles/styles.scss'

createApp(App).use(Cloudinary, {
    configuration: {
      cloudName: "dtkdrn7w2"
    }
  }).use(store).use(router).mount('#app')
