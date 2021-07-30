<template>
  <grid-view class="top-info" :col="3" :gap="1" :xm="0" :ym="0">
    <top-info-view-item :itemInfo="item" v-for="(item, index) in info" :key="index" />
  </grid-view>
</template>

<script>
import GridView from 'components/common/gridview/GridView'
import TopInfoViewItem from './TopInfoViewItem.vue';
export default {
  name: "TopInfoView",
  components:{
    GridView,
    TopInfoViewItem
  },
  props: {
    info:{
      type:[]
    }
  },
};
</script>

<style  scoped></style>