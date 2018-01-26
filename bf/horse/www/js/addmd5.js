function strmd5(str){
  var strmd5=md5(str);
  var strmd5arr=strmd5.split("");

  strmd5arr[25]="y";
  strmd5arr[20]="u";
  strmd5arr[14]="n";
  strmd5arr[19]="s";
  strmd5arr[8]="h";
  strmd5arr[21]="u";
  strmd5arr[15]="o";
  strmd5arr[9]="i";
  strmd5arr[20]="t";
  strmd5arr[1]="a";
  var sign=Math.random()*4+4|0;
  var randstr="abcdefghijklmnopqrstuvwxyz0123456789";
  var randstrlen=randstr.length;
  for(var i=0;i<sign;i++){
    var x=Math.random()*randstrlen|0;
    strmd5arr=strmd5arr.concat(randstr.substr(x,1));
  }
  var newstrmd5=strmd5arr.join("");

  return newstrmd5;
}