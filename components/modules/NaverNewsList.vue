<template>
    <div class="hacker-wrap">
        <p v-if="$fetchState.pending" class="pending">불러오는 중...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <transition v-else name="slide">
            <ul class="card-wrap" >
                <li v-for="(list, idx) in nNewList" :key="idx">
                    <ul>
                        <li>
                            <a :href="list.link" target="_blank" rel="noreferrer noopener">
                                <h3 v-html="list.title" ></h3>
                                <p v-html="list.description" class="overText"></p>
                                <p v-html="list.pubDate" class="overText"></p>
                            </a>
                        </li>
                    </ul>    
                </li>          
            </ul>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return {
        }
    },
    watch: {
      'searchData' : '$fetch'
    },
    computed: {
       ...mapState(['nNewList', 'searchData'])
    },
    fetchDelay: 500,
    fetch(){
      return  this.$store.dispatch('fetchNews', this.searchData);
    },
    methods: {

    }
}
</script>

<style>
.slide-enter-active, .slide-leave-active {
  transition: opacity 0.5s ease-in-out;
  
}
.slide-enter, .slide-leave-to {
    opacity: 0;
}

.overText {
    width: 100%;
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
}

.pending {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
}

html body, div, ul, li, ol, p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
}

ul, li, ol {
    list-style: none;
}

.card-wrap {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    margin: 0 auto;
}

.card-wrap > li {
    margin-bottom: 10px;
    width: 100%;
    padding: 20px;
    box-shadow:  0 0 4px rgba(0,0,0,0.2);
    transition: all 1s ease;
    box-sizing: border-box;
}
.card-wrap > li:last-child {
    margin-bottom: 0;
}

@media screen and (max-width: 600px) {
    .card-wrap {
        width: 100%;
    }
    .card-wrap > li {
        margin-right: 0;
    }    
}

</style>