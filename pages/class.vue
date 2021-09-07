<template>
  <div class="class-wrap">
      <h2>타입에 따른 분류</h2>
      <ul>
          <li v-for="(list, idx) in fileList" :key="idx">
              <a href="#" @click.prevent="getCheckList(list)" :class="checkOn(list)">
                  {{list}}
              </a>
          </li>
      </ul>
      <p>{{checkList}}</p>
      <button @click="reset" :disabled="this.checkList.length > 0 ? false : true ">reset</button>
      <button @click="download">download</button>
      <button @click="allCheck">allCheck</button>
      <p v-if="isResult" v-html="result"></p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data(){
        return {
            campaignCode: 'r-2349234824',
            fileList: [
                1, 2, 3, 4, 5, 6, 7, 8, 9
            ],
            isResult: false,
            result: '',
        }
    },
    computed: {
        ...mapState(['checkList']),
    },
    methods: {
        ...mapMutations(['setCheckList', 'removeCheckList', 'clearCheckList', 'allCheckList']),
        imageFileName(data){
            if (!data) return;
            this.isResult = false;

            var str = data.data;
            var re_str = str.replace(/campaignCode/gi, this.campaignCode);
            
            this.result = re_str;
            this.isResult = true;
            console.log(str, re_str);
        },
        getCheckList(value){
            const data = this.checkList.indexOf(value);
            console.log(data);
            if(data > -1){
                this.removeCheckList(data);
            } else {
                this.setCheckList(value);
            }
        },
        reset(){
            this.clearCheckList();
        },
        allCheck(){
            this.allCheckList(this.fileList);
        },
        download(){
            console.log(this.list);
        },
        checkOn(value){
            const check = this.checkList.filter( (v) => { return v === value});
            return check.length > 0 ? 'on' : '';
        }
    }
}
</script>

<style>
.class-wrap {
    width: 1200px;
    margin: 0 auto;
}
.class-wrap ul {
    display: flex;
}

.class-wrap ul li {
    margin-right: 10px;
}

.class-wrap ul li a {
    padding: 10px;
    display: block;
    border: 1px solid #000;
}
.class-wrap ul li a.on {
    border: 1px solid red;
    color: red;
}
</style>