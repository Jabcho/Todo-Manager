import axios from 'axios';

const userStore = {
    /*state: () => ({
        userId: '',
        is_Logined: false
    }),
    mutations: {

        login: function (state, payload) {
            state.userId = payload.userId;
            state.is_Logined = true;
        },
        logout: function(state) {
            state.userId = '';
            state.is_Logined = false;
        }
    },*/
    actions: {
        login: function (event, payload) {
            return axios({
                method: 'post',
                url: '/api/user/login',
                headers: {
                    "Content-Type": `application/json`
                },
                data: {
                    userId: payload.userId,
                    userPw: payload.userPw
                }
            })
            .then((res) => {
                window.location.replace(res.data);
                return true;
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status == 500) {
                        console.log('500에러입니다')
                        return false;
                    } else if (err.response.status == 401) {
                        console.log("invalid user")
                        return false;
                    }
                }
                throw err;
            })
        },
        loginCheck: function() {
            return new Promise((resolve, reject) => {
                axios.get('/api/user/logincheck')
                .then(() => {
                    resolve(true);
                })
                .catch((err) => {
                    if (err.response.status == 403) {
                        resolve(false);
                    }

                    reject(err);
                })
                
            })
        },
        logout: function() {
            return axios({
                method: 'get',
                url: '/api/user/logout'
            })
            .then((res) => {
                alert('로그아웃되었습니다')
                console.log(res)
                
                window.location.replace(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }

/*
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: '/api/user/login',
                    headers: {
                        "Content-Type": `application/json`
                    },
                    data: {
                        userId: payload.userId,
                        userPw: payload.userPw
                    }
                })
                .then((res) => {
                    console.log(res);
                    commit('login', payload);
                    resolve(true);
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status == 401) {
                            console.log("invalid user")
                            resolve(false);
                        }
                    }
                    reject(err);
                })
            })*/
        
    }
    
}


export default userStore;