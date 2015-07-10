/*task0002 的2.1*/
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return(arr instanceof Array);
  //return(arr.constructor == Array);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
  return typeof fn == 'function';//不考虑兼容性
  //return Object.prototype.toString.call(fn) === "[object Function]";//考虑兼容性 此方法有问题
}

/*var a = new Array('1','2','3');
var b = function(){alert('我是函数');}
var c = 'tyq';
var d = 4;

document.write(isArray(a));
document.write(isFunction(b));*/

// 资料：http://sentsin.com/web/21.html
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
  var str,newobj = src.constructor === Array ? [] : {};
  if(typeof src !== 'object') {
    return;
  } else if(window.JSON) {
    str = JSON.stringify(src), //系统化对象
    newobj = JSON.parse(str); //还原
  } else {
    for(var i in src) {
      newobj[i] = typeof src[i] ==='object' ?
      cloneObject(src[i]) : src[i];
    }
  }
  return newobj;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

//资料：http://www.jb51.net/article/46154.htm
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
  var res = [];
  var json = {};
  for(var i = 0;i < arr.length;i++) {
    if(!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
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
  return str.replace(/(^\s*)|(\s*$)/g,'');
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
  var i;
  for( i in arr) {
    fn(arr[i], i);
  }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
  return obj.size();

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
  return emailStr.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
}

// 判断是否为手机号
function isMobilePhone(phone) {
  return phone.match(/^1(35|36|37|56|82|89)\d{8}$/);
}

/*task0002 的3.1*/

function hasClass(element, cName){ 
  return !!elements.className.match(new RegExp("(\s+|^)" + cName + "(\s+|$)"));
  //return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); //网上的代码 ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
}; 

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
  if(!hasClass(element, newClassName)) {
    element.className = element.className + newClassName;
  }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
  if(hasClass(element, oldClassName)) {
    element.className = element.className.replace(new RegExp("(\s+|^)" + oldClassName +"(\s+|$)"), "");
  }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
  return element.parentNode == siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
}
// your implement