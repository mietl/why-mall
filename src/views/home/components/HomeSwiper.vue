<template>
  <div>
    <swiper :v-if="banners">
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" :alt="item.link" :title="item.title" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper,SwiperItem } from 'components/common/swiper';
export default {
  name:"HomeSwiper",
  props:{
    banners:{
      type:Array,
      default:()=>[]
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
  
}
</script>
<style scoped>
</style>