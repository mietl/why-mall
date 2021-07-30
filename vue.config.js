const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')


module.exports = {
  configureWebpack:{
    resolve: {
      alias: {
        "assets":"@/assets",
        "api":"@/api",
        "components":"@/components",
        "views":"@/views",
        "utils":"@/utils",
        "constants":"@/constants"
      }
    },
  }

}