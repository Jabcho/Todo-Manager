import { createApp } from 'vue'
import MainBoard from './MainBoard.vue'
import store from '@/store/index'
//import router from '@/router/router'

createApp(MainBoard).use(store).mount('#app')