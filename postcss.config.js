module.exports = {
  plugins: {
    // "postcss-pxtorem": {
    //   // 1rem 设计图中是 1rem是37.5px
    //   // 设计图宽度为37.5*10 = 375
    //   rootValue: 37.5,
    //   propList: ['*']
    // }
    "postcss-px-to-viewport":{
      viewportWidth: 375, // 视口的宽度, 对应设计稿宽度
      viewportHeight: 665,  // 视口的高度, 对应设计稿宽度
      unitPrecision:5, // 指定 px 转化为 视窗单位值的小数位 (很多时候无法整除)
      viewportUnit:'vw', // 指定需要转化成的视口单位, 建议根据vw,
      selectorBlackList:['ignore'], // 指定不需要转化的类包含
      minPixelValue: 1, // 小于 或等于 1px 不进行转化 m
      MediaQuery: false, // 允许在媒体查询中转化 px,
      exclude:[], // 必须是正则,来匹配文件的
    } 
  }


}