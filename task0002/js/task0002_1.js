/*练习1 字符串操作*/
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
}
function getHobby(){
  var value = (document.getElementsByTagName('textarea')[0]).value;
  var values = value.trim().split(/\s|\n|,|、|;/);
  var hobbys = [];
  var json ={};
  for(var i in values) {
    if((values[i] = values[i].trim()) != '' && !json[values[i]]) {
      hobbys.push(values[i]);
      json[values[i]] = 1;
    }
  }
  
  if(hobbys.length <= 0 || hobbys.length > 10) {
    (document.getElementsByTagName('p')[0]).innerHTML = '请填写0到10个兴趣爱好';
  }else {
    var result = '';
    for(var i in hobbys) {
      result = result + '<input type="checkbox" checked="checked">' + hobbys[i];
    }
  }
  (document.getElementsByTagName('div')[0]).innerHTML = result;
}
/*练习2 倒计时*/
var okbtn = document.getElementById('okbtn');
var textp = document.getElementById('textp');
var timer;
okbtn.onclick = function() {
  //停止之前的setInterval
  if(timer) {
    clearInterval(timer);
  }
  var time = document.getElementById('time');
  var timevalue = time.value;
  //通过正则表达式确认输入格式是否正确
  var patt = /^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/;
  if(patt.test(timevalue) == false) {
    //如果不正确
    textp.innerHTML = '输入格式不满足YYYY-MM-DD';
    return false;
  }else {
    textp.innerHTML = '这里显示倒计时';
  }
  //获取输入的年月日
  var timearray = timevalue.split('-');
  timer = setInterval(function() {
    showLeftTime(timearray[0], timearray[1], timearray[2]);
  }, 1000);
}
function showLeftTime(year, month, date) {
  //得出剩余时间
  var now = new Date();
  var endDate = new Date(year, month-1, date);
  var leftTime = endDate.getTime() - now.getTime();
  var leftSecond = parseInt(leftTime / 1000);
  //Math.floor(x) 函数返回小于或等于数 "x" 的最大整数。
  var day = Math.floor(leftSecond / (60 * 60 * 24));
  var hour = Math.floor((leftSecond - day * 24 * 60 * 60) / 3600);
  var minute = Math.floor((leftSecond - day * 24 * 60 * 60 - hour * 3600) / 60);
  var second = Math.floor(leftSecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
  //显示剩余时间
  textp.innerHTML = '距离' + year + '年' + month +'月' + date + '日' + '还有' + day + '天' + hour + '小时' + minute + '分' + second + '秒';
}

/*练习3 简单轮播图*/
var arr = new Array();
arr[0] = 'http://echarts.baidu.com/doc/asset/img/slide-01.png';
arr[1] = 'http://echarts.baidu.com/doc/asset/img/slide-02.png';
arr[2] = 'http://echarts.baidu.com/doc/asset/img/slide-03.png';
arr[3] = 'http://echarts.baidu.com/doc/asset/img/slide-04.png';
arr[4] = 'http://echarts.baidu.com/doc/asset/img/slide-05.jpg';
var num = 0;
var idsrc = document.getElementById('img');
idsrc.src = arr[num];
setInterval(function() {
  if(num == arr.length-1) {
    num = 0;
  }else {
    num += 1;
  }
  idsrc.src = arr[num];//通过将src直接转换就能切换
}, 4000);//每隔4秒转换图片

/*练习3 复杂一点的轮播图*/
var imgs = document.getElementsByClassName('item');
var width = imgs[0].offsetWidth;//图片的宽度
var height = imgs[0].offsetHeight;//图片高度
//先将其他图片隐藏
for(var i = 1; i <imgs.length; i++) {
  imgs[i].style.left = (width * i) + 'px';
}
i = null;
function leftMove() {
  //将右边一个往左移动
  for(var i in imgs) {
    var leftone = imgs[i].style.left;
    leftone = Number(leftone.replace('px', ''));
    leftone -= 10;
    imgs[i].style.left = leftone + 'px';
    if(leftone == ('-' + width)) {
      //如果滚到最左边则回到右边再次开始滚动
      imgs[i].style.left = (width * (imgs.length-1)) + 'px';
    }
    if(leftone == 0) {
      clearInterval(int);//暂停滚动
      setTimeout(function() {
        //恢复滚动
        int = setInterval(leftMove, 10);
      }, 3000);
    }
  }
}
//var int = setInterval(leftMove, 10);