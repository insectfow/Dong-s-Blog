<template>
  <div class="cropper-wrap-t">
    <div class="header">
      <h2>Cropper.js!</h2>
    </div>
    <hr />

    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
      hidden
    />
    <button @click="ratio = 450 / 508; isModal = true">메인 이미지</button>
    <button  @click="ratio = 360 / 670; isModal = true">세로 이미지</button>
    <button @click="ratio = 140 / 140; isModal = true">브랜드 로고 이미지</button>
    <button @click="ratio = 500 / 500; isModal = true">대표 이미지</button>
    <lazy-modules-new-image-crop-modal :ratio="ratio" ref="cropModal" @setImage="imageupload" v-if="isModal" @close="isModal = false" />
    
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
      ratio: 1 / 1
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
.cropper-wrap-t {
  height: 100vh;
}
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
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
}

</style>