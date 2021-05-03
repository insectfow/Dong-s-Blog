<template>
  <div class="w600">
      <h3>업로드</h3>
      <div>
          <label
                for="fileUpload"
                @click="clickImgIdx = 0"
            >
                <span
                    class="uploadImgBtn"
                ></span>
                <span>사진 업로드</span>
            </label>
            <input
                type="file"
                id="fileUpload"
                @change="
                    uploadImg($event)
                "
                accept="image/*"
            />
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
         uploadImg(e) {
            if (e.target.files[0].size > 1024 * 1024 * 10) {
                this.isCheckCampaignModal = true;
                this.checkText = '사진은 한 장당 10MB 이하로 업로드해 주세요';
                return;
            }

            const files = e.target.files;
            const filesArr = Array.prototype.slice.call(files);
            // 여러장의 이미지를 불러올 경우, 배열화
            console.log(files, filesArr);
         },
         resize_image(image, file) {
            console.log(image);
            let canvas = document.createElement('canvas'),
                max_size = 450;
            // 최대 기준을 1280으로 잡음.
            width = image.width;
            height = image.height;

            if (width > height) {
                // 가로가 길 경우
                if (width > max_size) {
                    height *= max_size / width;
                    width = max_size;
                }
            } else {
                // 세로가 길 경우
                if (height > max_size) {
                    width *= max_size / height;
                    height = max_size;
                }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL(file.type);
            const blobData = this.dataURLToBlob(dataUrl, file);
            return blobData;
            // 미리보기 위해서 마크업 추가.
        },
    }
}
</script>

<style>
    .w600 {
        width: 600px;
        margin: 0 auto;
    }
</style>