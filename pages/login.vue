<template>
  <div class="login-page">
      <div class="join-box">
        <h3 class="join-box-title">채팅방 입장하기</h3>
        <input id="name" type="id" autocomplete="off" v-model="name" placeholder="대화명">
        <button @click="joinSubmit">JOIN</button>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg: [],
      name: ''
    }
  },
  mounted(){
  },
  methods:{
    joinSubmit() {
      this.$router.push(`/ChatRoom/${this.name}`);
    },
  }
}
</script>

<style>
.login-page {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    /* background: rgba(0,0,0,0.2); */
    display: flex;
    justify-content: center;
    align-items: center;
}
.join-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #01559a;
}
.join-box-title {
  color: #f1ede9;
  margin-bottom: 20px;
  font-size: 1rem;
}
.join-box input#name {
  width: 100%;
  max-width: 360px;
  height: 36px;
  border: none;
  box-shadow: 0 0 10px rgba(255,255,255,.4);
  border-radius: 10px;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: .7rem;
  background-color: #f1ede9;
}
.join-box button {
  margin-top: 20px;
  width: 100%;
  max-width: 120px;
  height: 30px;
  font-size: .7rem;
  font-weight: bold;
  background-color: #f1ede9;
  box-shadow: 0 0 10px rgba(255,255,255,.4);
}
</style>