<template>
  <div class="inner-wrap">
      <lazy-modules-chat-Message-list class="msg-list"></lazy-modules-chat-Message-list>
      <lazy-modules-chat-message-form @submitMessage="sendMessage" class="msg-from"></lazy-modules-chat-message-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Constant from '../../Constant'
export default {
    name: 'ChatRoom',
    data(){
        return {
            datas : []
        }
    },
    computed: {
    },
    mounted(){
        console.log(this.$route);
        const $ths = this;
        this.$socket.on('chat', (data) => {
            this.pushMsgData(data);
            $ths.datas.push(data);
        })
    },
    methods: {
        ...mapMutations({
            'pushMsgData': Constant.PUSH_MSG_DATA,
        }),
        sendMessage(msg) {
            console.log(msg);
            this.pushMsgData({
                from: {
                name: '나',
                },
                msg,
            });
            this.$sendMessage({
                name: this.$route.params.username,
                msg,
            });
        },
    }
}
</script>

<style>
.inner-wrap {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #f1ede9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
}
.chat-list {
    max-width: 340px;
    width: 100%;
    min-height: 400px;
    max-height: 400px;
    background-color: #fff;
    box-shadow:0 0 10px rgba(0,0,0,0.2);
    padding: 10px;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
}
.chat-list > span {
    display: block;
}
.list-item {
    width: 100%;
}
.list-tile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.list-tile-action:first-of-type {
    display: inline-block;
    margin-right: 10px;
    max-width: 80px;
}
.list-tile-action:last-of-type {
    max-width: 250px;
}
.list-tile-action span {
    font-size: 0.8rem;
}
.list-tile-action h3 {
    font-size: 0.9rem;
}
.msg-form {
    max-width: 340px;
    width: 100%;
    box-shadow:0 0 10px rgba(0,0,0,0.2);
}
.msg-form label {
    width: 100%;
}
.msg-form label input {
    width: 100%;
    height: 40px;
    border: none;
    display: block;
    padding: 0 10px;
    box-sizing: border-box;
}


</style>