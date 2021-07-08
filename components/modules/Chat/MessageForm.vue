<template>
  <div class="msg-form">
      <label for="chat" class="chat-label">
        <input type="text" placeholder="보낼 메세지를 입력하세요." v-model="msg" label="chat" @keyup.enter="submitMessageFunc">
      </label>
  </div>
</template>

<script>
export default {
    name: 'MessageForm',
    data(){
        return {
            msg: ''
        }
    },
    methods: {
        submitMessageFunc(){
            if (this.msg.length === 0) return false;
            this.$emit('submitMessage', this.msg);
            this.msg = '';
            return true;
        }
    }
}
</script>

<style>

</style>