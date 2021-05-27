<template>
  <div class="home-page">
    <h1 class="home-title">Dong's Blog</h1>
    <modules-search-bar />
    <section class="home-contents">
      <nuxt-link to="/news" class="image-1">
        <span>news</span>
      </nuxt-link>
      <nuxt-link to="/todo" class="image-2">
        <span>todo</span>
      </nuxt-link>
      <nuxt-link to="/nnew" class="image-3">
        <span>naver</span>
      </nuxt-link>
      <nuxt-link to="/aws" class="image-4">
        <span>AWS</span>
      </nuxt-link>
      <nuxt-link to="/upload" class="image-5">
        <span>upload</span>
      </nuxt-link>
      <nuxt-link to="/croppie" class="image-6">
        <span>croppie</span>
      </nuxt-link>
      <nuxt-link to="/class" class="image-7">
        <span>class</span>
      </nuxt-link>
      <nuxt-link to="/login" class="image-8">
        <span>login</span>
      </nuxt-link>
      <nuxt-link to="/scroll" class="image-8">
        <span>scroll</span>
      </nuxt-link>
      <nuxt-link to="/animation" class="image-8">
        <span>animation</span>
      </nuxt-link>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.home-title {
  font-size: 20px;
  display: inline-block;
  height: 100%;
  padding: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
}
.home-search-wrap {
  width: 20rem;
  height: 2rem;
  border-radius: 50px;
  box-shadow: 0 0 5px rgba(0,0,0,.3);
  background: #fff;
  /* margin-bottom: 50px; */
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.home-search-wrap input {
  margin-left: 10px;
  width: calc(100% - 40px);
  height: 24px;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
}
.home-contents {
  margin-top: 50px;
  /* width: 30rem; */
  width: 40rem;
  /* height: 20rem; */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.home-contents > a {
  width: 9rem;
  height: 9rem;
  margin: .5rem;
  position: relative;
  border-radius: 50px;
  box-shadow: 0 0 5px rgba(0,0,0,.2);
}
.home-contents > a:hover {
 box-shadow: 0 0 15px rgba(0,0,0,.5);
}
.home-contents > a > span {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  text-transform: uppercase;
  color: #fff;
}



.image-1 {
  background: url('https://images.unsplash.com/photo-1618246933869-5f8dd8347b2f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}


.image-2 {
  background: url('https://images.unsplash.com/photo-1544013030-dac22dc4546a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGdyZWVufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.image-3 {
  background: url('https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3OHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.image-4 {
  background: url('https://images.unsplash.com/photo-1599153066743-08810dc8a419?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXdzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.image-5 {
  background: url('https://images.unsplash.com/photo-1619266465172-02a857c3556d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.image-6 {
  background: url('https://images.unsplash.com/photo-1620740517124-b2985c235871?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3MXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.image-7 {
  background: url('https://images.unsplash.com/photo-1620805368151-8d5ce3a92d3f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.image-8 {
  background: url('https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

@media screen and (max-width: 640px) {
    .home-contents {
      width: 100%;
      height: 100%;
      /* flex-flow: column; */
      flex-wrap: wrap-reverse;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
    .home-contents > a {
      /* width: 6rem;
      height: 6rem; */
    }
}
@media screen and (max-width: 450px) {
  .home-title {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .home-search-wrap {
    width: calc(100% - 60px);
  }
  .home-contents > a {
    width: 100%;
    height: calc(50vw - 60px);
    border-radius: 10px;
    /* width: 6rem;
    height: 6rem; */
  }
}
</style>