<template>
  <div id="app">
      <Nuxt />
      <div class="back-button" v-if="$route.path !== '/'" @click="backPage">
          <i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    backPage(){
      // console.log(this.$route);
      this.$router.go(-1);
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
#app {
  position: relative;
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
  top: 20px;
  left: 20px;
  z-index: 11;
  cursor: pointer;
}
</style>