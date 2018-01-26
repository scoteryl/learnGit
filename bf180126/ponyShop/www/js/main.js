(function(){
  var vHeight=window.innerHeight;
  var vWidth=window.innerWidth;

  //商铺数据
  var ponyShopDate=null;

  //订单列表回退单页
  var orderListTarget="all";

  //angularJS
  var ponyShopApp = angular.module('ponyShop', ['ng', 'ngRoute']);

  //路由页面进行配置
  ponyShopApp.config(function ($routeProvider, $compileProvider) {
    $routeProvider
      //login页面
      .when("/login", {
        templateUrl: 'tpl/login.html',
        controller: 'ponyShopLoginCtrl'
      })
      //注册页面
      .when("/register",{
        templateUrl:"tpl/register.html",
        controller:"ponyShopRegisterCtrl"
      })
      //忘记密码页面
      .when("/restPwd",{
        templateUrl:"tpl/restPwd.html",
        controller:"ponyShopRestPwdCtrl"
      })
      //登陆主页面
      .when("/main",{
        templateUrl:"tpl/main.html",
        controller:"ponyShopMainCtrl"
      })
      //订单详情页面
      .when("/orderDetail/:orderId",{
        templateUrl:"tpl/orderDetail.html",
        controller:"ponyShopOrderDetailCtrl"
      })
      //订单列表详情查看页面
      // .when("/orderListDetail",{
      //   templateUrl:"tpl/orderListDetail.html",
      //   controller:"ponyShopOrderListDetailCtrl"
      // })
      //(轮胎 原厂更换)服务确认页面
      .when("/affirmTireServerOriginal/:orderId",{
        templateUrl:"tpl/affirmTireServerOriginal.html",
        controller:"ponyShopAffirmTireServerOriginalCtrl"
      })
      //(轮胎 免费再换)服务确认页面
      .when("/affirmTireServerFreeChange/:orderId",{
        templateUrl:"tpl/affirmTireServerFreeChange.html",
        controller:"ponyShopAffirmTireServerFreeChangeCtrl"
      })
      //(轮胎 免费修补)服务确认页面
      .when("/affirmTireServerRepair/:orderId",{
        templateUrl:"tpl/affirmTireServerRepair.html",
        controller:"ponyShopAffirmTireServerRepairCtrl"
      })
      //(其他)服务确认页面
      .when("/affirmOtherServer/:orderId",{
        templateUrl:"tpl/affirmOtherServer.html",
        controller:"ponyShopAffirmOtherServerCtrl"
      })
      //轮胎服务记录页面
      .when("/tireServerRecord/:carId",{
        templateUrl:"tpl/tireServerRecord.html",
        controller:"tireServerRecordCtrl"
      })
      //店铺收益列表页面
      .when("/shopEarningsList",{
        templateUrl:"tpl/shopEarningsList.html",
        controller:"ponyShopEarningsListCtrl"
      })
      //我的用户设置页面
      .when("/userSetting",{
        templateUrl:"tpl/userSetting.html",
        controller:"ponyShopUserSettingCtrl"
      })
      //店铺订单列表页面
      .when("/order/:listTarget",{
        templateUrl:"tpl/orderList.html",
        controller:"ponyShopOrderCtrl"
      })
      //我的店铺设置页面
      .when("/userShopSetting",{
        templateUrl:"tpl/userShopSetting.html",
        controller:"ponyShopUserShopSettingCtrl"
      })
      //我的店铺服务设置页面
      .when("/userShopServerSetting",{
        templateUrl:"tpl/userShopServerSetting.html",
        controller:"userShopServerSettingCtrl"
      })
      //我的商品设置页面
      .when("/userCommoditySetting",{
        templateUrl:"tpl/userCommoditySetting.html",
        controller:"userCommoditySettingCtrl"
      })
      //用户商品详情页面
      .when("/userCommodityDetail/:commodityId",{
        templateUrl:"tpl/userCommodityDetail.html",
        controller:"userCommodityDetailCtrl"
      })
      //路径非法跳主页
      .otherwise({
        redirectTo: "/login"
      });


    //angularJS会对html页面进行重构，对他认为不安全的链接会在其前加前缀“unsafe:”，用下这个可以对其屏蔽，注意函数头引入$compileProvider
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
    // Angular v1.2 之前使用 $compileProvider.urlSanitizationWhitelist(...)

  });

  //配置POST请求头
  ponyShopApp.run(function ($http) {
    $http.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
  });

  //父级总控制器
  ponyShopApp.controller('ponyShopCtrl',function($scope){
    $scope.height=vHeight;

    //通讯加载时报错，可点击取消
    $(".commLoad").click(function(){
      $(this).css('display','none');
    });
  });

  //登陆页面
  ponyShopApp.controller('ponyShopLoginCtrl',function($scope,$http,$location){
    $scope.height=vHeight;
    var shopUserTel=localStorage["ponyShopUserTel"];
    var shopUserPwd=localStorage["ponyShopUserPwd"];

    //自动登陆
    if(shopUserTel&&shopUserPwd){
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_store/login",
        data:"phone="+shopUserTel+"&password="+strmd5(shopUserPwd)
      }).success(function(data){
        // console.log(data);
        if(data.code=="E0000"){
          sessionStorage["ponyShopUserID"]=data.data.producer_id;
          sessionStorage["ponyShopID"]=data.data.store_id;
          sessionStorage["ponyShopToken"]=data.data.token;
          ponyShopDate=data.data;
          $location.path("/main");
        }
      });
    }

    //登陆
    $scope.ponyShopLogin=function(){
      var userTel=$("#userAccounts").val();
      var userPwd=$("#userPwd").val();
      if(!userTel){
        alertMsg("确定","请输入帐号",function(){}); 
        return;
      }
      if(!userPwd){
        alertMsg("确定","请输入密码",function(){}); 
        return;
      }

      //通讯开始等待
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_store/login",
        data:"phone="+userTel+"&password="+strmd5(userPwd)
      }).success(function(data){
        commFinish();
        if(data.code=="E0000"){
          sessionStorage["ponyShopUserID"]=data.data.producer_id;
          sessionStorage["ponyShopID"]=data.data.store_id;
          sessionStorage["ponyShopToken"]=data.data.token;
          localStorage["ponyShopUserTel"]=userTel;
          localStorage["ponyShopUserPwd"]=userPwd;
          ponyShopDate=data.data;
          // console.log(data);
          $location.path("/main");
        }else{
          alertMsg("确定",data.message,function(){}); 
        }
      });

    } 
    
    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){

      // 前往登陆
      $("#userPwd").keydown(function(e){
        //确认按键 13
        if(e.which==13){

          var userTel=$("#userAccounts").val();
          var userPwd=$("#userPwd").val();
          if(!userTel){
            alertMsg("确定","请输入帐号",function(){}); 
            return;
          }
          if(!userPwd){
            alertMsg("确定","请输入密码",function(){}); 
            return;
          }
    
          //通讯开始等待
          commStart();
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_store/login",
            data:"phone="+userTel+"&password="+strmd5(userPwd)
          }).success(function(data){
            commFinish();
            if(data.code=="E0000"){
              sessionStorage["ponyShopUserID"]=data.data.producer_id;
              sessionStorage["ponyShopID"]=data.data.store_id;
              sessionStorage["ponyShopToken"]=data.data.token;
              localStorage["ponyShopUserTel"]=userTel;
              localStorage["ponyShopUserPwd"]=userPwd;
              ponyShopDate=data.data;
              // console.log(data);
              $location.path("/main");
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          });

        }
      });
    });

  });
 
  //注册页面
  ponyShopApp.controller("ponyShopRegisterCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    //百度IP定位  定位当前城市中心IP
    var lonBD=null;
    var latBD=null;
    $.ajax({
      type:"get",
      url:"http://api.map.baidu.com/location/ip",
      data:{
        ak:"9lVEScaqxLpGVtVu46BWKO0Oe7ji2QRB",
        coor:"bd09ll"
      },
      success:function(data){
        console.log(data,data.content.point.x,data.content.point.y);
        // 经度
        lonBD=data.content.point.x;
        latBD=data.content.point.y;
      }
    });

    //省份数据
    $scope.provinceArr=[];
    //城市数据
    $scope.cityArr=[];
    //地区数据
    $scope.areaArr=[];
    //店铺类型
    $scope.shopType=[];

    // 用户协议链接地址
    $scope.link='';

    //短信验证ID
    var verifyCode=null;
    var verifyCodeId=null;

    //是否正在提交
    var isSubmitOK=true;

    // 获取基本省份城市地区信息
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_province/get",
      data:""
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        //所有省份信息
        $scope.provinceArr=data.data;
        // console.log(data.data[0].id);
        //所在省份下城市信息
        $http({
          method:"post",
          url:"http://180.76.243.205:8383/_API/_city/get",
          data:"province_id="+data.data[0].id
        }).success(function(data){
          // console.log(data);
          if(data.code=="E0000"){
            $scope.cityArr=data.data;
            //所在城市下地区信息
            $http({
              method:"post",
              url:"http://180.76.243.205:8383/_API/_area/get",
              data:"city_id="+data.data[0].id
            }).success(function(data){
              // console.log(data);
              $scope.areaArr=data.data;
            })
          }
        });
      }
    });

    //获取店铺类型数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_storeType/get",
      data:""
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        $scope.shopType=data.data;
      }
    });

    //查看用户协议
    $scope.toAgreement=function(){
      $("#ponyShopAgreementPage").css("display","block").siblings().css("display","none");
      commStart();
      //获到数据
      $http({
        method:'post',
        url:'http://180.76.243.205:8383/_API/_store/deal',
        data:""
      }).success(function(data){
        // console.log(data);
        commFinish();
        if(data.code=="E0000"){
          $scope.link=data.data.head_url; 
          var html="";
  
          html=data.data.content.replace(/<til>(.*?)<\/til>/ig,function(word,$1,position){
            if(position==0){
              return "<div class='tit'>"+$1+"</div>";
            }else{
              return "<classify><div class='tit'>"+$1+"</div>";
            }
          });
          // console.log(html);
          //切分模块
          var classIfyArr=html.split("<classify>");
          // console.log(classIfyArr);
          var agreementHtml="";
          for(var i=0;i<classIfyArr.length;i++){
            agreementHtml+="<div class='classify'>";
            //每一个模块
            var one=classIfyArr[i];
            //加入模块标题
            // console.log(one.split("</\div>")[0]);
            agreementHtml+=one.split("</\div>")[0]+"</div>";
            // 按模块切分段落
            classIfyContent=one.split("</\div>")[1].split("<br>");
            // console.log(classIfyContent);
            var classIfyContentHtml="";
            for(var subI=0;subI<classIfyContent.length;subI++){
              var subOne=classIfyContent[subI];
              if(subOne){
                classIfyContentHtml+="<p>";
                subOne=subOne.replace(/<red>(.*?)<\/red>/ig,function(subWord,$1){
                  // console.log(subWord,$1);
                  return "<span>"+$1+"</span>";
                });
                // console.log(subOne);
                classIfyContentHtml+=subOne;
                classIfyContentHtml+="</p>";
              }
            }
            //加入模块段落内容
            agreementHtml+=classIfyContentHtml;
            agreementHtml+="</div>";
          }
  
  
          $("#ponyShopAgreementPage>.agreementBody>.detail").html(agreementHtml);
  
  
  
        }else{
          console.log(data.message);
        }
      });

    }

    //从用户协议页面返回注册页面
    $scope.toBackRegister=function(){
      $("#ponyShopRegisterPage").css("display","block").siblings().css("display","none");
    }

    //去地图定位页面
    $scope.toMapLocation=function(){

      $("#ponyShopLocationPage").css("display","block").siblings().css("display","none");

      //店铺地图定位
      // 百度地图API功能
      var map = new BMap.Map("ponyMap");    // 创建Map实例
      //deviceLocation.latitude deviceLocation.longitude
      // alert(deviceLocation.state);
      if(deviceLocation.state==1){
        var mapPoint = new BMap.Point(parseFloat(deviceLocation.longitude),parseFloat(deviceLocation.latitude));
      }else{
        var mapPoint = new BMap.Point(lonBD,latBD);

      }


      var geoc = new BMap.Geocoder(); 
      map.centerAndZoom(mapPoint,15);  // 初始化地图,设置中心点坐标和地图级别
      //查询地址
      geoc.getLocation(mapPoint, function(rs){
        var addComp = rs.addressComponents;
        // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        var addressStr=addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
        $("#mapLocationAddress").html(addressStr).attr("data-lon",deviceLocation.state==1?parseFloat(deviceLocation.longitude):lonBD).attr("data-lat",deviceLocation.state==1?parseFloat(deviceLocation.latitude):latBD).attr("data-mapStr",addressStr);
      }); 
      var marker = new BMap.Marker(mapPoint); // 创建点
      // marker.enableDragging();     //设置点可以拖拽
      map.addOverlay(marker);            //增加点

      // 点击选取地点位置坐标
      map.addEventListener("click",function(e){
        // alert(e.point.lng + "," + e.point.lat);
        // 清除所有地图覆盖物
        map.clearOverlays(); 
        var lng = e.point.lng;
        var lat = e.point.lat;
        // 创建新地图覆盖物做标
        var newMarkerPoint=new BMap.Point(lng,lat);

        marker = new BMap.Marker(newMarkerPoint); // 创建点
        // marker.enableDragging();     //设置点可以拖拽
        map.addOverlay(marker);            //增加点

        // 查询地址
        geoc.getLocation(newMarkerPoint, function(rs){
          var addComp = rs.addressComponents;
          // console.log(addComp);
          var addressStr=addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
          $("#mapLocationAddress").html(addressStr).attr("data-lon",lng).attr("data-lat",lat).attr("data-mapStr",addressStr);
          // console.log(addressStr);
        }); 
      });

      // //拖拽结束事件
      // marker.addEventListener("dragend", function(e){
      //   //获取覆盖物位置
      //   var o_Point_now =  marker.getPosition();
      //   var lng = o_Point_now.lng;
      //   var lat = o_Point_now.lat;
      //   //e.point.lng 地理经度。
      //   // e.point.lat 地理纬度。
      //   //alert(e.point.lng + "---, " + e.point.lat);
      //   var newMarkerPoint=new BMap.Point(lng,lat)
      //   // 查询地址
      //   geoc.getLocation(newMarkerPoint, function(rs){
      //     var addComp = rs.addressComponents;
      //     // console.log(addComp);
      //     var addressStr=addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
      //     $("#mapLocationAddress").html(addressStr).attr("data-lon",lng).attr("data-lat",lat).attr("data-mapStr",addressStr);
      //   }); 
      // });


    }

    // 确认地图定位
    $scope.confirmMapAddress=function(){
      var addStr=$("#mapLocationAddress").attr("data-mapStr");
      var lon=$("#mapLocationAddress").attr("data-lon");
      var lat=$("#mapLocationAddress").attr("data-lat");
      // 更新数据
      $("#mapLocationInput").attr("data-lon",parseFloat(lon)?lon:'').attr("data-lat",parseFloat(lat)?lat:'').attr("data-mapStr",addStr).children(".GPSAddress").html(addStr);
      // 返回注册页面
      $("#ponyShopRegisterPage").css("display","block").siblings().css("display","none");
    }

    //返回按钮
    $scope.toBack=function(){
      clearInterval(verifyTimer);
      $location.path('/login');
    }

    //验证码
    var verifyTimer=null;
    var isVerify=true;
    var verTimeSum=60;
    $scope.verifyTime=function(){
      var tel=$("#userTel").val();

      if(!isVerify){
        return;
      }
      
      //验证是否输入手机号
      if(!tel){
        alertMsg("确定","请输入您的手机号",function(){}); 
        return;
      }
      
      if(!(/^1[34578]\d{9}$/.test(tel))){ 
        alertMsg("确定","手机号码有误，请重填",function(){}); 
        return; 
      } 

      //发送请求获取短信验证码
      $http({
        method: "post",
        url:"http://180.76.243.205:8383/_API/_sms/send",
        data:"phone="+tel
      }).success(function(data){
        //console.log(data);
        if(data.code=="E0000"){
          verifyCode=data.data.code;
          verifyCodeId=data.data.id;
          //console.log(verifyCode);
        }else{
          alertMsg("确定",data.message); 
        }
      }).error(function(err){
        //console.log(err);
      });

      isVerify=false;
      $('.verifyBth').css({
        backgroundColor:"#aaa"
      }).html(verTimeSum+"秒");

      //重复获取计时
      verifyTimer=setInterval(function(){
        if(verTimeSum<1){
          isVerify=true;
          verTimeSum=60;
          $('.verifyCodeBtn').css({
            backgroundColor:"#e4393c"
          }).html("获取验证码");
          clearInterval(verifyTimer);
        }else{
          verTimeSum--;
          $('.verifyCodeBtn').css({
            backgroundColor:"#aaa"
          }).html(verTimeSum+"秒");
        }
      }.bind(this),1000);
    }

    //提交表单
    $scope.submitForm=function(){

      if(!isSubmitOK){
        alertMsg("确定","正在上传资料请稍后",function(){}); 
        return;
      }

      // 申请人
      var ponyShopUser=$("#userName").val();
      // 申请人手机号
      var ponyShopUserTel=$("#userTel").val();
      // 验证码
      var userVerify=$("#userVerifyCode").val();
      //登陆密码
      var userPwd=$("#userPwd").val();
      //门店名称
      var userShopName=$("#userShopName").val();
      //门店类型
      var userShopType=$("#userShopType").val();
      //门店联系电话
      var userShopTel=$("#userShopTel").val();
      //门店营业时间
      var userShopStartTime=$("#workStartTime").val();
      var userShopEndTime=$("#workEndTime").val();
      //门店所在城市
      var userShopCity=$("#shopAddressDistrict").val();
      //门店详细地址
      var userShopAddress=$("#userShopAddress").val();
      //门店详细地址定位坐标
      // 经度
      var userShopLon=$("#mapLocationInput").attr("data-lon");
      // 纬度
      var userShopLat=$("#mapLocationInput").attr("data-lat");

      //验证数据
      if(!ponyShopUser){
        alertMsg("确定","请填写申请人",function(){}); 
        return;
      }
      if(!ponyShopUserTel){
        alertMsg("确定","请填写申请人手机号",function(){}); 
        return;
      }else if(!(/^1[34578]\d{9}$/.test(ponyShopUserTel))){
        alertMsg("确定","请输入正确的申请人手机号",function(){}); 
        return;
      }
      if(!userVerify){
        alertMsg("确定","输入验证码",function(){}); 
        return;
      }else if(userVerify!=verifyCode){
        alertMsg("确定","您输入的验证码不正确，请重新输入",function(){}); 
        return;
      }
      if(!userPwd){
        alertMsg("确定","请填写登陆密码",function(){}); 
        return;
      }else if(!(/^[A-Za-z0-9]{6,}$/.test(userPwd))){
        alertMsg("确定","密码只能是字母与数字且不少于六位",function(){}); 
        return; 
      }
      if(!userShopName){
        alertMsg("确定","请填写门店名称",function(){}); 
        return;
      }
      if(!userShopTel){
        alertMsg("确定","请填写联系电话",function(){}); 
        return;
      }else if(!(/^[0-9\-]{7,}$/.test(userShopTel))){
        alertMsg("确定","请输入正确的联系电话",function(){}); 
        return;
      }
      if(!userShopAddress){
        alertMsg("确定","请填写门店详细地址",function(){}); 
        return;
      }
      if(!(userShopLon&&userShopLat)){
        alertMsg("确定","门店定位失败，请重新选取门店定位",function(){}); 
        return;
      }
      if(!$("#userCharterInput").val()){
        alertMsg("确定","请上传营业执照",function(){}); 
        return;
      }
      if(!$("#userShopImg1Input").val()){
        alertMsg("确定","请上传第一张门店照片",function(){}); 
        return;
      }
      if(!$("#userShopImg2Input").val()){
        alertMsg("确定","请上传第二张门店照片",function(){}); 
        return;
      }
      if(!$("#userShopImg3Input").val()){
        alertMsg("确定","请上传第三张门店照片",function(){}); 
        return;
      }
      if(!$("#userIDInput").val()){
        alertMsg("确定","请上传身份证照片",function(){}); 
        return;
      }

      //初始化表单
      var fData=new FormData(document.getElementById('ponyShopRegisterForm'));
      //补充数据
      fData.append("code_id",verifyCodeId);
      fData.append("longitude",userShopLon);
      fData.append("latitude",userShopLat);
      fData.append("password",strmd5(userPwd));
      if($("#ponyShopRegisterPage>.registerForm>form>.userCooperation>.cooperationList>ul").children().eq(1).hasClass("active")){
        fData.append("service_type_iii",1);
      }else{
        fData.append("service_type_iii",2);
      }
      if($("#ponyShopRegisterPage>.registerForm>form>.userCooperation>.cooperationList>ul").children().eq(2).hasClass("active")){
        fData.append("service_type_ii",1);
      }else{
        fData.append("service_type_ii",2);
      }
      if($("#ponyShopRegisterPage>.registerForm>form>.userCooperation>.cooperationList>ul").children().eq(3).hasClass("active")){
        fData.append("service_type_v",1);
      }else{
        fData.append("service_type_v",2);
      }
      if($("#ponyShopRegisterPage>.registerForm>form>.userCooperation>.cooperationList>ul").children().eq(4).hasClass("active")){
        fData.append("service_type_iv",1);
      }else{
        fData.append("service_type_iv",2);
      }
      if($("#ponyShopRegisterPage>.registerForm>form>.userCooperation>.cooperationList>ul").children().eq(0).hasClass("active")){
        fData.append("app_expert",1);
      }else{
        fData.append("app_expert",2);
      }

      //按钮置灰
      $("#registerSubmitBtn").css("backgroundColor","#aaa");
      isSubmitOK=false;
      //上传数据
      //通讯开始等待
      commStart();
      $.ajax({
        type:"post",
        processData:false,
        contentType:false,
        url:"http://180.76.243.205:8383/_API/_store/register",
        data:fData,
        success:function(data){
          commFinish();
          if(data.code=="E0000"){
            console.log(data);
            alertMsg("确定","注册成功",function(){
              localStorage["ponyShopUserTel"]=ponyShopUserTel;
              localStorage["ponyShopUserPwd"]=userPwd;
              clearInterval(verifyTimer);
              window.location.href="index.html#/login";
            }); 
          }else{
            $("#registerSubmitBtn").removeAttr("style");
            isSubmitOK=true;
            alertMsg("确定",data.message,function(){}); 
          }
        },
        error:function(err){
          commFinish();
          //console.log(err);
        }
      });

      // console.log(userShopLat,userShopLon);


    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      
      //营业执照
      $("#userCharterInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userCharterPic").attr('src', "img/picView.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userCharterPic").attr('src', e.target.result);
        }
      });

      //门店照片每一张
      $("#userShopImg1Input").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userShopImg1Pic").attr('src', "img/picView.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userShopImg1Pic").attr('src', e.target.result);
        }
      });

      //门店照片每二张
      $("#userShopImg2Input").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userShopImg2Pic").attr('src', "img/picView.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userShopImg2Pic").attr('src', e.target.result);
        }
      });
            
      //门店照片每三张
      $("#userShopImg3Input").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userShopImg3Pic").attr('src', "img/picView.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userShopImg3Pic").attr('src', e.target.result);
        }
      });

      //身份证照片
      $("#userIDInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userIDPic").attr('src', "img/picView.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userIDPic").attr('src', e.target.result);
        }
      });

      // 省份变更
      $("#shopAddressProvince").change(function(){
        // console.log($(this).val());
        var target=$(this).val();
        //所在省份下城市信息
        $http({
          method:"post",
          url:"http://180.76.243.205:8383/_API/_city/get",
          data:"province_id="+target
        }).success(function(data){
          // console.log(data);
          if(data.code=="E0000"){
            $scope.cityArr=data.data;
            // $scope.$apply();
            //所在城市下地区信息
            $http({
              method:"post",
              url:"http://180.76.243.205:8383/_API/_area/get",
              data:"city_id="+data.data[0].id
            }).success(function(data){
              console.log(data);
              $scope.areaArr=data.data;
            })
          }
        });
      });
      
      //城市变更
      $("#shopAddressCity").change(function(){
        // console.log($(this).val());
        var target=$(this).val();
        //所在城市下地区信息
        $http({
          method:"post",
          url:"http://180.76.243.205:8383/_API/_area/get",
          data:"city_id="+target
        }).success(function(data){
          console.log(data);
          $scope.areaArr=data.data;
        });
      });

      // 合作项目的选取
      $("#ponyShopRegisterPage>.registerForm>form>.userCooperation>.cooperationList>ul").on("click","li",function(){
        var target=$(this);
        if(target.index()){
          if(target.hasClass("active")){
            target.removeClass("active");
          }else{
            target.addClass("active");
          }
        }
      });

      //手机熟练度选择
      $("#ponyShopRegisterPage>.registerForm>form>.userAppOperate>.operateList>ul").on("click","li",function(){
        var target=$(this);
        if(!target.hasClass("active")){
          target.addClass("active").siblings().removeClass("active");
        }
      });

    });

  });

  //忘记密码页面
  ponyShopApp.controller("ponyShopRestPwdCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    //短信验证ID
    var verifyCode=null;
    var verifyCodeId=null;

    //返回按钮
    $scope.toBack=function(){
      clearInterval(verifyTimer);
      $location.path('/login');
    }

    //验证码
    var verifyTimer=null;
    var isVerify=true;
    var verTimeSum=60;
    $scope.verifyTime=function(){
      var tel=$("#userAccounts").val();

      if(!isVerify){
        return;
      }
      
      //验证是否输入手机号
      if(!tel){
        alertMsg("确定","请输入您的手机号",function(){}); 
        return;
      }
      
      if(!(/^1[34578]\d{9}$/.test(tel))){ 
        alertMsg("确定","手机号码有误，请重填",function(){}); 
        return; 
      } 

      //发送请求获取短信验证码
      $http({
        method: "post",
        url:"http://180.76.243.205:8383/_API/_sms/send",
        data:"phone="+tel
      }).success(function(data){
        //console.log(data);
        if(data.code=="E0000"){
          verifyCode=data.data.code;
          verifyCodeId=data.data.id;
          //console.log(verifyCode);
        }else{
          alertMsg("确定",data.message); 
        }
      }).error(function(err){
        //console.log(err);
      });

      isVerify=false;
      $('.verifyBth').css({
        backgroundColor:"#aaa"
      }).html(verTimeSum+"秒");

      //重复获取计时
      verifyTimer=setInterval(function(){
        if(verTimeSum<1){
          isVerify=true;
          verTimeSum=60;
          $('.verifyCodeBtn').css({
            backgroundColor:"#e4393c"
          }).html("获取验证码");
          clearInterval(verifyTimer);
        }else{
          verTimeSum--;
          $('.verifyCodeBtn').css({
            backgroundColor:"#aaa"
          }).html(verTimeSum+"秒");
        }
      }.bind(this),1000);
    }

    //提交更改密码
    $scope.submitChangePwd=function(){
      var userTel=$("#userAccounts").val();
      var userNewPwd=$("#userPwd").val();
      var userVerify=$("#userVerifyCode").val();
      if(!userTel){
        alertMsg("确定","请填写你的手机号",function(){}); 
        return; 
      }else if(!(/^1[34578]\d{9}$/.test(userTel))){
        alertMsg("确定","手机号码有误，请重填",function(){}); 
        return; 
      }
      if(!userNewPwd){
        alertMsg("确定","请输入您的新密码",function(){}); 
        return; 
      }else if(!(/^[A-Za-z0-9]{6,}$/.test(userNewPwd))){
        alertMsg("确定","密码只能是字母与数字且不少于六位",function(){}); 
        return; 
      }
      if(!userVerify){
        alertMsg("确定","输入验证码",function(){}); 
        return;
      }else if(userVerify!=verifyCode){
        alertMsg("确定","您输入的验证码不正确，请重新输入",function(){}); 
        return;
      }

      //提交数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_producer/forget",
        data:"phone="+userTel+"&password="+strmd5(userNewPwd)+"&code_id="+verifyCodeId+"&code="+userVerify
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          alertMsg("确定","修改成功",function(){
            localStorage["ponyShopUserTel"]=userTel;
            localStorage["ponyShopUserPwd"]=userNewPwd;
            clearInterval(verifyTimer);
            window.location.href="index.html#/login";
          }); 
        }else{
          alertMsg("确定",data.message,function(){}); 
        }
      });

    }

  });

  //登陆后主页面
  ponyShopApp.controller("ponyShopMainCtrl",function($scope,$http,$location){
    $scope.height=vHeight;
    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];
    
    //主页面所有数据
    var userMainDate=null;

    //显示订单列表数据
    $scope.orderList=[];

    //订单总数量
    $scope.orderTotal=0;
    //已完成订单数量
    $scope.orderFinished=0;
    //未完成订单
    $scope.orderUnFinish=0;

    // 去订单列表页面 
    $scope.toOrderList=function(){
      $location.path("/order/all")
    }

    //获取数据（如果ponyShopDate有数据，表示已经登陆过，直接取数据就行，反之，先获取登陆数据，再去现页面数据进行获取）
    if(!ponyShopDate){
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_store/login",
        data:"phone="+localStorage["ponyShopUserTel"]+"&password="+strmd5(localStorage["ponyShopUserPwd"])
      }).success(function(data){
        // alert(123);
        // console.log(data);
        if(data.code=="E0000"){
          sessionStorage["ponyShopUserID"]=data.data.producer_id;
          sessionStorage["ponyShopID"]=data.data.store_id;
          sessionStorage["ponyShopToken"]=data.data.token;
          ponyShopDate=data.data;
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_storeOrder/get",
            data:"producer_id="+data.data.producer_id+"&token="+data.data.token+"&store_id="+data.data.store_id
          }).success(function(data){
            console.log(data);
            if(data.code=="E0000"){
              $scope.orderTotal=data.data.all_no;
              $scope.orderFinished=data.data.finished_no;
              $scope.orderUnFinish=data.data.unfinished_no;
              userMainDate=data.data;
              $scope.orderList=data.data.today;
            }else if(data.code=="E0014"){
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              }); 
            }
          });
        }else{
          $location.path("/login");
        }
      });
    }else{
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_storeOrder/get",
        data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId
      }).success(function(data){
        // console.log(data);
        if(data.code=="E0000"){
          $scope.orderTotal=data.data.all_no;
          $scope.orderFinished=data.data.finished_no;
          $scope.orderUnFinish=data.data.unfinished_no;
          userMainDate=data.data;
          $scope.orderList=data.data.today;
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          }); 
        }
      });

    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //订单周期列表
      $("#ponyShopMainPage>.orderCollect>.orderTimeList>ul").on("click","li",function(){
        var target=$(this);
        target.addClass("active").siblings().removeClass("active");
        switch(target.index()){
          case 0: 
            // console.log("今天");
            $scope.orderList=userMainDate.today;
            $scope.$apply();
            break;
          case 1:
            // console.log("7天");
            $scope.orderList=userMainDate.seven;
            $scope.$apply();
            break;
          case 2:
            // console.log("15天");
            $scope.orderList=userMainDate.fifteen;
            $scope.$apply();
            break;
          case 3:
            // console.log("30天");
            $scope.orderList=userMainDate.thirty;
            $scope.$apply();
            break;             
        }
        // console.log($scope.orderList);
      });



    });

  });

  //订单列表页面
  ponyShopApp.controller("ponyShopOrderCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;

    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];
    //传入列表参数
    var listTarget=$routeParams.listTarget;

    //请求数据定时器
    var orderListTimer=null;

    //订单更新时间戳
    var orderListTime="first";    

    //所有订单数据
    $scope.orderListAll=[];
    //待发货订单数据
    $scope.orderListIsDelivery=[];
    //待收货订单数据
    $scope.orderListIsReceiving=[];
    //待服务订单数据
    $scope.orderListIsServer=[];
    //完成订单数据
    $scope.orderListFinish=[];



    //获取数据
    function getOrderListDate(){
      if($("#ponyShopOrderPage").length>0){
        // console.log("在");
      }else{
        console.log("不在");
        //当前页面不在订单列表页面时
        clearInterval(orderListTimer);
        return;
      }
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_storeOrders/get",
        data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId
      }).success(function(data){
        commFinish();
        console.log(data);
        if(data.code=="E0000"){

          if(data.data){
            if(orderListTime==data.data[0].update_time){
              console.log("没有数据更新");
              return;
            }else{
              orderListTime=data.data[0].update_time;
              //所有订单数据
              $scope.orderListAll=[];
              //待发货订单数据
              $scope.orderListIsDelivery=[];
              //待收货订单数据
              $scope.orderListIsReceiving=[];
              //待服务订单数据
              $scope.orderListIsServer=[];
              //完成订单数据
              $scope.orderListFinish=[];
            }

            for(var i=0,len=data.data.length;i<len;i++){
              var one=data.data[i];
              // console.log(on)
              switch (one.status){
                //交易完成
                case '1':
                  one.btnName="已完成";
                  one.btnColor="#b4b4b4";
                  one.btnStatus="block";
                  $scope.orderListAll.push(one);
                  $scope.orderListFinish.push(one);
                  break;
                //待发货
                case '5':
                  one.btnName="等待发货";
                  one.btnColor="#b4b4b4";
                  one.btnStatus="black";
                  $scope.orderListAll.push(one);
                  $scope.orderListIsDelivery.push(one);
                  break;
                //待商家确认服务
                case '3':
                  if(one.stage==1){
                    one.btnName="确认服务";
                    one.btnColor="#ee2625";
                    one.btnStatus="block";
                    $scope.orderListAll.push(one);
                    $scope.orderListIsServer.push(one);
                  }else if(one.stage==2||one.stage==4){
                    one.btnName="等待确认";
                    one.btnColor="#b4b4b4";
                    one.btnStatus="block";
                    $scope.orderListAll.push(one);
                    $scope.orderListIsServer.push(one);
                  }else if(one.stage==3||one.stage==5){
                    one.btnName="服务完成";
                    one.btnColor="#ee2625";
                    one.btnStatus="block";
                    $scope.orderListAll.push(one);
                    $scope.orderListIsServer.push(one);
                  }
                  break;
                //待收货
                case '2':
                  one.btnName="确认收货";
                  one.btnColor="#ee2625";
                  one.btnStatus="block";
                  $scope.orderListAll.push(one);
                  $scope.orderListIsReceiving.push(one);
                  break;
                //待订单服务确认
                case '6':
                  one.btnName="等待确认";
                  one.btnColor="#b4b4b4";
                  one.btnStatus="block";
                  $scope.orderListAll.push(one);
                  $scope.orderListIsServer.push(one);
                  break;
                //交易完成待评价  
                case '7':
                  one.btnName="已完成";
                  one.btnColor="#b4b4b4";
                  one.btnStatus="block";
                  $scope.orderListAll.push(one);
                  $scope.orderListFinish.push(one);
                  break;
                //服务完成  
                // case '8':
                //   one.btnName="等待确认";
                //   one.btnColor="#787878";
                //   one.btnStatus="block";
                //   $scope.orderListAll.push(one);
                //   $scope.orderListIsServer.push(one);
                //   break;
              }
  
            }
          }

          // console.log($scope.orderListAll,$scope.orderListFinish,$scope.orderListIsReceiving,$scope.orderListIsDelivery,$scope.orderListIsServer);

        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          }); 
        }else{
          console.log(data.message);
        }
      });
    }
    getOrderListDate();

    orderListTimer=setInterval(getOrderListDate,30000);


    //列表数据按钮功能
    $scope.orderListBtn=function(e,id,status,stage,typeId){
      // 阻止冒泡
      e.stopPropagation();
      console.log(id,status,stage);

      switch (status){
        //交易完成
        case '1':
          // 已评价          
          clearInterval(orderListTimer);
          $location.path("/affirmOtherServer/"+id);
          break;
        //待发货
        case '5':
          // 等待发货
          clearInterval(orderListTimer);
          $location.path("/affirmOtherServer/"+id);
          break;
        //待商家确认服务
        case '3':
          if(stage==1){
            var path="";
            // 确认服务
            if(typeId==1){
              //原厂更换
              path="/affirmTireServerOriginal/"+id;
              clearInterval(orderListTimer);
              $location.path(path);
            }else if(typeId==2){
              // 免费再换 
              path="/affirmTireServerFreeChange/"+id;
              clearInterval(orderListTimer);
              $location.path(path);
            }else if(typeId==3){
              //免费修补
              path="/affirmTireServerRepair/"+id;
              clearInterval(orderListTimer);
              $location.path(path);
            }else{
              //其他
              // path="/affirmOtherServer/"+id;
              //通讯开始等待
              commStart();
              $http({
                method:"post",
                url:"http://180.76.243.205:8383/_API/_service/complete",
                data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId+"&order_id="+id
              }).success(function(data){
                commFinish();
                // console.log(data);
                if(data.code=="E0000"){
                  alertMsg("确定","服务完成",function(){}); 
                  getOrderListDate();
                }else if(data.code=="E0014"){
                  alertMsg("确定",data.message,function(){
                    window.location.href="index.html#/login";
                  }); 
                }else{
                  alertMsg("确定",data.message,function(){}); 
                }
              });

            }
          }else if(stage==2||stage==4){
            // 等待确认
            path="/affirmOtherServer/"+id;
            clearInterval(orderListTimer);
            $location.path(path);
          }else if(stage==3||stage==5){
            // 服务完成
            // path="/affirmOtherServer/"+id;
            //通讯开始等待
            commStart();
            $http({
              method:"post",
              url:"http://180.76.243.205:8383/_API/_service/complete",
              data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId+"&order_id="+id
            }).success(function(data){
              commFinish();
              // console.log(data);
              if(data.code=="E0000"){
                alertMsg("确定","服务完成",function(){}); 
                getOrderListDate();
              }else if(data.code=="E0014"){
                alertMsg("确定",data.message,function(){
                  window.location.href="index.html#/login";
                }); 
              }else{
                alertMsg("确定",data.message,function(){}); 
              }
            });

          }

          break;
        //待收货
        case '2':
          // 确认收货
          //通讯开始等待
          commStart();
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_storeDelivery/take",
            data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId+"&order_id="+id
          }).success(function(data){
            commFinish();
            // console.log(data);
            if(data.code=="E0000"){
              alertMsg("确定","收货成功",function(){}); 
              getOrderListDate();
            }else if(data.code=="E0014"){
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              }); 
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          });
          break;
        //待订单服务确认
        case '6':
          // 等待确认（车主）
          clearInterval(orderListTimer);
          $location.path("/affirmOtherServer/"+id);
          break;
        case '7':
          // 待评价
          clearInterval(orderListTimer);
          $location.path("/affirmOtherServer/"+id);
          break;

      }

      
    }

    //查看订单详情
    $scope.orderListDetail=function(id,status,stage,typeId,serverType){
      // console.log("123");
      var path="";
      switch (status){
        //交易完成
        case '1':
          // one.btnName="已评价";
          path="/affirmOtherServer/"+id;
          break;
        //待发货
        case '5':
          // one.btnName="取消订单";
          path="/affirmOtherServer/"+id;
          break;
        //待商家确认服务
        case '3':
          console.log(serverType=='1');
          // if(serverType=='1'){
            if(stage==1){
              if(typeId==1){
                //原厂更换
                path="/affirmTireServerOriginal/"+id;
              }else if(typeId==2){
                // 免费再换 
                path="/affirmTireServerFreeChange/"+id;
              }else if(typeId==3){
                //免费修补
                path="/affirmTireServerRepair/"+id;
              }else{
                //其他
                path="/affirmOtherServer/"+id;
              }
            }else if(stage==2||stage==4){
              // one.btnName="等待车主确认";
              path="/affirmOtherServer/"+id;
            }else if(stage==3||stage==5){
              // one.btnName="服务完成";
              path="/affirmOtherServer/"+id;
            }
          // }else{
            
          //   path="/affirmOtherServer/"+id;
          // }
          break;
        //待收货
        case '2':
          // 确认收货
          path="/affirmOtherServer/"+id;
          break;
        //待订单服务确认
        case '6':
          // 等待确认服务（车主）
          path="/affirmOtherServer/"+id;
          break;
        case '7':
          // one.btnName="未评价";
          path="/affirmOtherServer/"+id;
          break;

      }
      clearInterval(orderListTimer);
      console.log(id);
      console.log(serverType,path);
      $location.path(path);
    }

    //页面返回按钮
    $scope.toBack=function(){
      clearInterval(orderListTimer);
      $location.path("/main");
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $('body,html').scrollTop(0);

      //console.log(listTarget);
      orderListTarget=listTarget;
      switch (listTarget){
        //全部订单
        case "all":
          $('.classify>ul').children().eq(0).addClass("active").siblings().removeClass("active");
          //console.log($('.productList>.productAll'));
          $('.productList>.productAll').addClass("active").siblings().removeClass("active");
          break;
        //待发货
        case "sendOut":
          $('.classify>ul').children().eq(1).addClass("active").siblings().removeClass("active");
          //console.log($('.productList>.productToSendOut'));
          $('.productList>.productToSendOut').addClass("active").siblings().removeClass("active");
          break;
        //待收货
        case "receive":
          $('.classify>ul').children().eq(2).addClass("active").siblings().removeClass("active");
          //console.log($('.productList>.productToReceive'));
          $('.productList>.productToReceive').addClass("active").siblings().removeClass("active");
          break;
        //待服务
        case "server":
          $('.classify>ul').children().eq(3).addClass("active").siblings().removeClass("active");
          //console.log($('.productList>.productToServer'));
          $('.productList>.productToServer').addClass("active").siblings().removeClass("active");
          break;
        //完成
        case "finish":
          $('.classify>ul').children().eq(4).addClass("active").siblings().removeClass("active");
          //console.log($('.productList>.productToFinish'));
          $('.productList>.productToFinish').addClass("active").siblings().removeClass("active");
          break;
      }

      $('.classify>ul').on('click',"li",function(){
        var num=$(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $('.productList').children().eq(num).addClass("active").siblings().removeClass("active");
        switch (num){
          case 0:
            orderListTarget="all";
            break;
          case 1:
            orderListTarget="sendOut";
            break;
          case 2:
            orderListTarget="receive";
            break;
          case 3:
            orderListTarget="server";
            break;
          case 4:
            orderListTarget="finish";
            break;
        }
      });




    });

    
  });

  //轮胎服务(原厂更换)确认页面
  ponyShopApp.controller("ponyShopAffirmTireServerOriginalCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;

    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //获取传入订单ID
    var orderId=$routeParams.orderId;

    //总更换数量
    var changeTotalNum=1;
  
    //订单数据
    $scope.orderDate=null;
    // 订单列表数据
    $scope.orderListDetail=[];

    //通讯开始等待
    commStart();
    // 获取数据 
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_storeOrder/getSingle",
      data:"producer_id="+ponyUserId+"&store_id="+ponyShopId+"&token="+token+"&order_id="+orderId
    }).success(function(data){
      console.log(data);
      commFinish();
      if(data.code=="E0000"){
        $scope.orderDate=data.data.orderInfo;
        $scope.orderListDetail=data.data.details;

        changeTotalNum=data.data.shoe_no;
        // $("#ponyShopAffirmTireServerOriginalPage>.orderDetail>form>.userTireImg>.picList").children().eq(changeTotalNum*3-1).nextAll().css("display","none").children(".setInput").children("input").attr("disabled","true");

      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        }); 
      }
    });

    //返回按钮
    $scope.toBack=function(){
      $location.path("/order/"+orderListTarget);
      // window.history.back(-1);
    }

    //去轮胎记录页面
    $scope.toTireRecord=function(carId){
      $location.path("/tireServerRecord/"+carId);
    }

    //从假页返回
    $scope.toBackMain=function(){
      // console.log(123,$("#ponyShopAffirmTireServerPage"));
      $("#ponyShopAffirmTireServerOriginalPage").css("display","block").siblings().css("display","none");
    }

    // 拍示例摄假页
    $scope.toExamplePage=function(pageStr){
      $("#"+pageStr).css("display","block").siblings().css("display","none");
    }
    
    //符合要求，确认服务
    $scope.submitServer=function(){
      // 汽车照片
      var carImg=$("#userCarImgInput").val();
      // 行驶证照片
      var drivingImg=$("#userDriveImgInput").val();
      // 车架号照片
      // var carFrameImg=$("#userFrameNumImgInput").val();
      //  轮胎照片(1-6)
      // var tireImg1=$("#userTireImgInput1").val();
      // var tireImg2=$("#userTireImgInput2").val();
      // var tireImg3=$("#userTireImgInput3").val();
      // var tireImg4=$("#userTireImgInput4").val();
      // var tireImg5=$("#userTireImgInput5").val();
      // var tireImg6=$("#userTireImgInput6").val();
      // var tireImg7=$("#userTireImgInput7").val();
      // var tireImg8=$("#userTireImgInput8").val();
      // var tireImg9=$("#userTireImgInput9").val();
      // var tireImg10=$("#userTireImgInput10").val();
      // var tireImg11=$("#userTireImgInput11").val();
      // var tireImg12=$("#userTireImgInput12").val();

      //验证数据 
      if(!carImg){
        alertMsg("确定","请上传车辆照片",function(){}); 
        return;
      }

      // switch (changeTotalNum){
      //   case 1:
      //     if(!(tireImg1&&tireImg2&&tireImg3)){
      //       alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
      //       return;
      //     }
      //     break;
      //   case 2:
      //     if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6)){
      //       alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
      //       return;
      //     }
      //     break;
      //   case 3:
      //     if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6&&tireImg7&&tireImg8&&tireImg9)){
      //       alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
      //       return;
      //     }
      //     break;
      //   case 4:
      //     if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6&&tireImg7&&tireImg8&&tireImg9&&tireImg10&&tireImg11&&tireImg12)){
      //       alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
      //       return;
      //     }
      //     break;
      //   default:
      //     alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
      //     return; 
      // }
      
      // if(!carFrameImg){
      //   alertMsg("确定","请上传车架号照片",function(){}); 
      //   return;
      // }
      if(!drivingImg){
        alertMsg("确定","请上传行驶证照片",function(){}); 
        return;
      }

      // console.log($scope.orderListDetail[0].stock_no==1);
      //初始化表单
      var fData=new FormData(document.getElementById('affirmTireServerOriginalOrder'));
      //补充数据
      fData.append("producer_id",ponyUserId);
      fData.append("store_id",ponyShopId);
      fData.append("token",token);
      fData.append("order_id",orderId);
      fData.append("font_diff",0);
      fData.append("rear_diff",0);

      //通讯开始等待
      commStart();
      //上传数据
      $.ajax({
        type:"post",
        processData:false,
        contentType:false,
        url:"http://180.76.243.205:8383/_API/_serviceOrigin/submit",
        data:fData,
        success:function(data){
          commFinish();
          if(data.code=="E0000"){
            console.log(data);
            alertMsg("确定","提交成功",function(){
              window.location.href="index.html#/order/server";
            }); 
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            }); 
          }else{
            alertMsg("确定",data.message,function(){}); 
          }
        },
        error:function(err){
          commFinish();
          //console.log(err);
        }
      });

    }

    //拒绝服务
    $scope.refuseSubmit=function(){
      // refuseMsg(["确认","取消"],"请输入拒绝服务理由：",function(msg){
      //   // console.log("确定");
      //   // msg:输入信息
      //   // console.log(msg);
      //   //通讯开始等待
      //   commStart();
      //   $.ajax({
      //     type:"post",
      //     url:"http://180.76.243.205:8383/_API/_storeOrigin/denial",
      //     data:{
      //       producer_id:ponyUserId,
      //       store_id:ponyShopId,
      //       token:token,
      //       order_id:orderId,
      //       origin:msg
      //     },
      //     success:function(data){
      //       commFinish();
      //       console.log(data);
      //       if(data.code=="E0000"){
      //         alertMsg("确定","订单完结",function(){
      //           window.location.href="index.html#/order/finish";
      //         }); 
      //       }else if(data.code=="E0014"){
      //         alertMsg("确定",data.message,function(){
      //           window.location.href="index.html#/login";
      //         }); 
      //       }else{
      //         alertMsg("确定",data.message,function(){}); 
      //       }
      //     },
      //     error:function(err){
      //       commFinish();
      //       console.log(err);
      //     }
      //   });

      // },function(){
      //   console.log("取消");
      // });
      
      //显示出拒绝服务选项
      $("#ponyShopAffirmTireServerOriginalPage>.rejectCase").css("display",'block');

    }

    //回退厂家
    $scope.returnFactory=function(){
      commStart();
      $.ajax({
        type:"post",
        url:"http://180.76.243.205:8383/_API/_storePending/return",
        data:{
          producer_id:ponyUserId,
          store_id:ponyShopId,
          token:token,
          order_id:orderId
        },
        success:function(data){
          commFinish();
          console.log(data);
          if(data.code=="E0000"){
            alertMsg("确定","订单退回",function(){
              window.location.href="index.html#/order/all";
            }); 
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            }); 
          }else{
            alertMsg("确定",data.message,function(){}); 
          }
        },
        error:function(err){
          commFinish();
          console.log(err);
        }
      });
    }

    //客户自提
    $scope.arayacak=function(){
      commStart();
      $.ajax({
        type:"post",
        url:"http://180.76.243.205:8383/_API/_storeShoe/returnBySelf",
        data:{
          producer_id:ponyUserId,
          store_id:ponyShopId,
          token:token,
          order_id:orderId
        },
        success:function(data){
          commFinish();
          console.log(data);
          if(data.code=="E0000"){
            alertMsg("确定","订单完结",function(){
              window.location.href="index.html#/order/finish";
            }); 
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            }); 
          }else{
            alertMsg("确定",data.message,function(){}); 
          }
        },
        error:function(err){
          commFinish();
          console.log(err);
        }
      });
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){

      //汽车照片
      $("#userCarImgInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userCarImgPic").attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userCarImgPic").attr('src', e.target.result);
        }
      }); 

      // 轮胎照片
      // $("#ponyShopAffirmTireServerOriginalPage>.orderDetail>form>.userTireImg").on("change","input",function(){
      //   var targetImg=$(this).parent().prev().children("img");
      //   var file= this.files[0];
      //   if(file==null){
      //     targetImg.attr('src', "img/addImg.jpg");
      //     return;
      //   }
      //   var render=new FileReader();
      //   render.readAsDataURL(file)
      //   render.onloadend=function(e){
      //     targetImg.attr('src', e.target.result);
      //   }
      // });

      //车架号照片
      // $("#userFrameNumImgInput").change(function(e){
      //   //console.log(e.target.files[0]);
      //   var file= this.files[0];
      //   if(file==null){
      //     $("#userFrameNumImgPic").attr('src', "img/addImg.jpg");
      //     return;
      //   }
      //   var render=new FileReader();
      //   render.readAsDataURL(file)
      //   render.onloadend=function(e){
      //     $("#userFrameNumImgPic").attr('src', e.target.result);
      //   }
      // });
      //行驶证照片
      $("#userDriveImgInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userDriveImgPic").attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userDriveImgPic").attr('src', e.target.result);
        }
      });

      //关闭拒绝服务选择
      $("#ponyShopAffirmTireServerOriginalPage>.rejectCase").click(function(){
        $("#ponyShopAffirmTireServerOriginalPage>.rejectCase").css('display','none');
      });


      // 后三个禁用
      // $("#ponyShopAffirmTireServerOriginalPage>.orderDetail>.userTireImg>.picList").children().eq(2).nextAll().css("display","none").children(".setInput").children("input").attr("disabled","true");

    });

  });

  //轮胎服务(免费再换)确认页面
  ponyShopApp.controller("ponyShopAffirmTireServerFreeChangeCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;

    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];
  
    //获取传入订单ID
    var orderId=$routeParams.orderId;

    //订单数据
    $scope.orderDate=null;
    // 订单列表数据
    $scope.orderListDetail=[];    

    //总更换数量
    var changeTotalNum=1;

    //前后轮胎尺寸数据
    $scope.fontSize=null;
    $scope.rearSize=null;

    // 最大可补差更换数量 分前后胎
    var maxSupplementFontNum=2;
    var maxSupplementRearNum=2;

    // 补差换胎数量
    $scope.supplementFontTireNum=0;
    $scope.supplementRearTireNum=0;

    // 补差换胎数量减少
    $scope.supplementMinusNum=function(targetLoactaion){
      if(targetLoactaion=='font'){
        if($scope.supplementFontTireNum>0){
          $scope.supplementFontTireNum--;
        }
      }else{
        if($scope.supplementRearTireNum>0){
          $scope.supplementRearTireNum--;
        }
      }
    }

    // 补差换胎数量增加
    $scope.supplementPlusNum=function(targetLoactaion){
      if(targetLoactaion=='font'){
        if($scope.supplementFontTireNum<maxSupplementFontNum){
          $scope.supplementFontTireNum++;
        }
      }else{
        if($scope.supplementRearTireNum<maxSupplementRearNum){
          $scope.supplementRearTireNum++;
        }
      }

    }

    //返回按钮
    $scope.toBack=function(){
      // console.log("123");
      // window.history.back(-1);
      $location.path("/order/"+orderListTarget);
    }

    //去轮胎记录页面
    $scope.toTireRecord=function(shopId){
      $location.path("/tireServerRecord/"+shopId);
    }

    //从假页返回
    $scope.toBackMain=function(){
      // console.log(123,$("#ponyShopAffirmTireServerPage"));
      $("#ponyShopAffirmTireServerFreeChangePage").css("display","block").siblings().css("display","none");
    }

    // 拍示例摄假页
    $scope.toExamplePage=function(pageStr){
      $("#"+pageStr).css("display","block").siblings().css("display","none");
    }

    //提交符合要求免费再换的按钮
    $scope.submitFreeChange=function(){
      // 汽车照片
      var carImg=$("#userCarImgInput").val();
      // 行驶证照片
      var drivingImg=$("#userDriveImgInput").val();
      // 车架号照片
      var carFrameImg=$("#userFrameNumImgInput").val();
      //  轮胎照片(1-6)
      var tireImg1=$("#userTireImgInput1").val();
      var tireImg2=$("#userTireImgInput2").val();
      var tireImg3=$("#userTireImgInput3").val();
      var tireImg4=$("#userTireImgInput4").val();
      var tireImg5=$("#userTireImgInput5").val();
      var tireImg6=$("#userTireImgInput6").val();
      var tireImg7=$("#userTireImgInput7").val();
      var tireImg8=$("#userTireImgInput8").val();
      var tireImg9=$("#userTireImgInput9").val();
      var tireImg10=$("#userTireImgInput10").val();
      var tireImg11=$("#userTireImgInput11").val();
      var tireImg12=$("#userTireImgInput12").val();

      var makeUpFontTire=$("#makeUpFontTireNum").html();
      var makeUpRearTire=$("#makeUpRearTireNum").html();

      //验证数据 
      if(!carImg){
        alertMsg("确定","请上传车辆照片",function(){}); 
        return;
      }

      switch (changeTotalNum){
        case 1:
          if(!(tireImg1&&tireImg2&&tireImg3)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        case 2:
          if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        case 3:
          if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6&&tireImg7&&tireImg8&&tireImg9)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        case 4:
          if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6&&tireImg7&&tireImg8&&tireImg9&&tireImg10&&tireImg11&&tireImg12)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        default:
          alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
          return; 
      }

      if(!carFrameImg){
        alertMsg("确定","请上传车架号照片",function(){}); 
        return;
      }
      if(!drivingImg){
        alertMsg("确定","请上传行驶证照片",function(){}); 
        return;
      }


      //初始化表单
      var fData=new FormData(document.getElementById('affirmTireServerFreeChangeOrder'));
      //补充数据
      fData.append("producer_id",ponyUserId);
      fData.append("store_id",ponyShopId);
      fData.append("token",token);
      fData.append("order_id",orderId);
      fData.append("font_diff",makeUpFontTire);
      fData.append("rear_diff",makeUpRearTire);

      
      if((parseInt(makeUpFontTire)+parseInt(makeUpRearTire))<changeTotalNum){
        if((parseInt(makeUpFontTire)+parseInt(makeUpRearTire))==0){
          //通讯开始等待
          commStart();
          //上传数据
          $.ajax({
            type:"post",
            processData:false,
            contentType:false,
            url:"http://180.76.243.205:8383/_API/_service/submit",
            data:fData,
            success:function(data){
              commFinish();
              if(data.code=="E0000"){
                console.log(data);
                alertMsg("确定","提交成功",function(){
                  window.location.href="index.html#/order/server";
                }); 
              }else if(data.code=="E0014"){
                alertMsg("确定",data.message,function(){
                  window.location.href="index.html#/login";
                }); 
              }else{
                alertMsg("确定",data.message,function(){}); 
              }
            },
            error:function(err){
              commFinish();
              //console.log(err);
            }
          });  
        }else{
          confirmMsg(["确认","取消"],"免费更换的轮胎："+(changeTotalNum-(parseInt(makeUpFontTire)+parseInt(makeUpRearTire)))+"条",function(){
            // console.log("确定");
            //上传数据
            //通讯开始等待
            commStart();
            $.ajax({
              type:"post",
              processData:false,
              contentType:false,
              url:"http://180.76.243.205:8383/_API/_service/submit",
              data:fData,
              success:function(data){
                commFinish();
                if(data.code=="E0000"){
                  console.log(data);
                  alertMsg("确定","提交成功",function(){
                    window.location.href="index.html#/order/server";
                  }); 
                }else if(data.code=="E0014"){
                  alertMsg("确定",data.message,function(){
                    window.location.href="index.html#/login";
                  }); 
                }else{
                  alertMsg("确定",data.message,function(){}); 
                }
              },
              error:function(err){
                commFinish();
                //console.log(err);
              }
            });  
          },function(){
            console.log("取消");
          });
        }
      }else{
        alertMsg("确定","您没有可以免费更换的数量",function(){}); 
      }

    }

    //提交补差服务按钮
    $scope.submitMakeUpServer=function(){
      // 汽车照片
      var carImg=$("#userCarImgInput").val();
      // 行驶证照片
      var drivingImg=$("#userDriveImgInput").val();
      // 车架号照片
      var carFrameImg=$("#userFrameNumImgInput").val();
      //  轮胎照片(1-6)
      var tireImg1=$("#userTireImgInput1").val();
      var tireImg2=$("#userTireImgInput2").val();
      var tireImg3=$("#userTireImgInput3").val();
      var tireImg4=$("#userTireImgInput4").val();
      var tireImg5=$("#userTireImgInput5").val();
      var tireImg6=$("#userTireImgInput6").val();
      var tireImg7=$("#userTireImgInput7").val();
      var tireImg8=$("#userTireImgInput8").val();
      var tireImg9=$("#userTireImgInput9").val();
      var tireImg10=$("#userTireImgInput10").val();
      var tireImg11=$("#userTireImgInput11").val();
      var tireImg12=$("#userTireImgInput12").val();

      var makeUpFontTire=$("#makeUpFontTireNum").html();
      var makeUpRearTire=$("#makeUpRearTireNum").html();

      //验证数据 
      if(!carImg){
        alertMsg("确定","请上传车辆照片",function(){}); 
        return;
      }

      switch (changeTotalNum){
        case 1:
          if(!(tireImg1&&tireImg2&&tireImg3)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        case 2:
          if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        case 3:
          if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6&&tireImg7&&tireImg8&&tireImg9)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        case 4:
          if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6&&tireImg7&&tireImg8&&tireImg9&&tireImg10&&tireImg11&&tireImg12)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        default:
          alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
          return; 
      }


      if(!carFrameImg){
        alertMsg("确定","请上传车架号照片",function(){}); 
        return;
      }
      if(!drivingImg){
        alertMsg("确定","请上传行驶证照片",function(){}); 
        return;
      }
      if((parseInt(makeUpFontTire)+parseInt(makeUpRearTire))<1){
        alertMsg("确定","请选择需补差轮胎数量",function(){}); 
        return;
      }
      //初始化表单
      var fData=new FormData(document.getElementById('affirmTireServerFreeChangeOrder'));
      //补充数据
      fData.append("producer_id",ponyUserId);
      fData.append("store_id",ponyShopId);
      fData.append("token",token);
      fData.append("order_id",orderId);
      fData.append("font_diff",makeUpFontTire);
      fData.append("rear_diff",makeUpRearTire);
      //通讯开始等待
      commStart();
      //上传数据
      $.ajax({
        type:"post",
        processData:false,
        contentType:false,
        url:"http://180.76.243.205:8383/_API/_balance/payment",
        data:fData,
        success:function(data){
          commFinish();
          if(data.code=="E0000"){
            console.log(data);
            alertMsg("确定","补差提交成功",function(){
              window.location.href="index.html#/order/server";
            }); 
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            }); 
          }else{
            alertMsg("确定",data.message,function(){}); 
          }
        },
        error:function(err){
          commFinish();
          //console.log(err);
        }
      });  



    }

    //提交拒绝服务按钮
    $scope.submitRefuse=function(){
      confirmMsg(["确认","取消"],"您确认客户拒绝服务吗？",function(msg){
        // console.log("确定");
        // msg:输入信息
        // console.log(msg);
        //通讯开始等待
        commStart();        
        $.ajax({
          type:"post",
          url:"http://180.76.243.205:8383/_API/_service/denial",
          data:{
            producer_id:ponyUserId,
            store_id:ponyShopId,
            token:token,
            order_id:orderId
          },
          success:function(data){
            commFinish();
            console.log(data);
            if(data.code=="E0000"){
              alertMsg("确定","订单已提交",function(){
                window.location.href="index.html#/order/finish";
              }); 
            }else if(data.code=="E0014"){
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              }); 
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          },
          error:function(err){
            commFinish();
            console.log(err);
          }
        });

      },function(){
        console.log("取消");
      });
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){

      // 获取数据 
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_storeOrder/getSingle",
        data:"producer_id="+ponyUserId+"&store_id="+ponyShopId+"&token="+token+"&order_id="+orderId
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          $scope.orderDate=data.data.orderInfo;
          $scope.orderListDetail=data.data.details;
          maxSupplementFontNum=data.data.details[0].stock_no;
          if(data.data.details[1]){
            maxSupplementRearNum=data.data.details[1].stock_no;
          }
          $scope.fontSize=data.data.font_size;
          $scope.rearSize=data.data.rear_size;

          // 多少个免费再换轮胎 要上传的照片数量
          changeTotalNum=data.data.shoe_no;
          $("#ponyShopAffirmTireServerFreeChangePage>.orderDetail>form>.userTireImg>.picList").children().eq(changeTotalNum*3-1).nextAll().css("display","none").children(".setInput").children("input").attr("disabled","true");

        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          }); 
        }
      });

      //汽车照片
      $("#userCarImgInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userCarImgPic").attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userCarImgPic").attr('src', e.target.result);
        }
      }); 

      // 轮胎照片
      $("#ponyShopAffirmTireServerFreeChangePage>.orderDetail>form>.userTireImg").on("change","input",function(){
        var targetImg=$(this).parent().prev().children("img");
        var file= this.files[0];
        if(file==null){
          targetImg.attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          targetImg.attr('src', e.target.result);
        }
      });

      //车架号照片
      $("#userFrameNumImgInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userFrameNumImgPic").attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userFrameNumImgPic").attr('src', e.target.result);
        }
      });
      //行驶证照片
      $("#userDriveImgInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userDriveImgPic").attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userDriveImgPic").attr('src', e.target.result);
        }
      });

      // 后三个禁用
      // $("#ponyShopAffirmTireServerOriginalPage>.orderDetail>.userTireImg>.picList").children().eq(2).nextAll().css("display","none").children(".setInput").children("input").attr("disabled","true");

    });

  });

  //轮胎服务(免费修补)确认页面
  ponyShopApp.controller("ponyShopAffirmTireServerRepairCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;
    
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //获取传入订单ID
    var orderId=$routeParams.orderId;

    //订单数据
    $scope.orderDate=null;
    // 订单列表数据
    $scope.orderListDetail=[];   

    //通讯开始等待
    commStart();
    // 获取数据 
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_storeOrder/getSingle",
      data:"producer_id="+ponyUserId+"&store_id="+ponyShopId+"&token="+token+"&order_id="+orderId
    }).success(function(data){
      commFinish();
      console.log(data);
      if(data.code=="E0000"){
        $scope.orderDate=data.data.orderInfo;
        $scope.orderListDetail=data.data.details;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        }); 
      }
    });

    // 轮胎修补数量（左前轮，右前轮，左后轮，右后轮）
    $scope.leftFontTireNum=0;
    $scope.rightFontTireNum=0;
    $scope.leftRearTireNum=0;
    $scope.rightRearTireNum=0;

    //返回按钮
    $scope.toBack=function(){
      // window.history.back(-1);
      $location.path("/order/"+orderListTarget);
    }

    //去轮胎记录页面
    $scope.toTireRecord=function(){
      $location.path("/tireServerRecord");
    }

    //从假页返回
    $scope.toBackMain=function(){
      // console.log(123,$("#ponyShopAffirmTireServerPage"));
      $("#ponyShopAffirmTireServerRepairPage").css("display","block").siblings().css("display","none");
    }

    // 拍示例摄假页
    $scope.toExamplePage=function(pageStr){
      $("#"+pageStr).css("display","block").siblings().css("display","none");
    }
    
    //提交符合条件，确认服务
    $scope.submitServer=function(){
      // 汽车照片
      var carImg=$("#userCarImgInput").val();
      // 行驶证照片
      var drivingImg=$("#userDriveImgInput").val();
      // 车架号照片
      // var carFrameImg=$("#userFrameNumImgInput").val();
      //  轮胎照片(1-6)
      var tireImg1=$("#userTireImgInput1").val();
      var tireImg2=$("#userTireImgInput2").val();
      var tireImg3=$("#userTireImgInput3").val();
      var tireImg4=$("#userTireImgInput4").val();
      var tireImg5=$("#userTireImgInput5").val();
      var tireImg6=$("#userTireImgInput6").val();
      var tireImg7=$("#userTireImgInput7").val();
      var tireImg8=$("#userTireImgInput8").val();
      var tireImg9=$("#userTireImgInput9").val();
      var tireImg10=$("#userTireImgInput10").val();
      var tireImg11=$("#userTireImgInput11").val();
      var tireImg12=$("#userTireImgInput12").val();

      var makeUpTire=$("#makeUpTireNum").html();

      // 总共要传照片数量
      var leftFontNum=$scope.leftFontTireNum>0?1:0;
      var rightFontNum=$scope.rightFontTireNum>0?1:0;
      var leftRearNum=$scope.leftRearTireNum>0?1:0;
      var rightRearNum=$scope.rightRearTireNum>0?1:0;

      //验证数据 
      if((leftFontNum+rightFontNum+leftRearNum+rightRearNum)<1){
        alertMsg("确定","请选择你要修补的车胎",function(){}); 
        return;
      }
      if(!carImg){
        alertMsg("确定","请上传车辆照片",function(){}); 
        return;
      }
      switch ((leftFontNum+rightFontNum+leftRearNum+rightRearNum)){
        case 1:
          if(!(tireImg1&&tireImg2&&tireImg3)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        case 2:
          if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        case 3:
          if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6&&tireImg7&&tireImg8&&tireImg9)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        case 4:
          if(!(tireImg1&&tireImg2&&tireImg3&&tireImg4&&tireImg5&&tireImg6&&tireImg7&&tireImg8&&tireImg9&&tireImg10&&tireImg11&&tireImg12)){
            alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
            return;
          }
          break;
        default:
          alertMsg("确定","轮胎照片不完整，请上传完整",function(){}); 
          return; 
      }
      // if(!carFrameImg){
      //   alertMsg("确定","请上传车架号照片",function(){}); 
      //   return;
      // }
      if(!drivingImg){
        alertMsg("确定","请上传行驶证照片",function(){}); 
        return;
      }

      //初始化表单
      var fData=new FormData(document.getElementById('affirmTireServerRepairOrder'));
      //补充数据
      fData.append("producer_id",ponyUserId);
      fData.append("store_id",ponyShopId);
      fData.append("token",token);
      fData.append("order_id",orderId);
      fData.append("description","左前轮修补："+$scope.leftFontTireNum+"处,右前轮修补："+$scope.rightFontTireNum+"处,左后轮修补："+$scope.leftRearTireNum+"处,右后轮修补："+$scope.rightRearTireNum+"处");
      //通讯开始等待
      commStart();
      //上传数据
      $.ajax({
        type:"post",
        processData:false,
        contentType:false,
        url:"http://180.76.243.205:8383/_API/_freeService/submit",
        data:fData,
        success:function(data){
          commFinish();
          if(data.code=="E0000"){
            console.log(data);
            alertMsg("确定","提交成功",function(){
              window.location.href="index.html#/order/server";
            }); 
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            }); 
          }else{
            alertMsg("确定",data.message,function(){}); 
          }
        },
        error:function(err){
          commFinish();
          //console.log(err);
        }
      });
      
      
    }

    //提交拒绝服务
    $scope.submitRefuse=function(){
      refuseMsg(["确认","取消"],"请输入拒绝服务理由:",function(msg){
        // console.log("确定");
        // msg:输入信息
        // console.log(msg);
        //通讯开始等待
        commStart();
        $.ajax({
          type:"post",
          url:"http://180.76.243.205:8383/_API/_shoePatch/denial",
          data:{
            producer_id:ponyUserId,
            store_id:ponyShopId,
            token:token,
            order_id:orderId,
            origin:msg
          },
          success:function(data){
            commFinish();
            console.log(data);
            if(data.code=="E0000"){
              alertMsg("确定","订单完结",function(){
                window.location.href="index.html#/order/finish";
              }); 
            }else if(data.code=="E0014"){
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              }); 
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          },
          error:function(err){
            commFinish();
            console.log(err);
          }
        });

      },function(){
        console.log("取消");
      });
    }


    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){

      // 修补胎数量减少
      $("#ponyShopAffirmTireServerRepairPage>.orderDetail>.orderTireRepairNum>ul").on("click",".supplementMinus",function(){
        var target=$(this).attr("data-location");
        // console.log(target);
        switch (target){
          case "leftFont":
            if($scope.leftFontTireNum>0){
              $scope.leftFontTireNum--;
            }
            break;
          case "rightFont":
            if($scope.rightFontTireNum>0){
              $scope.rightFontTireNum--;
            }
            break;
          case "leftRear":
            if($scope.leftRearTireNum>0){
              $scope.leftRearTireNum--;
            }
            break;
          case "rightRear":
            if($scope.rightRearTireNum>0){
              $scope.rightRearTireNum--;
            }
            break;
        }
        $scope.$apply();
        // 总共要传照片数量
        var leftFontNum=$scope.leftFontTireNum>0?1:0;
        var rightFontNum=$scope.rightFontTireNum>0?1:0;
        var leftRearNum=$scope.leftRearTireNum>0?1:0;
        var rightRearNum=$scope.rightRearTireNum>0?1:0;
        
        // 后几个轮胎图片禁用
        // console.log((leftFontNum+rightFontNum+leftRearNum+rightRearNum)==0);
        if((leftFontNum+rightFontNum+leftRearNum+rightRearNum)==0){
          $("#ponyShopAffirmTireServerRepairPage>.orderDetail>form>.userTireImg>.picList").children().css("display","none").children(".setInput").children("input").attr("disabled","true"); 
        }else{
          $("#ponyShopAffirmTireServerRepairPage>.orderDetail>form>.userTireImg>.picList").children().css("display","block").children(".setInput").children("input").removeAttr("disabled");
          $("#ponyShopAffirmTireServerRepairPage>.orderDetail>form>.userTireImg>.picList").children().eq((leftFontNum+rightFontNum+leftRearNum+rightRearNum)*3-1).nextAll().css("display","none").children(".setInput").children("input").attr("disabled","true"); 
        }

      });

      // 修补胎数量增加
      $("#ponyShopAffirmTireServerRepairPage>.orderDetail>.orderTireRepairNum>ul").on("click",".supplementAdd",function(){
        var target=$(this).attr("data-location");
        // console.log(target);
        switch (target){
          case "leftFont":
            if($scope.leftFontTireNum<3){
              $scope.leftFontTireNum++;
            }else{
              alertMsg("确定","每条轮胎最多被修补3处",function(){}); 
            }
            // console.log($scope.leftFontTireNum);
            break;
          case "rightFont":
            if($scope.rightFontTireNum<3){
              $scope.rightFontTireNum++;
            }else{
              alertMsg("确定","每条轮胎最多被修补3处",function(){}); 
            }
            break;
          case "leftRear":
            if($scope.leftRearTireNum<3){
              $scope.leftRearTireNum++;
            }else{
              alertMsg("确定","每条轮胎最多被修补3处",function(){}); 
            }
            break;
          case "rightRear":
            if($scope.rightRearTireNum<3){
              $scope.rightRearTireNum++;
            }else{
              alertMsg("确定","每条轮胎最多被修补3处",function(){}); 
            }
            break;
        }     
        $scope.$apply();  

        // 总共要传照片数量
        var leftFontNum=$scope.leftFontTireNum>0?1:0;
        var rightFontNum=$scope.rightFontTireNum>0?1:0;
        var leftRearNum=$scope.leftRearTireNum>0?1:0;
        var rightRearNum=$scope.rightRearTireNum>0?1:0;
        
        // 后几个轮胎图片禁用
        // console.log((leftFontNum+rightFontNum+leftRearNum+rightRearNum)==0);
        if((leftFontNum+rightFontNum+leftRearNum+rightRearNum)==0){
          $("#ponyShopAffirmTireServerRepairPage>.orderDetail>form>.userTireImg>.picList").children().css("display","none").children(".setInput").children("input").attr("disabled","true"); 
        }else{
          $("#ponyShopAffirmTireServerRepairPage>.orderDetail>form>.userTireImg>.picList").children().css("display","block").children(".setInput").children("input").removeAttr("disabled");
          $("#ponyShopAffirmTireServerRepairPage>.orderDetail>form>.userTireImg>.picList").children().eq((leftFontNum+rightFontNum+leftRearNum+rightRearNum)*3-1).nextAll().css("display","none").children(".setInput").children("input").attr("disabled","true"); 
        }
      });

      //汽车照片
      $("#userCarImgInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userCarImgPic").attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userCarImgPic").attr('src', e.target.result);
        }
      }); 

      // 轮胎照片
      $("#ponyShopAffirmTireServerRepairPage>.orderDetail>form>.userTireImg").on("change","input",function(){
        var targetImg=$(this).parent().prev().children("img");
        var file= this.files[0];
        if(file==null){
          targetImg.attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          targetImg.attr('src', e.target.result);
        }
      });

      //车架号照片
      $("#userFrameNumImgInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userFrameNumImgPic").attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userFrameNumImgPic").attr('src', e.target.result);
        }
      });
      //行驶证照片
      $("#userDriveImgInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userDriveImgPic").attr('src', "img/addImg.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userDriveImgPic").attr('src', e.target.result);
        }
      });



    });
  });

  //其他服务确认页面
  ponyShopApp.controller("ponyShopAffirmOtherServerCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;

    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //获取传入订单ID
    var orderId=$routeParams.orderId;

    //订单数据
    $scope.orderDate=null;
    // 订单列表数据
    $scope.orderListDetail=[];
    //用户使用优惠券列表
    $scope.usedCoupon=[];

    //轮胎照片
    $scope.tireImg=[];
    //车辆照片
    $scope.carImg=[];
    //车架号照片
    $scope.carFrame=[];
    //行驶证照片
    $scope.drivingImg=[];  
    

    //订单类别数据
    var orderStatus=null;
    var orderStage=null;
    var orderTypeId=null;
    
    //通讯开始等待
    commStart();
    // 获取数据 
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_storeOrder/getSingle",
      data:"producer_id="+ponyUserId+"&store_id="+ponyShopId+"&token="+token+"&order_id="+orderId
    }).success(function(data){
      commFinish();
      console.log(data);
      if(data.code=="E0000"){
        $scope.orderDate=data.data.orderInfo;
        $scope.orderListDetail=data.data.details;
        $scope.usedCoupon=data.data.sales_history;

        if(data.data.orderInfo.order_type_id==1){
          for(var i=0,len=data.data.orderImg.length;i<len;i++){
            var one=data.data.orderImg[i];
            if(one.type==1){
              //轮胎照片
              $scope.tireImg.push(one);
            }else if(one.type==2){
              //车架号
              $scope.carFrame.push(one);
            }else if(one.type==3){
              //行驶证
              $scope.drivingImg.push(one);
            }else if(one.type==4){
              //车辆本身
              $scope.carImg.push(one);
            }
          }
        }else{
          $("#orderAffirmServerPage>.orderDetail>.userDriveImg,#orderAffirmServerPage>.orderDetail>.userFrameNumImg#orderAffirmServerPage>.orderDetail>.userTireImg,#orderAffirmServerPage>.orderDetail>.userCarImg").css("display","none");
        }

        // stopId=data.data.orderInfo.store_id;

        orderStatus=data.data.orderInfo.status;
        orderStage=data.data.orderInfo.stage;
        orderTypeId=data.data.orderInfo.subtype_id;
        orderServerType=data.data.orderInfo.order_type_id;

        // console.log($scope.orderDate.origin!=null&&$scope.orderDate.origin!='');

        switch (orderStatus){
          //交易完成
          case '1':
            // one.btnName="已评价";
            $("#affirmServerSubmitBtn").css({
              backgroundColor:'#b4b4b4',
              border:0
            }).html("已完成");
            break;
          //待发货
          case '5':
            // one.btnName="取消订单";
            $("#affirmServerSubmitBtn").css({
              backgroundColor:'#b4b4b4',
              border:0
            }).html("等待发货");
            break;
          //待商家确认服务
          case '3':
            if(orderStage==1){
              if(orderTypeId==1&&orderServerType==1){
                //原厂更换
                // $location.path("/affirmTireServerOriginal/"+orderId);
              }else if(orderTypeId==2&&orderServerType==1){
                // 免费再换 
                // $location.path("/affirmTireServerFreeChange/"+orderId);
              }else if(orderTypeId==3&&orderServerType==1){
                //免费修补
                // $location.path("/affirmTireServerRepair/"+orderId);
              }else{
                //其他
                $("#affirmServerSubmitBtn").css({
                  backgroundColor:'#ee2625',
                  border:0
                }).html("确认服务");
              }
            }else if(orderStage==2||orderStage==4){
              // one.btnName="等待车主确认";
              $("#affirmServerSubmitBtn").css({
                backgroundColor:'#b4b4b4',
                border:0
              }).html("等待确认");
            }else if(orderStage==3||orderStage==5){
              // one.btnName="服务完成";
              $("#affirmServerSubmitBtn").css({
                backgroundColor:'#ee2625',
                border:0
              }).html("完成服务");
            }
            break;
          //待收货
          case '2':
            // 确认收货
            $("#affirmServerSubmitBtn").css({
              backgroundColor:'#ee2625',
              border:0
            }).html("确认收货");
            break;
          //待订单服务确认
          case '6':
            // 等待确认服务（车主）
            $("#affirmServerSubmitBtn").css({
              backgroundColor:'#b4b4b4',
              border:0
            }).html("等待确认");
            break;
          case '7':
            // one.btnName="未评价";
            $("#affirmServerSubmitBtn").css({
              backgroundColor:'#b4b4b4',
              border:0
            }).html("已完成");
            break;
          }
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        }); 
      }
    });

    //返回按钮
    $scope.toBack=function(){
      $location.path("/order/"+orderListTarget);
    }

    //去轮胎记录页面
    $scope.toTireRecord=function(carId){
      $location.path("/tireServerRecord/"+carId);
    }

    //提交按钮功能
    $scope.submitFun=function(){
      // console.log(orderStatus,orderStage,orderTypeId);
      switch (orderStatus){
        //待商家确认服务
        case '3':
          if(orderStage==1){
            if(orderTypeId==1){
              //原厂更换
              $location.path("/affirmTireServerOriginal/"+orderId);
            }else if(orderTypeId==2){
              // 免费再换 
              $location.path("/affirmTireServerFreeChange/"+orderId);
            }else if(orderTypeId==3){
              //免费修补
              $location.path("/affirmTireServerRepair/"+orderId);
            }else{
              //其他
              //通讯开始等待
              commStart();
              $http({
                method:"post",
                url:"http://180.76.243.205:8383/_API/_service/complete",
                data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId+"&order_id="+orderId
              }).success(function(data){
                // console.log(data);
                commFinish();
                if(data.code=="E0000"){
                  alertMsg("确定","服务完成",function(){
                    window.location.href="index.html#/order/server";
                  }); 
                }else if(data.code=="E0014"){
                  alertMsg("确定",data.message,function(){
                    window.location.href="index.html#/login";
                  }); 
                }else{
                  alertMsg("确定",data.message,function(){}); 
                }
              });
            }
          }else if(orderStage==2||orderStage==4){
            // one.btnName="等待车主确认";

          }else if(orderStage==3||orderStage==5){
            // one.btnName="服务完成";
            //通讯开始等待
            commStart();
            $http({
              method:"post",
              url:"http://180.76.243.205:8383/_API/_service/complete",
              data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId+"&order_id="+orderId
            }).success(function(data){
              // console.log(data);
              commFinish();
              if(data.code=="E0000"){
                alertMsg("确定","服务完成",function(){
                  window.location.href="index.html#/order/server";
                }); 
              }else if(data.code=="E0014"){
                alertMsg("确定",data.message,function(){
                  window.location.href="index.html#/login";
                }); 
              }else{
                alertMsg("确定",data.message,function(){}); 
              }
            });
          }
          break;
        //待收货
        case '2':
          // 确认收货
          //通讯开始等待
          commStart();
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_storeDelivery/take",
            data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId+"&order_id="+orderId
          }).success(function(data){
            // console.log(data);
            commFinish();
            if(data.code=="E0000"){
              alertMsg("确定","收货成功",function(){
                window.location.href="index.html#/order/server";
              }); 
            }else if(data.code=="E0014"){
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              }); 
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          });
          break;

        }
    }

  });

  //订单详情页面
  ponyShopApp.controller("ponyShopOrderDetailCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;
    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //获取传入订单ID
    var orderId=$routeParams.orderId;

    //订单数据
    $scope.orderDate=null;
    //订单服务详情
    $scope.orderDetail=[];
    //用户使用优惠券列表
    $scope.usedCoupon=[];

    //通讯开始等待
    commStart();
    //获取数据 
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_order/get",
      data:"producer_id="+ponyUserId+"&store_id="+ponyShopId+"&token="+token+"&order_id="+orderId
    }).success(function(data){
      commFinish();
      console.log(data);
      if(data.code=="E0000"){
        $scope.orderDate=data.data.orderInfo;
        if(data.data.details){
          $scope.orderDetail=data.data.details;
        }else{
          $scope.orderDetail.push({
            description:data.data.orderInfo.description,
            img:data.data.orderInfo.img,
            no:0,
            price:data.data.orderInfo.total,
            title:data.data.orderInfo.subtype_name,
            total:data.data.orderInfo.total,
          });
        }
        $scope.usedCoupon=data.data.sales_history;
      }else if(data.code=='E0014'){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        }); 
      }else{
        alertMsg("确定",data.message,function(){}); 
      }
    });

    //返回按钮
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //去轮胎面列表页面
    $scope.toTireRecord=function(carId){
      $location.path("/tireServerRecord/"+carId);
    }

  });

  //轮胎服务记录页面
  ponyShopApp.controller("tireServerRecordCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;
    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];
    
    //获取传入carID
    var carId=$routeParams.carId;
    // console.log(carId);

    //轮胎服务记录页面数据
    $scope.tireServerDate=[];

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_shoeServiceHistory/get",
      data:"producer_id="+ponyUserId+"&store_id="+ponyShopId+"&token="+token+"&user_car_id="+carId
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        $scope.tireServerDate=data.data;
      }else if(data.code=='E0014'){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        }); 
      }else{
        alertMsg("确定",data.message,function(){
          window.history.back(-1);
        }); 
      }
    });



    //页面返回按钮
    $scope.toBack=function(){
      window.history.back(-1);
    }

  });

  //店铺收益列表页面
  ponyShopApp.controller("ponyShopEarningsListCtrl",function($scope,$http,$location){
    $scope.height=vHeight;
    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //店铺收益数据
    $scope.shopEarningsDate=null;

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_storeHome/get",
      data:"producer_id="+ponyUserId+"&store_id="+ponyShopId+"&token="+token
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        $scope.shopEarningsDate=data.data;
      }else{
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/main";
        }); 
      }
    });

  });

  //我的用户设置页面
  ponyShopApp.controller("ponyShopUserSettingCtrl",function($scope,$http,$location){
    $scope.height=vHeight;
    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //店铺收益数据
    $scope.shopDate=null;

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_storeHome/get",
      data:"producer_id="+ponyUserId+"&store_id="+ponyShopId+"&token="+token
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        $scope.shopDate=data.data;
      }else{
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/main";
        }); 
      }
    });

    //退出当前帐号
    $scope.exitAccount=function(){
      confirmMsg(["确认","取消"],"是否退出当前帐号？",function(){
        // console.log("确定");
        ponyShopDate=null;
        localStorage["ponyShopUserTel"]='';
        localStorage["ponyShopUserPwd"]='';
        sessionStorage.clear();
        // $location.path('/login');
        window.location.href="index.html#/login";
      },function(){
        // console.log("取消");
      });

    }

  });

  // 我的店铺设置页面
  ponyShopApp.controller("ponyShopUserShopSettingCtrl",function($scope,$http,$location){
    $scope.height=vHeight;
    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //省份数据
    $scope.provinceArr=[];
    //城市数据
    $scope.cityArr=[];
    //地区数据
    $scope.areaArr=[];
    //店铺类型
    $scope.shopType=[];
    //地区数据获取完成
    var isShopCity=false;
    //店铺类型数据获取完成
    var isShopType=false;

    //店铺本身数据
    $scope.userShopDate=null;

    //店铺评论数据
    $scope.userShopComment=[];

    //店铺GPS地址数据
    $scope.userShopGPS="";

    //获取店铺评论数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_storeCommit/getList",
      data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId
    }).success(function(data){
      // console.log(data)
      if(data.code=="E0000"){
        $scope.userShopComment=data.data;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        }); 
      }else{
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/main";
        }); 
      }
    });

    //返回按钮
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //返回主页面
    $scope.toBackMain=function(){
      $("#ponyShopUserShopSettingPage").css("display","block").siblings().css("display","none");
    }

    // 去地图定位页面
    $scope.toMapLocation=function(){

      $("#ponyShopLocationPage").css("display","block").siblings().css("display","none");
      var lon=$("#mapLocationInput").attr("data-lon");
      var lat=$("#mapLocationInput").attr("data-lat");
      //店铺地图定位
      // 百度地图API功能
      var map = new BMap.Map("ponyMap");    // 创建Map实例
      var mapPoint = new BMap.Point(lon,lat);
      var geoc = new BMap.Geocoder(); 
      map.centerAndZoom(mapPoint,15);  // 初始化地图,设置中心点坐标和地图级别
      //查询地址
      geoc.getLocation(mapPoint, function(rs){
        var addComp = rs.addressComponents;
        // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        var addressStr=addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
        $("#mapLocationAddress").html(addressStr).attr("data-lon",lon).attr("data-lat",lat).attr("data-mapStr",addressStr);
      }); 
      var marker = new BMap.Marker(mapPoint); // 创建点
      // marker.enableDragging();     //设置点可以拖拽
      map.addOverlay(marker);            //增加点

      // 点击选取地点位置坐标
      map.addEventListener("click",function(e){
        // alert(e.point.lng + "," + e.point.lat);
        // 清除所有地图覆盖物
        map.clearOverlays(); 
        var lng = e.point.lng;
        var lat = e.point.lat;
        // 创建新地图覆盖物做标
        var newMarkerPoint=new BMap.Point(lng,lat);

        marker = new BMap.Marker(newMarkerPoint); // 创建点
        // marker.enableDragging();     //设置点可以拖拽
        map.addOverlay(marker);            //增加点

        // 查询地址
        geoc.getLocation(newMarkerPoint, function(rs){
          var addComp = rs.addressComponents;
          // console.log(addComp);
          var addressStr=addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
          $("#mapLocationAddress").html(addressStr).attr("data-lon",lng).attr("data-lat",lat).attr("data-mapStr",addressStr);
          // console.log(addressStr);
        }); 
      });

      // //拖拽结束事件
      // marker.addEventListener("dragend", function(e){
      //   //获取覆盖物位置
      //   var o_Point_now =  marker.getPosition();
      //   var lng = o_Point_now.lng;
      //   var lat = o_Point_now.lat;
      //   //e.point.lng 地理经度。
      //   // e.point.lat 地理纬度。
      //   //alert(e.point.lng + "---, " + e.point.lat);
      //   var newMarkerPoint=new BMap.Point(lng,lat)
      //   // 查询地址
      //   geoc.getLocation(newMarkerPoint, function(rs){
      //     var addComp = rs.addressComponents;
      //     // console.log(addComp);
      //     var addressStr=addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
      //     $("#mapLocationAddress").html(addressStr).attr("data-lon",lng).attr("data-lat",lat).attr("data-mapStr",addressStr);
      //   }); 
      // });


    }

    // 选定地图位置
    $scope.confirmMapAddress=function(){
      var addStr=$("#mapLocationAddress").attr("data-mapStr");
      var lon=$("#mapLocationAddress").attr("data-lon");
      var lat=$("#mapLocationAddress").attr("data-lat");
      // 更新数据
      $("#mapLocationInput").attr("data-lon",lon).attr("data-lat",lat).attr("data-mapStr",addStr).children(".GPSAddress").html(addStr);
      // 返回主页面
      $("#ponyShopUserShopSettingPage").css("display","block").siblings().css("display","none");

    }

    //提交修改数据
    $scope.submitChangeShopSetting=function(){
      //门店名称
      var userShopName=$("#userShopName").val();
      //门店类型
      var userShopType=$("#userShopType").val();
      //门店联系电话
      var userShopTel=$("#userShopTel").val();
      //门店营业时间
      var userShopStartTime=$("#workStartTime").val();
      var userShopEndTime=$("#workEndTime").val();
      //门店所在城市
      var userShopCity=$("#shopAddressDistrict").val();
      //门店详细地址
      var userShopAddress=$("#userShopAddress").val();
      //门店详细地址定位坐标
      // 经度
      var userShopLon=$("#mapLocationInput").attr("data-lon");
      // 纬度
      var userShopLat=$("#mapLocationInput").attr("data-lat");

      //验证数据
      if(!userShopName){
        alertMsg("确定","请填写门店名称",function(){}); 
        return;
      }
      if(!userShopTel){
        alertMsg("确定","请填写联系电话",function(){}); 
        return;
      }else if(!(/^[0-9\-]{7,}$/.test(userShopTel))){
        alertMsg("确定","请输入正确的联系电话",function(){}); 
        return;
      }
      if(!userShopAddress){
        alertMsg("确定","请填写门店详细地址",function(){}); 
        return;
      }
      if(!(userShopLon&&userShopLat)){
        alertMsg("确定","选取门店地图位置",function(){}); 
        return;
      }      

      //初始化表单
      var fData=new FormData(document.getElementById('ponyShopSettingForm'));
      //补充数据
      fData.append("producer_id",ponyUserId);
      fData.append("store_id",ponyShopId);
      fData.append("token",token);
      fData.append("service_list_id",$scope.userShopDate.service_list_id);
      fData.append("longitude",userShopLon);
      fData.append("latitude",userShopLat);
      if($("#ponyShopUserShopSettingPage>.settingDetail>.shopDetail>form>.userCooperation>.cooperationList>ul").children().eq(1).hasClass("active")){
        fData.append("service_type_iii",1);
      }else{
        fData.append("service_type_iii",2);
      }
      if($("#ponyShopUserShopSettingPage>.settingDetail>.shopDetail>form>.userCooperation>.cooperationList>ul").children().eq(2).hasClass("active")){
        fData.append("service_type_ii",1);
      }else{
        fData.append("service_type_ii",2);
      }
      if($("#ponyShopUserShopSettingPage>.settingDetail>.shopDetail>form>.userCooperation>.cooperationList>ul").children().eq(3).hasClass("active")){
        fData.append("service_type_v",1);
      }else{
        fData.append("service_type_v",2);
      }
      if($("#ponyShopUserShopSettingPage>.settingDetail>.shopDetail>form>.userCooperation>.cooperationList>ul").children().eq(4).hasClass("active")){
        fData.append("service_type_iv",1);
      }else{
        fData.append("service_type_iv",2);
      }

      //通讯开始等待
      commStart();
      //上传数据
      $.ajax({
        type:"post",
        processData:false,
        contentType:false,
        url:"http://180.76.243.205:8383/_API/_store/editor",
        data:fData,
        success:function(data){
          commFinish();
          if(data.code=="E0000"){
            // console.log(data);
            alertMsg("确定","店铺资料修改成功",function(){}); 
          }else{
            alertMsg("确定",data.message,function(){}); 
          }
        },
        error:function(err){
          commFinish();
          //console.log(err);
        }
      });



    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){

      //获取店铺数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_storeData/get",
        data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          $scope.userShopDate=data.data;
          $("#workStartTime").val(data.data.start_time);
          $("#workEndTime").val(data.data.end_time);
          // 获取基本省份城市地区信息
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_province/get",
            data:""
          }).success(function(data){
            // console.log(data);
            if(data.code=="E0000"){
              //所有省份信息
              $scope.provinceArr=data.data;
              // console.log(data.data[0].id);
              //所在省份下城市信息
              $http({
                method:"post",
                url:"http://180.76.243.205:8383/_API/_city/get",
                data:"province_id="+$scope.userShopDate.province_id
              }).success(function(data){
                // console.log(data);
                if(data.code=="E0000"){
                  $scope.cityArr=data.data;
                  //所在城市下地区信息
                  $http({
                    method:"post",
                    url:"http://180.76.243.205:8383/_API/_area/get",
                    data:"city_id="+$scope.userShopDate.city_id
                  }).success(function(data){
                    // console.log(data);
                    $scope.areaArr=data.data;
                    isShopCity=true;
                  });
                }
              });
            }
          });

          //获取店铺类型数据
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_storeType/get",
            data:""
          }).success(function(data){
            // console.log(data);
            if(data.code=="E0000"){
              $scope.shopType=data.data;
              isShopType=true;
            }
          });

          //多异步请求，延时写入数据
          var dataTimer=setInterval(function(){
            // console.log(123);
            if(isShopCity){
              $("#shopAddressProvince").val($scope.userShopDate.province_id);
              $("#shopAddressCity").val($scope.userShopDate.city_id);
              $("#shopAddressDistrict").val($scope.userShopDate.area_id);
            }
            if(isShopType){
              $("#userShopType").val($scope.userShopDate.type);
            }
            if(isShopType&&isShopCity){
              clearInterval(dataTimer);
            }
          },1000);

          //返回当前经纬度地理定位城市
          $http({
            method:"post",
            url:"http://api.map.baidu.com/geocoder/v2/",
            data:"ak=9lVEScaqxLpGVtVu46BWKO0Oe7ji2QRB&output=json&location="+data.data.latitude+","+data.data.longitude
          }).success(function(data){
            // console.log(data);
            // $("#mapLocationAddress").html(addressStr).attr("data-lon","120.439014").attr("data-lat","36.167642").attr("data-mapStr",addressStr);
            $scope.userShopGPS=data.result.formatted_address;
          });
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          }); 
        }else{
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/main";
          }); 
        }
      });

      //店铺设置与评论切换
      $("#ponyShopUserShopSettingPage>.header>.settingClassify>ul").on("click","li",function(){
        var target=$(this);
        target.addClass("active").siblings().removeClass("active");
        $("#ponyShopUserShopSettingPage>.settingDetail").children().eq(target.index()).addClass("active").siblings().removeClass("active");

      });

      //门店照片每一张
      $("#userShopImg1Input").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userShopImg1Pic").attr('src',$scope.userShopDate.location_img_url);
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userShopImg1Pic").attr('src', e.target.result);
        }
      });

      //门店照片每二张
      $("#userShopImg2Input").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userShopImg2Pic").attr('src',$scope.userShopDate.indoor_img_url);
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userShopImg2Pic").attr('src', e.target.result);
        }
      });
            
      //门店照片每三张
      $("#userShopImg3Input").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userShopImg3Pic").attr('src',$scope.userShopDate.factory_img_url);
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userShopImg3Pic").attr('src', e.target.result);
        }
      });

      // 省份变更
      $("#shopAddressProvince").change(function(){
        // console.log($(this).val());
        var target=$(this).val();
        //所在省份下城市信息
        $http({
          method:"post",
          url:"http://180.76.243.205:8383/_API/_city/get",
          data:"province_id="+target
        }).success(function(data){
          // console.log(data);
          if(data.code=="E0000"){
            $scope.cityArr=data.data;
            // $scope.$apply();
            //所在城市下地区信息
            $http({
              method:"post",
              url:"http://180.76.243.205:8383/_API/_area/get",
              data:"city_id="+data.data[0].id
            }).success(function(data){
              // console.log(data);
              $scope.areaArr=data.data;
            })
          }
        });
      });
      
      //城市变更
      $("#shopAddressCity").change(function(){
        // console.log($(this).val());
        var target=$(this).val();
        //所在城市下地区信息
        $http({
          method:"post",
          url:"http://180.76.243.205:8383/_API/_area/get",
          data:"city_id="+target
        }).success(function(data){
          // console.log(data);
          $scope.areaArr=data.data;
        });
      });

      // 合作项目的选取
      $("#ponyShopUserShopSettingPage>.settingDetail>.shopDetail>form>.userCooperation>.cooperationList>ul").on("click","li",function(){
        var target=$(this);
        if(target.index()){
          if(target.hasClass("active")){
            target.removeClass("active");
          }else{
            target.addClass("active");
          }
        }
      });

    });


  });

  //我的服务设置页面
  ponyShopApp.controller("userShopServerSettingCtrl",function($scope,$http,$location){
    $scope.height=vHeight;
    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //保养
    $scope.upkeepServerList=[];
    //美容清洗
    $scope.cleanServerList=[];
    //安装
    $scope.installServerList=[];
    //改装
    $scope.refitServerList=[];

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_stockServiceList/get",
      data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId
    }).success(function(data){
      console.log(data);
      if(data.code=='E0000'){
        $scope.upkeepServerList=data.data.service_type_ii;
        $scope.cleanServerList=data.data.service_type_iii;
        $scope.installServerList=data.data.service_type_v;
        $scope.refitServerList=data.data.service_type_iv;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        }); 
      }else{
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/main";
        }); 
      }
    });

    //提交修改数据
    $scope.submitServerList=function(){
      // 保养服务数组
      var upkeepArr=$("#userShopServerSettingPage>.serverList>.upkeep>ul").children();
      // 美容清洗服务数组
      var cleanArr=$("#userShopServerSettingPage>.serverList>.beauty>ul").children();
      // 安装服务数组
      var installArr=$("#userShopServerSettingPage>.serverList>.install>ul").children();      
      // 必装服务数组
      var refitArr=$("#userShopServerSettingPage>.serverList>.refit>ul").children();

      //传入数据
      var service_type_ii=[];
      var service_type_iii=[];
      var service_type_iv=[];
      var service_type_v=[];

      //整合数据
      // 保养
      for(var i=0,len=upkeepArr.length;i<len;i++){
        var one=$(upkeepArr[i]);
        var item={};
        if(one.hasClass('sel')){
          item.service_id=one.attr("data-serverid");
          item.price=one.children(".itemDetail").children(".price").children(".setInput").children("input").val();
          item.price=item.price?item.price:0.00;
          if(!item.price){
            one.children(".itemDetail").children(".price").children(".setInput").children("input").val(0.00);
          }
          item.description=one.children(".itemDetail").children(".describe").children(".setInput").children("textarea").val();
          item.status=1;
        }else{
          item.service_id=one.attr("data-serverid");
          item.price=0.00;
          item.description="";
          item.status=2;
        }
        service_type_ii.push(item);
      }
      // 美容清洗
      for(var i=0,len=cleanArr.length;i<len;i++){
        var one=$(cleanArr[i]);
        var item={};
        if(one.hasClass('sel')){
          item.service_id=one.attr("data-serverid");
          item.price=one.children(".itemDetail").children(".price").children(".setInput").children("input").val();
          item.price=item.price?item.price:0.00;
          if(!item.price){
            one.children(".itemDetail").children(".price").children(".setInput").children("input").val(0.00);
          }
          item.description=one.children(".itemDetail").children(".describe").children(".setInput").children("textarea").val();
          item.status=1;
        }else{
          item.service_id=one.attr("data-serverid");
          item.price=0.00;
          item.description="";
          item.status=2;
        }
        service_type_iii.push(item);
      }
      // 安装
      for(var i=0,len=installArr.length;i<len;i++){
        var one=$(installArr[i]);
        var item={};
        if(one.hasClass('sel')){
          item.service_id=one.attr("data-serverid");
          item.price=one.children(".itemDetail").children(".price").children(".setInput").children("input").val();
          item.price=item.price?item.price:0.00;
          if(!item.price){
            one.children(".itemDetail").children(".price").children(".setInput").children("input").val(0.00);
          }
          item.description=one.children(".itemDetail").children(".describe").children(".setInput").children("textarea").val();
          item.status=1;
        }else{
          item.service_id=one.attr("data-serverid");
          item.price=0.00;
          item.description="";
          item.status=2;
        }
        service_type_v.push(item);
      }
      // 改装
      for(var i=0,len=refitArr.length;i<len;i++){
        var one=$(refitArr[i]);
        var item={};
        if(one.hasClass('sel')){
          item.service_id=one.attr("data-serverid");
          item.price=one.children(".itemDetail").children(".price").children(".setInput").children("input").val();
          item.price=item.price?item.price:0.00;
          if(!item.price){
            one.children(".itemDetail").children(".price").children(".setInput").children("input").val(0.00);
          }
          item.description=one.children(".itemDetail").children(".describe").children(".setInput").children("textarea").val();
          item.status=1;
        }else{
          item.service_id=one.attr("data-serverid");
          item.price=0.00;
          item.description="";
          item.status=2;
        }
        service_type_iv.push(item);
      }
      //通讯开始等待
      commStart();
      //上传数据
      $.ajax({
        type:"post",
        url:"http://180.76.243.205:8383/_API/_stockServiceList/save",
        data:{
          producer_id:ponyUserId,
          store_id:ponyShopId,
          token:token,
          service_type_ii:service_type_ii,
          service_type_iii:service_type_iii,
          service_type_iv:service_type_iv,
          service_type_v:service_type_v
        },
        success:function(data){
          commFinish();
          console.log(data);
          if(data.code=='E0000'){
            alertMsg("确定",'保存成功',function(){}); 
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            }); 
          }else{
            alertMsg("确定",data.message,function(){}); 
          }
        }
      });


    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //服务类别选择
      $("#userShopServerSettingPage>.serverClassify>ul").on("click","li",function(){
        var target=$(this);
        target.addClass("active").siblings().removeClass("active");
        $("#userShopServerSettingPage>.serverList").children().eq(target.index()).addClass("active").siblings().removeClass("active");
      });

      //服务的每一项是否被选取（被选择他的详情会显示出来，可以进行编辑，取消清空内容）
      $("#userShopServerSettingPage>.serverList").on("click",".itemTit",function(){
        var target=$(this);
        if(target.parent().hasClass("sel")){
          target.parent().removeClass("sel");
          // target.next().children(".price").children(".setInput").children("input").val("");
        }else{
          target.parent().addClass("sel");
        }
      });

      //每项服务价格改变
      $("#userShopServerSettingPage>.serverList").on("change","input",function(){
        var targetVal=parseFloat($(this).val())?parseFloat($(this).val()):0;
        if(!/^[0-9]{0,}\.{0,1}[0-9]{0,}$/.test($(this).val())){
          $(this).val("");
          $(this).parent().parent().parent().prev().children(".itemPrice").children("span").html("0");
          alertMsg("确定","您输入的数值不合法",function(){});
        }else{
          $(this).val(targetVal);
          $(this).parent().parent().parent().prev().children(".itemPrice").children("span").html(parseFloat(targetVal).toFixed(2));
        }
      });

    });
    
  });

  //我的商品页面
  ponyShopApp.controller("userCommoditySettingCtrl",function($scope,$http,$location){
    $scope.height=vHeight;
    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //出售中商品列表总数据
    var commodityOnList=[];
    //已下架商品列表总数据
    var commodityOffList=[];
    //出售中商品列表显示数据
    $scope.commodityOnList=[];
    //已下架商品列表显示数据
    $scope.commodityOffList=[];

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_stockList/get",
      data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId
    }).success(function(data){
      console.log(data);
      if(data.code=='E0000'){
        commodityOnList=data.data.on?data.data.on:[];
        commodityOffList=data.data.off?data.data.off:[];
        $scope.commodityOnList=data.data.on?data.data.on:[];
        $scope.commodityOffList=data.data.off?data.data.off:[];
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        }); 
      }else{
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/main";
        }); 
      }
    });
    
    //单个商品删除按钮
    $scope.commodityRemove=function(id,type){
      // console.log(id);
      confirmMsg(["确认","取消"],"删除商品后数据将不再保留，您确认删除吗？",function(){
        // console.log("确定");
        //通讯开始等待
        commStart();
        console.log(id,type);
        $.ajax({
          type:"post",
          url:"http://180.76.243.205:8383/_API/_stock/delete",
          data:{
            producer_id:ponyUserId,
            token:token,
            store_id:ponyShopId,
            stock_id:id
          },
          success:function(data){
            console.log(data);
            commFinish();
            if(data.code=="E0000"){
              alertMsg("确定","删除成功",function(){}); 
              if(type=='on'){
                var listArr=commodityOnList;
                var viewArr=$scope.commodityOnList;
              }else{
                var listArr=commodityOffList;
                var viewArr=$scope.commodityOffList;
              }
              //整理总数组
              for(var i=0;i<listArr.length;i++){
                var one=listArr[i];
                if(one.id==id){
                  listArr.splice(i,1);
                }
              }
              //整理显示数组
              for(var i=0;i<viewArr.length;i++){
                var one=viewArr[i];
                if(one.id==id){
                  viewArr.splice(i,1);
                }
              }
              $scope.$apply();
            }else if(data.code=="E0014"){
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              }); 
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          },
          error:function(err){
            commFinish();
            // console.log(err);
          }
        });


      },function(){
        // console.log("取消");
      });

    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //顶部出售中与已下架选择
      $("#userCommoditySettingPage>.commodityClassify>ul").on("click","li",function(){
        var target=$(this);
        if(!target.hasClass("active")){
          target.addClass("active").siblings().removeClass("active");
          $("#userCommoditySettingPage>.commodityList").children().eq(target.index()).addClass("active").siblings().removeClass("active");
        }
      });

      //底部分类选择
      $("#userCommoditySettingPage>.footerBtn>.btnGroup>ul>.commodityType").click(function(){
        var target=$(this);
        if(target.hasClass("on")){
          target.removeClass("on");
        }else{
          target.addClass("on");
        }
      });

      //底部分类具体项目选择
      $("#userCommoditySettingPage>.footerBtn>.btnGroup>ul>.commodityType>.subMenu>ul").on("click","li",function(e){
        e.stopPropagation();
        var targetVal=$(this).html();
        $(this).parent().parent().prev().children("span").html($(this).html()).parent().parent().removeClass("on");
        // console.log($(this).index());
        var type=null;
        switch($(this).index()){
          case 0:
            //显示全部
            type='all';
            break;
          case 1:
            // 汽车保养
            type=2;
            break;
          case 2:
            // 美容清洗
            type=3;
            break;
          case 3:
            // 安装
            type=5;
            break;
          case 4:
            // 改装
            type=4;
            break;           
        }
        if(!type){
          //数据不对
        }else if(type=='all'){
          $scope.commodityOnList=commodityOnList;
          $scope.commodityOffList=commodityOffList;
        }else{
          $scope.commodityOnList=[];
          $scope.commodityOffList=[];
          // 出售中显示数据
          for(var i=0;i<commodityOnList.length;i++){
            var one=commodityOnList[i];
            if(one.service_type_id==type){
              $scope.commodityOnList.push(one);
            }
          }
          // 下架中显示数据
          for(var i=0;i<commodityOffList.length;i++){
            var one=commodityOffList[i];
            if(one.service_type_id==type){
              $scope.commodityOffList.push(one);
            }
          }
        }
        $scope.$apply();

      });


    });

  });

  //我的商品信息详情页面
  ponyShopApp.controller("userCommodityDetailCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;
    //获取传入参数
    var commodityId=$routeParams.commodityId;
    //基础公共数据
    var token=sessionStorage["ponyShopToken"];
    var ponyShopId=sessionStorage["ponyShopID"];
    var ponyUserId=sessionStorage["ponyShopUserID"];

    //商品类别
    $scope.commodityTypeList=[];
    //是否接收完类别
    var isCommodityTypeList=false;
    //商品数据
    var commodityDate=null;

    //获取商品类型数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_stockType/get",
      data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId
    }).success(function(data){
      // console.log(data);
      if(data.code=='E0000'){
        $scope.commodityTypeList=data.data;
        isCommodityTypeList=true;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        }); 
      }else{
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/main";
        }); 
      }
    });
    
    //如果传入参数不为NULL，则是编辑商品，否则是新增商品
    if(commodityId!="null"){
      //获取数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_stock/get",
        data:"producer_id="+ponyUserId+"&token="+token+"&store_id="+ponyShopId+"&stock_id="+commodityId
      }).success(function(data){
        console.log(data);
        if(data.code=='E0000'){
          commodityDate=data.data;
          $("#commodityDetailName").val(data.data.name);
          $("#commodityDetailPic").attr('src',data.data.img_url);
          $("#commodityDetailPrice").val(data.data.price);
          $("#userShopCommodityAmount").val(data.data.amount);
          $("#userShopCommodityStatus").val(data.data.status);
          var dataTimer=setInterval(function(){
            if(isCommodityTypeList){
              $("#userShopCommodityType").val(data.data.stock_type_id);
              clearInterval(dataTimer);
            }
          },100);
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          }); 
        }else{
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/main";
          }); 
        }
      });
    }

    //提交新商品
    $scope.submitCommodity=function(){
      var commodityName=$("#commodityDetailName").val();
      var commodityPrice=$("#commodityDetailPrice").val();
      var commodityImg=$("#commodityDetailImgInput").val();
      var commodityType=$("#userShopCommodityType").val();
      var commodityAmount=$("#userShopCommodityAmount").val();
      var commodityStatus=$("#userShopCommodityStatus").val();
      
      // 验证数据
      if(!commodityName){
        alertMsg("确定","请输入商品名称",function(){}); 
        return;
      }
      if(!commodityPrice){
        alertMsg("确定","请输入商品单价",function(){}); 
        return;
      }else if(!(/^([0-9]+)(\.[0-9]{0,2})?$/.test(commodityPrice))){
        alertMsg("确定","请输入正确的商品单价",function(){}); 
        return; 
      }

      if(commodityId=="null"){
        if(!commodityImg){
          alertMsg("确定","请上传商品的图片",function(){}); 
          return;
        }
      }
      if(!commodityAmount){
        alertMsg("确定","请输入商品库存",function(){}); 
        return;
      }else if(!(/^[1-9][0-9]{0,}$/.test(commodityAmount))){
        alertMsg("确定","请输入正确的商品库存",function(){}); 
        return; 
      }

      //初始化表单
      var fData=new FormData(document.getElementById('userShopCommodityForm'));
      //补充数据
      fData.append("producer_id",ponyUserId);
      fData.append("token",token);
      fData.append("store_id",ponyShopId);

      //通讯开始等待
      commStart();
      //上传数据 如果commodityId为null那是新增商品，否则为修改商品
      if(commodityId=="null"){
        $.ajax({
          type:"post",
          processData:false,
          contentType:false,
          url:"http://180.76.243.205:8383/_API/_stock/add",
          data:fData,
          success:function(data){
            commFinish();
            if(data.code=="E0000"){
              // console.log(data);
              alertMsg("确定","添加成功",function(){
                window.location.href="index.html#/userCommoditySetting"
              }); 
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          },
          error:function(err){
            commFinish();
            //console.log(err);
          }
        });
      }else{
        //修改接口
        fData.append("stock_id",commodityDate.id);
        $.ajax({
          type:"post",
          processData:false,
          contentType:false,
          url:"http://180.76.243.205:8383/_API/_stock/edit",
          data:fData,
          success:function(data){
            commFinish();
            if(data.code=="E0000"){
              // console.log(data);
              commodityDate=data.data;
              alertMsg("确定","修改成功",function(){
                // window.location.href="index.html#/userCommoditySetting"
              }); 
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          },
          error:function(err){
            commFinish();
            //console.log(err);
          }
        });
      }

    }
    
    // 继续添加新商品
    $scope.continueCommodity=function(){
      $location.path("/userCommodityDetail/null");
      window.location.reload();
      //页面从头
      $('body,html').scrollTop(0);
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $('body,html').scrollTop(0);

      //商品图片
      $("#commodityDetailImgInput").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          if(commodityId=="null"){
            $("#commodityDetailPic").attr('src', "img/commodityImg.jpg");
          }else{
            $("#commodityDetailPic").attr('src', commodityDate.img_url);
          }
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#commodityDetailPic").attr('src', e.target.result);
        }
      });



    });

  });

  //提示框关闭
  function alertMsg(btnName,msg,alertFun){
    $('#alertAffirmBtn').html(btnName);
    $(".alertMsg .detail").html(msg);
    $(".alertMsg").css({
      display:"block"
    });

    //如果有传入方法，关闭提示时执行方法
    if(typeof(alertFun)=="function"){
      document.getElementById("alertMsgOff").onclick=function(){
        $(".alertMsg").css({
          display:"none"
        });
        alertFun();
      };
      document.getElementById("alertAffirmBtn").onclick=function(){
        $(".alertMsg").css({
          display:"none"
        });
        alertFun();
      };
    }else{
      document.getElementById("alertMsgOff").onclick=function(){
        $(".alertMsg").css({
          display:"none"
        });
      };
      document.getElementById("alertAffirmBtn").onclick=function(){
        $(".alertMsg").css({
          display:"none"
        });
      };
    }
  }
  function confirmMsg(btnArr,msg,affirmFun,cancelFun){
    if(Object.prototype.toString.call(btnArr)!='[object Array]'){
      $('#confirmAffirmBtn').html("确定");
      $('#confirmCancelBtn').html("取消");
    }else if(btnArr.length==2){
      $('#confirmAffirmBtn').html(btnArr[0]);
      $('#confirmCancelBtn').html(btnArr[1]);
    }

    $(".confirmMsg .detail").html(msg);
    $(".confirmMsg").css({
      display:"block"
    });

    //如果有传入方法，关闭提示时执行方法
    if(typeof(affirmFun)=="function"&&typeof(cancelFun)=="function"){
      document.getElementById("confirmMsgOff").onclick=function(){
        $(".confirmMsg").css({
          display:"none"
        });
        cancelFun();
      };
      document.getElementById("confirmCancelBtn").onclick=function(){
        $(".confirmMsg").css({
          display:"none"
        });
        cancelFun();
      };
      document.getElementById("confirmAffirmBtn").onclick=function(){
        $(".confirmMsg").css({
          display:"none"
        });
        affirmFun();
      };
    }else{
      document.getElementById("confirmMsgOff").onclick=function(){
        $(".confirmMsg").css({
          display:"none"
        });
      };
      document.getElementById("confirmCancelBtn").onclick=function(){
        $(".confirmMsg").css({
          display:"none"
        });
      };
      document.getElementById("confirmAffirmBtn").onclick=function(){
        $(".confirmMsg").css({
          display:"none"
        });
      };
    }
  }
  // confirmMsg(["确认","取消"],"删除商品后数据将不再保留，您确认删除吗？",function(){
  //   console.log("确定");
  // },function(){
  //   console.log("取消");
  // });
  function refuseMsg(btnArr,msg,affirmFun,cancelFun){
    if(Object.prototype.toString.call(btnArr)!='[object Array]'){
      $('#refuseAffirmBtn').html("确定");
      $('#refuseCancelBtn').html("取消");
    }else if(btnArr.length==2){
      $('#refuseAffirmBtn').html(btnArr[0]);
      $('#refuseCancelBtn').html(btnArr[1]);
    }

    $(".refuseMsg .detail>textarea").val("");
    $(".refuseMsg").css({
      display:"block"
    });

    //如果有传入方法，关闭提示时执行方法
    if(typeof(affirmFun)=="function"&&typeof(cancelFun)=="function"){
      document.getElementById("refuseMsgOff").onclick=function(){
        $(".refuseMsg").css({
          display:"none"
        });
        cancelFun();
      };
      document.getElementById("refuseCancelBtn").onclick=function(){
        $(".refuseMsg").css({
          display:"none"
        });
        cancelFun();
      };
      document.getElementById("refuseAffirmBtn").onclick=function(){
        $(".refuseMsg").css({
          display:"none"
        });
        var msg=$("#refuseMsg").val();
        affirmFun(msg);
        // console.log(msg);
      };
    }else{
      document.getElementById("refuseMsgOff").onclick=function(){
        $(".refuseMsg").css({
          display:"none"
        });
      };
      document.getElementById("refuseCancelBtn").onclick=function(){
        $(".refuseMsg").css({
          display:"none"
        });
      };
      document.getElementById("refuseAffirmBtn").onclick=function(){
        $(".refuseMsg").css({
          display:"none"
        });
      };
    }
  }
  // refuseMsg(["确认","取消"],"删除商品后数据将不再保留，您确认删除吗？",function(){
  //   console.log("确定");
  //   // msg:输入信息
  //   console.log(msg);
  // },function(){
  //   console.log("取消");
  // });
  //通讯load加载
  function commStart(){
    $(".commLoad").css("display","block");
  }
  function commFinish(){
    $(".commLoad").css("display","none");
  }
  //千位符
  function thousandSeparator(str){
    numberStr=str.toString().split(".")
    intStr=numberStr[0];
    if(!numberStr[1]){
      numberStr[1]="00";
    }
    var len=intStr.length;
    var firstStr=intStr.substr(0,len%3);
    var otherStr=intStr.substr(len%3);
    var returnStr=firstStr+otherStr.replace(/[\d][\d][\d]/ig,function(word){ return ","+word;});
    if(len%3){
      return returnStr+"."+numberStr[1];
    }else{
      return returnStr.substr(1)+"."+numberStr[1];
    }
  }

})();