<template>
  <div class="croppie-wrap">
      <div class="upload">
            <div class="upload-input">
                <input type="file" @change="croppie" ref="upload" hidden accept="image/*"/>
                <button class="upload-button" @click="onClickImageUpload">이미지 업로드</button>
                <span style="font-size: 14px">크롭 사이즈 : {{width + 'px X ' + height + 'px'}}</span>  
            </div>
            <vue-croppie v-if="isCropped" ref="croppieRef" :enableResize="false" :boundary="{ width: 400, height: 400}" :viewport="{ width: width, height: height, 'type':'square' }">
            </vue-croppie>
            <!-- the result -->
            <img v-if="isCropped" :src="cropped">
            <button v-if="isCropped" @click="crop" class="upload-button">크롭하기</button>
            <a class="download-button" v-if="images" :href="images.imageUrl" download>다운로드</a>
            <ul class="info-wrap">
                <li><strong>crop format type</strong><br> 'jpeg' , 'png', 'webp'만 가능함.</li>
                <li><strong>quality</strong><br> 이미지 품질 조절 (0 ~ 1) </li>
                <li><strong>enableResize</strong><br>뷰포트 영역 크기 조정 활성화 (true, false)</li>
                <li><strong>boundary</strong><br>크롭 박스 영역 크기 조절 ex) :boundary="{ width: 가로사이즈, height: 세로사이즈}"</li>
                <li><strong>viewprot</strong><br>크롭 할 영역 크기 조절, type은 square는 사각형, circle은 원형 ex) :viewport="{ width: 가로사이즈, height: 세로사이즈, 'type':'square' }"</li>
            </ul>
      </div>
      <div class="alert" v-if="alert" @click.prevent="alert = false">
        <p v-html="alertText"></p>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // croppie toggle
            isCropped: false,
            // croppie dataURLToBlob
            croppieImage: '',
            // croppie active
            cropped: null,
            width: 250,
            height: 250,
            maxSize : 1024 * 1024 * 5,
            images: null,
            alert: false,
            alertText: ''
        }
    },
    methods: {
        onClickImageUpload(){
            this.$refs.upload.click();
        },
        croppie (e) {
            var fileForm = /(jpg|jpeg|png|bmp)$/;
            var files = e.target.files || e.dataTransfer.files;

            // reset
            this.isCropped = false;
            this.croppieImage = '';
            this.cropped = null;
            this.images = null;

            // 업로드 파일 유무
            if (!files.length) return;

            // 
            // 파일사이즈 유효성 검사
            if (files[0].size > this.maxSize) {
                this.alert = true;
                this.alertText = '이미지 사이즈 5MB 이하로 업로드해 주세요';
                return;
            } else {
                this.alert = false;
            }

            // 파일 유형 유효성 검사
            if (!files[0].type.match(fileForm)) {
                this.alert = true;
                this.alertText = 'png, jpg, bmp 이미지 파일만 업로드 가능해요';
                return;
            } else {
                this.alert = false;
            }
                
                
            

            if (this.images){
                this.images = null;
            }
            


            var reader = new FileReader();
            reader.onload = e => {
                this.$refs.croppieRef.bind({
                    url: e.target.result
                });
                console.log(files[0]);
               
            };
            

            reader.readAsDataURL(files[0]);
            this.isCropped = true;
        },
        crop() {
            // Options can be updated.
            // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
            let options = {
                type: 'base64',
                size: { width: this.width, height: this.height },
                format: 'jpeg',
            };
            this.$refs.croppieRef.result(options, output => {
            this.cropped = this.croppieImage = output;
                this.images = this.dataURLToBlob(output)
                this.images.imageUrl = URL.createObjectURL(this.images);
            });
            

                      
        },
        // dataURL을 file 객체로 변환 로직.
        dataURLToBlob(dataURL) {
            const BASE64_MARKER = ';base64,';

            // base64로 인코딩 되어있지 않을 경우
            if (dataURL.indexOf(BASE64_MARKER) === -1) {
                const parts = dataURL.split(',');
                const contentType = parts[0].split(':')[1];
                const raw = parts[1];
                return new Blob([raw], {
                    type: contentType
                });
            }
            // base64로 인코딩 된 이진데이터일 경우
            const parts = dataURL.split(BASE64_MARKER);
            const contentType = parts[0].split(':')[1];

            const raw = window.atob(parts[1]);
            // atob()는 Base64를 디코딩하는 메서드
            const rawLength = raw.length;
            // 부호 없는 1byte 정수 배열을 생성
            const uInt8Array = new Uint8Array(rawLength); // 길이만 지정된 배열
            let i = 0;
            while (i < rawLength) {
                uInt8Array[i] = raw.charCodeAt(i);
                i++;
            }
            const blob = new Blob([uInt8Array], {
                type: contentType
            });
            return new File([blob], '21222.jpg', { type: contentType });
        },
    }
}
</script>

<style>
.croppie-wrap {
    width: 1200px;
    margin: 0 auto;
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
</style>