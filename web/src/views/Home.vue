<template>
  <div >
    <swiper :options="swiperOption">
        <swiper-slide>
          <img class="w-100" src="../assets/images/banner1.jpeg" alt>
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/banner2.jpeg" alt>
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/banner3.jpeg" alt>
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right" slot="pagination">
        </div>
    </swiper>
   
  </div>
</template>

<script>


export default {
  name: 'home',
  data(){
    return{
      swiperOption:{
        pagination:{
          el: ".pagination-home"
        }
      }
    };
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
  .pagination-home{
    opacity: 1;
    .swiper-pagination-bullet{
      border-radius: 0.1538rem;//2px
      background: map-get($colors, 'white');
      &.swiper-pagination-bullet-active{
        background: map-get($colors, 'info')
      }
    }
  }
</style>
