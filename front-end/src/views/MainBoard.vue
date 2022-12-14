<template>
  <div id="user-container">
      <div id="username" class="loginitem">
          <i class="fas fa-solid fa-user" aria-hidden="true"></i>
          <span>{{ $store.state.userStore.userId }}</span>
      </div>
      <div id="logout" class="user" @click="logout">
        <span>Logout</span>
      </div>

  </div>
  <div>
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-on:removeTodo="removeTodo"></TodoList>
    <TodoFooter v-on:clearTodo="clearTodo"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from '../components/TodoHeader.vue'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import TodoFooter from '../components/TodoFooter.vue'

import axios from 'axios';

export default {

  /*data: () => {
    return {
      todoItems: []
    }
  },*/
  created() {
    console.log("MainBoard.created()")
    this.$store.dispatch('loginCheck')
    .then((results) => {
      if (results == false) {
        alert('사용자 세션이 만료되었습니다');
        this.$router.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
    })
    this.$store.dispatch("getTodoList")
    /*axios.get('/api/db/selectAll')
    .then((res) => {
        console.log(res.data); //[{id: ~~, list: ~~}, ...]
        if (res.data.length == 0) {
            this.$store.state.todoItems = [];
        } else {
            for (let i = 0; i < res.data.length; i++) {
                this.$store.state.todoItems.push(res.data[i]);
            }
        }
    })
    .catch((err) => {
        console.log(err);
    })*/
  },
  methods: {
    addTodo(newTodoItem) {
      console.log('나는야 ' + newTodoItem);
      axios({
          method: 'post',
          url: '/api/db/insert',
          /*headers: {
              "Content-Type": `application/json`,
          },*/
          data: {
              list: newTodoItem
          }
      })
      .then((res) => {
        console.log(res.data);
        let todoItems = this.$store.state.mainStore.todoItems

        todoItems.push(res.data);
        /*
        if (todoItems.length == 0) {
          todoItems = res.data;
        } else {
          todoItems.push(res.data);
        }*/
      })
      .catch((err) => {
          console.log('여기 에러는 : ' + err);
          
      }); 
    },
    removeTodo(value) {
      const data = {
          id: value.id,
          list: value.list
      };
      axios.post('/api/db/delete', data)
      .then((res) => {
        this.$store.state.mainStore.todoItems = res.data;
        console.log(this.$store.state.mainStore.todoItems);
      })
      .catch((err) => {
          console.log(err);
      })
        // 백엔드 서버에서 삭제하기 (splice 사용)
    },
    clearTodo() {
      console.log('삭제한다?')
      axios.get('/api/db/deleteAll')
      .then(() => {
          this.$store.state.mainStore.todoItems = [];
      })
      .catch((err) => {
          console.log(err);
      })
    },
    logout() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  }
}
</script>

<style>
  body {
    text-align: center;
    background-color: #F6F6F8;
  }
  #user-container {
    margin-top: 1rem;
    margin-left: 80%;
    padding: 0.5rem;
    max-width: 140px;
  }
  #username {
    display: flex;
    justify-content: space-around;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.6rem;
  }
  #username i {
    padding-top: 0.2rem;
  }
  .loginitem {
    background-color: white;
    height: 2rem;
    border-radius: 1rem;
  }
  #logout{
    text-align: right;
    font-size: 0.7rem;
    margin: 0.4rem 2rem 0.4rem 0rem;
  }
  input {
        border-style: groove;
        /*width: 200px;*/
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }
  
</style>
