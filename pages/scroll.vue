<template>
  <div class="scroll-page">
      <vue-scroll>
          <ul>
            <li>11</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>ss</li>
            <li>22</li>
        </ul>
      </vue-scroll>
      
  </div>
</template>

<script>
// import vuescroll from 'vuescroll';
export default {
    // components: {
    //     vuescroll
    // }
}
</script>

<style>
.scroll-page {
    border: 1px solid #000;
    width: 1200px;
    margin: 0 auto;
    height: 700px;
    overflow: auto;
}
.scroll-page ul {
    width: 100%;
    
}
.scroll-page ul > li {
    font-size: 20px;
    height: 50px;

}
</style>