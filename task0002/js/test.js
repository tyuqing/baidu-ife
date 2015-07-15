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
//测试用例
function a() {
  alert('tyq');
}
addEvent($("#addbtn"), "click", a);
setTimeout(function(){
  removeEvent($("#addbtn"), "click", a);
}, 6000);