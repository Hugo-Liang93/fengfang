<template>
   <vx-card title="资讯轮播" class="swiper-container">
     <swiper :options="swiperOption" class="swiper-wrapper">
         <swiper-slide class="swiper-slide" v-for="(attachPicName,index) in attachPic" :key="index" >
           <img alternating="true" :key="`index${attachPicName}`" :src="`/images/${attachPicName}`" />
         </swiper-slide>
         <div class="swiper-pagination"  slot="pagination"></div>
         <div class="swiper-button-prev" slot="button-prev"></div> 
         <div class="swiper-button-next" slot="button-next"></div> 
       </swiper>
   </vx-card>
</template>

<script>
import 'swiper/dist/css/swiper.css'    //在全局没引入，这里记得要！
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import projectAPI from '../http/requests/api/project/index.js'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      attachPic: [],
      swiperOption: {
        // 所有的参数同 swiper 官方 api 参数一样
        // 
        pagination: {
          el: '.swiper-pagination'
        },
        //设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev'
        },
        //自动轮播
        autoplay: {
          delay: 2000,
          //当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        //开启循环模式
        loop: true,
        centeredSlides : true
      }
    }
  },
  created () {
    projectAPI.getPic().then(response => {
      console.log(response)
      this.attachPic = response.data
    })
  }
}
</script>

<style>
 .swiper-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .swiper-wrapper {
    height: 500px;
  }

  .swiper-slide img {
    max-width: 100%;
  }

  .swiper-slide {
    text-align: center;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>
