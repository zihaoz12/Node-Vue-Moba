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
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3  text-center pt-3 text-grey-1">
      <div class="d-flex flex-wrap"> 
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">
            News
          </div> 
        </div>
      </div>
      <div class="bg-light py-2 fs-sm"> 
        <i class="sprite sprite-arrow mr-1"></i>
        <span>See less</span>
      </div>
    </div>
  <!-- end of nav icons -->

   
    <m-list-card title="News" :categories="NewsDatas">
      <template #items="{category}">
        <div class="py-2 fd-lg d-flex" v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark">{{news.title}}</span>
          <span>{{news.createdAt}}</span>
        </div>
      </template>
      
    </m-list-card>

    <m-card title="Hero List">
    </m-card>

    <m-card title="Video">
    </m-card>

    <m-card title="Image">
    </m-card>

    


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
      },
      NewsDatas:[
        
      ]
    };
  },
  methods:{
    async fetchNewsData(){
      const res = await this.$http.get('news/list');
      this.NewsDatas = res.data
      window.console.log('result:',this.NewsDatas);
  
    }
  },
  created(){
    this.fetchNewsData()
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

  .nav-icons{
    border-top: 1px solid $border-color;
    .nav-item{
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n){
        border-right: none
      }
    }
  }
</style>
