<template>
  <div class="class-wrap">
      <h2>타입에 따른 분류</h2>
      <ul>
          <li v-for="(list, idx) in fileList" :key="idx">
              <a href="#" @click.prevent="imageFileName(list)">
                  {{list.title}}
              </a>
          </li>
      </ul>
      <p v-if="isResult" v-html="result"></p>
  </div>
</template>

<script>
export default {
    data(){
        return {
            campaignCode: 'r-2349234824',
            fileList: [
                {
                    id: 1,
                    name: '인플루언서 모집동의서 메인 사진',
                    data: 'campaignCode-g-0',
                    title: '메인'
                },
                {
                    id: 2,
                    name: '인플루언서 모집동의서 상세1',
                    data: 'campaignCode-g-1',
                    title: '상세1'
                },
                {
                    id: 3,
                    name: '인플루언서 모집동의서 상세2',
                    data: 'campaignCode-g-2',
                    title: '상세2'
                },
                {
                    id: 4,
                    name: '인플루언서 모집동의서 상세3',
                    data: 'campaignCode-g-3',
                    title: '상세3'
                },
                {
                    id: 5,
                    name: '인플루언서 모집동의서 상세4',
                    data: 'campaignCode-g-4',
                    title: '상세4'
                }
            ],
            isResult: false,
            result: ''
        }
    },
    methods: {
        imageFileName(data){
            if (!data) return;
            this.isResult = false;

            var str = data.data;
            var re_str = str.replace(/campaignCode/gi, this.campaignCode);
            
            this.result = re_str;
            this.isResult = true;
            console.log(str, re_str);
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
</style>