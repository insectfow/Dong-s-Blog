<template>
  <div class="croppie-wrap">
      <div class="upload">
            <div class="upload-input">
                <input type="file" @change="croppie"/>  
            </div>
            <vue-croppie v-if="isCropped" ref="croppieRef" :enableOrientation="true" :enableResize="false" :boundary="{ width: 400, height: 400}" :viewport="{ width:300, height:250, 'type':'square' }">
            </vue-croppie>
            <!-- the result -->
            <img :src="cropped">
            <button @click="crop">Crop</button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isCropped: false,
            croppieImage: '',
            cropped: null
        }
    },
    methods: {
        croppie (e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;

            var reader = new FileReader();
            reader.onload = e => {
                this.$refs.croppieRef.bind({
                    url: e.target.result
                });
            };
            this.isCropped = true;

            reader.readAsDataURL(files[0]);
        },
        crop() {
            // Options can be updated.
            // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
            let options = {
                type: 'base64',
                size: { width: 600, height: 450 },
                format: 'jpeg'
            };
            this.$refs.croppieRef.result(options, output => {
            this.cropped = this.croppieImage = output;
                console.log(this.croppieImage);
            });
        }
    }
}
</script>

<style>
.croppie-wrap {
    width: 1200px;
    margin: 0 auto;
}
</style>