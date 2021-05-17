<template>
  <div class="croppie-wrap">
      <div class="upload">
            <!-- upload -->
            <div class="upload-input">
                <input type="file" @change="croppie" ref="upload" hidden accept="image/*"/>
                <button class="upload-button" @click="onClickImageUpload">이미지 업로드</button>
                <p style="font-size: 14px">크롭 사이즈 : {{this.$store.state.fileForm[numbers].width + 'px X ' + this.$store.state.fileForm[numbers].height + 'px'}}</p>
                <input type="number" v-model="numbers" min="0" max="14"><p style="font-size: 11px">{{this.$store.state.fileForm[numbers]}}</p>  
            </div>
            <!--// upload -->
            <vue-croppie v-if="isCropped" ref="croppieRef" :enableResize="false" :boundary="{ width: 800, height: 800}" :viewport="{ width: this.$store.state.fileForm[numbers].width, height: this.$store.state.fileForm[numbers].height, 'type':'square' }">
            </vue-croppie>

            <!-- the result -->
            <img v-show="isCropped" :src="cropped">
            <ul v-if="images">
                <li>name : {{images.name}}</li>
                <li>size : {{images.size}}</li>
                <li>type : {{images.type}}</li>
                <li>url : {{images.imageUrl}}</li>
            </ul>
            <button v-if="isCropped" @click="crop" class="upload-button">크롭하기</button>
            <a class="download-button" v-if="images" :href="images.imageUrl" download>다운로드</a>
            <!--// the result -->

            <!-- info -->
            <ul class="info-wrap">
                <li><strong>crop format type</strong><br> 'jpeg' , 'png', 'webp'만 가능함.</li>
                <li><strong>quality</strong><br> 이미지 품질 조절 (0 ~ 1) </li>
                <li><strong>enableResize</strong><br>뷰포트 영역 크기 조정 활성화 (true, false)</li>
                <li><strong>boundary</strong><br>크롭 박스 영역 크기 조절 ex) :boundary="{ width: 가로사이즈, height: 세로사이즈}"</li>
                <li><strong>viewprot</strong><br>크롭 할 영역 크기 조절, type은 square는 사각형, circle은 원형 ex) :viewport="{ width: 가로사이즈, height: 세로사이즈, 'type':'square' }"</li>
            </ul>
            <!--// info -->
      </div>
      <!-- popup -->
      <div class="alert" v-if="alert" @click.prevent="alert = false">
        <p v-html="alertText"></p>
      </div>
      <!--// popup -->
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
            alertText: '',
            numbers: 0
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

            
             var reader =  new FileReader();
             reader.onload = async (e) => {
                const image =  new Image();
                image.src = e.target.result;
                image.onload = (imageEvent) => {
                    var w = image.width;
                    var h = image.height;
                    console.log(w,h);
                    if(w < this.$store.state.fileForm[this.numbers].width || h < this.$store.state.fileForm[this.numbers].height) {
                        this.isCropped = false;
                        this.croppieImage = '';
                        this.cropped = null;
                        this.images = null;
                        this.alert = true;
                        this.alertText = `width가 ${this.$store.state.fileForm[this.numbers].width}px 보다 작고, height가 ${this.$store.state.fileForm[this.numbers].height}px 보다 작다.`;
                        return;
                    } 
                }

                
                await this.$refs.croppieRef.bind({
                    url: e.target.result
                });
                
                
            };
            reader.readAsDataURL(files[0]);
            this.isCropped = true;
            
           
            

           
        },
        crop() {
            // Options can be updated.
            // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
            let options = {
                type: 'base64',
                size: { width: this.$store.state.fileForm[this.numbers].width, height: this.$store.state.fileForm[this.numbers].height },
                format: 'jpeg',
            };
            this.$refs.croppieRef.result(options, output => {
            this.cropped = this.croppieImage = output;
                this.images = this.dataURLToBlob(output)
                this.images.imageUrl = URL.createObjectURL(this.images);
                console.log(this.images);
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
            return new File([blob], this.imageFileName(this.$store.state.fileForm[this.numbers]), { type: contentType });
        },
        imageFileName(data){
            if (!data) return;
            const str = data.data;
            let re_str;
            re_str = str
            .replace(/campaignCode/g, this.$store.state.campaignCode)
            .replace(/influencerId/g, this.$store.state.influencerId)
            .replace(/clientId/g, this.$store.state.clientId)
            .replace(/brandIdx/g, this.$store.state.brandIdx)
            .replace(/highClassIdx/g, this.$store.state.highClassIdx)
            .replace(/contentIdx/g, this.$store.state.contentIdx)
            .replace(/issueIdx/g, this.$store.state.issueIdx)
            .replace(/middleClassIdx/g, this.$store.state.middleClassIdx);

            return re_str + '.jpg';
        }
        
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