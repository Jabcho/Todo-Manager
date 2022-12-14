<template>
    <div id="app">
        <TodoHeader></TodoHeader>
        <div class="container">
            <div class="item-container">
                <i class="loginitem fas fa-solid fa-user" aria-hidden="true"></i>
                <input class="loginitem item" v-model="userId" v-on:keyup.enter="loginSubmit" type="text" placeholder="ID">
            </div>
            <div class="item-container">
                <i class="loginitem fas fa-solid fa-key" aria-hidden="true"></i>
                <input class="loginitem item" v-model="userPw" v-on:keyup.enter="loginSubmit" type="password" placeholder="password">
            </div>
            <button @click="loginSubmit" class="item">Login</button>
            <a href="/signup">Sign-up</a>
        </div>
    </div>
</template>

<script>
import TodoHeader from '../../components/TodoHeader.vue'

export default {
    data: function() {
        return {
            userId: '',
            userPw: ''
        }
    },
    methods: {
        loginSubmit() {
            if (this.userId.trim() == '') {
                alert('아이디를 입력하세요');
            } else if (this.userPw.trim() == '') {
                alert('비밀번호를 입력하세요')
            } else {
                
                const data = 
                {
                    userId: this.userId,
                    userPw: this.userPw
                }
                
                this.$store.dispatch("login", data)
                .then((results) => {
                    console.log("asdf", results)
                    if (results == false) {
                        alert('사용자 정보가 없거나 일치하지 않습니다');
                        this.clearInput();
                    } 
                })
                .catch((err) => {
                    console.log('로그인이 안되네요', err)
                })
            }
        },
        clearInput() {
            this.userId = '',
            this.userPw = ''
        }
    },
    components: {
        'TodoHeader': TodoHeader
    }
}
</script>

<style scoped>
    @import '/src/assets/global.css';
    .container {
        width: 70%;
        margin: 5rem auto;
        display: grid;
        row-gap: 10px;
        align-content: center;
    }
    .item {
        border-style: none;
        border-radius: 5px;
        font-size: 0.9rem;
    }
    .item-container {
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 10% auto;
    }
    .loginitem {
        height: 30px;
        line-height: 30px;
        padding: 0.5rem;
    }

    
    button{
        background-color: rgb(68, 133, 189);
        margin-top: 1rem;
        height: 50px;
        color: white;
    }
</style>