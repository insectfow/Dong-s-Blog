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
                            v-if="imgSrc"
                            ref="cropper"
                            :guides="true"
                            :src="imgSrc"
                            preview=".preview"
                            :aspect-ratio="12 / 15"
                            :cropBoxMovable="false"
                            :cropBoxResizable="false"
                            :toggleDragModeOnDblclick="false"
                            :scalable="false"
                            :autoCropArea="1"
                            :img-style="{ 'width': '400px', 'height': '400px' }"
                        />
                        <a class="no-image" @click.prevent="showFileChooser" v-else>이미지 업로드 해주세요</a>
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
                        <a role="button" :href="cropImg" download>download</a>
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
                            href="#"
                            role="button"
                            @click.prevent="move"
                        >
                            ↑
                        </a>
                        <a
                            href="#"
                            role="button"
                            @click.prevent="move"
                        >
                            ←
                        </a>
                        <a
                            href="#"
                            role="button"
                            
                            @click.prevent="move"
                        >
                            ↓
                        </a>
                        <a
                            href="#"
                            role="button"
                            @click.prevent="move"
                        >
                            →
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
    data(){
        return {
            imgSrc: '',
            cropImg: '',
            data: null,
            number: 0,
            width: 12,
            height: 15,
            color: '#000000'
        }
    },
    methods: {
        close(){
            this.$emit('close');
        },
        cropImage() {
            // get image data for post processing, e.g. upload or setting image src
            this.cropImg = this.$refs.cropper.getCroppedCanvas({
                fillColor: this.color
            }).toDataURL();
        },
        flipX() {
            const dom = this.$refs.flipX;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleX(scale);
            dom.setAttribute('data-scale', scale);
        },
        flipY() {
            const dom = this.$refs.flipY;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleY(scale);
            dom.setAttribute('data-scale', scale);
        },
        getCropBoxData() {
            this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
        },
        getData() {
            this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
        },
        move(e) {
            if(!this.$refs.cropper){
                return false;
            }

            if(!e){
                
            }

            switch (e.keyCode) {
                case 37:
                    this.$refs.cropper.move(-10, 0);
                    break;
                case 38:
                    this.$refs.cropper.move(0, -10);
                    break;
                case 39:
                    this.$refs.cropper.move(10, 0);
                    break;
                case 40:
                    this.$refs.cropper.move(0, 10);
                    break;
            }
        },
        reset() {
            this.$refs.cropper.reset();
        },
        rotate(deg) {
        this.$refs.cropper.rotate(deg);
        },
        setCropBoxData() {
        if (!this.data) return;
        this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
        },
        setData() {
        if (!this.data) return;
        this.$refs.cropper.setData(JSON.parse(this.data));
        },
        setImage(e) {
            const file = e.target.files[0];
            if (file.type.indexOf('image/') === -1) {
                alert('Please select an image file');
                return;
            }

            if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.onload = (event) => {
                this.imgSrc = event.target.result;
                // rebuild cropperjs with the updated source
                this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                
            } else {
                alert('Sorry, FileReader API not supported');
            }
             
        },
        showFileChooser() {
            this.$emit('setImage');
        },
        zoom(percent) {
            this.$refs.cropper.relativeZoom(percent);
        },
  },
  created(){
      window.addEventListener("keydown", this.move);
  },
  beforeDestroy(){
      window.removeEventListener("keydown", this.move);
  }
}
</script>

<style scoped>
</style>