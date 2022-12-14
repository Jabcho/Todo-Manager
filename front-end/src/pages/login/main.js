import { createApp } from 'vue'
import LoginPage from './LoginPage.vue'
import store from '@/store/index'


createApp(LoginPage).use(store).mount('#app')
