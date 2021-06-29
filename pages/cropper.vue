<template>
  <div>
    <div class="header">
      <h2>Cropper.js</h2>
    </div>
    <hr />

    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    />
    <lazy-modules-new-image-crop-modal ref="cropModal" @setImage="imageupload" v-show="isModal" @close="isModal = false" />
    
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
      isModal: false
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

</style>