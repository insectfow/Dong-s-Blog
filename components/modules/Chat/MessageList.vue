<template>
  <div class="chat-list" v-autoBottom="this.$store.state.msgDatas">
      <transition-group name="list">
          <div v-for="(msg, idx) in this.$store.state.msgDatas" :key="idx+ 'msg'" class="list-item">
              <ul class="list-tile">
                  <li class="list-tile-action">
                      <span>{{msg.from.name}} :</span>
                  </li>
                  <li class="list-tile-action">
                      <h3>{{msg.msg}}</h3>
                  </li>
              </ul>
          </div>
      </transition-group>
  </div>
</template>

<script>
export default {
    name: 'MessageList',
    props: ['msgs'],
    created(){
      console.log(this.$store.state.msgDatas);
    },
    directives: {
      autoBottom: {
        update: (el) => {
            setTimeout(() => {
                el.scrollTop = el.scrollHeight;
            }, 0)
        }
      }
    }
}
</script>

<style>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>