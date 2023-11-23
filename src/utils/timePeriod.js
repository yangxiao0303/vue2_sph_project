export default () =>{
  // 获取当前的小时数
  const hours = new Date().getHours();
  if (hours >= 0 && hours < 10) return '早上好!'
  else if ( hours >= 10 && hours < 14) return '中午好!'
  else if ( hours >= 14 && hours < 18) return '下午好!'
  else return '晚上好!' 
}