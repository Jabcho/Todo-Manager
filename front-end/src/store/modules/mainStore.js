import axios from 'axios';

const mainStore = {
    state: () => ({
        todoItems: []
     }),
     mutations: {
         getTodoList: function(state, payload) {
             if (payload.length == 0) {
                 state.todoItems = [];
             } else {
                 state.todoItems = [];
                 for (let i = 0; i < payload.length; i++) {
                     state.todoItems.push(payload[i]);
                 }
             }
         },
         addTodo: function(state, payload) {
            state.todoItems.push(payload.data)
         },
         removeTodo: function(state, payload) {
            state.todoItems.forEach((cur, idx) => {
                if (cur.id === payload) {
                    state.todoItems.splice(idx, 1)
                    return
                }
            })
         },
         clearTodo: function(state) {
            state.todoItems = [];
         }
     },
     getters: {
        
     },
     actions: {
         getTodoList: function({commit}) {
             axios.get('/api/db/selectAll')
             .then((res) => {
                 console.log(res.data); //[{id: ~~, list: ~~}, ...]
                 commit('getTodoList', res.data)
             })
             .catch((err) => {
                 console.log(err);
             })
         },
         addTodo: function({commit}, payload) {
            return axios({
                method: 'post',
                url: '/api/db/insert',
                data: {
                    list: payload
                }
            })
            .then((res) => {
                commit('addTodo', res)
            })
            .catch((err) => {
                console.log(err);
            })
         },
         removeTodo: function({commit}, payload) {
            return axios({
                method: 'post',
                url: '/api/db/delete',
                data: {
                    id: payload.id,
                }
            })
            .then(() => {
                commit('removeTodo', payload.id);
            })
            .catch((err) => {
                console.log(err);
            })
         },
         clearTodo: function({commit}) {
            axios.get('/api/db/deleteAll')
            .then(() => {
                commit('clearTodo');
            })
            .catch((err) => {
                console.log(err);
            })
         }
     }
}

export default mainStore