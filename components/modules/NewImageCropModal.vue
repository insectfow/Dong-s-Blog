<template>
  <transition name="modal">
        <div class="modal-wrap">
            <div class="modal-box">
                <h5>이미지 업로드</h5>
                <div class="close-button">
                    <a href="#" @click.prevent="close">X</a>
                </div>
                <div class="content">
                <section class="cropper-area">
                    <div class="img-cropper" style="width: 400px; height:400px;">
                        <vue-cropper
                            v-if="imgSrc && ratio"
                            ref="cropper"
                            :guides="true"
                            :src="imgSrc"
                            preview=".preview"
                            :aspect-ratio="ratio"
                            :dragMode="'move'"
                            :autoCropArea="0"
                        />
                            
                        <!-- :img-style="{ 'width': '400px', 'height': '400px' }" :toggleDragModeOnDblclick="false" :cropBoxResizable="false"  :cropBoxMovable="false" :autoCropArea="1" :scalable="false" -->
                        <a class="no-image"  @click.prevent="showFileChooser" v-else>이미지 업로드 해주세요</a>
                    </div>
                </section>
              
                <section class="preview-area">
                    <div class="preview-box" v-if="imgSrc">
                        <p>Preview</p>
                        <div class="preview" />
                    </div>
                    <div class="cropped-box" v-if="cropImg">
                        <p>Cropped Image</p>
                        <div class="cropped-image">
                            <img
                                :src="cropImg"
                                alt="Cropped Image"
                            />
                        </div>
                    </div>
                </section>

                <section class="action-area">
                    <div class="actions">
                    <input type="color" v-model="color">
                    <a
                        :href="false"
                        role="button"
                        @click.prevent="showFileChooser"
                    >
                        Upload Image
                    </a>
                    <a v-if="cropImg" role="button" :href="cropImg" download>download</a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="zoom(0.2)"
                    >
                        Zoom In
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="zoom(-0.2)"
                    >
                        Zoom Out
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="move(-10, 0)"
                    >
                        Move Left
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="move(10, 0)"
                    >
                        Move Right
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="move(0, -10)"
                    >
                        Move Up
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="move(0, 10)"
                    >
                        Move Down
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="rotate(90)"
                    >
                        Rotate +90deg
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="rotate(-90)"
                    >
                        Rotate -90deg
                    </a>
                    <a
                        ref="flipX"
                        href="#"
                        role="button"
                        @click.prevent="flipX"
                    >
                        Flip X
                    </a>
                    <a
                        ref="flipY"
                        href="#"
                        role="button"
                        @click.prevent="flipY"
                    >
                        Flip Y
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="cropImage"
                    >
                        Crop
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="reset"
                    >
                        Reset
                    </a>
                    <a
                        v-if="cropImg"
                        href="#"
                        role="button"
                        @click.prevent="save"
                    >
                        save
                    </a>
                    </div>
                </section>
                </div>
            </div>
        </div>
  </transition>
</template>

<script>
import '../../assets/css/cropper.css';
export default {
    props: ['imgSrc', 'width', 'height', 'fileName'],
    data(){
        return {
            // 기본 백그라운드 컬러
            color: '#000000',

            // 크롭시 이미지데이터
            cropImg: null,
            // 크롭 저장 파일데이터
            cropFile: null,
            // 크롭 저장 파일URL데이터
            cropImageUrl: null
        }
    },
    computed: {
        // 크롭 비율
        ratio(){
            return this.width / this.height;
        }
    },
    methods: {
        close(){
            console.log('닫기');
            this.cropImg = null;
            this.cropFile = null,
            this.cropImageUrl = null;
            this.$emit('reset');
            this.$emit('close');
        },
        cropImage() {
            console.log('crop 버튼 클릭');
            // get image data for post processing, e.g. upload or setting image src
            this.cropImg = this.$refs.cropper.getCroppedCanvas({
                width: this.width,
                height: this.height,
                fillColor: this.color,
                imageSmoothingQuality: 'high'
            }).toDataURL();

            this.cropFile = this.dataURLToBlob(this.cropImg, this.fileName);
            this.cropImageUrl = URL.createObjectURL(this.cropFile);
            console.log('crop 데이터 만들기', this.cropFile, this.cropImageUrl);
        },
        flipX() {
            console.log('flipX 클릭');
            const dom = this.$refs.flipX;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleX(scale);
            dom.setAttribute('data-scale', scale);
        },
        flipY() {
            console.log('flipY 클릭');
            const dom = this.$refs.flipY;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleY(scale);
            dom.setAttribute('data-scale', scale);
        },
        move(offsetX, offsetY) {
            console.log('move 클릭');
            this.$refs.cropper.move(offsetX, offsetY);
        },
        reset() {
            console.log('reset 클릭');
            this.$refs.cropper.reset();
        },
        rotate(deg) {
            console.log('rotate 클릭');
            this.$refs.cropper.rotate(deg);
        },
        showFileChooser() {
            console.log('이미지 업로드 변경 클릭');
            this.cropImg = null;
            this.cropFile = null,
            this.cropImageUrl = null;
            this.$emit('reset');
            this.$emit('setImage');
        },
        zoom(percent) {
            console.log('zoom 클릭');
            this.$refs.cropper.relativeZoom(percent);
        },
        save(){
            console.log('save 클릭');
            let file = [{
                file: this.cropFile,
                imgUrl: this.cropImageUrl
            }]
            this.$emit('saveImage', file);
            this.close();
        },
        dataURLToBlob(dataURL, name){
            console.log('dataURLToBlob 클릭');
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
            return new File([blob], name, { type: contentType });
        }
  },
}
</script>

<style>
.no-image {
    cursor: pointer;
}
</style>