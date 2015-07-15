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
