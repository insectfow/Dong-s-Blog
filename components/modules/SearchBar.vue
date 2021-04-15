<template>
    <div class="home-search-wrap">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" autocomplete="off" name="search" v-model="searchData" @keyup.enter="search">
    </div>
</template>

<script>
export default {
    data(){
    return {
      searchData: ''
    }
  },
  methods:{
      search(){
      if(this.searchData === ''){
        return
      }
      this.$store.dispatch('fetchNews', this.searchData);
      this.searchData = '';
    }
  }
    
}
</script>

<style>

</style>