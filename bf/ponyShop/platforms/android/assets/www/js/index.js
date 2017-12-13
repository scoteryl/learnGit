var deviceid="";
var deviceLocation={
    //状态码：初始为 0 正常获取为 1 错误为 2
    state:0,
    //经度
    longitude:null,
    //纬度
    latitude:null,
    //错误信息
    errmsg:""
};
//cordova原生插件调用
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);

        // 获取设备编号，存入公共变量备用
        var str=device.uuid;
        deviceid=str;
        //获取设备的地理位置
        var onSuccess=function(position){
            deviceLocation.state=1;
            deviceLocation.longitude=parseFloat(position.coords.longitude)+0.012;
            deviceLocation.latitude=parseFloat(position.coords.latitude)+0.006;
        }

        var onError=function(error){
            deviceLocation.state=2;
            deviceLocation.errmsg='code: '+ error.code+ '\n' +'message: ' + error.message + '\n';
        }


        navigator.geolocation.getCurrentPosition(onSuccess,onError,{enableHighAccuracy: true});
        // navigator.geolocation.getCurrentPosition(onSuccess,onError);
        setInterval(function(){
            navigator.geolocation.getCurrentPosition(onSuccess,onError,{enableHighAccuracy: true});
            // navigator.geolocation.getCurrentPosition(onSuccess,onError);
            // alert(deviceLocation.longitude+"||"+deviceLocation.latitude);
        }.bind(this),2000);



        //回退按键
        var backNum=0;
        var onBackKeyDown=function(){
            //console.log("回退");
            if(backNum){
                //console.log("可以退出了");
                onTouch();
            }else{
                window.location.href="index.html#/main";
                setTimeout(function(){
                    backNum=0;
                }.bind(this),5000);
            }

            //console.log(backNum);
            backNum++;
        }
        document.addEventListener("backbutton", onBackKeyDown, false);
        //退出APP功能插件
        var onTouch = function() { navigator.notification.confirm('你确定要退出吗？', confirmed, '退出',['退出','取消'] );}
        var confirmed = function(buttonIndex) {
            if(buttonIndex == 1) {
                //console.log("navigator.app.exitApp");
                navigator.app.exitApp();
            }
        }
    }
};

app.initialize();






































