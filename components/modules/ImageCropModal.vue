<template>
  <transition name="modal">
        <div class="modal-wrap">
            <div class="modal-box">
                <h5>이미지 업로드</h5>
                <div class="close-button">
                    <a href="#" @click.prevent="close">X</a>
                </div>
                
                
                <slot></slot>
                
            </div>
            
        </div>
  </transition>
</template>

<script>
export default {
    props: {
        number: String
    },
    data(){
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
            numbers: this.number,
        }
    },
    methods: {
        dataPush(data){
            this.$emit('data', data);
        },
        close(){
            this.$emit('close');
        },
        show(Boolean){
            this.$emit('show', Boolean);
        },
        alert(num){
            this.$emit('showAlert', num);
        },
        // croppie (e) {
        //     var fileForm = /(jpg|jpeg|png|bmp)$/;
        //     var files = e.target.files || e.dataTransfer.files;

        //     // reset
        //     this.isCropped = false;
        //     this.croppieImage = '';
        //     this.cropped = null;
        //     this.images = null;

        //     // 업로드 파일 유무
        //     if (!files.length) return;

        //     // 
        //     // 파일사이즈 유효성 검사
        //     if (files[0].size > this.maxSize) {
                
        //         this.alert(0);
        //         this.show(false);
        //         return;
        //     } 

        //     // 파일 유형 유효성 검사
        //     if (!files[0].type.match(fileForm)) {
        //         this.alert(1);
        //         this.show(false);
        //         return;
        //     } 


        //     if (this.images){
        //         this.images = null;
        //     }
            
        //      var reader =  new FileReader();
        //      reader.onload = async (e) => {
        //         const image =  new Image();
        //         image.src = e.target.result;
        //         image.onload = (imageEvent) => {
        //             var w = image.width;
        //             var h = image.height;
        //             console.log(w,h);
        //             if(w < this.$store.state.fileForm[this.numbers].width || h < this.$store.state.fileForm[this.numbers].height) {
        //                 this.isCropped = false;
        //                 this.croppieImage = '';
        //                 this.cropped = null;
        //                 this.images = null;
        //                 this.alert(2);
        //                 this.show(false);
        //                 return;
        //             } else {
        //                 this.show(true);
        //             }
        //         }

                
        //         await this.$refs.croppieRef.bind({
        //             url: e.target.result
        //         });
                
                
        //     };
        //     reader.readAsDataURL(files[0]);
        //     this.isCropped = true;
        // },
        // crop() {
        //     // Options can be updated.
        //     // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
        //     let options = {
        //         type: 'base64',
        //         size: { width: this.$store.state.fileForm[this.numbers].width, height: this.$store.state.fileForm[this.numbers].height },
        //         format: 'jpeg',
        //     };
        //     this.$refs.croppieRef.result(options, output => {
        //     this.cropped = this.croppieImage = output;
        //         this.images = this.dataURLToBlob(output)
        //         this.images.imageUrl = URL.createObjectURL(this.images);
        //         // console.log(this.images);
        //         this.dataPush(this.images);
        //     });      
            
        //     this.close();  
        // },
        // dataURL을 file 객체로 변환 로직.
        // dataURLToBlob(dataURL) {
        //     const BASE64_MARKER = ';base64,';

        //     // base64로 인코딩 되어있지 않을 경우
        //     if (dataURL.indexOf(BASE64_MARKER) === -1) {
        //         const parts = dataURL.split(',');
        //         const contentType = parts[0].split(':')[1];
        //         const raw = parts[1];
        //         return new Blob([raw], {
        //             type: contentType
        //         });
        //     }
        //     // base64로 인코딩 된 이진데이터일 경우
        //     const parts = dataURL.split(BASE64_MARKER);
        //     const contentType = parts[0].split(':')[1];

        //     const raw = window.atob(parts[1]);
        //     // atob()는 Base64를 디코딩하는 메서드
        //     const rawLength = raw.length;
        //     // 부호 없는 1byte 정수 배열을 생성
        //     const uInt8Array = new Uint8Array(rawLength); // 길이만 지정된 배열
        //     let i = 0;
        //     while (i < rawLength) {
        //         uInt8Array[i] = raw.charCodeAt(i);
        //         i++;
        //     }
        //     const blob = new Blob([uInt8Array], {
        //         type: contentType
        //     });
        //     return new File([blob], this.imageFileName(this.$store.state.fileForm[this.numbers]), { type: contentType });
        // },
        // imageFileName(data){
        //     if (!data) return;
        //     const str = data.data;
        //     let re_str;
        //     re_str = str
        //     .replace(/campaignCode/g, this.$store.state.campaignCode)
        //     .replace(/influencerId/g, this.$store.state.influencerId)
        //     .replace(/clientId/g, this.$store.state.clientId)
        //     .replace(/brandIdx/g, this.$store.state.brandIdx)
        //     .replace(/highClassIdx/g, this.$store.state.highClassIdx)
        //     .replace(/contentIdx/g, this.$store.state.contentIdx)
        //     .replace(/issueIdx/g, this.$store.state.issueIdx)
        //     .replace(/middleClassIdx/g, this.$store.state.middleClassIdx);

        //     return re_str + '.jpg';
        // }
    }
}
</script>

<style>
.modal-wrap {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.6);
    width: 100%;
    height: 100%;
    z-index: 10;
}
.modal-box {
    position: relative;
    width: 1033px;
    height: 720px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 10px 10px 20px rgba(0,0,0,.16);
    padding: 25px;
    box-sizing: border-box;
}
.close-button {
    position: absolute;
    right: 25px;
    top: 25px;
}
.modal-crop-wrap {
   
}
.croppie-container {
    width: 600px;
    height: 670px;
    position: absolute;
    right: 90px;
    top: 25px;
}
.croppie-container .cr-slider-wrap {
    width: 245px;
    margin: 0;
    position: absolute;
    left: -290px;
    bottom: 94px;
}
.crop-button {
    position: absolute;
    bottom: 25px;
    left: 67px;
    width: 209px;
    height: 50px;
    border-radius: 6px;
    background: #4B80C2;
    color: #fff;
    font-size: 20px;
    border: none;
    cursor: pointer;
}
.croppie-container .cr-slider-wrap input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  cursor: pointer;
  background: #ADB5BD;
  height: 5px;
}
.croppie-container .cr-slider-wrap input[type=range]::-webkit-slider-thumb {
  box-shadow: 0 1px 4px #ADB5BD;
  width: 28px;
  height: 28px;
  background: #FFFFFF;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -12px;
}
</style>