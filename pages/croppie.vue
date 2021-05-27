<template>
  <div class="croppie-wrap">
      <div class="upload">
            <!-- upload -->
            <div class="upload-input">
                <!-- <input type="file" @change="croppie" ref="upload" hidden accept="image/*"/> -->
                <button class="upload-button" @click="onClickImageUpload">이미지 업로드</button>
                <input type="number" v-model="numbers" min="0" max="14" >
                <input type="file" @change="croppie($event)" ref="upload" hidden accept="image/*"/>
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
                <li><strong>크롭 사이즈 (가로 X 세로)</strong><br> {{this.$store.state.fileForm[this.numbers].width + 'px X ' + this.$store.state.fileForm[this.numbers].height + 'px'}}</li>
                <li><strong>this.$store.state.fileForm[numbers]</strong><br> {{this.$store.state.fileForm[this.numbers]}}</li>
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
            <lazy-modules-image-crop-modal v-if="isModal" ref="child" @close="isModal = false">
                <div class="modal-crop-wrap">
                    <button @click="crop" class="crop-button">저장하기</button>
                    <vue-croppie ref="croppieRef" id="croppieRef" :enableResize="false" :boundary="{ width: 600, height: 670}" :viewport="{ width: this.$store.state.fileForm[numbers].width, height: this.$store.state.fileForm[numbers].height, 'type':'square' }">
                    </vue-croppie>
                </div>
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
            isModal: false,
            isCropped: false,
            maxSize : 1024 * 1024 * 5,
            numbers: 0,
        }
    },
    methods: {
        alertCallback(v1, v2){
            this.alert = v2;
            this.alertText = v1;
        },
        delelte(){
            this.images = null;
        },
        showModal(Boolean){
            this.isModal = Boolean;
        },
        onClickImageUpload(){
            this.$refs.upload.click();
        },
        croppie (e) {
            var fileForm = /(jpg|jpeg|png|bmp)$/;
            var files = e.target.files || e.dataTransfer.files;

            // reset
            this.images = null;

            // 업로드 파일 유무
            if (!files.length) return;

            // 
            // 파일사이즈 유효성 검사
            if (files[0].size > this.maxSize) {
                this.croppieAlart(0, this.numbers, this.alertCallback);
                this.showModal(false);
                return;
            } 

            // 파일 유형 유효성 검사
            if (!files[0].type.match(fileForm)) {
                this.croppieAlart(1, this.numbers, this.alertCallback);
                this.showModal(false);
                return;
            }    
             var reader =  new FileReader();
             reader.onload = (e) => {
                const image =  new Image();
                image.src = e.target.result;
                image.onload = (imageEvent) => {
                    var w = image.width;
                    var h = image.height;
                    console.log(w,h);
                    if(w < this.$store.state.fileForm[this.numbers].width || h < this.$store.state.fileForm[this.numbers].height) {
                        this.images = null;
                        this.croppieAlart(2, this.numbers, this.alertCallback);
                        this.showModal(false);
                        return;
                    } else {
                        this.showModal(true);
                         const time = setTimeout(() => {
                            this.$refs.croppieRef.bind({
                                url: e.target.result
                            });
                            clearTimeout(time);
                        }, 100);
                        
                    }
                }
            };
            reader.readAsDataURL(files[0]);
            e.target.value = '';
        },
        crop(){
            let options = {
                type: 'base64',
                size: { width: this.$store.state.fileForm[this.numbers].width, height: this.$store.state.fileForm[this.numbers].height },
                format: 'jpeg',
            };
            this.$refs.croppieRef.result(options, output => {
                this.images = this.dataURLToBlob(output, this.numbers, this.imageFileName)
                this.images.imageUrl = URL.createObjectURL(this.images);
            });     
            this.showModal(false); 
        }
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