<template>
  <div>
    <div class="header">
      <h2>Cropper.js</h2>
      
    </div>
    <hr />
    <button @click="number = 0">메인 이미지</button>
    <button @click="number = 1">카드 세로 이미지</button>
    <button @click="number = 2">포스팅참고사례 이미지</button>
    <button @click="number = 3">브랜드 대표 이미지</button>
    <button @click="number = 4">브랜드 로고 이미지</button>
    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    />
    <lazy-modules-new-image-crop-modal ref="cropModal" :aspectRatio="fileForm[number].aspectRatio" @setImage="imageupload" v-if="isModal" @close="isModal = false" />
    
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      isModal: false,
      number: 0,
      fileForm : [
        {
            name: '메인 이미지',
            width: 450,
            height: 508,
            aspectRatio: 4 / 4.5
        },
        {
            name: '세로 이미지',
            width: 360,
            height: 670,
            aspectRatio: 3 / 4
        },
        {
            id: 5,
            name: '인플루언서 모집가이드 포스팅 참고사례',
            data: 'campaignCode-g-5',
            width: 450,
            height: 300,
            aspectRatio: 3 / 2
        },
        {
            id: 12,
            name: '광고주 브랜드 대표이미지',
            data: 'clientId-brandIdx-b-0',
            width: 500,
            height: 500,
            aspectRatio: 1 / 1 
        },
        {
            id: 13,
            name: '광고주 브랜드 로고',
            data: 'clientId-brandIdx-b-1',
            width: 140,
            height: 140,
            aspectRatio: 1 / 1 
        },
      ]
    };
  },
  methods: {
    imageupload(){
      this.$refs.input.click();
    },
    setImage(e){
      this.isModal = true;
      this.$refs.cropModal.setImage(e);
    }
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
button {
  border: 1px solid #000;
}

</style>