<template>
  <div class="croppie-wrap">
      <div class="upload">
            <!-- upload -->
            <div class="upload-input">
                <!-- <input type="file" @change="croppie" ref="upload" hidden accept="image/*"/> -->
                <button class="upload-button" @click="onClickImageUpload">이미지 업로드</button>
                <input type="number" v-model="number" min="0" max="14" >
            </div> 
            <!--// upload -->

            <!-- the result -->
            <div class="wd600 wd601" v-if="images">
                <h4 >크롭한 이미지 미리보기 <a class="download-button"  :href="images.imageUrl" :download="images.name">다운로드</a> <a class="download-button"  @click="delelte">제거하기</a></h4>
                <div class="wd600 flex">
                    <img :src="images.imageUrl">
                </div>
            </div>
            
            <!--// the result -->

            <!-- info -->
            <ul class="info-wrap">
                <li><strong>크롭 사이즈 (가로 X 세로)</strong><br> {{this.$store.state.fileForm[number].width + 'px X ' + this.$store.state.fileForm[number].height + 'px'}}</li>
                <li><strong>this.$store.state.fileForm[number]</strong><br> {{this.$store.state.fileForm[number]}}</li>
                <li><strong>crop file</strong><br><ul v-if="images">
                    <li>name : {{images.name}}</li>
                <li>size : {{images.size}}</li>
                <li>type : {{images.type}}</li>
                <li>url : {{images.imageUrl}}</li></ul></li>
            </ul>
            <!--// info -->
            </div>

            <!-- popup -->
            <div class="alert" v-if="alert" @click.prevent="alert = false">
                <p v-html="alertText"></p>
            </div>
            
            <!--// popup -->
            <lazy-modules-image-crop-modal ref="child" @data="dataPush" @showAlert="showAlert" @show="showModal" v-show="isModal" :number="number" @close="isModal = false">
            </lazy-modules-image-crop-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: null,
            alert: false,
            alertText: '',
            number: '0',
            isModal: false
        }
    },
    methods: {
        delelte(){
            this.images = null;
        },
        dataPush(data){
            console.log(data);
            this.images = data;
        },
        showModal(Boolean){
            this.isModal = Boolean;
        },
        showAlert(num){
            console.log(num);
            this.alertText = '';

            switch (num) {
                case 0:
                    this.alertText = '이미지 사이즈 5MB 이하로 업로드해 주세요';
                    this.alert = true;
                    break;
                case 1:
                    this.alertText = 'png, jpg, bmp 이미지 파일만 업로드 가능해요';
                    this.alert = true;
                    break;
                case 2:
                    this.alertText = `width가 ${this.$store.state.fileForm[this.number].width}px 보다 작거나, height가 ${this.$store.state.fileForm[this.number].height}px 보다 작다.`;
                    this.alert = true;
                    break;
            
                default:
                    break;
            }
            
            
            
        },
        onClickImageUpload(){
            this.$refs.child.$refs.upload.click();
        },
        
    }
}
</script>

<style>
.croppie-wrap {
    width: 1600px;
    margin: 0 auto;
    
}
.upload {
    display: flex;
    flex-wrap: wrap;
}
.wd600 {
    width: 700px;
}
.wd601 {
    width: 700px;
    
    margin-left: 20px;
}
.flex {
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    height: 700px;
}
.flex img {
    box-shadow: 0 0 10px rgba(0, 0,0, .2);
}
h4 {
    margin-bottom: 20px !important;
}
.upload-input {
    width: 100%;
    border-bottom: 1px solid #000;
    margin-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
}


.upload-button {
    margin: 0 !important;
}
.info-wrap {
    position: fixed;
    top: 0;
    right: 0;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    padding: 20px;
    box-sizing: border-box;
    z-index: 10;
    width: 400px;
    box-shadow: 0 0 5px rgba(0,0,0,.2);
}
.info-wrap > li {
    font-size: 12px;
    margin-bottom: 15px;
}
.info-wrap > li > strong {
    display: inline-block;
    margin-bottom: 5px;
}
.download-button {
    border: 2px solid #000;
    display: inline-block;
    padding: 5px 10px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 5px;
}
.upload-button {
    margin-bottom: 30px;
}
</style>