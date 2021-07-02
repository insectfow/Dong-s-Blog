<template>
  <div class="login-page">
      select
      <lazy-modules-select-box
      classs="selcet"
        :options="assList"
        :default="'N/A'"
        @input="select"
      />
        
  </div>
</template>

<script>
export default {
  data(){
    return {
      assList: [
        '해제', '브랜드', '스패머'
      ],
    }
  },
  computed: {
    
  },
  mounted(){
  },
  methods:{
    select(value){
      console.log(value);
    }
  }
}
</script>

<style>
.login-page {
    width: 1200px;
    margin: 0 auto;
}
</style>