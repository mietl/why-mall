import { request } from "./request"
export function getDetail(iid){
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}

export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

export class Goods{
  constructor({itemInfo,columns},services){
    
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.discountDesc = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.nowPrice = itemInfo.highNowPrice;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;

    this.columns = columns;
    this.services = services;
  }
}