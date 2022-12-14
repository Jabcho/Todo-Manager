import { createWebHistory, createRouter } from "vue-router";
import LoginPage from '@/pages/login/LoginPage'
import MainBoard from '@/pages/main/MainBoard'
import SignupPage from '@/pages/signup/SignupPage'
//import axios from 'axios'

/*const dataUpdate = function() {
    axios.get('/db/selectAll')
    .then((res) => {
        console.log(res.data); //[{id: ~~, list: ~~}, ...]
        if (res.data.length == 0) {
            this.todoItems = [];
        } else {
            for (let i = 0; i < res.data.length; i++) {
                this.todoItems.push(res.data[i]);
            }
        }
    })
    .catch((err) => {
        console.log(err);
    })
}*/

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/mainboard',
        name: 'MainBoard',
        component: MainBoard,
        //beforeRouteUpdate: dataUpdate
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignupPage
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;