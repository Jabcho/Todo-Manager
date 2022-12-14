import { createApp } from 'vue'
import SignupPage from './SignupPage.vue'
import store from '@/store/index'


createApp(SignupPage).use(store).mount('#app')