function simpleTrim(str) {
  var whitespace = new String(" \n\r\t");
  var i = 0,j = 1;
  var len = str.length;
  while(whitespace.indexOf(str.charAt(i))!=-1){
    i++;
  }
  while(whitespace.indexOf(str.charAt(len-j))!=-1){
    j++;
  }
  return str.substring(i,len-j+1);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
  return str.replace("/(^[ \s\n\t]*)|(\s*$)/g",'');
}


// 使用示例
var str = ' hi!  ';
str = trim(str);
console.log(str); // 'hi!'