<template>

      <div id="app">
        <vue-scroll>
          <Nuxt />
          </vue-scroll>
      <div class="back-button" v-if="$route.path !== '/'" @click="backPage">
          <i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
          </div>
      </div>
  
</template>

<script>
export default {
  data (){
    return {
      
    }
  },
  methods: {
    backPage(){
      // console.log(this.$route);
      this.$router.push('/');
    }
  }
  // async mounted(){
  //   await this.$nextTick(() => {
  //     this.$nuxt.$loading.start()

  //     setTimeout(() => this.$nuxt.$loading.finish(), 1000)
  //   })
  // }
}
</script>

<style>
html, body {
  overflow: hidden;
}

.page-enter-active, .page-leave-active { 
    transition: all 0.3s;
    transform: scale(1);
}
    
.page-enter, .page-leave-active { 
    opacity: 0; 
    transform: scale(0);
}

#app {
  position: relative;
  overflow: auto;
}

a, a:active {
  text-decoration: none;
  color: #000;
}
a:hover {
  /* border-bottom: 3px solid #000; */
}

input:focus {
  outline: none;
}

.back-button {
  position: fixed;
  top: 16px;
  left: 20px;
  z-index: 11;
  cursor: pointer;
}
</style>