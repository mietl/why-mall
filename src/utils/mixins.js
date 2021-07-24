import { debounce } from "./index";

export const mixin ={
  data(){
    return {
      itemImagehandler:null,
      refresh:null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    
    this.itemImagehandler = () => {
      this.refresh();
    }

    this.$bus.$on("itemImageLoad",this.itemImagehandler);
  }
}