<template>
  <div id="app">
    <div class="signup-page">
      <header>
        <h1>Sign Up</h1>
      </header>
      <div class="container">
        <div class="item-container">
          <signup-input
            v-model="name"
            placeholder="이름"
            type="text"
            :err="nameError"
            v-on:keyup.enter="signUp"         
          ></signup-input>
          <signup-input
            v-model="userId"
            placeholder="ID"
            type="text"
            :err="userIdError"
            v-on:keyup.enter="signUp"
          ></signup-input>
          <signup-input
            v-model="userPw"
            placeholder="비밀번호"
            type="password"
            :err="userPwError"
            v-on:keyup.enter="signUp"
          ></signup-input>
          <signup-input
            v-model="userPwCheck"
            placeholder="비밀번호 재확인"
            type="password"
            :err="userPwCheckError"
            v-on:keyup.enter="signUp"
          ></signup-input>
          <signup-input
            v-model="email"
            placeholder="e-mail"
            type="text"
            :err="emailError"
            v-on:keyup.enter="signUp"
          ></signup-input>
        </div>
        <!--button @click="signUp" class="item">Sign Up</!--button-->
        <button @click="signUp" class="item">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SignupInput from "@/components/SignupInput.vue";

export default {
  created() {
    /*this.$store.dispatch('loginCheck')
    .then((results) => {
      if(results == true) {
        this.$router.push('/mainboard');
      }
    })
    .catch((err) => {
      console.log(err);
    })*/
  },
  components: {
    SignupInput,
  },
  data: function () {
    return {
      name: "",
      nameError: null,
      userId: "",
      userIdError: null,
      userPw: "",
      userPwError: null,
      userPwCheck: "",
      userPwCheckError: null,
      email: "",
      emailError: null,
    };
  },
  methods: {
    check(){
        let all_good = true;

        this.nameError = null;
        this.userIdError = null;
        this.userPwError = null;
        this.userPwCheckError = null;
        this.emailError = null;

        if (this.name.length == 0) {
            this.nameError = "이름을 입력해주세요"
            all_good = false;
        }

        if (this.userId.length == 0) {
            this.userIdError = "아이디를 입력해주세요"
            all_good = false;
        }

        if (this.userPw.length == 0) {
            this.userPwError = "비밀번호를 입력해주세요"
            all_good = false;
        }

        if (this.userPwCheck.length == 0) {
            this.userPwCheckError = "비밀번호를 다시 입력해주세요"
            all_good = false;
        }
        if (this.userPwCheck != this.userPw) {
            this.userPwCheckError = "비밀번호가 일치하지 않습니다"
            all_good = false;
        }
        
        if (this.email.length == 0) {
            this.emailError = "이메일을 입력해주세요"
            all_good = false;
        }


        return all_good;
    },
    
    signUp() {
        console.log("시작");
      if (!this.check()) {
        return;
      }
      
      console.log(this.userId, this.userPwCheck, this.name, this.email);
      axios({
        method: "post",
        url: "/api/user/signup",
        data: {
          userId: this.userId,
          userPw: this.userPwCheck,
          name: this.name,
          email: this.email,
        },
      })
        .then((res) => {
          alert("회원가입에 성공하였습니다.")
          window.location.replace(res.data);
          return true;
        })
        .catch(() => {
          alert("회원가입에 실패하였습니다.");
        });
    },
  },
};
</script>

<style scoped>
@import '/src/assets/global.css';
h1 {
  color: #2f3b52;
  font-weight: 500;
  margin: 3.5rem 0 1.5rem;
}
.container {
  width: 70%;
  margin: 5rem auto;
  display: grid;
  row-gap: 10px;
  align-content: center;
}
.item {
  border-style: solid;
  border-width: thin;
  border-color: rgb(170, 169, 167);
  border-radius: 7px;
  font-size: 0.9rem;
  margin: 0.3rem 0;
}
.item-container {
  border-radius: 5px;
  display: grid;
}
.signup {
  height: 30px;
  line-height: 30px;
  padding: 0.5rem;
  background-color: white;
}

.red {
  border-color: red;
}

button {
  border-style: none;
  background-color: rgb(68, 133, 189);
  margin-top: 1rem;
  height: 50px;
  color: white;
}
</style>