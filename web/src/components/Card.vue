<template>
    <div class="card bg-white p-3 mt-3"> 
      <div class="card-header d-flex ai-center pb-3"> 
        <i class="el-icon-news"></i>
        <div class="fs-xxl flex-1 px-2">
          {{title}}
        </div>
        <i class="el-icon-more"></i>
      </div>
      <div class="card-body pt-3">
          <!-- //nav in Home.vue m-card -->
          <slot>
          </slot>
      </div>
    </div>
</template>

<script>
export default {
    props:{
    title:{type:String, required: true},
  },
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.card{
    .card-header{
        border-bottom: 1px solid $border-color;
    }
    border-bottom: 1px solid $border-color;
}
</style>
