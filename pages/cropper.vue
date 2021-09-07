<template>
  <div class="cropper-wrap-t">
    <div class="header">
      <h2>Cropper.js!</h2>
    </div>
    <hr />
    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
      hidden
    />
    <input
      ref="fileupload"
      type="file"
      name="image"
      accept="image/*"
      @change="imageGo"
      >
    <button @click="width = 450; height = 508; isModal = true">메인 이미지</button>
    <button  @click="width =  360; height = 670; isModal = true">세로 이미지</button>
    <button @click="width =  140; height =140; isModal = true">브랜드 로고 이미지</button>
    <button @click="width =  500; height = 500; isModal = true">대표 이미지</button>
    <lazy-modules-new-image-crop-modal :width="width" :height="height" :fileName="fileName" @reset="reset" @save="getCropImage" :imgSrc="imgSrc" ref="cropModal" @setImage="imageupload" v-if="isModal" @close="isModal = false" />
    
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      isModal: false,
      width: 500,
      height: 500,
      imgSrc: null,
      fileName: null
    };
  },
  computed:{
  },
  methods: {
    imageupload(){
      // this.$refs.input.click();
      this.$refs.fileupload.click();
    },
    setImage(e){
      this.isModal = true;
      this.$refs.cropModal.setImage(e);
    },
    imageGo(e){
      // 파일 최대 사이즈
      let maxSize = 1024 * 1024 * 5;

      // 허용된 파일 형식
      let fileForm = /(jpg|jpeg|png|bmp)$/;

      // 업로드 한 이미지 데이터
      let file = e.target.files[0];

      // 업로드 취소
      if(!file){
        this.imgSrc = null;
        this.$refs.fileupload.value = null;
        return alert('업로드를 취소 하셨습니다.')
      };

      console.log('파일 데이터 있음', file);

      // 파일 사이즈 유효성 검사
      if (file.size > maxSize) {
          console.log('파일 사이즈 :', file.size, ' 최대사이즈 :', maxSize);
          this.imgSrc = null;
          this.$refs.fileupload.value = null;
          return alert('최대 업로드 사이즈는 5MB입니다.');
      }

      console.log('파일 사이즈 통과', file.size);

      // 파일 유형 유효성 검사
      if (!file.type.match(fileForm)) {
          console.log('파일 형식 :', file.type, ' 가능한 파일 형식 :', fileForm);
          this.imgSrc = null;
          this.$refs.fileupload.value = null;
          return alert('가능한 파일 형식은 jpg,png,bmp 입니다.');
      } 

      console.log('파일 유형 체크 :', file.type);


      // 업로드 이미지 사이즈 체크
      this.fileWh(file);

    },
    // 업로드 이미지 사이즈 체크 로직
    fileWh(file){
      let fileName = file.name;
      let reader = new FileReader();
      let width = this.width;
      let height = this.height;
      reader.readAsDataURL(file);
       reader.onload = evt => {
        let img = new Image();
          img.onload = () => {
            console.log(img.width, img.height, width, height);
            if(img.width < width || img.height < height){
              this.$refs.fileupload.value = null;
              this.imgSrc = null;
              this.isModal = false;
              console.log('최소 이미지 크기보다 작은 이미지입니다.'); 
              return alert('최소 이미지 크기보다 작은 이미지입니다.');
            } 
            console.log('업로드 이미지 사이즈 체크 성공'); 
            console.log('리사이징 팝업 보여주기');
            this.isModal = true;
          }
        img.src = evt.target.result;

        setTimeout(() => {
          // 리사이징 팝업 data push
          this.fileName = fileName;
          this.imgSrc = img.src;
          // 리사이징 팝업 띄우기
        }, 1000);
      }
      
     
      reader.onerror = evt => {
        console.error(evt);
      }
    },
    reset(){
      this.imgSrc = null;
      this.$refs.fileupload.value = null;
    },
    getCropImage(file){
      console.log(file);
    }
  },
  
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.cropper-wrap-t {
  height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
button {
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
}

</style>