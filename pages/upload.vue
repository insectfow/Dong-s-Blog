<template>
    <div class="w600">
        <h3>이미지 업로드</h3>
        <span>이미지 파일 png, jpg만 가능하고 사이즈 3MB 이하 이미지 파일만 업로드 가능합니다.</span>
        <div class="wrap">
            <div class="upload">
                <input
                type="file"
                id="fileUpload"
                ref="files"
                @change="
                    onChangeImage($event)
                "
                hidden
                accept=".png, .jpg, .jpeg"
                multiple 
            />
            <button class="upload-button" @click="onClickImageUpload">이미지 업로드</button>
            </div>
            <div class="image-box"  v-if="images && images.length !== 0">
                <h4>원본 이미지</h4>
                <div class="img-wrap">
                    <img :src="images[0].imageUrl" :alt="images[0].name">
                </div>
                
                <p v-html="'file_name : ' + images[0].name"></p>
                <p v-html="'size : ' + images[0].size + 'KB'"></p>
                <p v-html="'width : ' + images[0].width + 'px'"></p>
                <p v-html="'height : ' + images[0].height + 'px'"></p>
            </div>
            <div class="image-box"  v-if="images && images.length !== 0">
                <h4>리사이즈 이미지</h4>
                 <div class="img-wrap">
                <img :src="images[0].imageUrl" :alt="images.name">
                 </div>
                <p v-html="'file_name : ' + images[0].file.name"></p>
                <p v-html="'size : ' + images[0].file.size + 'KB'"></p>
                <p v-html="'width : ' + images[0].file.width + 'px'"></p>
                <p v-html="'height : ' + images[0].file.height + 'px'"></p>
            </div>
            <div class="image-box"  v-if="images && images.length !== 0">
                <h4>마켓 홈 이미지</h4>
                <div class="img-wrap market-home"  :style="{backgroundImage: `url(${images[0].imageUrl})`}">
                </div>
                <p>width : 450px</p>
                <p>height : 508px</p>
            </div>
            <div class="image-box"  v-if="images && images.length !== 0">
                <h4>마켓 상세 페이지 카드탭</h4>
                <div class="img-wrap market-product"  :style="{backgroundImage: `url(${images[0].imageUrl})`}">
                </div>
                <p>width : 360px</p>
                <p>height : 670px</p>
            </div>
            <div class="image-box"  v-if="images && images.length !== 0">
                <h4>인플루언서 참고사례 이미지</h4>
                <div class="img-wrap influencer-posting"  :style="{backgroundImage: `url(${images[0].imageUrl})`}">
                </div>
                <p>width : 450px</p>
                <p>height : 300px</p>
            </div>
            <div class="image-box"  v-if="images && images.length !== 0">
                <h4>인플루언서 캠페인페이지  메인이미지</h4>
                <div class="img-wrap influencer-campaign"  :style="{backgroundImage: `url(${images[0].imageUrl})`}">
                </div>
                <p>width : auto</p>
                <p>height : 280px</p>
            </div>
            
        </div>
        <div class="alert" v-if="alert" @click.prevent="alert = false">
            <p v-html="alertText"></p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            images: null,
            alert: false,
            alertText: ''
        }
    },
    methods: {
        // 업로드 클릭 이벤트
        onClickImageUpload(){
            this.$refs.files.click();
        },
        // 이미지 미리보기
        onChangeImage(e){
            const maxSize = 1024 * 1024 * 5;
            const fileForm = /(jpg|jpeg|png|)$/;
            if (e.target.files.length === 0){
                this.alert = true;
                this.alertText = '이미지 업로드 취소 하셨습니다.';
                return
            } else {
                this.alert = false;
            }

            // 파일사이즈 유효성 검사
            if (e.target.files[0].size > maxSize) {
                this.alert = true;
                this.alertText = '이미지 사이즈 3MB 이하로 업로드해 주세요';
                return;
            } else {
                this.alert = false;
            }

            // 파일 유형 유효성 검사
            if (!e.target.files[0].type.match(fileForm)) {
                this.alert = true;
                this.alertText = 'png, jpg 이미지 파일만 업로드 가능해요';
                return;
            } else {
                this.alert = false;
            }

            // 원본 파일
            const files = this.$refs.files.files;
            const filesArr = Array.prototype.slice.call(files);

            console.log('sss', files);
            filesArr.forEach((file, idx2) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const image = new Image();
                    // image.className = 'img-item'; // 스타일 적용을 위해
                    image.src = e.target.result;
                    image.onload = (imageEvent) => {
                        // 이미지가 로드가 되면! 리사이즈 함수가 실행되도록 합니다.
                        var w = image.width;
                        var h = image.height;
                        
                        const blobData = this.resize_image(image, file);
                        filesArr[idx2].width = image.width;
                        filesArr[idx2].height = image.height;
                        filesArr[idx2].file = blobData;
                        filesArr[idx2].imageUrl = URL.createObjectURL(blobData);
                        
                        this.images = filesArr;
                        // console.log('orizin', this.originFile, w, h);
                        // console.log('resize', this.images[idx2].file);
                        // console.log('file', this.images);
                    };
                };
                
                reader.readAsDataURL(file);
                
            });
            
            
            
        },
        resize_image(image, file) {
            const fileType = 'image/jpeg';
            let canvas = document.createElement('canvas'),
                max_size = 450;
            // 최대 기준을 1280으로 잡음.
            let width = image.width;
            let height = image.height;

            if (width > height) {
                // 가로가 길 경우
                if (width > max_size) {
                    // height *= max_size / width;
                    // width = max_size;
                    width *= max_size / height;
                    height = max_size;
                }
            } else {
                // 세로가 길 경우
                if (height > max_size) {
                    // width *= max_size / height;
                    // height = max_size;
                     height *= max_size / width;
                    width = max_size;
                }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL(fileType);
            const blobData = this.dataURLToBlob(dataUrl, file);
            blobData.width = canvas.width;
            blobData.height = canvas.height;
            return blobData;
            // 미리보기 위해서 마크업 추가.
        },
        dataURLToBlob(dataURL, file) {
            const BASE64_MARKER = ';base64,';
            console.log('dataURL', file);

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
    .w600 {
        width: 1800px;
        margin: 0 auto;
        padding: 20px;
    }
    .w600 h3 {
        display: inline-block;
    }
    .w600 > span {
        font-size: 14px;
        display: inline-block;
    }
    .w600 .wrap {
        width: 100%;
       
    }
    .w600 .image-box {
        
        margin-top: 20px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        padding: 20px;
        margin-right: 20px;
        display: inline-block;
    }
    .w600 .img-wrap.market-home {
        width: 450px;
        height: 508px;
        /* overflow: hidden; */
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .w600 .img-wrap.market-product {
        width: 360px;
        height: 670px;
        overflow: hidden;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .w600 .img-wrap.influencer-posting {
        width: 450px;
        height: 300px;
        overflow: hidden;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .w600 .img-wrap.influencer-campaign {
        width: auto;
        height: 200px;
        overflow: hidden;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .w600 .image-box h4 {
        margin-bottom: 20px;
    }
    .w600 .image-box:last-child {
        margin-right: 0;
    }
    .w600 .upload {
        width: 100%;
        
    }
    .w600 div img {
        width: 100%;
        display: inline-block;

    }
    .upload-button {
        margin-top: 10px;
        padding: 5px 20px;
        background: #fff;
        border-radius: 5px;
        cursor: pointer;
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
</style>