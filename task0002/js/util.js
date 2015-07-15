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
  return str.replace(/(^\s+)|(\s+$)/g,'');
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
  return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
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
    element.className = element.className.replace(new RegExp("(\\s|^)" + oldClassName +"(\s+|$)"), " ");
  }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
  return element.parentNode == siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
  return {x:getLeft(element), y:getTop(element)};
}
//获取元素的纵坐标（相对于窗口）
function getTop(e) {
  var offset = e.offsetTop;
  if(e.offsetParent != null) {
    offset += getTop(e.offsetParent);
  }
  return offset;
}
//获取元素的横坐标（相对于窗口）
function getLeft(e) {
  var offset = e.offsetLeft;
  if(e.offsetParent != null) {
    offset += getLeft(e.offsetParent);
  }
}
// your implement

// 实现一个简单的Query
function $(selector) {

}
//资料：http://www.css88.com/archives/2403
function $findChilds(parentNode, text) {
  //如果不传入父节点的话，默认为body
  if(parentNode == undefined) {
    parentNode = document.body;
  }
  var childNodes = parentNode.childNodes;
  var results = [];
  //子节点大于0才循环
  if(childNodes.length >0){
    var length = childNodes.length;
    //循环查找符合text的节点
    //三种情况，className，id，tagName
    switch(text.substr(0, 1)){
      case '.':
        //parentNode.getElementByClassName是后来加上的，如果浏览器不支持这种方法，那就只能暴力递归了
        if(parentNode.getElementsByClassName) {
          return parentNode.getElementsByClassName(text.substr(1));
        }else {
          //以上方法不支持，直接判断
          for(var i = 0; i < length; i++) {
            if(childNodes[i].className == text.substr(1)) {
              results.push(childNodes[i]);
            }
          }
        }
        break;
      case '#':
        return [document.getElementById(text.substr(1))];
      default:
        return parentNode.getElementsByTagName(text);
    }
    //判断完后，把当前子元素的子元素传入$findChilds进行递归查找，返回的结果直接和现在的结果合并。
    results = results.concat($findChilds(childNodes[i], text));
  }
  return results;
}
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
}
function $(text) {
  //按照空格参数
  var values = text.trim().split(' ');
  var length = values.length;
  //如果只有一个选择参数的话，就直接调用dom方法返回结果。
  if(length == 1) {
    switch(values[0].substr(0,1)) {
      case '#':
        return document.getElementById(values[0].substr(1));
      case '.':
        return document.getElementsByClassName(values[0].substr(1));
      default:
        return document.getElementsByTagName(values[0]);
    }
  }
  //每次迭代都会产生许多符合参数的结果节点，这里结果节点的名称为parentNodes，第一次循环默认为body
  var parentNodes =[document.body];
  for(var i = 0; i < length; i++) {
    var jlength = parentNodes.length;
    var results = [];
    //这里如果values的长度为0的话，就说明是多出来的空格，此时不执行代码直接跳入下一循环
    var tmpValue = values[i].trim();
    if(tmpValue.length <=0) {
      continue;
    }
    //内层循环为迭代每个结果节点，在结果节点中查找符合选择条件的结果，第一次为body
    for(var j = 0; j < jlength; j++) {
      var result = $findChilds(parentNodes[j], values[i].trim());
      var rlength = result.length;
      //因为返回的有时候是HTML容器，无法直接和数组concat所以倒入数组
      for(var k = 0; k < rlength; k++) {
        results.push(result[k]);
      }
    }
    //没有结果，返回undefined
    if(results == undefined || results.length <= 0 ||results[0] == null) {
      return undefined;
    }
    //最后一次循环就直接返回结果数组，但是如果最后一个选择条件是选择id的话，那就不返回数组直接返回dom对象
    if(i == length - 1) {
      if(values[i].substr(0, 1) == "#") {
        return results[0];
      }
      return results;
    }
    parentNodes = results;
  }
}
// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象


// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
  //为每个事件处理函数赋予一个独立的ID
  if(!listener.$$guid) {
    listener.$$guid = addEvent.guid++;
  }
  //为元素建立一个事件类型的散列表
  if(!element.events) {
    element.events = {};
  }
  //为每对元素/事件建立一个事件处理函数的散列表
  var listeners = element.events[event];

  if(!listeners) {
    listeners = element.events[event] = {};
    //存储已有的事件处理函数
    if(element['on' + event]) {
      listeners[0] = element['on' + event];
    }
  }
  //在散列表中存储该事件函数
  listeners[listener.$$guid] = listener;
  //赋予一个全局事件处理函数来处理所有工作
  element['on' + event] = handleEvent;
}
//创建独立ID的计数器
addEvent.guid = 1;

// 例如：
function clicklistener(event) {
    ...
}
addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
  //从散列表中删除事件处理函数
  if(element.events && element.events[event]) {
    delete element.events[event][listener.$$guid];
  }
}
function handleEvent(event) {
  var returnValue = true;
  //获取事件对象（IE使用全局的事件对象）
  event = event || fixEvent(window.event);
  //获取事件处理函数散列表的引用
  var  handlers = this.events[event.type];
  //依次执行每个事件处理函数
  for(var i in handlers) {
    this.$$handlerEvent = handlers[i];
    if(this.$$handlerEvent(event) === false) {
      returnValue = false;
    }
  }
  return returnValue;
}
//增加一些IE事件对象缺乏的方法
function fixEvent(event) {
  event.preventDefault = fixEvent.preventDefault;
  event.stopPropagation = fixEvent.stopPropagation;
  return event;
}
fixEvent.preventDefault = function() {
  this.returnValue = false;
}
fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
  addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定 未成功 
function addEnterEvent(element, listener) {
  addEvent(element , 'keydown', function(){
    var e = event || window.event || arguments.callee.caller.arguments[0]; 
    if(e && e.keyCode==13) {
      listener();
    }
  })
}
var $ = {
  on : function(element, event, listener) {
    addEvent(element, event, listener);
  },
  un : function(element, event, listener) {
    removeEvent(element, event, listener);
  },
  click : function(element, event, listener) {
    addClickEvent(element, event, listener);
  },
  enter : function(element, event, listener) {
    addEnterEvent(element, event, listener);
  }
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
  if(navigator.appName == "Microsoft Internet Exploer") {
    return navigator.appVersion;
  }else {
    return -1;
  }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = cookieName + '=' + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
  if(document.cookie.length > 0) {
    cookieStart = document.cookie.indexOf(cookieName + "=");
    if(cookieStart != -1) {
      cookieStart = cookieStart + cookieName.length + 1;
      cookieEnd = document.cookie.indexOf(";", cookieStart);
      if(cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      return unescape(document.cookie.substring(cookieStart, cookieEnd));
    }
  }
  return "";
}

// 
function ajax(url, options) {
  if(window.XMLHttpRequest) {
    //code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }else {
    //code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.statues == 200) {
      (options['onsuccess'])(xmlhttp.responseText);
    }else if (xmlhttp.readyState == 4 && xmlhttp.statues == 404) {
      (options['onfail'])();
    }
  }
  if(options['type'] == 'POST') {
    xmlhttp.open("POST", url, true);
    xmlhttp.send(options['data']);
  }else if(options['type'] == 'GET') {
    if(options['data']) {
      url = url + '?';
      for(var i in options['data']){
        url = url + i + "=" + options['data'][i] + '&';
      }
      url = substring(0, url.length-2);
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);