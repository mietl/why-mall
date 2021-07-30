export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) { clearTimeout(timer) };
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}

export function formatDate(date,fmt){
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,date.getFullYear().toString().substr(4-RegExp.$1.length))
  }

  let o = {
    "M+":date.getMonth() +1,
    "d+":date.getDate(),
    "h+":date.getHours() - 12 ,
    "H+":date.getHours(),
    "m+":date.getMinutes(),
    "s+":date.getSeconds()
  }

  for (const k in o) {
    let item = o[k].toString()

    if(new RegExp(`(${k})`).test(fmt)) {
      let str = RegExp.$1.length ===1 ? item : padLeftZero(item)
      fmt = fmt.replace(RegExp.$1,str);
    }
  }

  return fmt
}

function padLeftZero(str){
  return ('00' + str).substr(str.length)
}

