<template>
  <div id="app">
    <div id="user-container">
        <div id="username" class="loginitem">
            <i class="fas fa-solid fa-user" aria-hidden="true"></i>
            <span @click="logout">Logout</span>
        </div>
    </div>
    <div>
      <TodoHeader></TodoHeader>
      <TodoInput v-on:addTodo="addTodo"></TodoInput>
      <TodoList v-on:removeTodo="removeTodo"></TodoList>
      <TodoFooter v-on:clearTodo="clearTodo"></TodoFooter>
    </div>
  </div>
</template>

<script>
import TodoHeader from '../../components/TodoHeader.vue'
import TodoInput from '../../components/TodoInput.vue'
import TodoList from '../../components/TodoList.vue'
import TodoFooter from '../../components/TodoFooter.vue'


export default {

  /*data: () => {
    return {
      todoItems: []
    }
  },*/
  created() {
    console.log("MainBoard.created()")
    /*
    this.$store.dispatch('loginCheck')
    .then((results) => {
      if (results == false) {
        alert('사용자 세션이 만료되었습니다');
        this.$router.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
    })*/
    this.$store.dispatch("getTodoList")
    
  },
  methods: {
    addTodo(newTodoItem) {
      this.$store.dispatch('addTodo', newTodoItem)
    },
    /*
    addTodo(newTodoItem) {
      console.log('나는야 ' + newTodoItem);
      axios({
          method: 'post',
          url: '/api/db/insert',
          headers: {
              "Content-Type": `application/json`,
          },
          data: {
              list: newTodoItem
          }
      })
      .then((res) => {
        console.log(res.data);
        let todoItems = this.$store.state.mainStore.todoItems

        todoItems.push(res.data);
      })
      .catch((err) => {
          console.log('여기 에러는 : ' + err);
          
      }); 
    },*/
    removeTodo(value) {
      this.$store.dispatch('removeTodo', value)
      /*
      const data = {
          id: value.id
      };
      axios.post('/api/db/delete', data)
      .then((res) => {
        this.$store.state.mainStore.todoItems = res.data;
        console.log(this.$store.state.mainStore.todoItems);
      })
      .catch((err) => {
          console.log(err);
      })
        // 백엔드 서버에서 삭제하기 (splice 사용)*/
    },
    clearTodo() {
      this.$store.dispatch('clearTodo')
      /*console.log('삭제한다?')
      axios.get('/api/db/deleteAll')
      .then(() => {
          this.$store.state.mainStore.todoItems = [];
      })
      .catch((err) => {
          console.log(err);
      })*/
    },
    logout() {
      this.$store.dispatch('logout')
      .then(() => {
        console.log('로그아웃 성공')
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

<style scoped>
  @import '/src/assets/global.css';
  
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
  input {
        border-style: groove;
        /*width: 200px;*/
  }
  button {
    border-style: groove;
  }
  
  
</style>
