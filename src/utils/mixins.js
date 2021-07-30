import { debounce } from "./index";

export const BScrollRefreshMixin ={
  data(){
    return {
      handleImageLoad:null,
      refresh:null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    
    this.handleImageLoad = () => {
      this.refresh();
    }

    this.$bus.$on("itemImageLoad",this.handleImageLoad);
  }
}


import BackTop from "components/main/backTop/BackTop";
export const backTopMixin = {
  data(){
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    backTopControl(pos){
      this.isShowBackTop = -pos.y > 1000;
    }
  },
  components: {
    BackTop,
  }
}


import { TYPES } from 'constants';

export const tabControlMixin = {
  data(){
    return {
    }
  },
  methods:{
    switchType(index){
      this.currentType = TYPES[index];
    }
  }
}