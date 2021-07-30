<template>
  <div>
    <swiper :v-if="banners.length">
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" :alt="item.link" :title="item.title" @load="imageLoad" />
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
  data(){
    return {
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('homeImageLoad');
        this.isLoad = true;
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
  
}
</script>
