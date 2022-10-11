import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/global/css/global.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "animate.css"
import {createPinia} from 'pinia'

const store= createPinia()

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
