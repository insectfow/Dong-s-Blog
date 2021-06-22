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
    data(){
        return {
        }
    },
    methods: {
        close(){
            this.$emit('close');
        },
    }
}
</script>

<style>
.color-picker {
    margin-top: 50px;
    width: 300px;
}
.color-picker label {
    font-size: 16px;
    width: 100%;
}
.color-picker input {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    background: #fff;
    padding: 2px;
    border-radius: 5px;
    box-sizing: border-box;
}
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