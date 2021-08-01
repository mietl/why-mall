import { debounce } from "./index";

export const BScrollRefreshMixin ={
  data(){
    return {
      handleImageLoad:null,
      refresh:null
    }
  },
  mounted () {
    this.scroll = this.$refs.scroll;
    this.refresh = debounce(this.scroll.refresh, 50);
    
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
      this.scroll.scrollTo(0, 0);
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
      currentType:TYPES[0]
    }
  },
  methods:{
    switchType(index){
      this.currentType = TYPES[index];
    }
  }
}