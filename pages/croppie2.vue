<template>
  <div class="croppie-wrap">
      <div class="upload">
            <!-- upload -->
            <div class="upload-input">
                <!-- <input type="file" @change="croppie" ref="upload" hidden accept="image/*"/> -->
                <button class="upload-button" @click="onClickImageUpload">이미지 업로드</button>
                <!-- <input type="number" v-model="numbers" min="0" max="14" > -->
                <input type="file" @change="croppie($event)" ref="upload" hidden accept="image/*"/>
            </div> 
            <!--// upload -->

            <!-- the result -->
            <div class="image-wrap" v-if="images">
                <!-- <div class="image-box main flex" @mouseover="imageHover = true" @mouseleave="imageHover = false">
                    <div class="image-area" :style="`backgroundImage: url('${images.imageUrl}'); backgroundColor: ${color};`"></div>
                    <div class="image-hover" v-show="imageHover">
                        <a class="hover-button"  :href="images.imageUrl" :download="images.name">다운로드</a>
                        <a class="hover-button" href="#"  @click.prevent="delelte">제거하기</a>
                    </div>
                </div>
                <div class="image-box detail flex" @mouseover="imageHover2 = true" @mouseleave="imageHover2 = false">
                    <div class="image-area" :style="`backgroundImage: url('${images.imageUrl}'); backgroundColor: ${color};`"></div>
                    <div class="image-hover" v-show="imageHover2">
                        <a class="hover-button"  :href="images.imageUrl" :download="images.name">다운로드</a>
                        <a class="hover-button" href="#"  @click.prevent="delelte">제거하기</a>
                    </div>
                </div> -->
                <div class="image-box card flex" @mouseover="imageHover3 = true" @mouseleave="imageHover3 = false">
                    <!-- <div class="image-area" :style="`backgroundImage: url('${images.imageUrl}');`"></div> -->
                    <div class="image-area" :style="`backgroundImage: url('${images.imageUrl}'); backgroundColor: ${color};`"></div>
                    <!-- <div class="image-hover" v-show="imageHover3">
                        <a class="hover-button"  :href="images.imageUrl" :download="images.name">다운로드</a>
                        <a class="hover-button" href="#"  @click.prevent="delelte">제거하기</a>
                    </div> -->
                </div>
                <!-- <div class="image-box campaign-card flex" @mouseover="imageHover4 = true" @mouseleave="imageHover4 = false">
                    <div class="image-area" :style="`backgroundImage: url('${images.imageUrl}'); backgroundColor: ${color};`"></div>
                    <div class="image-hover" v-show="imageHover4">
                        <a class="hover-button"  :href="images.imageUrl" :download="images.name">다운로드</a>
                        <a class="hover-button" href="#"  @click.prevent="delelte">제거하기</a>
                    </div>
                </div>
                <div class="image-box campaign flex" @mouseover="imageHover5 = true" @mouseleave="imageHover5 = false">
                    <div class="image-area" :style="`backgroundImage: url('${images.imageUrl}'); backgroundColor: ${color};`"></div>
                    <div class="image-hover" v-show="imageHover5">
                        <a class="hover-button"  :href="images.imageUrl" :download="images.name">다운로드</a>
                        <a class="hover-button" href="#"  @click.prevent="delelte">제거하기</a>
                    </div>
                </div> -->
            </div>
                <div class="image-wrap" v-else>이미지 업로드 해주세요</div>
            
            <!--// the result -->
            </div>
            <!-- popup -->
            <div class="alert" v-if="alert" @click.prevent="alert = false">
                <p v-html="alertText"></p>
            </div>
            
            <!--// popup -->
            <lazy-modules-image-crop-modal v-if="isModal" ref="child" @close="close">
                <div class="color-picker">
                    <label for="colorPicker">배경 색 채우기</label>
                    <input id="colorPicker" type="color" v-model="color">
                </div>
                <div class="modal-crop-wrap">
                    <button @click="crop" class="crop-button">저장하기</button>
                    <div></div>
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
            imageHover: false,
            imageHover2: false,
            imageHover3: false,
            imageHover4: false, 
            imageHover5: false,
            color: null, 
        }
    },
    methods: {
        close(){
            this.isModal = false;
        },
        alertCallback(v1, v2){
            this.alert = v2;
            this.alertText = v1;
        },
        delelte(){
            this.images = null;
            this.imageHover = false;
            this.imageHover2 = false;
            this.imageHover3 = false;
            this.imageHover4 = false;
            this.imageHover5 = false;
        },
        showModal(Boolean){
            this.isModal = Boolean;
        },
        onClickImageUpload(){
            this.$refs.upload.click();
        },
        croppie (e) {
            let fileForm = /(jpg|jpeg|png|bmp)$/;
            let files = e.target.files || e.dataTransfer.files;
            let fileName = e.target.files[0].name;

            

            // reset
            this.images = null;
            this.color = null;

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
                image.onload = imageEvent => {
                    var w = image.width;
                    var h = image.height;
                    console.log(w,h);
                    if(w < this.$store.state.fileForm[this.numbers].width || h < this.$store.state.fileForm[this.numbers].height) {
                        this.images = null;
                        this.croppieAlart(2, this.numbers, this.alertCallback);
                        this.showModal(false);
                        return;
                    } else {
                        let canvas = document.createElement('canvas');
                        let canvasContext = canvas.getContext("2d");

                        canvas.width = image.width;
                        canvas.height = image.height;

                        console.log(canvas.width, canvas.height, 'canvas');

                        canvasContext.fillStyle = '#ffffff';
                        canvasContext.drawImage(image, 0, 0, canvas.width , canvas.height );
                        let dataURI = canvas.toDataURL("image/jpeg");
                        
                        console.log(dataURI, 'canvas');

                        this.showModal(true);
                        this.fileName = fileName;

                        this.images = this.dataURLToBlob(dataURI, this.fileName);
                        this.images.imageUrl = URL.createObjectURL(this.images);

                        console.log(this.images);
                    }
                }
            };
            reader.readAsDataURL(files[0]);
            e.target.value = '';
        },
        crop(){
            if(this.color == null){
                this.croppieAlart(3, this.numbers, this.alertCallback);
                return;
            }
            // this.images = this.dataURLToBlob(output, this.fileName);
            // this.images.imageUrl = URL.createObjectURL(this.images);
            // let options = {
            //     type: 'base64',
            //     // size: 'original',
            //     size: 'viewport',
            //     // size: { width: this.$store.state.fileForm[this.numbers].width, height: this.$store.state.fileForm[this.numbers].height },
            //     // size: { width: this.$store.state.fileForm[this.numbers].width, height: this.$store.state.fileForm[this.numbers].height },
            //     format: 'jpeg',
            // };
            // this.$refs.croppieRef.result(options, output => {
            //     this.images = this.dataURLToBlob(output, this.fileName);
            //     this.images.imageUrl = URL.createObjectURL(this.images);
            // });     
            this.showModal(false); 
        },
    }
}
</script>
<style lang="scss" scoped>
.croppie-wrap {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-color: #fff;
}
.upload {
    display: flex;
    flex-wrap: wrap;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
}
.flex img {
    display: inline-block;
    width: 100%;
}
h4 {
    margin-bottom: 20px !important;
}
.upload-input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #000;
    margin-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.upload-input input {
    margin-left: 20px;
    border: none;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    border-radius: 10px;
    padding: 3px 7px;
    text-align: center;
}

.image-wrap {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}
.image-box {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin-right: 10px;
    overflow: hidden;

}

.image-box.main {
    width: 450px;
    height: 507px;
    /* height: 508px; */
    
}
.image-box.detail {
    width: 450px;
    height: 240px;
}
.image-box.card {
    width: 360px;
    height: calc( 1.58 * 360px);
    border-radius: 29px;
}
.image-box.campaign {
    width: 80px;
    height: 80px;
    border-radius: 4px;
}
.image-box.campaign-card {
    width: 410px;
    height: 240px;
    border-radius: 10px;

}
.image-box.campaign .image-area {
    background-size: cover;
    
}
.image-box.campaign-card .image-area {

}
.image-area {
    width: 100%;
    height: 100%;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;       
}
.image-hover {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8);
    display: flex;
    justify-content: center;
    align-items: center;
}


.upload-button {
    margin: 0 !important;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
}
.info-wrap {
    display: none;
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
.hover-button {
    border: 2px solid #000;
    display: inline-block;
    padding: 5px 10px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 5px;
    background: #fff;
}
.upload-button {
    margin-bottom: 30px;
}
.alert {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.3);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    cursor: pointer;
    z-index: 11;
}
.alert > p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 40px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
}
@media screen and (max-width: 450px) {
    .image-box {
        margin-right: 0;
        margin-bottom: 20px;
    }

    .image-box.main {
        width: 100%;
        height: 507px;
        
    }
    .image-box.detail {
        width: 100%;
        height: 240px;
    }
    .image-box.card {
        width: 75vw;
        height: calc( 1.58 * 75vw);
    }
    .image-box.campaign {
        width: 80px;
        height: 80px;
        border-radius: 4px;

    }
    .image-box.campaign-card {
        width: 100%;
        height: 240px;
        border-radius: 10px;
    }
    .image-box.campaign .image-area {
        background-size: cover;
        border-radius: 4px;
    }
}
</style>