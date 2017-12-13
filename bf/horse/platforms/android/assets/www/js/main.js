(function(){
  //视口大小
  var vHeight=window.innerHeight;
  var vWidth=window.innerWidth;
  //当前日期
  var nowDate=new Date();
  var nowDateYear=nowDate.getFullYear();
  var nowDateMonth=nowDate.getMonth()+1;
  var nowDateDay=nowDate.getDate();
  var formatNow=nowDateYear+"-"+(nowDateMonth>9?nowDateMonth:"0"+nowDateMonth)+"-"+(nowDateDay>9?nowDateDay:"0"+nowDateDay);

  //小马驾驾共用数据
  var ponyUserData=null;
  var ponyUserCar=null;
  //选中轮胎的规格
  var ponyUserSelTireSize="";
  
  //升级轮胎规格
  var upgradeFont="";
  var upgradeRear="";

  //轮胎服务选择店铺ID
  var tireServerSelShopData=null;

  //轮胎修补暂存用户跳转数据
  var tireRepairServer={userName:"",userTel:"",userTime:null};

//angularJS
  var horseApp = angular.module('horse', ['ng', 'ngRoute']);

  //路由页面进行配置
  horseApp.config(function ($routeProvider, $compileProvider) {
    $routeProvider
      //loading页面
      .when("/load", {
        templateUrl: 'tpl/loading.html',
        controller: 'horseLoadCtrl'
      })
      //主页面
      .when("/main", {
        templateUrl: 'tpl/main.html',
        controller: 'horseMainCtrl'
      })
      //选择城市页面
      .when('/selCity',{
        templateUrl:"tpl/selCity.html",
        controller:"selCityCtrl"
      })
      //用户协议页面
      .when("/ponyAgreement",{
        templateUrl:"tpl/ponyAgreement.html",
        controller:"ponyAgreementCtrl"
      })
      //登陆页面
      .when('/login',{
        templateUrl:"tpl/login.html",
        controller:"loginCtrl"
      })
      //注册页面
      .when('/register',{
        templateUrl:"tpl/register.html",
        controller:"registerCtrl"
      })
      //密码重置页面
      .when('/restPwd',{
        templateUrl:"tpl/restPwd.html",
        controller:"restPwdCtrl"
      })
      //用户中心页面
      .when('/userCenter',{
        templateUrl:"tpl/userCenter.html",
        controller:"userCenterCtrl"
      })
      //用户个人信息设置页面
      .when("/userInfoSet",{
        templateUrl:"tpl/userInfoSet.html",
        controller:"userInfoSetCtrl"
      })
      //用户手机号修改页面
      .when("/userChangeTel",{
        templateUrl:"tpl/userChangeTel.html",
        controller:"userChangeTelCtrl"
      })
      //用户手机号设置页面
      .when('/userSettingTel',{
        templateUrl:"tpl/userSettingTel.html",
        controller:"userSettingTelCtrl"
      })
      //用户额度页面
      .when("/userAmount",{
        templateUrl:"tpl/userAmount.html",
        controller:"userAmountCtrl"
      })
      //用户宝驹额度列表页面
      .when("/userBolgAmount",{
        templateUrl:"tpl/userBolgAmount.html",
        controller:"userBolgAmountCtrl"
      })
      //支付密码页面
      .when("/userPayPwd",{
        templateUrl:"tpl/userPayPwd.html",
        controller:"userPayPwdCtrl"
      })
      //设置新支付密码页面
      .when("/userSetNewPayPwd",{
        templateUrl:"tpl/userSetNewPayPwd.html",
        controller:"userSetNewPayPwdCtrl"
      })
      //用户优惠券页面
      .when("/userCoupon",{
        templateUrl:"tpl/userCoupon.html",
        controller:"userCouponCtrl"
      })
      //用户推广页面
      .when("/userExpand",{
        templateUrl:"tpl/userExpand.html",
        controller:"userExpandCtrl"
      })
      //关于我们页面
      .when("/aboutPony",{
        templateUrl:"tpl/ponyAbout.html",
        controller:"ponyAboutCtrl"
      })
      //系统信息列表页面
      .when("/systemMsgList",{
        templateUrl:"tpl/systemMsgList.html",
        controller:"systemMsgListCtrl"
      })
      //用户评价列表页面
      .when("/userCommentList",{
        templateUrl:"tpl/userCommentList.html",
        controller:"userCommentListCtrl"
      })
      //待服务轮胎页面
      .when("/CASTire",{
        templateUrl:"tpl/CASTire.html",
        controller:"CASTireCtrl"
      })
      //订单列表页面
      .when('/order/:listTarget',{
        templateUrl:"tpl/order.html",
        controller:"orderCtrl"
      })
      //订单服务确认页面
      .when("/orderAffirmServer/:orderId",{
        templateUrl:"tpl/orderAffirmServer.html",
        controller:"orderAffirmServerCtrl"
      })
      //订单支付运费页面
      .when('/orderPayFreight/:orderId',{
        templateUrl:"tpl/orderPayFreight.html",
        controller:"orderPayFreightCtrl"
      })
      //订单补差换胎页面
      .when("/orderRepairTireCost/:orderId",{
        templateUrl:"tpl/orderRepairTireCost.html",
        controller:"orderRepairTireCostCtrl"
      })
      //用户发表评价页面
      .when("/userEvaluate/:shopId/:orderId",{
        templateUrl:"tpl/userEvaluate.html",
        controller:"userEvaluateCtrl"
      })
      //用户宝驹列表页面
      .when('/userBolgList',{
        templateUrl:"tpl/bolgList.html",
        controller:"userBolgListCtrl"
      })
      //用户增加宝驹设置页面
      .when("/userBolgConfig/:userBolg",{
        templateUrl:'tpl/bolg.html',
        controller:"userBolgConfigCtrl"
      })
      //轮胎服务页面
      .when("/tireServer",{
        templateUrl:"tpl/tireServer.html",
        controller:"tireServerCtrl"
      })
      //轮胎规格选择页面
      .when("/tireSel/:isUpgrade",{
        templateUrl:"tpl/tireSel.html",
        controller:"tireSelSizeCtrl"
      })
      //轮胎规格升级页面
      .when("/tireSpecUpgrade",{
        templateUrl:"tpl/tireSpecUpgrade.html",
        controller:"tireSpecUpgradeCtrl"
      })
      //轮胎花纹选择页面
      .when("/tireSelFigure/:tireSize",{
        templateUrl:"tpl/tireSelFigure.html",
        controller:"tireSelFigureCtrl"
      })
      //轮胎详请页面
      .when("/tireDetail/:tireId/:tempId",{
        templateUrl:"tpl/tireDetail.html",
        controller:"tireDetailCtrl"
      })
      //品质服务页
      .when("/tireQCServer/:tempId",{
        templateUrl:"tpl/tireQCServer.html",
        controller:"tireQCServerCtrl"
      })
      //订单确认页面
      .when("/tireOrderDetail/:tempId",{
        templateUrl:"tpl/tireOrderDetail.html",
        controller:"tireOrderDetailCtrl"
      })
      //收银台页面
      .when("/checkoutCounter/:tempId/:orderType",{
        templateUrl:"tpl/checkoutCounter.html",
        controller:"checkoutCounterCtrl"
      })
      //更换轮胎服务选择页面
      .when("/changeTireSel",{
        templateUrl:"tpl/changeTireSel.html",
        controller:"changeTireSelCtrl"
      })
      //原厂更换轮胎页面
      .when("/originalChangeTire",{
        templateUrl:"tpl/originalChangeTire.html",
        controller:"originalChangeTireCtrl"
      })
      //选择安装店铺页面
      .when("/selTireInstallShop",{
        templateUrl:"tpl/selTireInstallShop.html",
        controller:"selTireInstallShopCtrl"
      })
      //原厂更换轮胎的订单确认页面
      .when("/originalChangeTireSelAddress/:shopId/:changeFontNum/:changeRearNum",{
        templateUrl:"tpl/originalChangeTireSelAddress.html",
        controller:"originalChangeTireSelAddressCtrl"
      })
      //轮胎服务免费补胎页面
      .when("/tireRepair",{
        templateUrl:"tpl/tireRepair.html",
        controller:"tireRepairCtrl"
      })
      //小马架架轮胎更换页面
      .when("/ponyTireChange",{
        templateUrl:"tpl/ponyTireChange.html",
        controller:"ponyTireChangeCtrl"
      })
      //小马架架轮胎更换 确信订单（联系人、电话、预约时间）
      .when("/ponyTireChangeOrderDetail/:orderShopId/:changeOriginalList",{
        templateUrl:"tpl/ponyTireChangeOrderDetail.html",
        controller:"ponyTireChangeOrderDetailCtrl"
      })
      //附近商铺列表页面
      .when("/shopList/:typeId",{
        templateUrl:"tpl/shopList.html",
        controller:"shopListCtrl"
      })
      //商铺服务页面
      .when("/shopServer/:shopId/:shopType",{
        templateUrl:"tpl/shopServer.html",
        controller:"shopServerCtrl"
      })
      //服务订单详情页面
      .when("/serverOrderDetail/:orderId",{
        templateUrl:"tpl/serverOrderDetail.html",
        controller:"serverOrderDetailCtrl"
      })
      //商铺详情页面
      .when("/shopDetail/:shopId",{
        templateUrl:"tpl/shopDetail.html",
        controller:"shopDetailCtrl"
      })
      //商铺导航页面
      .when("/shopMap/:lon/:lat",{
        templateUrl:"tpl/shopMap.html",
        controller:"shopMapCtrl"
      })
      //路径非法跳主页
      .otherwise({
        redirectTo: "/load"
      });


    //angularJS会对html页面进行重构，对他认为不安全的链接会在其前加前缀“unsafe:”，用下这个可以对其屏蔽，注意函数头引入$compileProvider
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
    // Angular v1.2 之前使用 $compileProvider.urlSanitizationWhitelist(...)

  });

  //配置POST请求头
  horseApp.run(function ($http) {
    $http.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
  });

  //父级总控制器
  horseApp.controller('horseCtrl',function($scope){

  });

  //load页面
  horseApp.controller('horseLoadCtrl',function($scope,$location,$rootScope){
    $scope.height=vHeight;
    //load页面三秒展示完成后跳主页面
    setTimeout(function(){
      location.replace("index.html#/main");
    },3000);
  });

  //主页面
  horseApp.controller('horseMainCtrl',function($scope,$http,$rootScope,$location){
    $scope.ponyUserData=ponyUserData;
    $scope.userCar=null;
    //地理位置
    $scope.addressCity="暂无定位";
    //取消页面不能滚动
    $('body').css({
      overflow:"auto"
    });
    //是否有选中的城市，有用选中的城市，没有用GPS定们查询城市
    // console.log($rootScope.addressCity);
    if(!$rootScope.addressCity){
      var GPSTimer=setInterval(function(){
        if(deviceLocation.state=='1'){
          //console.log("进来了",deviceLocation.longitude+"|"+deviceLocation.latitude);
          $http({
            method:"post",
            url:"http://api.map.baidu.com/geocoder/v2/",
            data:"ak=9lVEScaqxLpGVtVu46BWKO0Oe7ji2QRB&output=json&location="+deviceLocation.latitude+","+deviceLocation.longitude

          }).success(function(data){
            //console.log(data.result.addressComponent.city);
            $rootScope.GPSAddressCity=data.result.addressComponent.city;
            $rootScope.addressCity=data.result.addressComponent.city;
            $scope.addressCity=$rootScope.addressCity?$rootScope.addressCity:$rootScope.GPSAddressCity;
          }).error(function(){
            $rootScope.GPSAddressCity="";
            $rootScope.addressCity=data.result.addressComponent.city;
            $scope.addressCity=$rootScope.addressCity?$rootScope.addressCity:$rootScope.GPSAddressCity;
          });

          clearInterval(GPSTimer);
        }


      },1000);
    }

    //对是否登陆进行跳转用户中心
    $scope.toUserCenter=function(){
      //是否存在登陆数据，有则跳转用户中心，没有跳转登陆
      if($scope.ponyUserData){
        $location.path("/userCenter");
      }else{
        alertMsg("确定","请先登陆",function(){
          window.location.href="index.html#/login"
        });
      }
    }

    //轮胎服务   对是否登陆进行跳转轮胎服务
    $scope.toTireServer=function(){
      //是否存在登陆数据，有则跳转轮胎服务，没有跳转登陆
      if($scope.ponyUserData){
        $location.path("/tireServer");
      }else{
        alertMsg("确定","请先登陆",function(){
          window.location.href="index.html#/login"
        });
        // $location.path("/login");
      }
    }

    //保养服务   对是否登陆进行跳转轮胎服务
    $scope.toUpkeepServer=function(){
      //是否存在登陆数据，有则跳转轮胎服务，没有跳转登陆
      if($scope.ponyUserData){
        $location.path("shopList/2");
      }else{
        alertMsg("确定","请先登陆",function(){
          window.location.href="index.html#/login"
        });
        // $location.path("/login");
      }
    }

    //美容服务   对是否登陆进行跳转轮胎服务
    $scope.toBeautyServer=function(){
      //是否存在登陆数据，有则跳转轮胎服务，没有跳转登陆
      if($scope.ponyUserData){
        $location.path("/shopList/3");
      }else{
        alertMsg("确定","请先登陆",function(){
          window.location.href="index.html#/login"
        });
        // $location.path("/login");
      }
    }

    //附近门店   对是否登陆进行跳转轮胎服务
    $scope.toShopList=function(){
      //是否存在登陆数据，有则跳转轮胎服务，没有跳转登陆
      if($scope.ponyUserData){
        $location.path("/shopList/1");
      }else{
        alertMsg("确定","请先登陆",function(){
          window.location.href="index.html#/login"
        });
        // $location.path("/login");
      }
    }

    //未开通功能 
    $scope.noServer=function(){
      alertMsg("确定","正在开发，敬请期待",function(){}); 
    }

    //监听当前页面是否加载完成
    $scope.$watch("$viewContentLoaded",function(){
      //页面进行
      $(document).scrollTop(0);
      //记录选择的地理位置
      $scope.addressCity=$rootScope.addressCity?$rootScope.addressCity:$rootScope.GPSAddressCity;
      //console.log($scope.addressCity);

      var userName=localStorage["ponyUserName"];
      var userPwd=localStorage["ponyUserPwd"];
      if(userName&&userPwd){
        $http({
          method:"post",
          url:"http://180.76.243.205:8383/_API/_user/login",
          data:"phone="+userName+"&password="+strmd5(userPwd)
        }).success(function(data){
          console.log(data);
          if(data.code=="E0000"){
            $scope.ponyUserData=data.data.userInfo;
            ponyUserData=data.data.userInfo;
            ponyUserCar=data.data.userCar_info;
            if(ponyUserCar){
              for(var i=0;i<ponyUserCar.length;i++){
                var one=ponyUserCar[i]
                if(one.is_default==1){
                  $scope.userCar=one;
                }
              }
              //console.log($scope.userCar);
            }

            sessionStorage["ponyUserToken"]=data.data.userInfo.token;
            // 对用户是否进行车辆设置进行判断
            if(data.data.userCar_info){
              $("#mainPage>.banner>.userBolgCreate").css("display","block").siblings().css("display","none");
            }else{
              $("#mainPage>.banner>.userBolgAdd").css("display","block").siblings().css("display","none");
            }
          }
        }).error(function(err){
          //console.log(err);
        });
      }


    });

  });

  //选择城市页面
  horseApp.controller('selCityCtrl',function($scope,$location,$http,$rootScope){

    $scope.addressCity="";

    $scope.searchCity="";

    //所有城市数组
    var allCityArr=[];

    // 城市字母分组
    $scope.cityA=[];
    $scope.cityB=[];
    $scope.cityC=[];
    $scope.cityD=[];
    $scope.cityE=[];
    $scope.cityF=[];
    $scope.cityG=[];
    $scope.cityH=[];
    $scope.cityI=[];
    $scope.cityJ=[];
    $scope.cityK=[];
    $scope.cityL=[];
    $scope.cityM=[];
    $scope.cityN=[];
    $scope.cityO=[];
    $scope.cityP=[];
    $scope.cityQ=[];
    $scope.cityR=[];
    $scope.cityS=[];
    $scope.cityT=[];
    $scope.cityU=[];
    $scope.cityV=[];
    $scope.cityW=[];
    $scope.cityX=[];
    $scope.cityY=[];
    $scope.cityZ=[];

    //查询城市数组
    $scope.searchCityArr=[];

    //返回进入时页面
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //城市查找清除
    $scope.searchClear=function(){
      /*
       * 清空查打的城市数据
       * */
      $('#searchCityInput').val("");
      $scope.searchCity="";
      $(".searchBtn,.searchCityList").css({
        display:"none"
      });
      $('body').css({
        overflow:"auto",
        height:"auto"
      });
    };



    //监听城市查找
    $scope.$watch('searchCity',function(){
      if($scope.searchCity!=""){

        //console.log($scope.searchCity);
        /*
        * 这里对城市数据进行查找
        * */
        $scope.searchCityArr=[];
        var reg=new RegExp($scope.searchCity,"ig");

        for(var i=0;i<allCityArr.length;i++){
          var city=allCityArr[i];
          
          if(reg.test(city.name)){
            $scope.searchCityArr.push(city);
          }
        }

        // console.log($scope.searchCityArr);

        //有输入查找的城市
        $('body').css({
          scrollTop:0,
          overflow:"hidden",
        });
        $('#selCityPage>.selCityList').css({
          height:vHeight-(50+60+60),
          overflow:"hidden"
        })



        $(".searchBtn,.searchCityList").css({
          display:"block"
        });
      }else{
        //没有输入查找的城市
        /*
         * 清空查找的城市数据
         * */
        $(".searchBtn,.searchCityList").css({
          display:"none"
        });
        $('body').css({
          overflow:"auto"
        });
        $('#selCityPage>.selCityList').css({
          height:"auto",
          overflow:"auto"
        })
      }
    });



    //选择城市
    $scope.selCity=function(city){
      //取消页面不能滚动
      $('body').css({
        overflow:"auto",
      });
      $('#selCityPage>.selCityList').css({
        height:"auto",
        overflow:"auto"
      })
      $rootScope.addressCity=city;
      // $location.path('/main');
      window.history.back(-1);
    }

    //监听当前页面是否加载完成
    $scope.$watch("$viewContentLoaded",function(){
      //页面进行
      $(document).scrollTop(0);


      //获取数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_cityList/get",
        data:""
      }).success(function(data){
        if(data.code=="E0000"){
          // console.log(data.data);
          $("#selCityPage>.selCityList").css("opacity","1");
          allCityArr=data.data;
          for(var i=0;i<allCityArr.length;i++){
            var one=allCityArr[i];
            // console.log(one.icon);
            if(one.icon){
              $scope["city"+one.icon].push(one);
            }
            // else{
            //   console.log(one);
            // }
          }
          
        }
      });

      //返回当前GPS地理定位城市
      $http({
        method:"post",
        url:"http://api.map.baidu.com/geocoder/v2/",
        data:"ak=9lVEScaqxLpGVtVu46BWKO0Oe7ji2QRB&output=json&location="+deviceLocation.latitude+","+deviceLocation.longitude
      }).success(function(data){
        //console.log(data.result.addressComponent.city);
        $scope.addressCity=data.result.addressComponent.city;
        $rootScope.addressCity=$scope.addressCity;
        $("#selCityPage>.GPSCity").css("opacity","1");
      }).error(function(){
        $scope.addressCity="暂无定位";
      });

      //绑定城市字母选择事件
      $(".selCityLetter>ul").on('click','li',function(e){
        var num=$(e.target).index();
        var sumH=120;
        var ulList=$('.selCityList>ul').children();
        var len=ulList.length
        if(num<=len){
          for(var i= 0;i<num;i++){
            sumH+=$(ulList[i]).height();
          }
        }
        // console.log(sumH);
        //列表滚动
        $("body,html").animate({
          scrollTop:sumH+num*20
        },1000);
      });



    });


  });

  //用户协议页面
  horseApp.controller("ponyAgreementCtrl",function($scope){
    //返回按键
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);
    });

  })

  // 登陆页面
  horseApp.controller('loginCtrl',function($scope,$rootScope,$http,$location){
    localStorage["ponyUserName"]="";
    localStorage["ponyUserPwd"]="";
    ponyUserData=null;
    ponyUserCar=null;
    sessionStorage["ponyUserToken"]="";

    //登陆按钮(传入用户名和密码)
    $scope.loginBtn=function(userName,userPwd){
      //console.log(userName,userPwd);
      //验证数据
      if(!userName){
        alertMsg("确定","请输入手机号",function(){});
        return;
      }else if(!userPwd){
        alertMsg("确定","请输入登陆密码",function(){});
        return;
      }
      if(!(/^1[34578]\d{9}$/.test(userName))){
        alertMsg("确定","手机号码有误，请重填",function(){});
        return; 
      }
      //开始通讯加载
      commStart();
      //发送请求，获取数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_user/login",
        data:"phone="+userName+"&password="+strmd5(userPwd)
      }).success(function(data){
        //console.log(data);
        if(data.code=="E0000"){
          commFinish();
          //数据保存
          ponyUserData=data.data.userInfo;
          ponyUserCar=data.data.userCar_info;
          localStorage["ponyUserName"]=userName;
          localStorage["ponyUserPwd"]=userPwd;
          sessionStorage["ponyUserToken"]=data.data.userInfo.token;
          $rootScope.addressCity="";
          $location.path("/main");
        }else{
          commFinish();
          alertMsg("确定",data.message,function(){});
        }
      }).error(function(err){
        //console.log(err);
      });

    }

    //未开通功能 
    $scope.noServer=function(){
      alertMsg("确定","正在开发，敬请期待",function(){});
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);
    });

  });

  //用户注册页面
  horseApp.controller('registerCtrl',function($scope,$http,$location,$rootScope){
    //验证码
    var verifyCodeId=null;
    var verifyCode=null;
    var verifyTimer=null;

    //页面返回按钮
    $scope.toBack=function(){
      clearInterval(verifyTimer);
      window.history.back(-1);
    }
       
    //去协议页面
    $scope.toAgreement=function(){
      clearInterval(verifyTimer);
      $location.path("/ponyAgreement");
    }
    
    //去登陆页面
    $scope.toLogin=function(){
      clearInterval(verifyTimer);
      $location.path("/login");
    }

    //弹窗回主页面
    $scope.toMain=function(){
      $location.path("/main");
    }
    //弹窗去优惠券页面
    $scope.toCoupon=function(){
      $location.path("/userCoupon");
    }

    //监听页面加载
    $scope.$watch('$viewContentLoaded',function(){
      //页面从头
      $(document).scrollTop(0);

    });
    
    //注册提交
    $scope.registerBtn=function(userName,verify,userPwd){
      //console.log(userName,verify,userPwd);
      //alertMsg("提示",userName+"|"+verify+"|"+userPwd);
      //验证数据
      if(!userName){
        alertMsg("确定","请输入手机号",function(){});
        return;
      }else if(!verify){
        alertMsg("确定","请输入短信验证码",function(){});
        return;
      }else if(!userPwd){
        alertMsg("确定","请输入登陆密码",function(){});
        return;
      }
      if(!(/^1[34578]\d{9}$/.test(userName))){ 
        alertMsg("确定","手机号码有误，请重填",function(){}); 
        return; 
      }else if(verify!=verifyCode){
        alertMsg("确定","您输入短信验证码不正确",function(){}); 
        return;
      }
      //开始加载通讯
      commStart();
      // 发送数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_user/register",
        data:"phone="+userName+"&password="+strmd5(userPwd)+"&code_id="+verifyCodeId+"&code="+verify
      }).success(function(data){
        console.log(data)
        if(data.code=="E0000"){
          commFinish();

          ponyUserData=data.data;
          ponyUserCar="null";
 
          localStorage["ponyUserName"]=userName;
          localStorage["ponyUserPwd"]=userPwd;
          sessionStorage["ponyUserToken"]=data.data.token;
          $rootScope.addressCity="";

          clearInterval(verifyTimer);
          $("#registerPage>.successAlert").css("display","block");
          // window.location.href="index.html#/main"


        }else{
          commFinish();
          alertMsg("确定",data.message,function(){});
        }
      }).error(function(err){
        //console.log(err)
      });


    }
    //验证码
    var isVerify=true;
    var verTimeSum=60;
    $scope.verifyTime=function(){
      var tel=$("#userName").val();

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
          $('.verifyBth').css({
            backgroundColor:"#e4393c"
          }).html("获取验证码");
          clearInterval(verifyTimer);
        }else{
          verTimeSum--;
          $('.verifyBth').css({
            backgroundColor:"#aaa"
          }).html(verTimeSum+"秒");
        }
      }.bind(this),1000);
    }

  });

  //重置密码
  horseApp.controller('restPwdCtrl',function($scope,$http,$location){
    
    //验证码
    var verifyCodeId=null;
    var verifyCode=null;
    var verifyTimer=null;

    //返回
    $scope.toBack=function(){
      clearInterval(verifyTimer);
      $location.path("/login");
    }

    //重置提交
    $scope.restPwdBtn=function(userName,verify,userPwd){
      //console.log(userName,verify,userPwd);
      //alertMsg("提示",userName+"|"+verify+"|"+userPwd);
      if(!userName){
        alertMsg("确定","请输入手机号",function(){}); 
        return;
      }else if(!verify){
        alertMsg("确定","请输入短信验证码",function(){}); 
        return;
      }else if(!userPwd){
        alertMsg("确定","请输入登陆密码",function(){}); 
        return;
      }
      if(!(/^1[34578]\d{9}$/.test(userName))){ 
        alertMsg("确定","手机号码有误，请重填",function(){}); 
        return; 
      }else if(verify!=verifyCode){
        alertMsg("确定","您输入短信验证码不正确",function(){}); 
        return;
      }
      //开始加载通讯
      commStart();
      // 发送数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_userPassword/modify",
        data:"phone="+userName+"&new_password="+strmd5(userPwd)+"&code_id="+verifyCodeId+"&code="+verify
      }).success(function(data){
        //console.log(data)
        if(data.code=="E0000"){
          commFinish();
          alertMsg("确定","修改成功",function(){
            clearInterval(verifyTimer);
            window.location.href="index.html#/login"
          }); 
        }else{
          commFinish();
          alertMsg("确定",data.message,function(){});
        }
      }).error(function(err){
        //console.log(err)
      });

    };

    //验证码
    var isVerify=true;
    var verTimeSum=60;
    $scope.verifyTime=function(){

      var tel=$("#userName").val();

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
          alertMsg("确定",data.message,function(){}); 
        }
      }).error(function(err){
        //console.log(err);
      });


      isVerify=false;
      $('.verifyBth').css({
        backgroundColor:"#aaa"
      }).html(verTimeSum+"秒");


      verifyTimer=setInterval(function(){
        if(verTimeSum<1){
          isVerify=true;
          verTimeSum=60;
          $('.verifyBth').css({
            backgroundColor:"#e4393c"
          }).html("获取验证码");
          clearInterval(verifyTimer);
        }else{
          verTimeSum--;
          $('.verifyBth').css({
            backgroundColor:"#aaa"
          }).html(verTimeSum+"秒");
        }
      }.bind(this),1000);

    }
    
    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);
    });


  });

  //用户中心
  horseApp.controller('userCenterCtrl',function($scope,$http,$location){
    var token=sessionStorage["ponyUserToken"];

    //用户宝驹列表
    $scope.carList=null;
    //用户帐号
    $scope.userAccounts="";
    // 用户马量
    $scope.userML=null;
    //用户评论列表
    $scope.commentList=[];   
    //用户最新信息数量 
    $scope.userNewMsg=0; 


    //页面跳转
    $scope.jump=function(pathStr){
      $location.path(pathStr);
    }

    //未开发服
    $scope.noServer=function(){
      alertMsg("确定","正在开发，敬请期待",function(){});
    }

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_user/myHome",
      data:"user_id="+ponyUserData.id+"&token="+token
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        console.log(data.data);
        $scope.carList=data.data.userCar_info;
        ponyUserCar=data.data.userCar_info;
        ponyUserData=data.data.user_info;
        $scope.userNewMsg=data.data.new_message;
        if($scope.carList){
          $("#userCenterPage>.userBoge>.bogeList>ul").css("width",$scope.carList.length*130);
        }
        $scope.userAccounts=data.data.user_info.phone.substr(0,3)+"****"+data.data.user_info.phone.substr(7);
        $scope.userML=thousandSeparator(parseFloat(data.data.user_info.ml)+parseFloat(data.data.user_info.remain));
        $scope.commentList=data.data.commit;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }
    });

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);
    });

  });

  //用户个人信息设置页面
  horseApp.controller("userInfoSetCtrl",function($scope,$http,$location){
    $scope.height=vHeight;
    var token=sessionStorage["ponyUserToken"];

    //用户头像
    $scope.userHeaderImg=ponyUserData.headimgurl;
    //用户昵称
    $scope.userponyName=ponyUserData.nick;

    //更改用户昵称
    $scope.changeUserName=function(){
      $("#userName").removeAttr("disabled","false").css({
        backgroundColor:"#fff",
        color:"#000"
      }).focus();
    }

    //帐号退出
    $scope.exitUserAccounts=function(){
      $location.path("/login");
    }
    
    // 用户支付密码设置
    $scope.userPayPwd=function(){
      //对用户是否进行过支付密码设置进行判断，如果没有设置过支付密码，那么他直接进行支付密码的设置，如果设置过，那选跳转至输入原支付密码，再输入新支付密码

      if(ponyUserData.is_pay_pwd==1){
        $location.path("/userPayPwd");
      }else{
        $location.path("/userSetNewPayPwd");
      }

    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //失焦更改用户昵称
      $("#userName").blur(function(){
        $(this).attr("disabled","true").css({
          backgroundColor:"transparent",
          color:"#fff"
        });

        var userName=$(this).val();
        //在这里上传更改信息
        $http({
          method:"post",
          url:"http://180.76.243.205:8383/_API/_user/nick",
          data:"user_id="+ponyUserData.id+"&token="+token+"&nick="+userName
        }).success(function(data){
          console.log(data);
          if(data.code="E0000"){
            ponyUserData=data.data;
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            });
          }else{
            alertMsg("确定",data.message,function(){}); 
          }
        }).error(function(err){
          console.log(err);
        });


      });

      // 头像更改
      $("#userLogoImg").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#userLogoPic").attr('src', "img/headImg.png");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#userLogoPic").attr('src', e.target.result);
          //图片展示完成后，对其进行上传
          var fData=new FormData(document.getElementById("userLogoImgForm"));
          fData.append("user_id",ponyUserData.id); 
          fData.append("token",token); 
          //开始加载通讯
          commStart();

          $.ajax({
            type:"post",
            url:"http://180.76.243.205:8383/_API/_upload/headimg",
            data:fData,
            processData:false,
            contentType:false,
            success:function(data){
              console.log(data);
              if(data.code=="E0000"){
                commFinish();
                ponyUserData=data.data;
              }else if(data.code=="E0014"){
                commFinish();
                alertMsg("确定",data.message,function(){
                  window.location.href="index.html#/login";
                });
              }else{
                commFinish();
                alertMsg("确定",data.message,function(){}); 
              }
            },
            error:function(err){
              console.log(err);
            }
          });
        }
      });

    });

  });

  //用户手机号修改页面
  horseApp.controller("userChangeTelCtrl",function($scope,$http,$location){
    var token=sessionStorage["ponyUserToken"];
    //显示手机号
    $scope.telNumber=ponyUserData.phone.substr(0,3)+"****"+ponyUserData.phone.substr(7);

    // 验证码数据
    var verifyCode="";
    var verifyCodeId="";
    var verifyTimer=null;

    // 返回按钮
    $scope.toBack=function(){
      clearInterval(verifyTimer);
      $location.path("/userInfoSet");
      
    }

    //修改手机号
    $scope.changeTelSubmit=function(tel,verify){

      //验证是否输入手机号
      if(!tel){
        alertMsg("确定","请输入您的新手机号",function(){}); 
        return;
      }
      
      if(!(/^1[34578]\d{9}$/.test(tel))){ 
        alertMsg("确定","手机号码有误，请重填",function(){});  
        return; 
      } 
      //验证码
      if(!verify){
        alertMsg("确定","请输入短信验证码",function(){}); 
        return;
      }else if(verify!=verifyCode){
        alertMsg("确定","您输入短信验证码不正确",function(){}); 
        return;
      }
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_user/modifyPhone",
        data:"user_id="+ponyUserData.id+"&token="+token+"&phone="+tel+"&code_id="+verifyCodeId+"&code="+verify
      }).success(function(data){ 
        console.log(data)
        if(data.code=="E0000"){
          commFinish();
          alertMsg("确定","修改成功",function(){
            clearInterval(verifyTimer);
            window.location.href="index.html#/login"
          }); 
        }else if(data.code=="E0014"){
          commFinish();
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          commFinish();
          alertMsg("确定",data.message,function(){}); 
        } 
      }).error(function(err){
        console.log(err)
      });


    }

    //验证码
    var isVerify=true;
    var verTimeSum=60;
    $scope.verifyTime=function(){
      var tel=$("#userTel").val();

      if(!isVerify){
        return;
      }
      //验证是否输入手机号
      if(!tel){
        alertMsg("确定","请输入您的新手机号",function(){}); 
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
          alertMsg("确定",data.message,function(){}); 
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
          $('.verifyBth').css({
            backgroundColor:"#e4393c"
          }).html("获取验证码");
          clearInterval(verifyTimer);
        }else{
          verTimeSum--;
          $('.verifyBth').css({
            backgroundColor:"#aaa"
          }).html(verTimeSum+"秒");
        }
      }.bind(this),1000);
    }
  });

  //用户手机号设置页面
  horseApp.controller("userSettingTelCtrl",function($scope,$http,$location){
    var token=sessionStorage["ponyUserToken"];

    // 验证码数据
    var verifyCode="";
    var verifyCodeId="";
    var verifyTimer=null;

    // 返回按钮
    $scope.toBack=function(){
      clearInterval(verifyTimer);
      $location.path("/login");
      
    }

    //设置手机号
    $scope.changeTelSubmit=function(tel,verify){

      //验证是否输入手机号
      if(!tel){
        alertMsg("确定","请输入您的新手机号",function(){}); 
        return;
      }
      
      if(!(/^1[34578]\d{9}$/.test(tel))){ 
        alertMsg("确定","手机号码有误，请重填",function(){});  
        return; 
      } 
      //验证码
      if(!verify){
        alertMsg("确定","请输入短信验证码",function(){}); 
        return;
      }else if(verify!=verifyCode){
        alertMsg("确定","您输入短信验证码不正确",function(){}); 
        return;
      }

      //上传手机号
      // $http({
      //   method:"post",
      //   url:"http://180.76.243.205:8383/_API/_user/modifyPhone",
      //   data:"user_id="+ponyUserData.id+"&token="+token+"&phone="+tel+"&code_id="+verifyCodeId+"&code="+verify
      // }).success(function(data){ 
      //   console.log(data)
      //   if(data.code=="E0000"){
      //     alertMsg("确定","修改成功",function(){
      //       clearInterval(verifyTimer);
      //       window.location.href="index.html#/login"
      //     }); 
      //   }else if(data.code=="E0014"){
      //     alertMsg("确定",data.message,function(){
      //       window.location.href="index.html#/login";
      //     });
      //   }else{
      //     alertMsg("确定",data.message,function(){}); 
      //   } 
      // }).error(function(err){
      //   console.log(err)
      // });


    }

    //验证码
    var isVerify=true;
    var verTimeSum=60;
    $scope.verifyTime=function(){
      var tel=$("#userTel").val();

      if(!isVerify){
        return;
      }
      //验证是否输入手机号
      if(!tel){
        alertMsg("确定","请输入您的新手机号",function(){}); 
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
          alertMsg("确定",data.message,function(){}); 
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
          $('.verifyBth').css({
            backgroundColor:"#e4393c"
          }).html("获取验证码");
          clearInterval(verifyTimer);
        }else{
          verTimeSum--;
          $('.verifyBth').css({
            backgroundColor:"#aaa"
          }).html(verTimeSum+"秒");
        }
      }.bind(this),1000);
    }
  });

  // 用户额度页面
  horseApp.controller("userAmountCtrl",function($scope,$http,$location){
    var token=sessionStorage["ponyUserToken"];

    // 充值列表信息
    var payList=null;
    //用户数据,可用额度
    $scope.usableNumber=null;
    //用户数据,信用总额度
    $scope.creditSumNum=null;
    //用户数据,剩余信用额度
    $scope.creditResidueNum=null;


    // 信用额度
    $scope.userCreditAmount=function(){
      alertMsg("确定","信用额度",function(){}); 
    }
    // 剩余信用额度
    $scope.userSurpludCreditAmount=function(){
      alertMsg("确定","剩余信用额度",function(){}); 
    }

    //去宝驹额度列表页面
    $scope.toBolgAmount=function(){
      // console.log(123);
      $location.path("/userBolgAmount");
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //开始加载通讯
      commStart();
      //获取数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_rechargeMode/get",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          commFinish();

          payList=data.data.ml_info;

          $scope.usableNumber=thousandSeparator(parseFloat(data.data.user_info.ml)+parseFloat(data.data.user_info.remain));
          $scope.creditSumNum=data.data.user_info.credit;
          $scope.creditResidueNum=data.data.user_info.remain;

          for(var i=0;i<4;i++){
            var one=payList[i];
            $("#userAmountPage>.payNumber>ul").children().eq(i).attr("data-cash",one.recharge_value).attr("data-ponyml",one.ml_value).children(".ponyNumber").html(one.ml_value).next().children().html(one.recharge_value);
          }

        }else if(data.code=="E0014"){
          commFinish();
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          commFinish();
          console.log(data.message);
        }
      }).error(function(err){
        console.log(err)
      });
      

      //充值金额选择
      $("#userAmountPage>.payNumber>ul").on("click","li",function(){
        var target=$(this);
        if(!target.hasClass("active")){
          target.addClass("active").siblings().removeClass("active");
        }
        //选择基本金额
        var len=target.parent().children().length;
        if(target.index()==(len-1)){
          target.parent().parent().children(".otherCashNumber").css({display:"block"});
        }else{
          target.parent().parent().children(".otherCashNumber").css({display:"none"});
        }
      });

      //支付方式选择
      $("#userAmountPage>.payMode").on("click",".payModeItem",function(){
        var target=$(this);
        if(target.hasClass("active")){

        }else{
          target.addClass("active").siblings().removeClass("active");
        }

      });


    });


  });

  //用户宝驹额度列表页面
  horseApp.controller("userBolgAmountCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //宝驹额度列表数据
    $scope.bolgAmountList=[];

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_carCredit/get",
      data:"user_id="+ponyUserData.id+"&token="+token
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        if(data.data.userCar_info){
          $scope.bolgAmountList=data.data.userCar_info;
        }
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });



    //监听页面加载
    $scope.$watch('$viewContentLoaded',function(){

    });

  });

  //支付密码页面
  horseApp.controller("userPayPwdCtrl",function($scope,$http,$location){
    var token=sessionStorage["ponyUserToken"];
    //支付密码
    $scope.userPayPwd="";

    //提交支付密码
    $scope.submitPayPwd=function(payPwd){
      var pwd=$("#userPayPwdInput").val()
      if(!pwd){
        alertMsg("确定","请输入您的支付密码",function(){}); 
        return;
      }else if(/^[0-9]{6}$/.test(pwd)){
        //数据前斯研证后，提交数据
        $http({
          method:"post",
          url:"http://180.76.243.205:8383/_API/_payPwd/verify",
          data:"user_id="+ponyUserData.id+"&token="+token+"&pay_pwd="+strmd5(pwd)
        }).success(function(data){
          if(data.code=="E0000"){
            // console.log(data.data);
            if(data.data.result==1){
              $location.path("/userSetNewPayPwd");
            }else{
              alertMsg("确定","你输入的密码不正确",function(){
                $("#userPayPwdInput").val("").focus();
                $("#userPayPwdPage>.payPwdBody>label").children().css("opacity","0");
              }); 
            }
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            });
          }else{
            alertMsg("确定",data.message,function(){
              $("#userPayPwdInput").val("").focus();
              $("#userPayPwdPage>.payPwdBody>label").children().css("opacity","0");
            }); 
          }
        }).error(function(err){
          console.log(err);
        });
      }else{
        alertMsg("确定","您输入的密码不正确",function(){
          $("#userPayPwdInput").val("").focus();
          $("#userPayPwdPage>.payPwdBody>label").children().css("opacity","0");
        }); 

      }
      
    }



    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //获取焦点
      $("#userPayPwdInput").focus();
      //获取输入密码
      $("#userPayPwdInput").keyup(function(){
        // console.log(this);

        var value=$(this).val();
        if(!value){
          $(this).parent().prev().children().css("opacity","0");
          return;
        }
        var len=value.length;
        // console.log(len);
        if(len>6){
          $(this).val(value.substr(0,6));
          $(this).parent().prev().children().css("opacity","1")
        }else if(len>0&&len<=6){
          $(this).parent().prev().children().css("opacity","0").eq(len-1).css("opacity","1").prevAll().css("opacity","1");
        }

      }).keydown(function(e){
        //确认按键 13
        // alert(e.which);
        if(e.which==13){
          var pwd=$("#userPayPwdInput").val()
          if(!pwd){
            alertMsg("确定","请输入您的支付密码",function(){}); 
            return;
          }else if(/^[0-9]{6}$/.test(pwd)){
            //数据前斯研证后，提交数据
            $.ajax({
              type:"post",
              url:"http://180.76.243.205:8383/_API/_payPwd/verify",
              data:{
                user_id:ponyUserData.id,
                token:token,
                pay_pwd:strmd5(pwd)
              },
              success:function(data){
                if(data.code=="E0000"){
                  if(data.data.result==1){
                    window.location.href="index.html#/userSetNewPayPwd"
                  }else{
                    alertMsg("确定","你输入的密码不正确",function(){
                      $("#userPayPwdInput").val("").focus();
                      $("#userPayPwdPage>.payPwdBody>label").children().css("opacity","0");
                    }); 
                  }
                }else if(data.code=="E0014"){
                  alertMsg("确定",data.message,function(){
                    window.location.href="index.html#/login";
                  });
                }else{
                  alertMsg("确定",data.message,function(){
                    $("#userPayPwdInput").val("").focus();
                    $("#userPayPwdPage>.payPwdBody>label").children().css("opacity","0");
                  }); 
                }
              },
              error:function(err){
                console.log(err);
              }
            })
           
          }else{
            alertMsg("确定","您输入的密码不正确",function(){
              $("#userPayPwdInput").focus();
              $("#userPayPwdInput").val("").focus();
              $("#userPayPwdPage>.payPwdBody>label").children().css("opacity","0");
            }); 
          }
        }
      });

    });


  });

  //设置新支付密码页面
  horseApp.controller('userSetNewPayPwdCtrl',function($scope,$http,$location){
    var token=sessionStorage["ponyUserToken"];
    //新支付密码
    $scope.userPayPwdFirst="";
    //确认新支付密码
    $scope.userPayPwdSecond="";

    //设置第一遍支付密码
    $scope.submitPayPwdFirst=function(payPwd){
      //获取输入密码
      var pwd=$("#userSetPayPwdInput").val()
      if(!pwd){
        alertMsg("确定","请输入您的支付密码",function(){}); 
        return;
      }else if(/^[0-9]{6}$/.test(pwd)){
        //成功正解匹配
        $("#userSetNewPayPwdPage>.setPayPwdBody>.affirmPayPwd").css("display","block").siblings().css("display","none");
        $("#userAffirmPayPwdInput").val("").focus();
        $("#userSetNewPayPwdPage>.setPayPwdBody>.affirmPayPwd>label").children().css("opacity","0");

      }else{
        alertMsg("确定","您输入的密码不正确",function(){
          $("#userAffirmPayPwdInput").focus();
        }); 
      }
    }

    //提交支付密码
    $scope.submitSetPayPwd=function(payPwd){
      //第一次设置的密码
      var first=$("#userSetPayPwdInput").val();
      //获取输入密码
      var pwd=$("#userAffirmPayPwdInput").val()
      if(!pwd){
        alertMsg("确定","请输入您的支付密码",function(){}); 
        return;
      }else if(/^[0-9]{6}$/.test(pwd)){
        //成功正解匹配
        if(payPwd==first){
        
          //密码符合规则，提交密码   
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_payPwd/set",
            data:"user_id="+ponyUserData.id+"&token="+token+"&pay_pwd="+strmd5(pwd)
          }).success(function(data){
            if(data.code=="E0000"){
              // console.log(data.data);
              alertMsg("确定","设置成功",function(){
                ponyUserData=data.data;
                window.location.href="index.html#/userInfoSet"
              }); 
            }else if(data.code=="E0014"){
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          }).error(function(err){
            console.log(err);
          });



        }else{
          alertMsg("确定","您两次输入的密码不一致，请重新输入",function(){
            $("#userSetNewPayPwdPage>.setPayPwdBody>.setPayPwd").css("display","block").siblings().css("display","none");
            $("#userSetPayPwdInput").val("").focus();
            $("#userSetNewPayPwdPage>.setPayPwdBody>.setPayPwd>label").children().css("opacity","0");
          }); 
        }

      }else{
        alertMsg("确定","您输入的密码不正确",function(){
          $("#userSetNewPayPwdPage>.setPayPwdBody>.setPayPwd").css("display","block").siblings().css("display","none");
          $("#userSetPayPwdInput").val("").focus();
          $("#userSetNewPayPwdPage>.setPayPwdBody>.setPayPwd>label").children().css("opacity","0");
        }); 
      }

    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //让设置支付密码获得焦点
      $("#userSetPayPwdInput").focus();
      //对输入的值进行判断
      $("#userSetPayPwdInput,#userAffirmPayPwdInput").keyup(function(){
        var value=$(this).val();
        if(!value){
          $(this).parent().prev().children().css("opacity","0");
          return;
        }
        var len=value.length;
        // console.log(len);
        if(len>6){
          $(this).val(value.substr(0,6));
          $(this).parent().prev().children().css("opacity","1")
        }else if(len>0&&len<=6){
          $(this).parent().prev().children().css("opacity","0").eq(len-1).css("opacity","1").prevAll().css("opacity","1");
        }
      });

      // 第一次输入前往
      $("#userSetPayPwdInput").keydown(function(e){
        //确认按键 13
        if(e.which==13){
          //获取输入密码
          var pwd=$("#userSetPayPwdInput").val()
          if(!pwd){
            alertMsg("确定","请输入您的支付密码",function(){}); 
            return;
          }else if(/^[0-9]{6}$/.test(pwd)){
            // 成功正解匹配
            // alert(pwd);
            $("#userSetNewPayPwdPage>.setPayPwdBody>.affirmPayPwd").css("display","block").siblings().css("display","none");
            $("#userAffirmPayPwdInput").val("").focus();
            $("#userSetNewPayPwdPage>.setPayPwdBody>.affirmPayPwd>label").children().css("opacity","0");

          }else{
            alertMsg("确定","您输入的密码不正确",function(){
              $("#userAffirmPayPwdInput").focus();
            }); 
          }
        }

      });

      //第二次输入密码提交
      $("#userAffirmPayPwdInput").keydown(function(e){
        //确认按键 13
        if(e.which==13){

          //第一次设置的密码
          var first=$("#userSetPayPwdInput").val();
          //获取输入密码
          var pwd=$("#userAffirmPayPwdInput").val()

          if(!pwd){
            alertMsg("确定","请输入您的支付密码",function(){}); 
            return;
          }else if(/^[0-9]{6}$/.test(pwd)){
            //成功正解匹配
            if(pwd==first){
              //密码符合规则，提交密码   
              $http({
                method:"post",
                url:"http://180.76.243.205:8383/_API/_payPwd/set",
                data:"user_id="+ponyUserData.id+"&token="+token+"&pay_pwd="+strmd5(pwd)
              }).success(function(data){
                if(data.code=="E0000"){
                  // console.log(data.data);
                  alertMsg("确定","设置成功",function(){
                    ponyUserData=data.data;
                    window.location.href="index.html#/userInfoSet"
                  }); 
                }else if(data.code=="E0014"){
                  alertMsg("确定",data.message,function(){
                    window.location.href="index.html#/login";
                  });
                }else{
                  alertMsg("确定",data.message,function(){}); 
                }
              }).error(function(err){
                console.log(err);
              });

            }else{
              alertMsg("确定","您两次输入的密码不一致，请重新输入",function(){ 
                $("#userSetNewPayPwdPage>.setPayPwdBody>.setPayPwd").css("display","block").siblings().css("display","none");
                $("#userSetPayPwdInput").val("").focus();
                $("#userSetNewPayPwdPage>.setPayPwdBody>.setPayPwd>label").children().css("opacity","0");
              }); 
            }

          }else{
            alertMsg("确定","您输入的密码不正确",function(){
              $("#userSetNewPayPwdPage>.setPayPwdBody>.setPayPwd").css("display","block").siblings().css("display","none");
              $("#userSetPayPwdInput").val("").focus();
              $("#userSetNewPayPwdPage>.setPayPwdBody>.setPayPwd>label").children().css("opacity","0");
            }); 
          }
        }

      });

    });


  });

  //用户优惠券页面
  horseApp.controller('userCouponCtrl',function($scope,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //用户可用数组
    $scope.couponUseList=[];
    //用户不可能数组
    $scope.couponUnavailList=[];

    //获取数据 
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_userSales/getList",
      data:"user_id="+ponyUserData.id+"&token="+token
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        $scope.couponUseList=data.data.not_used;

        for(var i=0;i<data.data.expired.length;i++){
          var one=data.data.expired[i];
          one.isUsed=2;
          $scope.couponUnavailList.push(one);
        }
        for(var i=0;i<data.data.used.length;i++){
          var one=data.data.used[i];
          one.isUsed=1;
          $scope.couponUnavailList.push(one);
        }


      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
        // alertMsg("确定",data.message,function(){}); 
      }
    });

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //分类优惠券
      $("#userCouponPage>.couponClassify>ul").on("click","li",function(){
        var target=$(this);
        if(!target.hasClass("active")){
          target.addClass("active").siblings().removeClass("active");
          $("#userCouponPage>.couponList").children().eq(target.index()).addClass("active").siblings().removeClass("active");
        }
      });

    });

  });

  //用户推广有礼页面
  horseApp.controller("userExpandCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    
  });

  //小马驾驾关于我们页面
  horseApp.controller("ponyAboutCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    //监听页面加载
    $scope.$watch("viewContentLoaded",function(){

    });
  });

  //系统信息列表页面
  horseApp.controller("systemMsgListCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //用户信息列表
    $scope.userMsgList=[];

    //获取数据 
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_userMessage/getList",
      data:"user_id="+ponyUserData.id+"&token="+token
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        $scope.userMsgList=data.data;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
        // alertMsg("确定",data.message,function(){}); 
      }
    });

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){

    });
  });

  //用户评价列表页面
  horseApp.controller("userCommentListCtrl",function($scope,$http,$location){
    // $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //评价列表
    $scope.commentList=[];

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_userCommit/get",
      data:"user_id="+ponyUserData.id+"&token="+token
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        $scope.commentList=data.data.commit;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        // console.log(data.message);
      }
    });

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){

    });
  });
  
  //待服务轮胎页面
  horseApp.controller('CASTireCtrl',function($scope,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //CASTireList数组
    $scope.CASTireList=[];

    //跳转安装服务
    $scope.toInstall=function(){
      $location.path("/changeTireSel");
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //获取数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_pendingService/get",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        if(data.code=="E0000"){
          // console.log(data.data);
          $scope.CASTireList=data.data;
          if(!$scope.CASTireList.length){
            $("#CASTirePage>.CASList>.noData").css("display","block");
          }
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          $("#CASTirePage>.CASList>.noData").css("display","block");
          // console.log(data.message);
        }
      }).error(function(err){
        console.log(err);
      });
    });



  });

  //订单列表
  horseApp.controller('orderCtrl',function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //订单更新时间戳
    var orderListTime="first";

    //传放参数值
    var listTarget=$routeParams.listTarget;
    //定时请求数据定时器
    var orderTimer=null;

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

    //获取订单列表数据
    function getListData(){
      if($("#orderPage").length>0){
        // console.log("在");
      }else{
        console.log("不在");
        //当前页面不在订单列表页面时
        clearInterval(orderTimer);
        return;
      }
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_userOrder/get",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        // console.log(data);
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
  
              switch (one.status){
                //交易完成
                case '1':
                  one.btnName="已评价";
                  one.btnColor="#b4b4b4";
                  $scope.orderListAll.push(one);
                  $scope.orderListFinish.push(one);
                  break;
                //待发货
                case '5':
                  one.btnName="取消订单";
                  one.btnColor="#ee2625";
                  $scope.orderListAll.push(one);
                  $scope.orderListIsDelivery.push(one);
                  break;
                //待商家确认服务
                case '3':
                  if(one.stage==2){
                    one.btnName="补差换胎";
                    one.btnColor="#ee2625";
                    $scope.orderListAll.push(one);
                    $scope.orderListIsServer.push(one);
                  }else if(one.stage==3||one.stage==1||one.stage==5){
                    one.btnName="等待服务";
                    one.btnColor="#b4b4b4";
                    $scope.orderListAll.push(one);
                    $scope.orderListIsServer.push(one);
                  }else if(one.stage==4){
                    one.btnName="支付运费";
                    one.btnColor="#ee2625";
                    $scope.orderListAll.push(one);
                    $scope.orderListIsServer.push(one);
                  }
                  break;
                //待收货
                case '2':
                  one.btnName="等待确认";
                  one.btnColor="#b4b4b4";
                  $scope.orderListAll.push(one);
                  $scope.orderListIsReceiving.push(one);
                  break;
                //待订单服务确认
                case '6':
                  one.btnName="确认服务";
                  one.btnColor="#ee2625";
                  $scope.orderListAll.push(one);
                  $scope.orderListIsServer.push(one);
                  break;
                //交易完成待评价  
                case '7':
                  one.btnName="待评价";
                  one.btnColor="#ee2625";
                  $scope.orderListAll.push(one);
                  $scope.orderListFinish.push(one);
                  break;
                //交易完成待评价  
                // case '8':
                //   one.btnName="确认服务";
                //   one.btnColor="#ee2625";
                //   $scope.orderListAll.push(one);
                //   $scope.orderListIsServer.push(one);
                //   break;
              }
  
            }
          }
          console.log($scope.orderListAll);
          //所有订单数据
          // $scope.orderListAll=data.data;
          //待发货订单数据
          // $scope.orderListIsDelivery=[];
          //待收货订单数据
          // $scope.orderListIsReceiving=[];
          //待服务订单数据
          // $scope.orderListIsServer=[];
          //完成订单数据
          // $scope.orderListFinish=[];
  
        }else if(data.code=="E0014"){
          window.location.href="index.html#/main";
          // alertMsg("确定",data.message,function(){
          // });
        }else{
          console.log(data.message);
          // alertMsg("确定",data.message,function(){
          // });
        }
      });
    }
    // 执行请求函数
    getListData();
    // 定时请求数据
    orderTimer=setInterval(getListData,30000);

    //列表数据按钮功能
    $scope.orderListBtn=function(e,id,status,stage,shopId){
      // 阻止冒泡
      e.stopPropagation();
      console.log(id,status,stage);

      switch (status){
        //交易完成
        case '1':
          // 已评价          
          break;
        //待发货
        case '5':
          // 取消订单
          //开始加载通讯
          commStart();
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_userOrder/cancel",
            data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+id
          }).success(function(data){
            console.log(data);
            if(data.code=="E0000"){
              commFinish();
              alertMsg("确定","取消成功",function(){});
              getListData();
            }else if(data.code=="E0014"){
              commFinish();
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              // console.log(data.message);
              commFinish();
              alertMsg("确定",data.message,function(){
              });
            }
          });
          break;
        //待商家确认服务
        case '3':
          if(stage==2){
            // 补差换胎
            clearInterval(orderTimer);
            $location.path("/orderRepairTireCost/"+id);
          }else if(stage==1||stage==3||stage==5){
            // 等待服务

          }else if(stage==4){
            // 支付运费
            clearInterval(orderTimer);
            $location.path("/orderPayFreight/"+id);
          }
          break;
        //待收货
        case '2':
          // 等待确认
          break;
        //待订单服务确认
        case '6':
          // 确认服务
          //开始加载通讯
          commStart();
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_userService/confirm",
            data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+id
          }).success(function(data){
            console.log(data);
            if(data.code=="E0000"){
              commFinish();
              alertMsg("确定","服务完成",function(){});
              getListData();
            }else if(data.code=="E0014"){
              commFinish();
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              commFinish();
              // console.log(data.message);
              alertMsg("确定",data.message,function(){
              });
            }
          });
          break;
        case '7':
          // 待评价
          clearInterval(orderTimer);
          $location.path("/userEvaluate/"+shopId+"/"+id);
          break;
        // case '8':
        //   // 等待服务
        //   break;

      }

      
    }

    //查看订单详情
    $scope.orderListDetail=function(id,status,stage){
      // console.log("123");
      var path="";
      switch (status){
        //交易完成
        case '1':
          // one.btnName="已评价";
          path="/orderAffirmServer";
          break;
        //待发货
        case '5':
          // one.btnName="取消订单";
          path="/orderAffirmServer";
          break;
        //待商家确认服务
        case '3':
          if(stage==2){
            // one.btnName="补差换胎";
            path="/orderRepairTireCost";
          }else if(stage==1||stage==3||stage==5){
            // one.btnName="等待服务";
            path="/orderAffirmServer";
          }else if(stage==4){
            // one.btnName="支付运费";
            path="/orderPayFreight";
          }
          break;
        //待收货
        case '2':
          // one.btnName="等待确认";
          path="/orderAffirmServer";
          break;
        //待订单服务确认
        case '6':
          // one.btnName="确认服务";
          path="/orderAffirmServer";
          break;
        case '7':
          // one.btnName="未评价";
          path="/orderAffirmServer";
          break;
        // case '8':
        //   // one.btnName="等待服务";
        //   path="\orderAffirmServer";
        //   break;
      }
      clearInterval(orderTimer);
      $location.path(path+"/"+id);
    }

    //返回页面按钮
    $scope.toBack=function(){
      clearInterval(orderTimer);
      $location.path("/userCenter");
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //console.log(listTarget);
      switch (listTarget){
        case "all":
          $('.classify>ul').children().eq(0).addClass("active").siblings().removeClass("active");
          //console.log($('.productList>.productAll'));
          $('.productList>.productAll').addClass("active").siblings().removeClass("active");
          break;
        case "sendOut":
          $('.classify>ul').children().eq(1).addClass("active").siblings().removeClass("active");
          //console.log($('.productList>.productToSendOut'));
          $('.productList>.productToSendOut').addClass("active").siblings().removeClass("active");
          break;
        case "receive":
          $('.classify>ul').children().eq(2).addClass("active").siblings().removeClass("active");
          //console.log($('.productList>.productToReceive'));
          $('.productList>.productToReceive').addClass("active").siblings().removeClass("active");
          break;
        case "server":
          $('.classify>ul').children().eq(3).addClass("active").siblings().removeClass("active");
          //console.log($('.productList>.productToServer'));
          $('.productList>.productToServer').addClass("active").siblings().removeClass("active");
          break;
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
      });




    });


  });

  //订单服务确认页面
  horseApp.controller("orderAffirmServerCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //传入数据订单参数 
    var orderId=$routeParams.orderId;

    //信息列表数据
    $scope.orderDetailList=null;
    //用户使用优惠券列表
    $scope.usedCoupon=[];
    //订单信息
    $scope.orderDetail=null;
    //轮胎照片
    $scope.tireImg=[];
    //车辆照片
    $scope.carImg=[];
    //车架号照片
    $scope.carFrame=[];
    //行驶证照片
    $scope.drivingImg=[];

    //订单状态
    var orderStatus=0;
    //店铺ID
    var stopId=null;

    //返回页面按钮
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //具体功能提交按钮
    $scope.subminFun=function(){
      //根据具体订单状态不同，执行不同的功能 
      console.log(orderStatus);
      switch (orderStatus){
        //交易完成
        // case '1':
        //   // one.btnName="已评价";
        //   break;
        //待发货
        case '5':
          // one.btnName="取消订单";
          //开始加载通讯
          commStart();
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_userOrder/cancel",
            data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+orderId
          }).success(function(data){
            console.log(data);
            if(data.code=="E0000"){
              commFinish();
              alertMsg("确定","取消成功",function(){});
              getListData();
            }else if(data.code=="E0014"){
              commFinish();
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              commFinish();
              // console.log(data.message);
              alertMsg("确定",data.message,function(){
              });
            }
          });
          break;
        //待商家确认服务
        // case '3':
        //   // if(stage==2){
        //   //   // one.btnName="补差换胎";
        //   // }else if(stage==1||stage==3||stage==5){
        //   //   // one.btnName="等待服务";
        //   // }else if(stage==4){
        //   //   // one.btnName="支付运费";
        //   // }
        //   break;
        //待收货
        // case '2':
        //   // one.btnName="等待确认";
        //   // $("#orderAffirmBtn").html("等待确认").css("backgroundColor","#b4b4b4");
        //   break;
        //待订单服务确认
        case '6':
          // one.btnName="确认服务";
          //开始加载通讯
          commStart();
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_userService/confirm",
            data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+orderId
          }).success(function(data){
            console.log(data);
            if(data.code=="E0000"){
              commFinish();
              alertMsg("确定","服务完成",function(){
                window.location.href="index.html#/order/finish";
              });
            }else if(data.code=="E0014"){
              commFinish();
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              commFinish();
              // console.log(data.message);
              alertMsg("确定",data.message,function(){
              });
            }
          });
          break;
        case '7':
          // one.btnName="未评价";
          $location.path("/userEvaluate/"+stopId+"/"+orderId);
          break;
      }
    }


    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //获取数据
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_userOrder/getSingle",
        data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+orderId
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          commFinish();
          $scope.orderDetailList=data.data.details;
          $scope.orderDetail=data.data.orderInfo;
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

          orderStatus=data.data.orderInfo.status;
          stopId=data.data.orderInfo.store_id;
          switch (orderStatus){
            //交易完成
            case '1':
              // one.btnName="已评价";
              $("#orderAffirmBtn").html("已评价").css("backgroundColor","#b4b4b4");
              break;
            //待发货
            case '5':
              // one.btnName="取消订单";
              $("#orderAffirmBtn").html("取消订单").css("backgroundColor","#ee2625");
              break;
            //待商家确认服务
            case '3':
              $("#orderAffirmBtn").html("等待服务").css("backgroundColor","#b4b4b4");
              break;
            //待收货
            case '2':
              // one.btnName="等待确认";
              $("#orderAffirmBtn").html("等待确认").css("backgroundColor","#b4b4b4");
              break;
            //待订单服务确认
            case '6':
              // one.btnName="确认服务";
              $("#orderAffirmBtn").html("确认服务").css("backgroundColor","#ee2625");
              break;
            case '7':
              // one.btnName="未评价";
              $("#orderAffirmBtn").html("待评价").css("backgroundColor","#ee2625");
              break;
            default:
              $("#orderAffirmBtn").html("已完成").css("backgroundColor","#b4b4b4");
          }

        }else if(data.code=="E0014"){
          commFinish();
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          commFinish();
          // console.log(data.message);
          alertMsg("确定",data.message,function(){
          });
        }
      });
    });
  });

  //订单支付运费页面
  horseApp.controller('orderPayFreightCtrl',function($scope,$http,$location,$routeParams){

    var token=sessionStorage["ponyUserToken"];

    //传入数据订单参数 
    var orderId=$routeParams.orderId;

    //信息列表数据
    $scope.orderDetailList=null;
    //订单信息
    $scope.orderDetail=null;
    //轮胎照片
    $scope.tireImg=[];
    //车辆照片
    $scope.carImg=[];
    //车架号照片
    $scope.carFrame=[];
    //行驶证照片
    $scope.drivingImg=[];

    //开始加载通讯
    commStart();
    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_userOrder/getSingle",
      data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+orderId
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        commFinish();
        $scope.orderDetailList=data.data.details;
        $scope.orderDetail=data.data.orderInfo;
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

      }else if(data.code=="E0014"){
        commFinish();
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        commFinish();
        console.log(data.message);
        // alertMsg("确定",data.message,function(){});
      }
    });

    //支付运费
    $scope.submitPay=function(){
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_userFare/pay",
        data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+orderId
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          commFinish();
          $location.path("/checkoutCounter/"+data.data.obj_id+"/"+data.data.trade_mode);
        }else if(data.code=="E0014"){
          commFinish();
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          commFinish();
          // console.log(data.message);
          alertMsg("确定",data.message,function(){});
        }
      });
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){

    });
  });

  //订单补差换胎页面
  horseApp.controller('orderRepairTireCostCtrl',function($scope,$http,$routeParams,$location){
    
    var token=sessionStorage["ponyUserToken"];

    //传入数据订单参数 
    var orderId=$routeParams.orderId;

    //信息列表数据
    $scope.orderDetailList=null;
    //订单信息
    $scope.orderDetail=null;
    //轮胎照片
    $scope.tireImg=[];
    //车辆照片
    $scope.carImg=[];
    //车架号照片
    $scope.carFrame=[];
    //行驶证照片
    $scope.drivingImg=[];

    //畅行无忧数量
    $scope.CXWY=0;

    //开始加载通讯
    commStart();
    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_userOrder/getSingle",
      data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+orderId
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        commFinish();
        $scope.orderDetailList=data.data.details;
        $scope.orderDetail=data.data.orderInfo;
        $scope.CXWY=data.data.cxwy;
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

      }else if(data.code=="E0014"){
        commFinish();
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        commFinish();
        console.log(data.message);
        // alertMsg("确定",data.message,function(){});
      }
    });

    //确认补差 ，如果使用畅行无忧且数量符合，直接跳订单列表页面，否则跳收银台进行支付
    $scope.submitMakeUp=function(){
      var cxwySel=$("#orderRepairTireCostPage>.orderDetail>.serverCXWY").hasClass("sel")?1:2;
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_userBalance/payment",
        data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+orderId+"&cxwy="+cxwySel
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          commFinish();
          if(!data.data.trade_mode){
            alertMsg("确定","提交成功",function(){
              window.location.href="index.html#/order/server";
            });
          }else{
            $location.path("/checkoutCounter/"+data.data.obj_id+"/"+data.data.trade_mode);
          }
        }else if(data.code=="E0014"){
          commFinish();
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          commFinish();
          // console.log(data.message);
          alertMsg("确定",data.message,function(){});
        }
      }); 
    }

    //拒绝补差
    $scope.refuseMakeUp=function(){
      confirmMsg(["确认","取消"],"您确定要拒绝服务吗？",function(){
        // console.log("确定");
        //开始加载通讯
        commStart();
        $.ajax({
          type:"post",
          url:"http://180.76.243.205:8383/_API/_userBalance/denial",
          data:{
            user_id:ponyUserData.id,
            order_id:orderId,
            token:token
          },
          success:function(data){
            commFinish();
            console.log(data);
            if(data.code=="E0000"){
              alertMsg("确定","提交成功",function(){
                window.location.href="index.html#/orderPayFreight/"+orderId;
              });
            }else if(data.code=="E0014"){
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              // console.log(data.message);
              alertMsg("确定",data.message,function(){});
            }
          },
          error:function(err){
            commFinish();
            console.log(err);
          }
        });
      },function(){
        // console.log("取消");
      });
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //畅行无忧选择
      $("#orderRepairTireCostPage>.orderDetail>.serverCXWY").on("click",function(){
        var target=$(this);
        if(target.hasClass("sel")){
          target.removeClass("sel");
        }else{
          target.addClass("sel");
        }
      });


    });
  });

  //用户发表评价页面
  horseApp.controller("userEvaluateCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //传放参数值
    var shopId=$routeParams.shopId;
    var orderId=$routeParams.orderId;

    //订单数据
    $scope.order=null;

    // 获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_user/toCommit",
      data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+orderId+"&store_id="+shopId
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        $scope.order=data.data;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
        // alertMsg("确定",data.message,function(){});
      }
    });

    // 发表评论
    $scope.submitUserComment=function(){
      //满意度星数
      var starNum=$("#userEvaluatePage>.evaluateSatisficing>.star").children(".on").length;
      //评价内容
      var commentMsg=$("#evaluateMsg").val();
      //是否匿名
      var isAnonymity=$("#userEvaluatePage>.evaluateMsg>.evaluateStatus>p").hasClass("sel")?1:2;

      if(!starNum){
        alertMsg("确定","请选择服务满意度",function(){});
        return;
      }
      if(!commentMsg){
        alertMsg("确定","请输入评价内容",function(){});
        return;
      }
      //开始加载通讯
      commStart();
      //提交数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_userCommit/submit",
        data:"user_id="+ponyUserData.id+"&token="+token+"&order_id="+orderId+"&store_id="+shopId+"&star_no="+starNum+"&content="+commentMsg+"&anonymous="+isAnonymity
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          commFinish();
          alertMsg("确定","评论成功",function(){
            window.location.href="index.html#/order/finish";
          });
        }else if(data.code=="E0014"){
          commFinish();
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          commFinish();
          // console.log(data.message);
          alertMsg("确定",data.message,function(){});
        }
      });

    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){

      //对服务满意度进行评分
      $("#userEvaluatePage>.evaluateSatisficing>.star").on("click","i",function(){
        var target=$(this);
        // console.log(target.index());
        target.parent().children().removeClass("on");
        target.addClass("on").prevAll().addClass("on");
        switch(target.index()){
          case 0:
            target.parent().next().attr("data-starnum","1").html("非常差");
            break;
          case 1:
            target.parent().next().attr("data-starnum","2").html("差");
            break;
          case 2:
            target.parent().next().attr("data-starnum","3").html("一般");
            break;
          case 3:
            target.parent().next().attr("data-starnum","4").html("满意");
            break;
          case 4:
            target.parent().next().attr("data-starnum","4").html("非常满意");
            break;
        }

      });

      //是否匿名评价
      $("#userEvaluatePage>.evaluateMsg>.evaluateStatus>p").click(function(){
        var target=$(this);
        if(target.hasClass("sel")){
          target.removeClass("sel").next().css("display","none");
        }else{
          target.addClass("sel").next().css("display","block");
        }
      });


    });

  });

  //用户宝驹列表页面
  horseApp.controller("userBolgListCtrl",function($scope,$http){
    $scope.height=vHeight;
    var token=sessionStorage["ponyUserToken"];

    $scope.userCarList=null;


    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_user/myHome",
      data:"user_id="+ponyUserData.id+"&token="+token
    }).success(function(data){
      if(data.code=="E0000"){
        $scope.carList=data.data.userCar_info;
        ponyUserCar=data.data.userCar_info;
        ponyUserData=data.data.user_info;
        var carList=ponyUserCar;
        if(carList){
          var carNewList=carList.sort(function(a,b){return a.is_default>b.is_default?1:0});
        }
        $scope.userCarList=carNewList;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }
    });

    //设为默认宝驹
    $scope.userCarDefault=function(userCarId){
      //console.log(userCarId);
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_userCar/default",
        data:"user_id="+ponyUserData.id+"&token="+token+"&user_car_id="+userCarId
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          commFinish();
          var carList=$("#bolgListPage>.bolgList>ul").children();
          for(var i=0;i<carList.length;i++){
            var item=carList[i];
            if($(item).attr("data-usercarid")==data.data.id){
              $(item).addClass("active").siblings().removeClass("active");
            }
          }
        }else if(data.code=="E0014"){
          commFinish();
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          commFinish();
          alertMsg("确定",data.message,function(){}); 
        }
      }).error(function(err){
        //console.log(err);
      });
    }
    //删除宝驹
    $scope.userCarRemove=function(userCarId){
      //console.log(userCarId);
      confirmMsg(["确认","取消"],"删除宝驹后数据将不再保留，您确认删除吗？",function(){
        // console.log("确定");
        //开始加载通讯
        commStart();
        $.ajax({
          type:"post",
          url:"http://180.76.243.205:8383/_API/_userCar/delete",
          data:{
            user_id:ponyUserData.id,
            token:token,
            user_car_id:userCarId
          },
          success:function(data){
            if(data.code=="E0000"){
              commFinish();
              var carList=$("#bolgListPage>.bolgList>ul").children();
              for(var i=0;i<carList.length;i++){
                var item=carList[i];
                if($(item).attr("data-usercarid")==userCarId){
                  $(item).remove();
                }
              }
            }else if(data.code=="E0014"){
              commFinish();
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              commFinish();
              alertMsg("确定",data.message,function(){}); 
            }
          }
        });


      },function(){
        // console.log("取消");
      });

    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

    });



  });

  //用户宝驹设置页面
  horseApp.controller("userBolgConfigCtrl",function($scope,$routeParams,$http){
    $scope.height=vHeight;
    var token=sessionStorage["ponyUserToken"];

    //传入的userBlog参数
    var userBolg=$routeParams.userBolg;

    //保存修改宝驹用户数据的参数
    var userCreatBolg=null;


    // 车辆品牌分组
    $scope.brandA=[];
    $scope.brandB=[];
    $scope.brandC=[];
    $scope.brandD=[];
    $scope.brandE=[];
    $scope.brandF=[];
    $scope.brandG=[];
    $scope.brandH=[];
    $scope.brandI=[];
    $scope.brandJ=[];
    $scope.brandK=[];
    $scope.brandL=[];
    $scope.brandM=[];
    $scope.brandN=[];
    $scope.brandO=[];
    $scope.brandP=[];
    $scope.brandQ=[];
    $scope.brandR=[];
    $scope.brandS=[];
    $scope.brandT=[];
    $scope.brandU=[];
    $scope.brandV=[];
    $scope.brandW=[];
    $scope.brandX=[];
    $scope.brandY=[];
    $scope.brandZ=[];

    //品牌下的车系分组
    $scope.brandSeriesArr=[];

    //车型下所有车辆
    $scope.carArr=[];
    
    //车型下车辆排量
    $scope.carCCArr=[];

    //车型下车辆年份
    $scope.carYearArr=[];

    //车型下车辆最后类型
    $scope.carTypeArr=[];

    //用户车型选择上方详情数组
    $scope.carModel=[];

    //用户车型路况数组
    $scope.carRoadCondition=[];

    // 用户车型第二次要选拔数据数组
    $scope.carSelSecondRoadCondition=[];

    //用户最后选择路况数据
    var carFinalSelRoad=[];

    //选择路况显示数据
    $scope.selRoadHtml="";

    //原路况数据
    var originalRoad="";

    var userBolgNum=$routeParams.userBolg;
    //console.log(userBolgNum);


    //页面返回
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //选取里程表是否被损坏
    $scope.selObometerBad=function(){
      if($("#myBolgPage>.bolgConfig>form>.selObometer").hasClass("on")){
        $("#mileageImg").removeAttr("disabled");
        $("#myBolgPage>.bolgConfig>form>.selObometer").removeClass("on").next().css("display","block").next().css("display","block");
      }else{
        $("#myBolgPage>.bolgConfig>form>.selObometer").addClass("on").next().css("display","none").next().css("display","none");
        $("#userBolgMileage").val(0);
        $("#mileagePic").attr('src','img/mileage.jpg');
        $("#mileageImg").attr("disabled",'true').val("");
      }
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //如果不为null那就是有id，是修改用户宝驹页面，如是NULL，那就是新增宝驹页面，有推荐人一项
      if(userBolg!="null"){
        $(".referrer").css("display","none");
        //开始加载通讯
        commStart();
        $http({
          method:"post",
          url:"http://180.76.243.205:8383/_API/_userCar/get",
          data:"user_id="+ponyUserData.id+"&token="+token+"&user_car_id="+userBolg
        }).success(function(data){
          //console.log(data);
          if(data.code=="E0000"){
            commFinish();
            userCreatBolg=data.data;
            //console.log(userCreatBolg);
            //车牌省
            $("#userBolgCodeProvince").val(userCreatBolg.plat_code);
            //车牌字母
            $("#userBolgCodeLetter").val(userCreatBolg.plat_font);
            //车牌后面的字符
            $("#userBolgCodeNum").val(userCreatBolg.plat_num);
            //车型
            $("#userBolgType").html(userCreatBolg.car_name.split("-")[0]);
            $("#userBolgType").attr("data-carid",userCreatBolg.car_id)
            // 服务截止日期 
            $("#ponyServerStopData").val(userCreatBolg.service_end_date.split(" ")[0]);
            // 轮胎规格
            $("#userBolgTireType").attr("data-font",userCreatBolg.font).attr("data-rear",userCreatBolg.rear).html("前:"+userCreatBolg.font+" 后:"+userCreatBolg.rear);
            // 行驶证日期
            $("#userBolgData").val(userCreatBolg.driving_license_date.split(" ")[0]);
            // 车险日期
            $("#userBolgInsurance").val(userCreatBolg.insurance_date.split(" ")[0]);
            //行驶里程
            $("#userBolgMileage").val(userCreatBolg.traveled);
            //路况
            $scope.selRoadHtml=userCreatBolg.road;
            originalRoad=userCreatBolg.road; 
            // 行驶证正页照片
            $("#drivePicFront").attr("src",userCreatBolg.traveled_img_obverse);
            // 行驶证副页照片
            $("#drivePicSecond").attr("src",userCreatBolg.traveled_img_inverse);
            // 里程照片
            if(userCreatBolg.maturity_img){
              $("#mileagePic").attr("src",userCreatBolg.maturity_img);
            }else{
              $("#myBolgPage>.bolgConfig>form>.selObometer").addClass("on").next().css("display","none").next().css("display","none");
              $("#userBolgMileage").val(0);
              $("#mileagePic").attr('src','img/mileage.jpg');
              $("#mileageImg").attr("disabled",'true').val("");
            }
            // 保险照片
            $("#InsurancePic").attr("src",userCreatBolg.insurance_img);
          }else if(data.code=="E0014"){
            commFinish();
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            });
          }
        }).error(function(err){
          //console.log(err);
        });
      }else{
        $("#myBolgPage>.header>.bolgList").css("display","none");
        $(".referrer").css("display","block");
      }



      //行驶证正面照片
      $("#driveImgFront").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#drivePicFront").attr('src', "img/front.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#drivePicFront").attr('src', e.target.result);
        }
      });
      //行驶证副页照片
      $("#driveImgSecond").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#drivePicSecond").attr('src', "img/second.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#drivePicSecond").attr('src', e.target.result)
        }
      });
      //里程照片
      $("#mileageImg").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#mileagePic").attr('src', "img/mileage.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#mileagePic").attr('src', e.target.result);
        }
      });
      //保险照片
      $("#InsuranceImg").change(function(e){
        //console.log(e.target.files[0]);
        var file= this.files[0];
        if(file==null){
          $("#InsurancePic").attr('src', "img/insurance.jpg");
          return;
        }
        var render=new FileReader();
        render.readAsDataURL(file)
        render.onloadend=function(e){
          $("#InsurancePic").attr('src', e.target.result);
        }
      });

      //绑定车辆品牌字母选择事件
      $(".selCarLetter>ul").on('click','li',function(e){
        var num=$(e.target).index();
        var sumH=0;
        var ulList=$('.carBrandList>ul').children();
        var len=ulList.length
        if(num<=len){
          for(var i= 0;i<num;i++){
            sumH+=$(ulList[i]).height();
          }
        }
        //列表滚动
        if(num==0){
          $("body").animate({
            scrollTop:0
          },1000);
        }else{
          $("body").animate({
            scrollTop:sumH
          },1000);
        }

      });

      //绑定车型类别选择
      $('.model>ul').on("click","li",function(){
        var num=$(this).index();
        if(num==0){
          $('.model>h4').html("请选择发动机排量");
        }else if(num==1){
          $('.model>h4').html("请选择年份");
        }
        $scope.carModel.length=num;
        //console.log($scope.carModel);
        //强制更新页面
        $scope.$apply();
        $(".modelList").children().eq(num).addClass("active").siblings().removeClass("active");

      });

      //经常行驶路况选择
      $('#carSelRunRoad>.runRoadOftenList>ul').on("click","li",function(){
        var target=$(this);
        if(target.hasClass('active')){
          //取消选中
          target.removeClass('active');

        }else{
          //选中
          target.addClass('active');
        }
      });

      //偶尔行驶路况选择
      $('#carSelRunRoad>.runRoadOnceList>ul').on("click","li",function(){
        var target=$(this);
        if(target.hasClass('active')){
          //取消选中
          target.removeClass('active');

        }else{
          //选中
          target.addClass('active');
        }
      });


      //获取车辆品牌
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_carBrand/get",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        //console.log(data);
        if(data.code=="E0000"){
          var brand=data.data;
          var len=brand.length;
          for(var i=0;i<len;i++){
            var one=brand[i];
            $scope["brand"+one.icon].push(one);
          }
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }
      });

      //获取路况
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_roads/get",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        //console.log(data);
        if(data.code=="E0000"){
          $scope.carRoadCondition=data.data;
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }

      });

      //获取服务截止日期
      $("#userBolgData").on('change',function(){
        var driveData=$(this).val();
        if(driveData){
          $.ajax({
            type:"post",
            url:"http://180.76.243.205:8383/_API/_serviceline/get",
            data:{
              driving_license_date:driveData
            },
            success:function(data){
              if(data.code=="E0000"){
                $("#ponyServerStopData").val(data.data.serviceLine.split(" ")[0]);
              }
            }
          });
        }

      });

    });

    //用户车辆品牌选择
    $scope.userBolgSel=function(){
      $("#carSelBrandPage").css({
        display:"block"
      }).siblings().css({display:"none"});
    }

    //用户车系选择
    $scope.selSeries=function(carBrandName,carId){
      //console.log(carBrandName,carId);
      $("#carSelSeriesPage").css({
        display:"block"
      }).siblings().css({display:"none"});

      //获取品牌车系数据 
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_carVerhicle/get",
        data:"user_id="+ponyUserData.id+"&token="+token+"&car_brand_id="+carId
      }).success(function(data){
        //console.log(data);
        if(data.code=="E0000"){
          $scope.brandSeriesArr=[];
          var series=data.data;
          for(var key in series){
            var one={
              name:key,
              dataArr:series[key]
            }
            $scope.brandSeriesArr.push(one);
          }
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }
      });


    };

    //用户车型选择
    $scope.selModel=function(seriesId){
      //console.log(seriesId);
      $("#carSelModelPage").css({
        display:"block"
      }).siblings().css({display:"none"});

      $("#carSelModelPage>.modelList>.modelCC").addClass("active").siblings().removeClass("active");
      $scope.carModel=[];
      $('.model>h4').html("选择发动机排量");

      //获取品牌车型数据 
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_car/get",
        data:"user_id="+ponyUserData.id+"&token="+token+"&car_verhicle_id="+seriesId
      }).success(function(data){
        //console.log(data);
        if(data.code=="E0000"){
          var car=data.data;
          $scope.carCCArr=[];
          $scope.carArr=car;
          for(var i=0;i<car.length;i++){
            var one=car[i];
            if($scope.carCCArr.length<1){
              $scope.carCCArr.push(one.pailiang);
            }else{
              if($scope.carCCArr.indexOf(one.pailiang) == -1){
                $scope.carCCArr.push(one.pailiang);
              }
            }
          }
          //console.log($scope.carCCArr);
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }
      });

    };

    //用户排量选择完成后的年份选择
    $scope.modelSelCC=function(carCC){
      $scope.carModel.push(carCC)
      $('.modelYear').addClass("active").siblings().removeClass('active');
      $('.model>h4').html("请选择年份");

      var yearArr=[];
      for(var i=0;i<$scope.carArr.length;i++){
        var one=$scope.carArr[i]
        if(one.pailiang==carCC){
          yearArr.push(one);
        }
      }

      $scope.carYearArr=[];
      for(var i=0;i<yearArr.length;i++){
        var one=yearArr[i];
        if($scope.carYearArr.length<1){
          $scope.carYearArr.push(one.year);
        }else{
          if($scope.carYearArr.indexOf(one.year) == -1){
            $scope.carYearArr.push(one.year);
          }
        }
      }

    };

    //用户年份选择完成后的类型选择
    $scope.modelSelYear=function(carYear){
      $scope.carModel.push(carYear)
      $('.modelCar').addClass("active").siblings().removeClass('active');
      $('.model>h4').html("请选择车型");

      //遍历总数据，归纳合适数据
      $scope.carTypeArr=[];
      for(var i=0;i<$scope.carArr.length;i++){
        var one=$scope.carArr[i]
        if(one.pailiang==$scope.carModel[0]&&one.year==carYear){
          $scope.carTypeArr.push(one);
        }
      }

    };

    //用户车型最终选择
    $scope.finalSelCar=function(car){
      //console.log(car);
      $("#userBolgType").attr("data-carid",car.id).html(car.brand+"-"+car.verhicle.split("-")[0]);
      $("#myBolgPage").css("display","block").siblings().css("display","none");
      $("#userBolgTireType").attr("data-font",car.font).attr("data-rear",car.rear).html("前:"+car.font+" 后:"+car.rear);
    } 

    //用户行驶路况选择
    $scope.userBolgSelRunRoad=function(){
      //页面从头
      $(document).scrollTop(0);
      alertMsg("确定","为了您的行车安全请如实填写您的行车路况！",function(){}); 

      $scope.selRoadHtml="";
      $("#carSelRunRoad").css({
        display:"block"
      }).siblings().css({display:"none"});
      $('.runRoadOnceList').css({
        display:'none'
      }).children("ul").children(".active").removeClass("active");
      $('.runRoadOftenList').css({
        display:'block'
      }).children("ul").children(".active").removeClass("active");
    }

    //用户选择偶尔路况
    $scope.runRoadOnceSel=function(){
      //页面从头
      $(document).scrollTop(0);

      var roadArr=[];
      roadArr=roadArr.concat($scope.carRoadCondition);
      //获取选中的经常行驶路况
      var selRoad=$("#carSelRunRoad>.runRoadOftenList>ul").children(".active");

      //验证是否进行选择
      if(selRoad.length<1){
        alertMsg("确定","请至少选择一种路况",function(){}); 
        return;
      }


      //页面重绘
      $('.runRoadOnceList').css({
        display:'block'
      });
      $('.runRoadOftenList').css({
        display:'none'
      });

      //保存第二次要选择的数据
      $scope.carSelSecondRoadCondition=[];
      //保存最终选择数据
      carFinalSelRoad=[];
      //清空要显示路况选择信息;
      selRoadHtml="";



      for(var i=0;i<selRoad.length;i++){
        var one=selRoad[i];
        var oneid=$(one).attr("data-roadid");
        var oneName=$(one).attr("data-roadname");
        
        //选中的路况
        $scope.selRoadHtml+=oneName+";";
        
        //把第一次选好的数据压入数组
        var firstSel={
          road_id:oneid,
          selected:"type_i_rate"
        };
        carFinalSelRoad.push(firstSel);

        // 获取第二次要选择的数据
        var delI=0;
        for(var arrI=0;arrI<roadArr.length;arrI++){
          var arrOne=roadArr[arrI];
          if(arrOne.id==oneid){
            roadArr.splice(arrI-delI,1);
            delI++;
          }
        }
      }
      $scope.carSelSecondRoadCondition=roadArr;

      //如果全选，后直接出来
      if(selRoad.length==$("#carSelRunRoad>.runRoadOftenList>ul").children().length){
        //页面重绘
        $("#myBolgPage").css("display","block").siblings().css("display","none");
      }

    }

    //用户完成偶尔路况选择
    $scope.finalRoadSel=function(){
      var roadArr=[];
      roadArr=roadArr.concat($scope.carSelSecondRoadCondition);
      //获取选中的偶尔行驶路况
      var selOnceRoad=$("#carSelRunRoad>.runRoadOnceList>ul").children(".active");
      
      //验证是否进行选择
      if(selOnceRoad.length<1){
        alertMsg("确定","请至少选择一种路况",function(){}); 
        return;
      }

      //页面重绘
      $("#myBolgPage").css("display","block").siblings().css("display","none");

      for(var i=0;i<selOnceRoad.length;i++){
        var one=selOnceRoad[i];
        var oneid=$(one).attr("data-roadid");
        var oneName=$(one).attr("data-roadname");
        
        //选中的路况
        $scope.selRoadHtml+=oneName+";";
        originalRoad+=oneName+";";

        //把第二次选好的数据压入数组
        var secondSel={
          road_id:oneid,
          selected:"type_ii_rate"
        };
        carFinalSelRoad.push(secondSel);

        // 获取没有选择的数据
        var delI=0;
        for(var arrI=0;arrI<roadArr.length;arrI++){
          var arrOne=roadArr[arrI];
          if(arrOne.id==oneid){
            roadArr.splice(arrI-delI,1);
            delI++;
          }
        }
      }

      for(var noSelI=0;noSelI<roadArr.length;noSelI++){
        var noSelOne=roadArr[noSelI];
        //把没有选的数据压入数组
        var noSel={
          road_id:oneid,
          selected:"type_iii_rate"
        };
        carFinalSelRoad.push(noSel);
      }

      //console.log(carFinalSelRoad);

    }


    //用户回退按键
    $scope.toBackPage=function(targetPage){
      $("#"+targetPage).css("display","block").siblings().css("display","none");
      $scope.selRoadHtml=originalRoad;
    }

    //服务截止日期帮助
    $scope.ponyServerStopHelper=function(){
      alertMsg("确定","小马驾驾自您行驶证注册之日起为您服务15年",function(){}); 
    }

    //保存或修改用户车辆信息
    $scope.submitBolg=function(){
      // 车牌号省
      var carProvince=$("#userBolgCodeProvince").val();
      // 车牌号字母
      var carLetter=$("#userBolgCodeLetter").val();
      // 车牌号剩余字符
      var carOther=$("#userBolgCodeNum").val();
      // 车型ID
      var carTypeId=$("#userBolgType").attr("data-carid");
      //行驶证日期
      var userDriveID=$("#userBolgData").val();
      //行驶里程
      var userDriveMileage=$("#userBolgMileage").val();
      // 车险日期 
      var userDriveInsurance=$("#userBolgInsurance").val();
      //前轮规格
      var tireFontSize=$("#userBolgTireType").attr("data-font");
      // 后轮规格
      var tireRearSize=$("#userBolgTireType").attr("data-rear");
      // 服务截止日期： 
      var ponyServerStop=$("#ponyServerStopData").val().replace(/\//ig,"-");
      // console.log(ponyServerStop);
      //路况文字描述
      var wayText=$("#userBolgRoad").html();

      //推荐人
      var ponyUserReferrer=$("#ponyReferrer").val();
    
      //如果传入的参数不是NULL，那他就是修改原宝驹数据，否则为添加新宝驹
      if(userBolg=="null"){
        // ******这是创建新宝驹口*******
        // 验证
        if(!carOther){
          alertMsg("确定","请输入您的车牌号",function(){}); 
          return;
        }
        // console.log(carOther.length);
        if(carOther.length<5){
          alertMsg("确定","请输入合法车牌号",function(){}); 
          return;
        }
        if(!carTypeId){
          alertMsg("确定","请选择您的车型",function(){}); 
          return;
        }
        if(!userDriveID){
          alertMsg("确定","请输入您的行驶证日期",function(){}); 
          return;
        }else if(userDriveID>formatNow){
          console.log(userDriveID,formatNow);
          alertMsg("确定","您输入的行驶证日期不正确",function(){}); 
          return;
        }
        if(ponyServerStop<=formatNow){
          console.log(userDriveID,formatNow);
          alertMsg("确定","您选择的服务截止日期不正确",function(){}); 
          return;
        }
        if(!userDriveInsurance){
          alertMsg("确定","请输入您的车险日期",function(){}); 
          return;
        }
        // console.log(carFinalSelRoad.length);
        if(carFinalSelRoad.length<5){
          alertMsg("确定","请完整选择您的路况",function(){}); 
          return;
        }
        if(!$("#driveImgFront").val()){
          alertMsg("确定","请上传您的行驶证主页照片",function(){}); 
          return;
        }
        if(!$("#driveImgSecond").val()){
          alertMsg("确定","请上传您的行驶证副页照片",function(){}); 
          return;
        }
        if(!$("#InsuranceImg").val()){
          alertMsg("确定","请上传您的保险照片",function(){}); 
          return;
        }
        
        //如果他选了里程表损坏，则不对他的里程和图片进行验证
        if(!$("#myBolgPage>.bolgConfig>form>.selObometer").hasClass("on")){
          if(userDriveMileage<=0){
            alertMsg("确定","请输入正确的行驶里程",function(){}); 
            return;
          }
          if(!$("#mileageImg").val()){
            alertMsg("确定","请上传您的里程表照片",function(){}); 
            return;
          }
        }


        //填写推荐人，验推荐人手机号
        if(!(/^1[34578]\d{9}$/.test(ponyUserReferrer))&&ponyUserReferrer){ 
          alertMsg("确定","填写推荐人手机号码有误，请重填",function(){}); 
          return; 
        }

        var fData=new FormData(document.getElementById('userBolgConfig'));
        fData.append("user_id",ponyUserData.id);
        fData.append("token",token);
        fData.append("car_id",carTypeId);
        fData.append("traveled",userDriveMileage);
        fData.append("driving_license_date",userDriveID);
        fData.append("province_code",carProvince);
        fData.append("city_code",carLetter);
        fData.append("plat_code",carOther);
        fData.append("insurance_date",userDriveInsurance);
        
        fData.append("font",tireFontSize);
        fData.append("rear",tireRearSize);
        fData.append("service_end_date",ponyServerStop);
        fData.append("referee",ponyUserReferrer);
        fData.append("road_txt",wayText);
        for(var i=0;i<carFinalSelRoad.length;i++){
          fData.append("road_info["+i+"]['road_id']",carFinalSelRoad[i].road_id);
          fData.append("road_info["+i+"]['selected']",carFinalSelRoad[i].selected);
        }
        //开始加载通讯
        commStart();
        $.ajax({
          type:"post",
          processData:false,
          contentType:false,
          url:"http://180.76.243.205:8383/_API/_userCar/register",
          data:fData,
          success:function(data){
            // console.log(data);
            if(data.code=="E0000"){
              commFinish();
              alertMsg("确定","添加成功",function(){
                window.location.href="index.html#/main"
              }); 
            }else if(data.code=="E0014"){
              commFinish();
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              commFinish();
              alertMsg("确定",data.message,function(){}); 
            }
          },
          error:function(err){
            //console.log(err);
          }
        });


      }else{

        // ******这是修改原宝驹口*******
        // 验证
        if(!carOther){
          alertMsg("确定","请输入您的车牌号",function(){}); 
          return;
        }
        // console.log(carOther.length);
        if(carOther.length<5){
          alertMsg("确定","请输入合法车牌号",function(){}); 
          return;
        }
        if(!carTypeId){
          alertMsg("确定","请选择您的车型",function(){}); 
          return;
        }
        if(!userDriveID){
          alertMsg("确定","请输入您的行驶证日期",function(){}); 
          return;
        }else if(userDriveID>formatNow){
          alertMsg("确定","您输入的行驶证日期不正确",function(){}); 
          return;
        }
        if(ponyServerStop<=formatNow){
          console.log(userDriveID,formatNow);
          alertMsg("确定","您选择的服务截止日期不正确",function(){}); 
          return;
        }
        // if(!userDriveMileage){
        //   alertMsg("确定","请输入您的行驶里程",function(){}); 
        //   return;
        // }
        if(!userDriveInsurance){
          alertMsg("确定","请输入您的车险日期",function(){}); 
          return;
        }

        //如果他选了里程表损坏，则不对他的里程和图片进行验证
        if(!$("#myBolgPage>.bolgConfig>form>.selObometer").hasClass("on")){
          if(userDriveMileage<=0){
            alertMsg("确定","请输入正确的行驶里程",function(){}); 
            return;
          }
          if(!$("#mileageImg").val()){
            alertMsg("确定","请上传您的里程表照片",function(){}); 
            return;
          }
        }


        var fData=new FormData(document.getElementById('userBolgConfig'));
        fData.append("user_id",ponyUserData.id);
        fData.append("token",token);
        fData.append("user_car_id",userBolg);

        fData.append("car_id",carTypeId);
        fData.append("traveled",userDriveMileage);
        fData.append("driving_license_date",userDriveID);
        fData.append("province_code",carProvince);
        fData.append("city_code",carLetter);
        fData.append("plat_code",carOther);
        fData.append("insurance_date",userDriveInsurance);
        
        fData.append("font",tireFontSize);
        fData.append("rear",tireRearSize);
        fData.append("service_end_date",ponyServerStop);
        fData.append("road_txt",wayText);
        if(carFinalSelRoad){
          if(carFinalSelRoad.length==5){
            for(var i=0;i<carFinalSelRoad.length;i++){
              fData.append("road_info["+i+"]['road_id']",carFinalSelRoad[i].road_id);
              fData.append("road_info["+i+"]['selected']",carFinalSelRoad[i].selected);
            }
          }
        }
        //开始加载通讯
        commStart();
        $.ajax({
          type:"post",
          processData:false,
          contentType:false,
          url:"http://180.76.243.205:8383/_API/_userCar/modify",
          data:fData,
          success:function(data){
            // console.log(data);
            if(data.code=="E0000"){
              commFinish();
              alertMsg("确定","修改成功",function(){
                window.location.href="index.html#/main"
              }); 
            }else if(data.code=="E0014"){
              commFinish();
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              commFinish();
              alertMsg("确定",data.message,function(){}); 
            }
          },
          error:function(err){
            //console.log(err);
          }
        });


      }



    }


  });

  //轮胎服务页面
  horseApp.controller("tireServerCtrl",function($scope,$location){

    //初次体验页面
    $scope.toTireSel=function(){
      //如果未设置过宝驹，进行宝驹设置页面
      if(ponyUserCar){
        $location.path("/tireSel/2");
      }else{
        alertMsg("确定","您还未设置过宝驹，请先录入宝驹",function(){
          window.location.href="index.html#/userBolgConfig/null";
        }); 
        // $location.path("/userBolgConfig/null");
      }
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

    });

  });

  //轮胎规格选择页面
  horseApp.controller("tireSelSizeCtrl",function($scope,$http,$location,$routeParams){
    //是否是升级轮胎
    var isUpgrade=$routeParams.isUpgrade;
    //设置视口
    $scope.height=vHeight;
    //数据重置
    ponyUserSelTireSize="";

    var token=sessionStorage["ponyUserToken"];
    //前轮规格
    $scope.userCarFont="";
    //后轮规格
    $scope.userCarRear="";
    //用户车辆名称
    $scope.userCarName="";

    //传2进来是用默认数据，传1为升级数据
    if(isUpgrade==2){
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_defaultSize/get",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        if(data.code=="E0000"){
          //console.log(data.data);
          $scope.userCarFont=data.data.font;
          $scope.userCarRear=data.data.rear;
          $scope.userCarName=data.data.car_name.split("-")[0];
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          // console.log(data.message);
        }
      }).error(function(err){
        // console.log(err);
      });
    }else{
      //前轮规格
      $scope.userCarFont=upgradeFont;
      //后轮规格
      $scope.userCarRear=upgradeRear;
    }


    //选择前轮
    $scope.selFont=function(size){
      // console.log(size);
      ponyUserSelTireSize=size;
      $location.path("/tireSelFigure/font");
    }

    //选择后轮
    $scope.selRear=function(size){
      // console.log(size);
      ponyUserSelTireSize=size;
      $location.path("/tireSelFigure/rear");
    }

  });

  //轮胎规格升级页面
  horseApp.controller("tireSpecUpgradeCtrl",function($scope,$http,$location){
    //设置视口
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //原始轮胎数据
    var originalFont="";
    var originalRear="";

    //升级规格
    $scope.specUpgrade=function(){
      var fontWidth=$(".fontTireSpec #tireSurfaceWidth").val();
      var fontRatio=$(".fontTireSpec #tireFlatnessRatio").val();
      var fontDia=$(".fontTireSpec #tireDia").val();

      var rearWidth=$(".rearTireSpec #tireSurfaceWidth").val();
      var rearRatio=$(".rearTireSpec #tireFlatnessRatio").val();
      var rearDia=$(".rearTireSpec #tireDia").val();

      var originalFontSize=originalFont.split("/")[0];
      var originalRearSize=originalRear.split("/")[0];
      
      if((fontWidth>=originalFontSize*0.97&&fontWidth<=originalFontSize*1.03)&&(rearWidth>=originalRearSize*0.97&&rearWidth<=originalRearSize*1.03)){
        upgradeFont=fontWidth+"/"+fontRatio+"R"+fontDia;
        upgradeRear=rearWidth+"/"+rearRatio+"R"+rearDia;
        alertMsg("确定","升级成功",function(){
          window.location.href="index.html#/tireSel/1";
          // $location.path("/tireSel/1");
        });

      }else{
        alertMsg("确定","无法升级，轮胎升级规格误差值应控制在±3%",function(){});
      }
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);
      
      //获取原始数据 
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_defaultSize/get",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        if(data.code=="E0000"){
          // console.log(data.data);
          originalFont=data.data.font;
          originalRear=data.data.rear;

          $(".fontTireSpec #tireSurfaceWidth").val(originalFont.split("/")[0]);
          $(".fontTireSpec #tireFlatnessRatio").val(originalFont.split("/")[1].split("R")[0]);
          $(".fontTireSpec #tireDia").val(originalFont.split("/")[1].split("R")[1]);

          $(".rearTireSpec #tireSurfaceWidth").val(originalRear.split("/")[0]);
          $(".rearTireSpec #tireFlatnessRatio").val(originalRear.split("/")[1].split("R")[0]);
          $(".rearTireSpec #tireDia").val(originalRear.split("/")[1].split("R")[1]);


        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          // console.log(data.message);
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/main";
          });
        }
      }).error(function(err){
        // console.log(err);
      });
    });



  });

  // 轮胎花纹选择页面
  horseApp.controller("tireSelFigureCtrl",function($scope,$routeParams,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage['ponyUserToken'];

    //获取选择的是前胎还是后胎
    var userTire=$routeParams.tireSize;
    //轮胎规格
    var tireSize=ponyUserSelTireSize;
    // console.log(tireSize);

    // 花纹列表
    $scope.figureList=[];

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_flgure/get",
      data:"user_id="+ponyUserData.id+"&token="+token+"&shoe_name="+userTire+"&inch_mm="+tireSize.split("/")[0]+"&inch="+tireSize.split("/")[1].split("R")[0]+"&diameter="+tireSize.split("/")[1].split("R")[1]
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        //  console.log(data.data);

        $scope.figureList=data.data;
        if($scope.figureList.length<0){
          $("#tireSelFigurePage>.tireFigureList>.listBody>.noData").css("display","block");
          $("#tireSelFigurePage>.tireFigureList>.selBtn").css("display","none");
        }

      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{  
        $("#tireSelFigurePage>.tireFigureList>.listBody>.noData").css("display","block");
        $("#tireSelFigurePage>.tireFigureList>.selBtn").css("display","none");
        console.log(data.message);
      }
    });

    //选择轮胎服务页面
    $scope.selTireServer=function(){
      var selTarget=$("#tireSelFigurePage>.tireFigureList>.listBody>ul").children(".active");
      // console.log(selTarget);
      if(selTarget.length>0){
        $location.path("/tireDetail/"+selTarget.attr("data-tireid")+"/"+selTarget.attr("data-tempid"));
      }else{
        alertMsg("确定","请先选择花纹",function(){}); 
      }
    }

    //页面监听事件
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //绑定轮胎花纹选择页面每项花纹选择
      $('.tireFigureList>.listBody>ul').on("click",".itemFigureTit",function(){
        var target=$(this).parent();
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active").siblings().removeClass("active");
        }
      });

      //花纹图片选择显示
      $('#tireSelFigurePage>.tireFigureList>.listBody>ul').on('click','.figureItemImg',function(e){
        var target=$(this);
        var targetImg=$(this).children("img").attr("src");
        target.parent().parent().prev().children("img").attr("src",targetImg);
        target.addClass("active").siblings().removeClass("active");
      });

    });

  });

  //轮胎详情页面
  horseApp.controller("tireDetailCtrl",function($scope,$routeParams,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //商品banner定时器
    var detailBannerTimer=null;

    //标题名
    $scope.detailTit="";

    //获取选择的是轮胎ID
    var tireId=$routeParams.tireId;
    //获取临时定单ID
    var tempId=$routeParams.tempId;

    //商品轮播图片
    $scope.bannerImgList=[];
    //商品增值服务
    $scope.addServerList=[];


    //购买数量
    $scope.tireBuyNum=1;
    //畅行无忧购买数量
    $scope.cxwyBuyNum=1;
    // 购买轮胎数量增加
    $scope.tirePlusNum=function(num){
      if(num<4){
        $scope.tireBuyNum++;
      }
    };
    //购买轮胎数量减少
    $scope.tireMinusNum=function(num){
      if(num<=1){
        $scope.tireBuyNum=1;
      }else{
        $scope.tireBuyNum--;
      }
    }

    
    // //增值服务数组
    // var addServerArr=[]
    // //增值服务描述
    // $scope.addServerDetailHtml="";
    // //增值服务选取
    // $("#tireDetailPage>.tireDetailBody>.tireAddServer>.addServerList").on("click","li",function(){
    //   var target=$(this);
    //   if(target.hasClass("active")){
    //     target.removeClass("active");
    //     addServerArr[target.attr("data-addservername")]=false;
    //   }else{
    //     target.addClass("active");
    //     addServerArr[target.attr("data-addservername")]=true;
    //   }
    //   var html="";
    //   for (var key in addServerArr){
    //     if(addServerArr[key]){
    //       if(html){
    //         html+="+"+key;
    //       }else{
    //          html+=key;
    //       }
    //     }
    //   }
    //   $scope.addServerDetailHtml=html;
    //   $scope.$apply();
    // });

    //确认轮胎服务
    $scope.affirmTireServer=function(){
      //轮胎购买数量
      var num=$("#tireNumInput").val();
      //轮胎购买数量
      var serverNum=$("#cxwyNumInput").val();
      // //增值服务
      // var selAddServerList=[];
      // //将具体选中的增值服务的ID号压入数组
      // var addServer=$("#tireDetailPage>.tireDetailBody>.tireAddServer>.addServerList>ul").children(".active");
      // for(var i=0;i<addServer.length;i++){
      //   var one=addServer[i];
      //   selAddServerList.push($(one).attr("data-addserverid"));
      // }
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_shoePrice/get",
        //是否增值服务，1：有 2：没有
        data:"user_id="+ponyUserData.id+"&token="+token+"&shoe_id="+tireId+"&shoe_no="+num+"&shoe_temp_id="+tempId+"&added_no="+serverNum
        //+(addServerArr.length>0?"1":"2")+"&added_ids="+selAddServerList
      }).success(function(data){
        if(data.code=="E0000"){
          commFinish();
          // console.log(data.data);
          //更新完数据后开始定时器
          clearInterval(detailBannerTimer);
          $location.path("/tireQCServer"+"/"+data.data.shoe_temp_id)
        }else if(data.code=="E0014"){
          commFinish();
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          commFinish();
          alertMsg("确定",data.message,function(){}); 
        }
      }).error(function(err){
        console.log(err);
      });
    }

    //页面返回
    $scope.toBack=function(){
      //更新完数据后开始定时器
      clearInterval(detailBannerTimer);
      window.history.back(-1);
    }

    //切换规格
    $scope.toTireSelSize=function(){
      //更新完数据后开始定时器
      clearInterval(detailBannerTimer);
      $location.path("/tireSel/2");
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);
      
      //获取数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_shoeService/get",
        data:"user_id="+ponyUserData.id+"&token="+token+"&shoe_id="+tireId+"&shoe_temp_id="+tempId
      }).success(function(data){
        if(data.code=="E0000"){
          // console.log(data.data);
          $scope.bannerImgList=data.data.shoe_img;
          $scope.addServerList=data.data.added_list;
          $scope.detailTit=data.data.shoe_info.size;

          //banner图片轮播
          detailBannerTimer=setInterval(function(){
            var num=$("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children(".active").index();
            var len=$("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children().length;
            if(num<(len-1)){
              $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
              $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerNumList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
            }else{
              $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children().first().addClass("active").siblings().removeClass("active");
              $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerNumList>ul").children().first().addClass("active").siblings().removeClass("active");
            }  
          },10000);
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          console.log(data.message);
        }
      });


      //banner图片点
      $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerNumList").on("click","li",function(){
        var targetNum=$(this).index();
        $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
        $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerNumList>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
      });
      //banner图片truch左右滑动事件
      var startX=null;
      $('#tireDetailPage>.tireDetailBody>.tireBannerImg').on('touchstart',function(e){
        startX = e.originalEvent.changedTouches[0].pageX;
      });
      $('#tireDetailPage>.tireDetailBody>.tireBannerImg').on('touchend',function(e){
        var endX = e.originalEvent.changedTouches[0].pageX;
        if(endX==startX){
          return;
        }
        if(endX<startX){
          //向左 下一张
          var num=$("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children(".active").index();
          var len=$("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children().length;
          if(num<(len-1)){
            $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
            $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerNumList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
          }else{
            $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children().first().addClass("active").siblings().removeClass("active");
            $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerNumList>ul").children().first().addClass("active").siblings().removeClass("active");
          }  
        }else{
          //向右 上一张
          var num=$("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children(".active").index();
          if(num>0){
            $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
            $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerNumList>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
          }else{
            $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerImgList>ul").children().last().addClass("active").siblings().removeClass("active");
            $("#tireDetailPage>.tireDetailBody>.tireBannerImg>.bannerNumList>ul").children().last().addClass("active").siblings().removeClass("active");
          }
        }
      });

      // 购买增值服务数量增加
      $("#tireDetailPage>.tireDetailBody>.tireAddServer>.addServerList>ul").on("click",".numPlus",function(){
        var target=$(this).prev();
        if(target.val()<4){
          target.val(parseInt(target.val())+1);
        }
      });
      //购买增值服务数量减少
      $("#tireDetailPage>.tireDetailBody>.tireAddServer>.addServerList>ul").on("click",".numMinus",function(){
        var target=$(this).next();
        if(target.val()<=0){
          target.val(0);
        }else{
          target.val(parseInt(target.val())-1);
        }
      });





    });


  });

  //轮胎品质服务页面
  horseApp.controller("tireQCServerCtrl",function($scope,$http,$location,$routeParams){
    var token=sessionStorage["ponyUserToken"];
   
    //获取传入的临时订单ID
    $scope.tempId=$routeParams.tempId;

    //订单总价
    $scope.total=0;

    //流程数组
    $scope.flowPathList=[];

    //品质服务数组
    $scope.QCServerList=[];

    //获取数据 
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_shoeTemp/get",
      data:"user_id="+ponyUserData.id+"&token="+token+"&shoe_temp_id="+$scope.tempId
    }).success(function(data){
      if(data.code=="E0000"){
        // console.log(data.data);
        $scope.total=data.data.shoe_temp_order.total_price;
        $scope.flowPathList=data.data.flow_info;
        $scope.QCServerList=data.data.pz_info;        
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });
  

    //显示购物流程
    $scope.toPathDetail=function(){
      $("#tireQCServerPage>.pathDetailPage").css({
        display:"block"
      }).siblings().css({
        display:"none"
      });;
    }
    //返回品质服务页面
    $scope.toBackQC=function(){
      $("#tireQCServerPage>.QCServerPage").css({
        display:"block"
      }).siblings().css({
        display:"none"
      });;
    }

    //页面返回
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

    });

  });

  //订单确认页面
  horseApp.controller("tireOrderDetailCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;
    var token=sessionStorage["ponyUserToken"];

    //获取传入的临时订单ID
    var tempId=$routeParams.tempId;
    //用户信息
    $scope.userData="";

    //订单类型
    var orderType=null;

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_shoeTemp/get",
      data:"user_id="+ponyUserData.id+"&token="+token+"&shoe_temp_id="+tempId
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        $scope.userData=data.data.shoe_temp_order;
        orderType=data.data.trade_mode;
        // console.log(orderType);
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });

    //提交用户订单
    $scope.submitTireOrder=function(){
      
      var userName=$("#ponyTireOrderUserName").val();
      var userTel=$("#ponyTireOrderUserTel").val();
      var userAppointment=$("#orderReserveTime").val();
      if(!userName){
        alertMsg("确定","请输入联系人",function(){}); 
        return;
      }
      if(!userTel){
        alertMsg("确定","请输入联系电话",function(){}); 
        return;
      }
      if(!userAppointment){
        alertMsg("确定","请选择预约时间",function(){}); 
        return;
      }
      if(!(/^1[34578]\d{9}$/.test(userTel))){
        alertMsg("确定","联系人的手机号码有误，请重填",function(){});   
        return; 
      } 
      if(userAppointment<formatNow){
        alertMsg("确定","你的预约时间有误，请重新选择",function(){}); 
        return; 
      } 
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_shoeOrder/submit",
        data:"user_id="+ponyUserData.id+"&token="+token+"&shoe_temp_id="+tempId+"&name="+userName+"&phone="+userTel+"&appointment="+userAppointment+" 23:59"
      }).success(function(data){
        if(data.code=="E0000"){
          commFinish();
          // console.log(data.data);
          $location.path("/checkoutCounter/"+tempId+"/"+orderType);
        }else if(data.code=="E0014"){
          commFinish();
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          commFinish();
          alertMsg("确定",data.message,function(){}); 
        }
      }).error(function(err){
        console.log(err);
      });

    }
     
    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //订单预约时间
      $("#orderReserveTime").val(nowDateYear+"-"+(nowDateMonth>10?nowDateMonth:"0"+nowDateMonth)+"-"+(nowDateDay>10?nowDateDay:"0"+nowDateDay));

    });

    //页面返回
    $scope.toBack=function(){
      window.history.back(-1);
    }


    
  });

  //收银台页面
  horseApp.controller("checkoutCounterCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //获取传入订单的临时ID
    var tempId=$routeParams.tempId;

    //获取传入订单的类型
    var orderType=$routeParams.orderType;
    // console.log(orderType);

    //用户马粮
    $scope.userMLNum=0;
    //用户马粮
    $scope.orderTotal=0;
    //是否设置支付密码
    var isPayPwd=2;

    //用户优惠券可以抵扣金额
    $scope.couponSum=0;
    //用户优惠券列表
    $scope.userCouponList=[];
    //用户选择优惠券列表
    var userSelCoupon=[];

    //订单的四大分类金额
    var orderBY=0;
    var orderMR=0;
    var orderGZ=0;
    var orderAZ=0;


    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_Cashier/get",
      data:"user_id="+ponyUserData.id+"&token="+token+"&obj_id="+tempId+"&trade_mode="+orderType
    }).success(function(data){
      if(data.code=="E0000"){
        console.log(data.data);
        $scope.userMLNum=thousandSeparator(data.data.ml);
        $scope.orderTotal=data.data.price;
        isPayPwd=data.data.is_pay_pwd;

        $scope.userCouponList=data.data.sales;

        orderBY=parseFloat(data.data.by);
        orderMR=parseFloat(data.data.mr);
        orderGZ=parseFloat(data.data.gz);
        orderAZ=parseFloat(data.data.az);

      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });

    //新支付密码
    $scope.setPayPwdFirst="";
    //确认新支付密码
    $scope.setPayPwdSecond="";
    //支付密码
    $scope.userPayPwd="";

    //设置第一遍支付密码
    $scope.setPayPwd=function(payPwd){
      //获取输入密码
      var pwd=$("#setPayPwdInputFirst").val()
      if(!pwd){
        alertMsg("确定","请输入您的支付密码",function(){
          $("#setPayPwdInputFirst").focus();
        }); 
      }else if(/^[0-9]{6}$/.test(pwd)){
        //成功正解匹配
        // alert(pwd);
        $("#checkoutCounterPage>.setPayPwd>.setBody>.affirmBody").css("display","block").prev().css("display","none");
        $("#affirmPayPwdInput").val("").focus();
        $("#checkoutCounterPage>.setPayPwd>.setBody>.affirmBody>label").children().css("opacity","0");

      }else{
        alertMsg("确定","您输入的密码不正确",function(){
          $("#setPayPwdInputFirst").focus();
        }); 
      }
    }

    //确信支付密码
    $scope.affirmPayPwd=function(){
      //第一次设置的密码
      var first=$("#setPayPwdInputFirst").val();
      //获取输入密码
      var pwd=$("#affirmPayPwdInput").val()
      if(!pwd){
        alertMsg("确定","请输入您的支付密码",function(){}); 
        return;
      }else if(/^[0-9]{6}$/.test(pwd)){
        //成功正解匹配
        if(pwd==first){
          //发送设置数据
          $http({
            method:"post",
            url:"http://180.76.243.205:8383/_API/_payPwd/set",
            data:"user_id="+ponyUserData.id+"&token="+token+"&pay_pwd="+strmd5(pwd)
          }).success(function(data){
            if(data.code=="E0000"){
              isPayPwd=1;
              alertMsg("确定","支付密码设置成功",function(){
                $("#checkoutCounterPage>.setPayPwd").css("display","none");
                $("#checkoutCounterPage>.inputPayPwd").css("display","block");
                $("#userPayPwdInput").focus();
              }); 

            }else if(data.code=="E0014"){
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else{
              alertMsg("确定",data.message,function(){}); 
            }
          }).error(function(err){
            console.log(err);
          });


          //提交密码

        }else{
          alertMsg("确定","您两次输入的密码不一致，请重新输入",function(){
            $("#checkoutCounterPage>.setPayPwd>.setBody>.setInput").css("display","block").next().css("display","none");
            $("#setPayPwdInputFirst").val("").focus();
            $("#checkoutCounterPage>.setPayPwd>.setBody>.setInput>label").children().css("opacity","0");
          }); 
        }

      }else{
        alertMsg("确定","您输入的密码不正确",function(){
          $("#checkoutCounterPage>.setPayPwd>.setBody>.setInput").css("display","block").next().css("display","none");
          $("#setPayPwdInputFirst").val("").focus();
          $("#checkoutCounterPage>.setPayPwd>.setBody>.setInput>label").children().css("opacity","0");
        }); 
      }

    }


    //进行支付密码提交
    $scope.submitUserPayPwd=function(){
      //获取输入密码
      var pwd=$("#userPayPwdInput").val()
      if(!pwd){
        alertMsg("确定","请输入您的支付密码",function(){
          $("#userPayPwdInput").focus();
        }); 
      }else if(/^[0-9]{6}$/.test(pwd)){
        //成功正解匹配
        // alert(pwd);
        //提交订单
        // $http({
        //   method:"post",
        //   url:"http://180.76.243.205:8383/_API/_ml/pay",
        //   data:"user_id="+ponyUserData.id+"&token="+token+"&obj_id="+tempId+"&trade_mode="+orderType+"&pay_pwd="+strmd5(pwd)+"&arr="+userSelCoupon
        // }).success(function(data){
        //   if(data.code=="E0000"){
        //     console.log(data);
        //     $("#userPayPwdInput").blur();
        //     if(data.data.trade_mode=="shoe_temp "){
        //       alertMsg("确定","支付成功",function(){
        //         window.location.href="index.html#/CASTire"
        //       }); 
        //     }else{
        //       alertMsg("确定","支付成功",function(){
        //         window.location.href="index.html#/order/all"
        //       }); 
        //     }
        //   }else if(data.code=="E0014"){
        //     alertMsg("确定",data.message,function(){
        //       window.location.href="index.html#/login";
        //     });
        //   }else if(data.code=="E0030"){
        //     //余额不足，跳转充值页面
        //     confirmMsg(["充值","取消"],data.message,function(){
        //       // console.log("确定");
        //       window.location.href="index.html#/userAmount";
        //     },function(){
        //       // console.log("取消");
        //       //关闭支付窗口
        //       $("#checkoutCounterPage>.inputPayPwd").css("display","none");
        //     });
        //   }else{
        //     alertMsg("确定",data.message,function(){
        //       //关闭支付窗口
        //       $("#checkoutCounterPage>.inputPayPwd").css("display","none");
        //     }); 
        //   }
        // }).error(function(err){
        //   console.log(err);
        // });
        //开始加载通讯
        commStart();
        $.ajax({
          type:"post",
          url:"http://180.76.243.205:8383/_API/_ml/pay",
          data:{
            user_id:ponyUserData.id,
            token:token,
            obj_id:tempId,
            trade_mode:orderType,
            pay_pwd:strmd5(pwd),
            sale_ids:userSelCoupon
          },
          success:function(data){
            if(data.code=="E0000"){
              commFinish();
              // console.log(data);
              $("#userPayPwdInput").blur();
              if(data.data.trade_mode=="shoe_temp"){
                alertMsg("确定","支付成功",function(){
                  window.location.href="index.html#/CASTire"
                }); 
              }else{
                alertMsg("确定","支付成功",function(){
                  window.location.href="index.html#/order/all"
                }); 
              }
            }else if(data.code=="E0014"){
              commFinish();
              alertMsg("确定",data.message,function(){
                window.location.href="index.html#/login";
              });
            }else if(data.code=="E0030"){
              commFinish();
              //余额不足，跳转充值页面
              confirmMsg(["充值","取消"],data.message,function(){
                // console.log("确定");
                window.location.href="index.html#/userAmount";
              },function(){
                // console.log("取消");
                //关闭支付窗口
                $("#checkoutCounterPage>.inputPayPwd").css("display","none");
              });
            }else{
              commFinish();
              alertMsg("确定",data.message,function(){
                //关闭支付窗口
                $("#checkoutCounterPage>.inputPayPwd").css("display","none");
              }); 
            }
          },
          error:function(err){
            commFinish();
            console.log(err);
          }
        });

  
      }else{
        alertMsg("确定","您输入的密码不正确",function(){
          $("#userPayPwdInput").focus();
        }); 
      }
    }

    //支付密码设置关闭
    $scope.closeSetPayPwd=function(){
      $("#checkoutCounterPage>.setPayPwd").css("display","none");
    }

    //支付密码输入关闭
    $scope.closePayPwd=function(){
      $("#checkoutCounterPage>.inputPayPwd").css("display","none");
    }

    //回跳按钮
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //确认订单支付
    $scope.affirmOrderPay=function(){
      var targetPay=$("#checkoutCounterPage>.payMode>.payModeItem.active").attr("data-sel");
      // console.log(targetPay);

      //支付密码数据清空
      $("#setPayPwdInputFirst,#affirmPayPwdInput,#userPayPwdInput").val("").focus();
      $("#checkoutCounterPage>.inputPayPwd>.payPwdBody>label, #checkoutCounterPage>.setPayPwd>.setBody>.affirmBody>label, #checkoutCounterPage>.setPayPwd>.setBody>.setInput>label").children().css("opacity","0");

      switch (targetPay){
        case "mlpay":
          // console.log("马粮");
          //isPayPwd:是否设置支付密码，1是，2否;
          if(isPayPwd==1){
            $("#checkoutCounterPage>.inputPayPwd").css("display","block");
            $("#userPayPwdInput").focus();
          }else{
            $("#checkoutCounterPage>.setPayPwd").css("display","block");
            $("#setPayPwdInputFirst").focus();
          }
          break;
        case "unionpay":
          // console.log("银联");
          alertMsg("确定","正在开发，敬请期待",function(){}); 
          break;
        case "wechatpay":
          // console.log("微信");
          alertMsg("确定","正在开发，敬请期待",function(){}); 
          break;
        case "alipay":
          // console.log("支付宝");
          alertMsg("确定","正在开发，敬请期待",function(){}); 
          break;
      }

    }

    //去优惠券选取页面
    $scope.toCouponList=function(){
      $("#couponListPage").css("display","block").siblings().css("display","none");

      $("#couponListPage>.couponList>ul>li").removeClass("active");
      for(var i=0;i<userSelCoupon.length;i++){
        var one=userSelCoupon[i];
        $("#couponListPage>.couponList>ul").children().eq(one.location).addClass("active");
      }


    }

    //从优惠券假页返回主页面 （返回按钮）
    $scope.toMainPage=function(){
      $("#checkoutCounterPage").css("display","block").siblings().css("display","none");
    }

    //暂不使用优惠券
    $scope.noUseCoupon=function(){
      $("#couponListPage>.couponList>ul>li").removeClass("active");
      $("#checkoutCounterPage").css("display","block").siblings().css("display","none");

      //在这做优惠券数组清空
      $scope.couponSum=0;
      userSelCoupon=[];
      $("#checkoutCounterPage>.coupon>p>span").html("");
    }

    //优惠券确认使用
    $scope.selCoupon=function(){
      // console.log(123123)
      $("#checkoutCounterPage").css("display","block").siblings().css("display","none");
      //四项服务优惠券使用金额及合计
      var couponSum=0;
      var couponBY=0;
      var couponMR=0;
      var couponGZ=0;
      var couponAZ=0;
      
      //现金券数组
      var couponCash=[];
      //对用户选择优惠券数组进行重置
      var selCouponArr=[];
      var couponList=$("#couponListPage>.couponList>ul").children();


      for(var i=0;i<couponList.length;i++){
        var one=couponList[i];
        if($(one).hasClass('active')){
          //压入所选优惠券数组
          selCouponArr.push({
            id:$(one).attr("data-couponid"),
            type:$(one).attr("data-servertype"),
            location:$(one).attr("data-location")
          });

          var oneIndex=$(one).attr("data-location");
          var oneTypt=$(one).attr("data-servertype");
          if(oneTypt==1){
            //服务券
            switch($scope.userCouponList[oneIndex].service_type_list){
              case '2':
                couponBY+=parseFloat($scope.userCouponList[oneIndex].value);
                break;
              case '3':
                couponMR+=parseFloat($scope.userCouponList[oneIndex].value);
                break;
              case '4':
                couponGZ+=parseFloat($scope.userCouponList[oneIndex].value);
                break;
              case '5':
                couponAZ+=parseFloat($scope.userCouponList[oneIndex].value);
                break;
            }
            couponSum+=parseFloat($scope.userCouponList[oneIndex].value);

          }else{
            //现金券
            couponCash.push($scope.userCouponList[oneIndex]);
          }
        }
      }

      //如是一张优惠券也没选，清空
      if(!selCouponArr.length){
        $scope.couponSum=0;
        userSelCoupon=[];
        $("#checkoutCounterPage>.coupon>p>span").html("");
        return;
      }


      // console.log(selCouponArr,couponCash);
      // console.log(couponBY,couponMR,couponGZ,couponAZ,couponSum);

      //遍历现金券，算出当前现金金额能抵多少
      for(var i=0;i<couponCash.length;i++){
        var one=couponCash[i];
        // 可用范围总数
        var subScope=0;
        // 已用范围数据
        var subUsedNum=0;
        // 可适用范围数组
        var scopeArr=one.service_type_list.split(',');
        for(var scopeI=0;scopeI<scopeArr.length;scopeI++){
          var scopeItem=scopeArr[scopeI];
          //累加可适用范围总金额
          switch(scopeItem){
            case '2':
              subScope+=parseFloat(orderBY);
              subUsedNum+=parseFloat(couponBY);
              break;
            case '3':
              subScope+=parseFloat(orderMR);
              subUsedNum+=parseFloat(couponMR);
              break;
            case '4':
              subScope+=parseFloat(orderGZ);
              subUsedNum+=parseFloat(couponGZ);
              break;
            case '5':
              subScope+=parseFloat(orderAZ);
              subUsedNum+=parseFloat(couponAZ);
              break;
          }

        }

        //如果抵用眷金额小于（服务单项总额-服务优惠总额） 抵用金额全加入服务优惠金额，如果抵用眷金额大于（服务单项总额-服务优惠总额） 抵用金额等于（服务单项总额-服务优惠总额）
        // console.log(subScope-subUsedNum,parseFloat(one.value)<(subScope-subUsedNum));
        if(parseFloat(one.value)<(subScope-subUsedNum)){
          couponSum+=parseFloat(one.value);
        }else{
          couponSum+=parseFloat((subScope-subUsedNum)>0?subScope-subUsedNum:0);
        }
      }

      // console.log(subUsedNum,subScope,one.value,couponSum);
      //规整数据返回
      $("#checkoutCounterPage>.coupon>p>span").html(selCouponArr.length+"张");
      userSelCoupon=selCouponArr;
      $scope.couponSum=couponSum;

    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //支付方式选择
      $("#checkoutCounterPage>.payMode").on("click",".payModeItem",function(){
        var target=$(this);
        if(target.hasClass("active")){

        }else{
          target.addClass("active").siblings().removeClass("active");
        }

      });

      //对输入的值进行判断
      $("#setPayPwdInputFirst,#affirmPayPwdInput,#userPayPwdInput").keyup(function(){
        var value=$(this).val();
        if(!value){
          $(this).parent().prev().children().css("opacity","0");
          return;
        }
        var len=value.length;
        //console.log(len);
        if(len>6){
          $(this).val(value.substr(0,6));
          $(this).parent().prev().children().css("opacity","1")
        }else if(len>0&&len<=6){
          $(this).parent().prev().children().css("opacity","0").eq(len-1).css("opacity","1").prevAll().css("opacity","1");
        }
      });

      // 第一次输入前往
      $("#setPayPwdInputFirst").keydown(function(e){
        //确认按键 13
        if(e.which==13){
          //获取输入密码
          var pwd=$("#setPayPwdInputFirst").val()
          if(!pwd){
            alertMsg("确定","请输入您的支付密码",function(){}); 
            return;
          }else if(/^[0-9]{6}$/.test(pwd)){
            //成功正解匹配
            // alert(pwd);
            $("#checkoutCounterPage>.setPayPwd>.setBody>.affirmBody").css("display","block").prev().css("display","none");
            $("#affirmPayPwdInput").val("").focus();
            $("#checkoutCounterPage>.setPayPwd>.setBody>.affirmBody>label").children().css("opacity","0");

          }else{
            alertMsg("确定","您输入的密码不正确",function(){
              $("#setPayPwdInputFirst").focus();
            }); 
          }
        }

      });

      //第二次确认密码提交
      $("#affirmPayPwdInput").keydown(function(e){
        //确认按键 13
        if(e.which==13){

          //第一次设置的密码
          var first=$("#setPayPwdInputFirst").val();
          //获取输入密码
          var pwd=$("#affirmPayPwdInput").val()
          if(!pwd){
            alertMsg("确定","请输入您的支付密码",function(){}); 
            return;
          }else if(/^[0-9]{6}$/.test(pwd)){
            //成功正解匹配
            if(pwd==first){

              //发送设置数据
              $http({
                method:"post",
                url:"http://180.76.243.205:8383/_API/_payPwd/set",
                data:"user_id="+ponyUserData.id+"&token="+token+"&pay_pwd="+strmd5(pwd)
              }).success(function(data){
                if(data.code=="E0000"){
                  isPayPwd=1;
                  alertMsg("确定","支付密码设置成功",function(){
                    $("#checkoutCounterPage>.setPayPwd").css("display","none");
                    $("#checkoutCounterPage>.inputPayPwd").css("display","block");
                    $("#userPayPwdInput").focus();
                  }); 

                }else if(data.code=="E0014"){
                  alertMsg("确定",data.message,function(){
                    window.location.href="index.html#/login";
                  });
                }else{
                  alertMsg("确定",data.message,function(){}); 
                }
              }).error(function(err){
                console.log(err);
              });


              //提交密码

            }else{
              alertMsg("确定","您两次输入的密码不一致，请重新输入",function(){
                $("#checkoutCounterPage>.setPayPwd>.setBody>.setInput").css("display","block").next().css("display","none");
                $("#setPayPwdInputFirst").val("").focus();
                $("#checkoutCounterPage>.setPayPwd>.setBody>.setInput>label").children().css("opacity","0");
              }); 
            }

          }else{
            alertMsg("确定","您输入的密码不正确",function(){
              $("#checkoutCounterPage>.setPayPwd>.setBody>.setInput").css("display","block").next().css("display","none");
              $("#setPayPwdInputFirst").val("").focus();
              $("#checkoutCounterPage>.setPayPwd>.setBody>.setInput>label").children().css("opacity","0");
            }); 
          }
        }

      });

      // 支付密码提交
      $("#userPayPwdInput").keydown(function(e){
        //确认按键 13
        if(e.which==13){
          //获取输入密码
          var pwd=$("#userPayPwdInput").val()
          if(!pwd){
            alertMsg("确定","请输入您的支付密码",function(){
              $("#userPayPwdInput").focus();
            }); 
          }else if(/^[0-9]{6}$/.test(pwd)){
            //成功正解匹配
            // alert(pwd);
            //提交订单
            // $http({
            //   method:"post",
            //   url:"http://180.76.243.205:8383/_API/_ml/pay",
            //   // data:"user_id="+ponyUserData.id+"&token="+token+"&obj_id="+tempId+"&trade_mode="+orderType+"&pay_pwd="+strmd5(pwd)+"&arr="+userSelCoupon
            //   data:{
            //     user_id:ponyUserData.id,
            //     token:token,
            //     obj_id:tempId,
            //     trade_mode:orderType,
            //     pay_pwd:strmd5(pwd),
            //     arr:userSelCoupon
            //   }
            //   //"user_id="+ponyUserData.id+"&token="+token+"&obj_id="+tempId+"&trade_mode="+orderType+"&pay_pwd="+strmd5(pwd)+"&arr="+userSelCoupon
            // }).success(function(data){
            //   if(data.code=="E0000"){
            //     // console.log(data);
            //     $("#userPayPwdInput").blur();
            //     if(data.data.trade_mode=="shoe_temp "){
            //       alertMsg("确定","支付成功",function(){
            //         window.location.href="index.html#/CASTire"
            //       }); 
            //     }else{
            //       alertMsg("确定","支付成功",function(){
            //         window.location.href="index.html#/order/all"
            //       }); 
            //     }
            //   }else if(data.code=="E0014"){
            //     alertMsg("确定",data.message,function(){
            //       window.location.href="index.html#/login";
            //     });
            //   }else if(data.code=="E0030"){
            //     //余额不足，跳转充值页面
            //     confirmMsg(["充值","取消"],data.message,function(){
            //       // console.log("确定");
            //       window.location.href="index.html#/userAmount";
            //     },function(){
            //       // console.log("取消");
            //       //关闭支付窗口
            //       $("#checkoutCounterPage>.inputPayPwd").css("display","none");
            //     });
            //   }else{
            //     alertMsg("确定",data.message,function(){
            //       //关闭支付窗口
            //       $("#checkoutCounterPage>.inputPayPwd").css("display","none");
            //     }); 
            //   }
            // }).error(function(err){
            //   console.log(err);
            // });
            //开始加载通讯
            commStart();
            $.ajax({
              type:"post",
              url:"http://180.76.243.205:8383/_API/_ml/pay",
              data:{
                user_id:ponyUserData.id,
                token:token,
                obj_id:tempId,
                trade_mode:orderType,
                pay_pwd:strmd5(pwd),
                sale_ids:userSelCoupon
              },
              success:function(data){
                commFinish();
                if(data.code=="E0000"){
                  // console.log(data);
                  $("#userPayPwdInput").blur();
                  if(data.data.trade_mode=="shoe_temp"){
                    alertMsg("确定","支付成功",function(){
                      window.location.href="index.html#/CASTire"
                    }); 
                  }else{
                    alertMsg("确定","支付成功",function(){
                      window.location.href="index.html#/order/all"
                    }); 
                  }
                }else if(data.code=="E0014"){
                  alertMsg("确定",data.message,function(){
                    window.location.href="index.html#/login";
                  });
                }else if(data.code=="E0030"){
                  //余额不足，跳转充值页面
                  confirmMsg(["充值","取消"],data.message,function(){
                    // console.log("确定");
                    window.location.href="index.html#/userAmount";
                  },function(){
                    // console.log("取消");
                    //关闭支付窗口
                    $("#checkoutCounterPage>.inputPayPwd").css("display","none");
                  });
                }else{
                  alertMsg("确定",data.message,function(){
                    //关闭支付窗口
                    $("#checkoutCounterPage>.inputPayPwd").css("display","none");
                  }); 
                }
              },
              error:function(err){
                commFinish();
                console.log(err);
              }
            });


          }else{
            alertMsg("确定","您输入的密码不正确",function(){
              $("#userPayPwdInput").focus();
            }); 
          }
        }

      });

      //优惠券先取
      $("#couponListPage>.couponList>ul").on("click","li",function(){
        var target=$(this);
        //当前优惠券服务类型
        var targetType=target.attr("data-servertype");
        //当前优惠券id
        var targetid=target.attr("data-couponid");

        // console.log(targetid,targetType);
        //如果是现金抵用券他只能用一张，如果是服务券，他可以用多张

        if(targetType==1){
          //服务券
          if(target.hasClass("active")){
            target.removeClass("active");
          }else{
            target.addClass("active");
          }
        }else{
          //现金券
          var couponList=$("#couponListPage>.couponList>ul").children();
          for(var i=0;i<couponList.length;i++){
            var one=couponList[i];
            var itemType=$(one).attr("data-servertype");
            if(itemType=='2'){
              $(one).removeClass('active');
            }
          }
          target.addClass("active");
        }
      });


    });

  });

  //轮胎服务，免费再换 服务选择页面
  horseApp.controller("changeTireSelCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //更换标准
    $scope.changeStandard=[];
    //修补标准
    $scope.repairStandard=[];
    //默认车辆订单个数
    var userOrderLength=0;

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_freeHome/get",
      data:"user_id="+ponyUserData.id+"&token="+token
    }).success(function(data){
      if(data.code=="E0000"){
        // console.log(data.data);
        $scope.changeStandard=data.data.service;
        $scope.repairStandard=data.data.mend;
        userOrderLength=data.data.UserShoeOrder;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });

    //原厂更换
    $scope.tireOriginalChange=function(){
      if(userOrderLength>'0'){
        $location.path("/originalChangeTire");
      }else{
        alertMsg("确定","您的默认车辆没有下过订单,无法更换轮胎",function(){}); 
      }
    }

    //免费更换
    $scope.tireFreeChange=function(){
      if(userOrderLength>'0'){
        $location.path("/ponyTireChange");
      }else{
        alertMsg("确定","您的默认车辆没有下过订单,无法更换轮胎",function(){}); 
      }
    }

    //监视页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);
      
    });

  });

  //轮胎原厂更换服务页面
  horseApp.controller("originalChangeTireCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //订单类型
    var orderType=null;

    // 当前选中店铺列表数据
    $scope.shop=null;

    //前胎数据
    $scope.userFont=null;
    //后胎数据 
    $scope.userRear=null;

    //轮播
    var bannerTimer=null;

    //流程信息
    $scope.flowPath=[];

    //最大更换数量 前胎，后胎
    var changeFontMaxNum=0;
    var changeRearMaxNum=0;

    //更换数量 前胎，后胎
    $scope.originalChangeFontNum=0;
    $scope.originalChangeRearNum=0;

    // 更换数量增加
    $scope.changeNumAdd=function(targetLocation){
      if(targetLocation=='font'){
        if($scope.originalChangeFontNum<changeFontMaxNum){
          $scope.originalChangeFontNum++;
        }else{
          alertMsg("确定","没胎了，买一个吧",function(){});
        }
      }else{
        if($scope.originalChangeRearNum<changeRearMaxNum){
          $scope.originalChangeRearNum++;
        }else{
          alertMsg("确定","没胎了，买一个吧",function(){});
        }
      }
    }
    // 更换数量减少
    $scope.changeNumMinus=function(targetLocation){
      if(targetLocation=='font'){
        if($scope.originalChangeFontNum>0){
          $scope.originalChangeFontNum--;
        }
      }else{
        if($scope.originalChangeRearNum>0){
          $scope.originalChangeRearNum--;
        }
      }

    }

    //显示流程配置
    $scope.toPath=function(){
      $("#originalChangeTirePage>.changeTirePath").css({
        display:"block"
      }).siblings().css({display:"none"});
    }

    //从流程配置返回主页面
    $scope.toBackMain=function(){
      $("#originalChangeTirePage>.originalChangeTire").css({
        display:"block"
      }).siblings().css({display:"none"});
    }

    //选择安装店铺
    $scope.selInstallShop=function(){
      clearInterval(bannerTimer);
      $location.path("/selTireInstallShop");
    }

    //页面跳转
    $scope.jump=function(path){
      clearInterval(bannerTimer);
      $location.path(path);
    }

    //提交订单到更换地址选择
    $scope.submitOriginalChange=function(){
      var changeFontNum=$("#originalChangeFontNum").val();
      var changeRearNum=$("#originalChangeRearNum").val();

      if((changeFontNum*1+changeRearNum*1)<1){
        alertMsg("确定","请选择你要更换的数量",function(){});
        return;
      }
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_contacts/select",
        data:"user_id="+ponyUserData.id+"&token="+token+"&store_id="+tireServerSelShopData.id+"&font="+changeFontNum+"&rear="+changeRearNum
      }).success(function(data){
        // console.log(data)
        commFinish();
        if(data.code=="E0000"){
          clearInterval(bannerTimer);
          $location.path("/originalChangeTireSelAddress/"+tireServerSelShopData.id+"/"+changeFontNum+"/"+changeRearNum);
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            clearInterval(bannerTimer);
            window.location.href="index.html#/login";
          });
        }else{
          alertMsg("确定",data.message,function(){});
        }
      });


    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);
      //开始加载通讯
      commStart();
      // deviceLocation.latitude+","+deviceLocation.longitude
      //获取数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_original/change",
        data:"user_id="+ponyUserData.id+"&token="+token+"&longitude="+(deviceLocation.longitude?deviceLocation.longitude:"120.428666")+"&latitude="+(deviceLocation.latitude?deviceLocation.latitude:'36.164666')
      }).success(function(data){
        commFinish();
        if(data.code=="E0000"){
          console.log(data.data);
          $scope.userFont=data.data.font;
          $scope.userRear=data.data.rear;

          //默认前胎轮播图片并加载更新
          var bannerImgList=data.data.font.shoe_image;
          var html="";
          var subHtml="";
          for(var i=0;i<bannerImgList.length;i++){
            var one=bannerImgList[i];
            if(i==0){
              html+="<li class='active'><img src='"+one+"'/></li>";
              subHtml+="<li class='active'></li>";
            }else{
              html+="<li><img src='"+one+"'/></li>";
              subHtml+="<li></li>";
            }
          }
          $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").html(html);
          $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgListNum>ul").html(subHtml);
          //banner图片轮播
          bannerTimer=setInterval(function(){
            var num=$("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children(".active").index();
            var len=$("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children().length;
            if(num<(len-1)){
              $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
              $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgListNum>ul").children(".active").next().addClass("active").siblings().removeClass("active");
            }else{
              $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children().first().addClass("active").siblings().removeClass("active");
              $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgListNum>ul").children().first().addClass("active").siblings().removeClass("active");
            }  
          },10000);

          //流程信息
          $scope.flowPath=data.data.flow;

          //如果存有店铺ID，说明以前选过（且此ID要在请求回来的数据里面），如果没有那把第一个值给他
          if(tireServerSelShopData){
            $scope.shop=tireServerSelShopData;
          }else{
            if(data.data.store){
              $scope.shop=data.data.store; 
              tireServerSelShopData=data.data.store;        
            }
          }

        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            clearInterval(bannerTimer);
            window.location.href="index.html#/login";
          });
        }else{
          console.log(data.message);
        }
      });

      //banner图片点
      $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgListNum>ul").on("click","li",function(){
        var targetNum=$(this).index();
        $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
        $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgListNum>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
      });
      //banner图片truch左右滑动事件
      var startX=null;
      $('#originalChangeTirePage>.originalChangeTire>.tireBanner').on('touchstart',function(e){
        startX = e.originalEvent.changedTouches[0].pageX;
      });
      $('#originalChangeTirePage>.originalChangeTire>.tireBanner').on('touchend',function(e){
        var endX = e.originalEvent.changedTouches[0].pageX;
        if(endX==startX){
          return;
        }
        var num=$("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children(".active").index();
        var len=$("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children().length;
        if(endX<startX){
          //向左 下一张
          if(num<(len-1)){
            $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
            $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgListNum>ul").children(".active").next().addClass("active").siblings().removeClass("active");
          }else{
            $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children().first().addClass("active").siblings().removeClass("active");
            $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgListNum>ul").children().first().addClass("active").siblings().removeClass("active");
          }  
        }else{
          //向右 上一张
          if(num>0){
            $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
            $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgListNum>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
          }else{
            $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgList>ul").children().last().addClass("active").siblings().removeClass("active");
            $("#originalChangeTirePage>.originalChangeTire>.tireBanner>.imgListNum>ul").children().last().addClass("active").siblings().removeClass("active");
          }
        }
      });

      //前后胎选择
      $("#originalChangeTirePage>.originalChangeTire>.changeLocation>.selLocation>ul").on("click","li",function(){
        var target=$(this);
        var num=$(this).attr("data-num");
        var indexNum=$(this).index();
        //更换选择前后胎
        if(target.hasClass("active")){
          target.removeClass("active");
          if(indexNum==0){
            $scope.originalChangeFontNum=0;
            changeFontMaxNum=0;
          }else{
            $scope.originalChangeRearNum=0;
            changeRearMaxNum=0;
          }
          $scope.$apply();
        }else{
          target.addClass("active");

          //设置最大更换数量 分前后胎
          if(indexNum==0){
            //前胎
            if(num>2){
              changeFontMaxNum=2
            }else if(num>0){
              changeFontMaxNum=num;
            }else{
              changeFontMaxNum=0;
            }
          }else{
            //后胎
            if(num>2){
              changeRearMaxNum=2
            }else if(num>0){
              changeRearMaxNum=num;
            }else{
              changeRearMaxNum=0;
            }
          }
        }

      });

    });


  });

  //选择安装店铺页面
  horseApp.controller("selTireInstallShopCtrl",function($scope,$location,$http,$rootScope){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //店铺列表总数据
    var shopListArr=[];

    //店铺列表显示数据
    $scope.shopList=[];

    //所在城市名称 console.log($rootScope.addressCity);

    //获取店铺数据
    function getShopList(key){
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_store/getList",
        data:"user_id="+ponyUserData.id+"&token="+token+"&longitude="+(deviceLocation.longitude?deviceLocation.longitude:"120.428666")+"&latitude="+(deviceLocation.latitude?deviceLocation.latitude:'36.164666')+"&service_type=1"+(key?"&key_words="+key:'')+"&city_name="+$rootScope.addressCity
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          if(data.data.store){
            shopListArr=data.data.store;
            $scope.shopList=data.data.store;
          }else{
            shopListArr=[];
            $scope.shopList=[];
          }

        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          console.log(data.message);
        }
      }); 
      
    }

    getShopList();

    //搜索店铺
    $scope.toSearchShop=function(){
      $("#selTireInstallShopPage>.searchInstallShopPage").css({
        display:"block"
      }).siblings().css({display:"none"});

      //获取搜索历史列表
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_searchData/get",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        // console.log(data);
        if(data.code=="E0000"){
          if(data.data){
            var html="";
            for(var i=0;i<data.data.length;i++){
              var one=data.data[i];
              html+="<span>"+one.key_word+"</span>";
            }
            $("#selTireInstallShopPage>.searchInstallShopPage>.searchHistoryList>.historyList").html(html);
          }
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          console.log(data.message);
        }
      });

    }

    //删除搜索历史记录
    $scope.delSearchHistory=function(){
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_searchData/delete",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          $("#selTireInstallShopPage>.searchInstallShopPage>.searchHistoryList>.historyList").html("");
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          console.log(data.message);
        }
      });
    } 

    //从搜索页面返回店铺列表
    $scope.toShopList=function(){
      //当点击此按钮回到店铺列表时，列表数据会重新绘制成刚进行页面时的默认数据
      $("#selTireInstallShopPage>.installShopList").css({
        display:"block"
      }).siblings().css({display:"none"});
      getShopList();
      //清空搜索框
      $("#searchInstallShop").val("");
      // 重置门店类型
      $("#selShopType>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
      $("#selShopType").children("span").html("全部门店");
      // 重置排序
      $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
      $("#selShopSort").children("span").html("默认排序");
      //重置筛选
      $("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().removeClass("active");
    }

    //页面返回
    $scope.toBackPack=function(){
      window.history.back(-1);
    }

    //监视页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);
      
      //选择门店类型
      $("#selShopType").click(function(){
        var target=$(this);
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active").siblings().removeClass("active");
        }
      });

      //选择门店类型 子菜单
      $("#selShopType>.subMenu>ul").on("click","li",function(){
        var target=$(this);
        if(!target.hasClass("active")){
          target.addClass("active").siblings().removeClass("active");
          target.parent().parent().parent().children("span").html(target.children("span").html());
        }

        switch (target.index()){
          case 0:
          //全部
            $scope.shopList=shopListArr;
            break;
          case 1:
          //快修
            $scope.shopList=[];
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==2){
                $scope.shopList.push(one);
              }
            }
            break;
          case 2:
          //维修
            $scope.shopList=[];
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==3){
                $scope.shopList.push(one);
              }
            }
            break;
          case 3:
          //美容
            $scope.shopList=[];
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==4){
                $scope.shopList.push(one);
              }
            }
            break;
          case 4:
          //4S店
            $scope.shopList=[];
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==1){
                $scope.shopList.push(one);
              }
            }
            break;
        }
        // 重置排序
        $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopSort").children("span").html("默认排序");
        //重置筛选
        $("#shopListPage>.shopList>.header>.selType>ul>li.active>.subMenu>.filtrateBody>ul").children().removeClass("active");
        $scope.$apply();

      });
      
      //选择门店排序
      $("#selShopSort").click(function(){
        var target=$(this);
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active").siblings().removeClass("active");
        }

      });

      //选择门店排序 子菜单
      $("#selShopSort>.subMenu>ul").on("click","li",function(){
        var target=$(this);
        if(!target.hasClass("active")){
          target.addClass("active").siblings().removeClass("active");
          target.parent().parent().parent().children("span").html(target.children("span").html());
        }

        // console.log(target.index());
        switch (target.index()){
          case 0:
          //默认
            $scope.shopList.sort(function(a,b){
              return a.id>b.id?1:0;
            });
            break;
          case 1:
          //附近
            // console.log(1);
            $scope.shopList.sort(function(a,b){
              return (parseFloat(a.value)>parseFloat(b.value))?1:0;
            });
            break;
          case 2:
          //评分
            $scope.shopList.sort(function(a,b){
              return parseFloat(a.star_no)>parseFloat(b.star_no)?0:1;
            });
            break;
          case 3:
          //累计安装 
            $scope.shopList.sort(function(a,b){
              return parseFloat(a.complete_no)>parseFloat(b.complete_no)?0:1;
            });
            break;
        }

        $scope.$apply();
      });

      //选择门店筛选
      $("#selShopFiltrate").click(function(){
        var target=$(this);
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active").siblings().removeClass("active");
        }
      });

      //选择门店筛选 子菜单
        //阻止冒泡
      $("#selShopFiltrate>.subMenu>.filtrateBody").on("click",function(e){
        e.stopPropagation();
      });
        //进行选取
      $("#selShopFiltrate>.subMenu>.filtrateBody>ul").on("click","li",function(e){
        e.stopPropagation();
        var target=$(this);
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active");
        }
      });
        //完成筛选
      $("#selShopFiltrate>.subMenu>.filtrateBody>.filtrateBtn>.filtrateSet").on("click",function(){
        var target=$(this);
        target.parent().parent().parent().parent().removeClass("active");

        //是否有保养
        var isUpkeep=$("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().eq(0).hasClass("active")?1:0;
        //是否有美容
        var isBeauty=$("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().eq(1).hasClass("active")?1:0;
        //是否有改装
        var isRefit=$("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().eq(2).hasClass("active")?1:0;
        //是否有安装
        var isInstall=$("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().eq(3).hasClass("active")?1:0;

        //所筛选门店类型为什么：0所有 1快修 2维修 3美容 44S
        var shopListType=$("#selShopType>.subMenu>ul>.active").index();
        var newShopList=[];
        switch (shopListType){
          case 0:
          //全部
            newShopList=shopListArr.concat();
            break;
          case 1:
          //快修
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==2){
                newShopList.push(one);
              }
            }
            break;
          case 2:
          //维修
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==3){
                newShopList.push(one);
              }
            }
            break;
          case 3:
          //美容
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==4){
                newShopList.push(one);
              }
            }
            break;
          case 4:
          //4S店
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==1){
                newShopList.push(one);
              }
            }
            break;
        }
        // 筛选数据
        $scope.shopList=[];
        //保养
        // var delI=0;
        if(isUpkeep){
          for(var i=0;i<newShopList.length;i++){
            var one=newShopList[i];
            if(one.service_type.service_type_ii==2){
              // newShopList.splice(i-delI,1);
              newShopList.splice(i,1);
              // delI++;
            }
          }
        }
        //美容
        // var delI=0;
        if(isBeauty){
          for(var i=0;i<newShopList.length;i++){
            var one=newShopList[i];
            if(one.service_type.service_type_iii==2){
              // newShopList.splice(i-delI,1);
              newShopList.splice(i,1);
              // delI++;
            }
          }
        }

        //改装
        // var deli=0;
        if(isRefit){
          for(var i=0;i<newShopList.length;i++){
            var one=newShopList[i];
            if(one.service_type.service_type_iv==2){
              // newShopList.splice(i-delI,1);
              newShopList.splice(i,1);
              // delI++;
            }
          }
        }
        //安装
        // var delI=0
        if(isInstall){
          for(var i=0;i<newShopList.length;i++){
            var one=newShopList[i];
            if(one.service_type.service_type_v==2){
              // newShopList.splice(i-delI,1);
              newShopList.splice(i,1);
              // delI++;
            }
          }
        }
        $scope.shopList=newShopList;
        // 重置排序
        $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopSort").children("span").html("默认排序");
        // 重置门店类型
        // $("#selShopType>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        // $("#selShopType").children("span").html("全部门店");

        $scope.$apply();

      });
        //重置筛选
      $("#selShopFiltrate>.subMenu>.filtrateBody>.filtrateBtn>.filtrateReset").on("click",function(){
        var target=$(this);
        target.parent().prev().children(".active").removeClass("active");
      });

      //选择门店后返回要选取门店的页面
      $("#selTireInstallShopPage>.installShopList>.shopList>ul").on("click","li",function(){
        var targetId=$(this).attr("data-stopid");
        // console.log(targetId,$(this));
        for(var i=0;i<shopListArr.length;i++){
          var one= shopListArr[i];
          if(one.id==targetId){
            // console.log(one);
            tireServerSelShopData=one;
            window.history.back(-1);
          }
        }
      });

        //搜索门店
      $("#searchInstallShop").on("search",function(){
        var target=$(this);
        
        if((/^\s+$/g).test(target.val())){
          getShopList();
        }else{
          getShopList(target.val());
        }
        $("#selTireInstallShopPage>.installShopList").css({
          display:"block"
        }).siblings().css({display:"none"});

        // 重置门店类型
        $("#selShopType>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopType").children("span").html("全部门店");
        // 重置排序
        $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopSort").children("span").html("默认排序");
        //重置筛选
        $("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().removeClass("active");
        // alert(target.val());
        // alertMsg("确定","正在开发，敬请期待",function(){}); 
      });  

      //搜索记录
      $("#selTireInstallShopPage>.searchInstallShopPage>.searchHistoryList>.historyList").on("click","span",function(){
        var searchKey=$(this).html();
        getShopList(searchKey);
        $("#selTireInstallShopPage>.installShopList").css({
          display:"block"
        }).siblings().css({display:"none"});
        // 重置门店类型
        $("#selShopType>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopType").children("span").html("全部门店");
        // 重置排序
        $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopSort").children("span").html("默认排序");
        //重置筛选
        $("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().removeClass("active");
      });

    });
      
  });

  //轮胎原厂更换订单确认（地址选择）页面
  horseApp.controller('originalChangeTireSelAddressCtrl',function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //获取传入的数据(更换前后轮胎的数量，更换轮胎的店铺ID)
    var tireShopId=$routeParams.shopId;
    var tireChangeFontNum=$routeParams.changeFontNum;
    var tireChangeRearNum=$routeParams.changeRearNum;
    // console.log(tireNum,tireLocation,tireShopId);

    //用户联系地址列表
    $scope.addList=null;

    //获取传入的用户地址数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_contact/list",
      data:"user_id="+ponyUserData.id+"&token="+token
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        $scope.addList=data.data;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });

    //返回按钮
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //提交订单数据
    $scope.submitOriginalChangeOrder=function(){
      var userAddId=$("#originalChangeTireSelAddressPage>.addressList>ul>.active").attr("data-addid");
      // console.log(userAddId);
      // return;
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_serviceOrder/submit",
        data:"user_id="+ponyUserData.id+"&token="+token+"&store_id="+tireShopId+"&user_shoe_id="+userAddId+"&font="+tireChangeFontNum+"&rear="+tireChangeRearNum
      }).success(function(data){
        commFinish();
        // console.log(data)
        if(data.code=="E0000"){
          alertMsg("确定","下单成功",function(){
            window.location.href="index.html#/order/all";
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

    //监听页面加载
    $scope.$watch('$viewContentLoaded',function(){
      //地址选择
      $("#originalChangeTireSelAddressPage>.addressList>ul").on("click",".addItem",function(){
        var target=$(this);
        if(!target.hasClass('active')){
          target.addClass('active').siblings().removeClass('active');
        }
      });

    });

  });

  //轮胎服务，免费补胎页面
  horseApp.controller("tireRepairCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    $scope.userName=tireRepairServer.userName;
    $scope.userTel=tireRepairServer.userTel;
    $scope.userTime=tireRepairServer.userTime;


    //修补规则
    $scope.repairRuleList=null;
    
    // 当前选中店铺列表数据
    $scope.shop=null;

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_shoePatch/confirm",
      data:"user_id="+ponyUserData.id+"&token="+token+"&longitude="+(deviceLocation.longitude?deviceLocation.longitude:"120.428666")+"&latitude="+(deviceLocation.latitude?deviceLocation.latitude:'36.164666')
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        //修补规则
        $scope.repairRuleList=data.data.shoe_rules;

        //如果存有店铺ID，说明以前选过（且此ID要在请求回来的数据里面），如果没有那把第一个值给他
        if(tireServerSelShopData){
          $scope.shop=tireServerSelShopData;
        }else{
          if(data.data.store){
            $scope.shop=data.data.store; 
            tireServerSelShopData=data.data.store;        
          }
        }
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });

    //页面跳转
    $scope.jump=function(path){
      tireRepairServer.userName=$("#ponyTireOrderUserName").val();
      tireRepairServer.userTel=$("#ponyTireOrderUserTel").val();
      tireRepairServer.userTime=$("#orderReserveTime").val();
      $location.path(path);
    }

    //提交轮胎修补订单
    $scope.subminTireRepairOrder=function(){
      var shopId=tireServerSelShopData.id;
      var userName=$("#ponyTireOrderUserName").val();
      var userTel=$("#ponyTireOrderUserTel").val();
      var userTime=$("#orderReserveTime").val();

      if(!userName){
        alertMsg("确定","请输入联系人",function(){});
        return;
      }
      if(!userTel){
        alertMsg("确定","请输入联系电话",function(){});
        return;
      }else if(!(/^1[34578]\d{9}$/.test(userTel))){
        alertMsg("确定","您输入的联系电话不正确，请重新输入",function(){});
        return;
      }
      if(!userTime){
        alertMsg("确定","请选取联系时间",function(){});
        return;
      }else if(Date.parse(new Date(userTime))+57600000<=new Date()){
        alertMsg("确定","您选择的预约时间不正确，请重新选择",function(){});
        return;
      }
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_shoePatch/submit",
        data:"user_id="+ponyUserData.id+"&token="+token+"&store_id="+shopId+"&name="+userName+"&phone="+userTel+"&appointment="+userTime
      }).success(function(data){
        commFinish();
        console.log(data);
        if(data.code=="E0000"){
          tireRepairServer.userName="";
          tireRepairServer.userTel="";
          tireRepairServer.userTime=null;
          alertMsg("确定","下单成功",function(){
            window.location.href="index.html#/order/all";
          });
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          // console.log(data.message);
          alertMsg("确定",data.message,function(){});
        }
      });
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //订单预约时间
      $("#orderReserveTime").val(nowDateYear+"-"+(nowDateMonth>10?nowDateMonth:"0"+nowDateMonth)+"-"+(nowDateDay>10?nowDateDay:"0"+nowDateDay));
    });

  });

  //轮胎服务小马架架轮胎更换页面
  horseApp.controller("ponyTireChangeCtrl",function($scope,$http,$location){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];
    
    //前胎数据
    $scope.userFont=null;
    //后胎数据 
    $scope.userRear=null;

    //免费更换标准
    $scope.freeChangeNorm=null;
    //免费更换原因
    $scope.freeChangeCause=null;

    //轮播
    var bannerTimer=null;

    //流程信息
    $scope.flowPath=[];

    // 当前选中店铺列表数据
    $scope.shop=null;

    //前后胎更换数量
    $scope.ponyChangeFontNum=0;
    $scope.ponyChangeRearNum=0;

    //前后胎最大可更换数量
    var changeFontMaxNum=2;
    var changeRearMaxNum=2;
    
    // 更换数量增加
    $scope.changeNumAdd=function(targetLocation){
      if(targetLocation=='font'){
        if($scope.ponyChangeFontNum<changeFontMaxNum){
          $scope.ponyChangeFontNum++;
        }else{
          alertMsg("确定","已经是最大可更换数量了",function(){});
        }
      }else{
        if($scope.ponyChangeRearNum<changeRearMaxNum){
          $scope.ponyChangeRearNum++;
        }else{
          alertMsg("确定","已经是最大可更换数量了",function(){});
        }
      }
    }
    // 更换数量减少
    $scope.changeNumMinus=function(targetLocation){
      if(targetLocation=='font'){
        if($scope.ponyChangeFontNum>0){
          $scope.ponyChangeFontNum--;
        }
      }else{
        if($scope.ponyChangeRearNum>0){
          $scope.ponyChangeRearNum--;
        }
      }

    }

    //显示流程配置
    $scope.toPath=function(){
      $("#ponyTireChangePage>.changeTirePath").css({
        display:"block"
      }).siblings().css({display:"none"});
    }

    //从流程配置返回主页面
    $scope.toBackMain=function(){
      $("#ponyTireChangePage>.ponyTireChange").css({
        display:"block"
      }).siblings().css({display:"none"});
    }

    //页面跳转
    $scope.jump=function(path){
      clearInterval(bannerTimer);
      $location.path(path);
    }

    //选择安装店铺
    $scope.selInstallShop=function(){
      clearInterval(bannerTimer);
      $location.path("/selTireInstallShop");
    }

    //小马驾驾轮胎免费再换订单提交
    $scope.submitPonyTireChange=function(){
      
      var changeFontNum=$("#ponyChangeFontNum").val();
      var changeRearNum=$("#ponyChangeRearNum").val();

      if((changeFontNum*1+changeRearNum*1)<1){
        alertMsg("确定","请选择你要更换的数量",function(){});
        return;
      }
      
      var changeOriginalArr=$("#ponyTireChangePage>.ponyTireChange>.changeCause>ul").children(".active");
      var tireChangeOriginal=[];
      for(var i=0;i<changeOriginalArr.length;i++){
        var one=changeOriginalArr[i];
        tireChangeOriginal.push($(one).attr("data-causeid"));
      }

      if(!tireChangeOriginal.length){
        alertMsg("确定","请选择更换原因",function(){});
        return;
      }
      // console.log(tireChangeOriginal);
      // return;

      //提交临时订单数据
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_free/submit",
        data:"user_id="+ponyUserData.id+"&token="+token+"&store_id="+tireServerSelShopData.id+"&font="+changeFontNum+"&rear="+changeRearNum
      }).success(function(data){
        // console.log(data)
        commFinish();
        if(data.code=="E0000"){
          clearInterval(bannerTimer);
          $location.path("/ponyTireChangeOrderDetail/"+data.data.shoe_temp_id+'/'+tireChangeOriginal.join(","));
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            clearInterval(bannerTimer);
            window.location.href="index.html#/login";
          });
        }else{
          alertMsg("确定",data.message,function(){});
        }
      });

    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //开始加载通讯
      commStart();
      //获取数据
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_free/change",
        data:"user_id="+ponyUserData.id+"&token="+token+"&longitude="+(deviceLocation.longitude?deviceLocation.longitude:"120.428666")+"&latitude="+(deviceLocation.latitude?deviceLocation.latitude:'36.164666')
      }).success(function(data){
        commFinish();
        console.log(data);
        // return;
        if(data.code=="E0000"){
          // console.log(data.data);
          $scope.userFont=data.data.font;
          $scope.userRear=data.data.rear;

          //默认前胎轮播图片并加载更新
          var bannerImgList=data.data.font.shoe_image;
          var html="";
          var subHtml="";
          for(var i=0;i<bannerImgList.length;i++){
            var one=bannerImgList[i];
            if(i==0){
              html+="<li class='active'><img src='"+one+"'/></li>";
              subHtml+="<li class='active'></li>";
            }else{
              html+="<li><img src='"+one+"'/></li>";
              subHtml+="<li></li>";
            }
          }
          $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").html(html);
          $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgListNum>ul").html(subHtml);
          //banner图片轮播
          bannerTimer=setInterval(function(){
            var num=$("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children(".active").index();
            var len=$("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children().length;
            if(num<(len-1)){
              $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
              $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgListNum>ul").children(".active").next().addClass("active").siblings().removeClass("active");
            }else{
              $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children().first().addClass("active").siblings().removeClass("active");
              $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgListNum>ul").children().first().addClass("active").siblings().removeClass("active");
            }  
          },10000);

          //流程信息
          $scope.flowPath=data.data.flow;

          //免费更换标准
          $scope.freeChangeNorm=data.data.shoe_rule_type;
          //免费更换原因
          $scope.freeChangeCause=data.data.shoe_change_ori;


          //如果存有店铺ID，说明以前选过（且此ID要在请求回来的数据里面），如果没有那把第一个值给他
          if(tireServerSelShopData){
            $scope.shop=tireServerSelShopData;
          }else{
            if(data.data.store){
              $scope.shop=data.data.store; 
              tireServerSelShopData=data.data.store;        
            }
          }

        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            clearInterval(bannerTimer);
            window.location.href="index.html#/login";
          });
        }else{
          console.log(data.message);
        }
      });


      //banner图片点
      $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgListNum>ul").on("click","li",function(){
        var targetNum=$(this).index();
        $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
        $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgListNum>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
      });
      //banner图片truch左右滑动事件
      var startX=null;
      $('#ponyTireChangePage>.ponyTireChange>.tireBanner').on('touchstart',function(e){
        startX = e.originalEvent.changedTouches[0].pageX;
      });
      $('#ponyTireChangePage>.ponyTireChange>.tireBanner').on('touchend',function(e){
        var endX = e.originalEvent.changedTouches[0].pageX;
        if(endX==startX){
          return;
        }
        var num=$("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children(".active").index();
        var len=$("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children().length;
        if(endX<startX){
          //向左 下一张
          if(num<(len-1)){
            $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
            $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgListNum>ul").children(".active").next().addClass("active").siblings().removeClass("active");
          }else{
            $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children().first().addClass("active").siblings().removeClass("active");
            $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgListNum>ul").children().first().addClass("active").siblings().removeClass("active");
          }  
        }else{
          //向右 上一张
          if(num>0){
            $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
            $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgListNum>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
          }else{
            $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgList>ul").children().last().addClass("active").siblings().removeClass("active");
            $("#ponyTireChangePage>.ponyTireChange>.tireBanner>.imgListNum>ul").children().last().addClass("active").siblings().removeClass("active");
          }
        }
      });

      //更换原因选择
      $("#ponyTireChangePage>.ponyTireChange>.changeCause>ul").on("click","li",function(){
        var target=$(this);
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active");
        }
      });


    });

  });

  //小马驾驾轮胎更换订单确认页面（联系人，电话，预约时间）
  horseApp.controller("ponyTireChangeOrderDetailCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;
    
    var token=sessionStorage["ponyUserToken"];

    //获取传入的数据(更换轮胎的店铺ID, 更换原因数组)
    var orderShopId=$routeParams.orderShopId;
    var orderChangeOriginalList=$routeParams.changeOriginalList;
    orderChangeOriginalList=orderChangeOriginalList.split(',');
    // console.log(orderChangeOriginalList);

    //订单数据
    $scope.userOrderData=null;

    //获取临时订单数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_freeShoeTemp/get",
      data:"user_id="+ponyUserData.id+"&token="+token+"&shoe_temp_id="+orderShopId
    }).success(function(data){
      // console.log(data);
      if(data.code=="E0000"){
        $scope.userOrderData=data.data.shoe_temp_order;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });

    //提交小马驾驾轮胎更换订单
    $scope.submitTireOrder=function(){
      var userName=$("#ponyTireOrderUserName").val();
      var userTel=$("#ponyTireOrderUserTel").val();
      var userServerTime=$("#orderReserveTime").val();

      // 验证数据
      if(!userName){
        alertMsg("确定","请输入联系人",function(){});
        return;
      }
      if(!userTel){
        alertMsg("确定","请输入联系人",function(){});
        return;
      }else if(!(/^1[34578]\d{9}$/.test(userTel))){
        alertMsg("确定","联系人电话格式不正确",function(){});
        return;
      }
      if(!userServerTime){
        alertMsg("确定","请选取预约服务时间",function(){});
        return;
      }else if(Date.parse(new Date(userServerTime))+57600000<=new Date()){
        alertMsg("确定","预约时间不正确",function(){});
        return;
      }

      //提交数据
      //开始加载通讯
      commStart();
      $.ajax({
        type:"post",
        url:"http://180.76.243.205:8383/_API/_freeOrder/submit",
        data:{
          user_id:ponyUserData.id,
          token:token,
          shoe_temp_id:orderShopId,
          name:userName,
          phone:userTel,
          appointment:userServerTime,
          ori_list:orderChangeOriginalList
        },success:function(data){
          commFinish();
          console.log(data);
          if(data.code=="E0000"){
            alertMsg("确定","下单成功",function(){
              window.location.href="index.html#/order/all";
            });
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              window.location.href="index.html#/login";
            });
          }else{
            console.log(data.message);
          }
        }
      });

    }

    //页面返回
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //订单预约时间
      $("#orderReserveTime").val(nowDateYear+"-"+(nowDateMonth>10?nowDateMonth:"0"+nowDateMonth)+"-"+(nowDateDay>10?nowDateDay:"0"+nowDateDay));
    });

  });

  //附近商铺页面 (保养，美容通用) 
  horseApp.controller("shopListCtrl",function($scope,$rootScope,$location,$http,$routeParams){
    $scope.height=vHeight;

    var token=sessionStorage["ponyUserToken"];

    //获取传入页面参数
    var typeId=$routeParams.typeId;
    //回退传入值
    $scope.shopType=typeId;

    //店铺列表总数据
    var shopListArr=[];
    
    //店铺列表显示数据
    $scope.shopList=[];

    //取消页面不能滚动
    $('body').css({
      overflow:"auto"
    });

    //地理位置
    $scope.addressCity=$rootScope.addressCity;
    if(!$rootScope.addressCity){
      var GPSTimer=setInterval(function(){
        if(deviceLocation.state=='1'){
          $http({
            method:"post",
            url:"http://api.map.baidu.com/geocoder/v2/",
            data:"ak=9lVEScaqxLpGVtVu46BWKO0Oe7ji2QRB&output=json&location="+deviceLocation.latitude+","+deviceLocation.longitude

          }).success(function(data){
            //console.log(data.result.addressComponent.city);
            $rootScope.GPSAddressCity=data.result.addressComponent.city;
            $scope.addressCity=$rootScope.addressCity?$rootScope.addressCity:$rootScope.GPSAddressCity;
          }).error(function(){
            $rootScope.GPSAddressCity="";
            $scope.addressCity=$rootScope.addressCity?$rootScope.addressCity:$rootScope.GPSAddressCity;
          });
          // console.log($scope.addressCity);
          clearInterval(GPSTimer);
        }
        // console.log($scope.addressCity);
      },1000);
    }

    //获取店铺列表数据
    function getShopList(key){
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_store/getList",
        data:"user_id="+ponyUserData.id+"&token="+token+"&longitude="+(deviceLocation.longitude?deviceLocation.longitude:"120.428666")+"&latitude="+(deviceLocation.latitude?deviceLocation.latitude:'36.164666')+"&service_type="+typeId+(key?"&key_words="+key:'')+"&city_name="+$scope.addressCity
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          if(data.data.store){
            shopListArr=data.data.store;
            $scope.shopList=data.data.store;
          }else{
            shopListArr=[];
            $scope.shopList=[];
          }

        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          console.log(data.message);
        }
      }); 
      
    }

    getShopList();

    //搜索店铺
    $scope.toSearchShop=function(){
      $("#shopListPage>.searchShopPage").css({
        display:"block"
      }).siblings().css({display:"none"});

      //获取搜索历史列表
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_searchData/get",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        // console.log(data);
        if(data.code=="E0000"){
          if(data.data){
            var html="";
            for(var i=0;i<data.data.length;i++){
              var one=data.data[i];
              html+="<span>"+one.key_word+"</span>";
            }
            $("#shopListPage>.searchShopPage>.searchHistoryList>.historyList").html(html);
          }
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          console.log(data.message);
        }
      });


    }

    //删除搜索历史记录
    $scope.delSearchHistory=function(){
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_searchData/delete",
        data:"user_id="+ponyUserData.id+"&token="+token
      }).success(function(data){
        console.log(data);
        if(data.code=="E0000"){
          $("#shopListPage>.searchShopPage>.searchHistoryList>.historyList").html("");
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          console.log(data.message);
        }
      });
    } 

    //从搜索页面返回店铺列表
    $scope.toShopList=function(){
      //当点击此按钮回到店铺列表时，列表数据会重新绘制成刚进行页面时的默认数据
      $("#shopListPage>.shopList").css({
        display:"block"
      }).siblings().css({display:"none"});
      getShopList();
      //清空搜索框
      $("#searchShop").val("");
      // 重置门店类型
      $("#selShopType>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
      $("#selShopType").children("span").html("全部门店");
      // 重置排序
      $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
      $("#selShopSort").children("span").html("默认排序");
      //重置筛选
      $("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().removeClass("active");
    }

    //对是否登陆进行跳转用户中心
    $scope.toUserCenter=function(){
      //是否存在登陆数据，有则跳转用户中心，没有跳转登陆
      if(ponyUserData){
        $location.path("/userCenter");
      }else{
        $location.path("/login");
      }
    }

    //监视页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //根据传入的typeId不同，改写页头
      switch(typeId){
        case '1':
          $("#shopListPage>.shopList>.header>.tit>h1").html("附近门店");
          break;
        case '2':
          $("#shopListPage>.shopList>.header>.tit>h1").html("保养维护");
          break;
        case '3':
          $("#shopListPage>.shopList>.header>.tit>h1").html("美容清洗");
          break;
      }

      //记录选择的地理位置
      $scope.addressCity=$rootScope.addressCity?$rootScope.addressCity:$rootScope.GPSAddressCity;
      //选择门店类型
      $("#selShopType").click(function(){
        var target=$(this);
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active").siblings().removeClass("active");
        }
      });

      //选择门店类型 子菜单
      $("#selShopType>.subMenu>ul").on("click","li",function(){
        var target=$(this);
        if(!target.hasClass("active")){
          target.addClass("active").siblings().removeClass("active");
          target.parent().parent().parent().children("span").html(target.children("span").html());
        }

        switch (target.index()){
          case 0:
          //全部
            $scope.shopList=shopListArr;
            break;
          case 1:
          //快修
            $scope.shopList=[];
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==2){
                $scope.shopList.push(one);
              }
            }
            break;
          case 2:
          //维修
            $scope.shopList=[];
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==3){
                $scope.shopList.push(one);
              }
            }
            break;
          case 3:
          //美容
            $scope.shopList=[];
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==4){
                $scope.shopList.push(one);
              }
            }
            break;
          case 4:
          //4S店
            $scope.shopList=[];
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==1){
                $scope.shopList.push(one);
              }
            }
            break;
        }
        // 重置排序
        $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopSort").children("span").html("默认排序");
        //重置筛选
        $("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().removeClass("active");
        $scope.$apply();
      });
      
      //选择门店排序
      $("#selShopSort").click(function(){
        var target=$(this);
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active").siblings().removeClass("active");
        }
      });

      //选择门店排序 子菜单
      $("#selShopSort>.subMenu>ul").on("click","li",function(){
        var target=$(this);
        if(!target.hasClass("active")){
          target.addClass("active").siblings().removeClass("active");
          target.parent().parent().parent().children("span").html(target.children("span").html());
        }

        // console.log(target.index());
        switch (target.index()){
          case 0:
          //默认
            $scope.shopList.sort(function(a,b){
              return a.id>b.id?1:0;
            });
            break;
          case 1:
          //附近
            // console.log(1);
            $scope.shopList.sort(function(a,b){
              return (parseFloat(a.value)>parseFloat(b.value))?1:0;
            });
            break;
          case 2:
          //评分
            $scope.shopList.sort(function(a,b){
              return parseFloat(a.star_no)>parseFloat(b.star_no)?0:1;
            });
            break;
          case 3:
          //累计安装 
            $scope.shopList.sort(function(a,b){
              return parseFloat(a.complete_no)>parseFloat(b.complete_no)?0:1;
            });
            break;
        }

        $scope.$apply();
      });

      //选择门店筛选
      $("#selShopFiltrate").click(function(){
        var target=$(this);
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active").siblings().removeClass("active");
        }
      });

      //选择门店筛选 子菜单
        //阻止冒泡
      $("#selShopFiltrate>.subMenu>.filtrateBody").on("click",function(e){
        e.stopPropagation();
      });
        //进行选取
      $("#selShopFiltrate>.subMenu>.filtrateBody>ul").on("click","li",function(e){
        e.stopPropagation();
        var target=$(this);
        if(target.hasClass("active")){
          target.removeClass("active");
        }else{
          target.addClass("active");
        }
      });
        //完成筛选
      $("#selShopFiltrate>.subMenu>.filtrateBody>.filtrateBtn>.filtrateSet").on("click",function(){
        var target=$(this);
        target.parent().parent().parent().parent().removeClass("active");

        //是否有保养
        var isUpkeep=$("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().eq(0).hasClass("active")?1:0;
        //是否有美容
        var isBeauty=$("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().eq(1).hasClass("active")?1:0;
        //是否有改装
        var isRefit=$("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().eq(2).hasClass("active")?1:0;
        //是否有安装
        var isInstall=$("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().eq(3).hasClass("active")?1:0;

        //所筛选门店类型为什么：0所有 1快修 2维修 3美容 44S
        var shopListType=$("#selShopType>.subMenu>ul>.active").index();
        var newShopList=[];
        switch (shopListType){
          case 0:
          //全部
            newShopList=shopListArr.concat();
            break;
          case 1:
          //快修
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==2){
                newShopList.push(one);
              }
            }
            break;
          case 2:
          //维修
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==3){
                newShopList.push(one);
              }
            }
            break;
          case 3:
          //美容
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==4){
                newShopList.push(one);
              }
            }
            break;
          case 4:
          //4S店
            for(var i=0;i<shopListArr.length;i++){
              var one=shopListArr[i];
              if(one.store_type_id==1){
                newShopList.push(one);
              }
            }
            break;
        }
        // 筛选数据
        $scope.shopList=[];
        //保养
        // var delI=0;
        if(isUpkeep){
          for(var i=0;i<newShopList.length;i++){
            var one=newShopList[i];
            if(one.service_type.service_type_ii==2){
              // newShopList.splice(i-delI,1);
              newShopList.splice(i,1);
              // delI++;
            }
          }
        }
        //美容
        // var delI=0;
        if(isBeauty){
          for(var i=0;i<newShopList.length;i++){
            var one=newShopList[i];
            if(one.service_type.service_type_iii==2){
              // newShopList.splice(i-delI,1);
              newShopList.splice(i,1);
              // delI++;
            }
          }
        }

        //改装
        // var delI=0;
        // console.log(newShopList)
        if(isRefit){
          for(var i=0;i<newShopList.length;i++){
            var one=newShopList[i];
            if(one.service_type.service_type_iv==2){
              // console.log(one,i-delI,delI,newShopList.length);
              // newShopList.splice(i-delI,1);
              newShopList.splice(i,1);
              // delI++;
            }
          }
        }
        //安装
        // var delI=0
        if(isInstall){
          for(var i=0;i<newShopList.length;i++){
            var one=newShopList[i];
            if(one.service_type.service_type_v==2){
              // newShopList.splice(i-delI,1);
              newShopList.splice(i,1);
              // delI++;
            }
          }
        }
        $scope.shopList=newShopList;
        // 重置排序
        $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopSort").children("span").html("默认排序");
        // 重置门店类型
        // $("#selShopType>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        // $("#selShopType").children("span").html("全部门店");

        $scope.$apply();

      });
        //重置筛选
      $("#selShopFiltrate>.subMenu>.filtrateBody>.filtrateBtn>.filtrateReset").on("click",function(){
        var target=$(this);
        target.parent().prev().children(".active").removeClass("active");
      });

        //搜索门店
      $("#searchShop").on("search",function(){
        var target=$(this);

        if((/^\s+$/g).test(target.val())){
          getShopList();
        }else{
          getShopList(target.val());
        }
        $("#shopListPage>.shopList").css({
          display:"block"
        }).siblings().css({display:"none"});

        // 重置门店类型
        $("#selShopType>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopType").children("span").html("全部门店");
        // 重置排序
        $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopSort").children("span").html("默认排序");
        //重置筛选
        $("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().removeClass("active");

        // alert(target.val());
        // alertMsg("确定","正在开发，敬请期待",function(){}); 
      });  

      //搜索记录
      $("#shopListPage>.searchShopPage>.searchHistoryList>.historyList").on("click","span",function(){
        var searchKey=$(this).html();
        getShopList(searchKey);
        $("#shopListPage>.shopList").css({
          display:"block"
        }).siblings().css({display:"none"});
        // 重置门店类型
        $("#selShopType>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopType").children("span").html("全部门店");
        // 重置排序
        $("#selShopSort>.subMenu>ul").children().first().addClass("active").siblings().removeClass("active");
        $("#selShopSort").children("span").html("默认排序");
        //重置筛选
        $("#selShopFiltrate>.subMenu>.filtrateBody>ul").children().removeClass("active");
      });

    });
      
  });

  //商铺服务页面
  horseApp.controller("shopServerCtrl",function($scope,$http,$location,$routeParams){
    $scope.height=vHeight;
    
    var token=sessionStorage['ponyUserToken'];

    //传入店铺ID
    var shopId=$routeParams.shopId;
    //传入店铺列表类型
    var shopType=$routeParams.shopType;

    //店铺数据
    $scope.shopDetail=null;
    //店铺合作项目列表
    $scope.shopCooperation=null;

    //保养服务列表
    $scope.upkeepList=[];
    //美容服务列表
    $scope.beautyList=[];
    //改装服务列表
    $scope.refitList=[];
    //安装服务列表
    $scope.installList=[];

    //各类别服务购买个数
    $scope.upkeepNum=0;
    $scope.beautyNum=0;
    $scope.refitNum=0;
    $scope.installNum=0;

    //保养服务依赖商品列表
    var upkeepRelyList=[];
    //美容服务依赖商品列表
    var beautyRelyList=[];
    //改装服务依赖商品列表
    var refitRelyList=[];
    //安装服务依赖商品列表
    var installRelyList=[];

    //依赖商品数组
    var relyCommodityArr=[];
    //总价合计数组
    var totalArr=[];

    //开始加载通讯
    commStart();
    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_userStore/getHome",
      data:"user_id="+ponyUserData.id+"&token="+token+"&longitude="+(deviceLocation.longitude?deviceLocation.longitude:"120.428666")+"&latitude="+(deviceLocation.latitude?deviceLocation.latitude:'36.164666')+"&store_id="+shopId
    }).success(function(data){
      commFinish();
      console.log(data);
      if(data.code=="E0000"){
        $scope.shopDetail=data.data.store;
        $scope.shopCooperation=data.data.service.slice(1);

        //服务项目分类
        for(var i=0;i<data.data.service_info.length;i++){
          var one=data.data.service_info[i];
          switch(one.service_type_id){
            case '2':
              $scope.upkeepList.push(one);
              break;
            case '3':
              $scope.beautyList.push(one);
              break;
            case '4':
              $scope.refitList.push(one);
              break;
            case '5':
              $scope.installList.push(one);
              break;
          }
        }


      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });


    //轮播定时器
    var bannerTimer=null;

    //跳转商铺详情页面
    $scope.toShopDetail=function(id){
      clearInterval(bannerTimer);
      $location.path("/shopDetail/"+id);
    }

    //跳转商铺异航页面
    $scope.toShopMap=function(lon,lat){
      clearInterval(bannerTimer);
      $location.path("/shopMap/"+lon+"/"+lat);
    }

    //页面返回
    $scope.toBack=function(){
      clearInterval(bannerTimer);
      $location.path("/shopList/"+shopType)
    }

    //从分类依赖商品列表返回
    $scope.toMain=function(){
      $("#shopServerPage>.serverList").css({display:"block"}).siblings().css({display:"none"});
    }

    //安装依赖商品保存
    $scope.installRelyCommodity=function(){
      //所依赖商品数组
      var commodityList=$("#shopServerPage>.installProductList>.goodsList>ul").children();
      //所依赖商品数组的服务id
      var commodityServerId=$("#shopServerPage>.installProductList>.goodsList>ul").children().first().attr("data-serviceid");
      relyCommodityArr[commodityServerId]=[];

      for(var i=0;i<commodityList.length;i++){
        var one=$(commodityList[i]);
        if(one.children(".buyNum").children(".inputNum").children(".itemBuyNum").html()>0){
          var item={
            id:one.attr("data-commentid"),
            no:one.children(".buyNum").children(".inputNum").children(".itemBuyNum").html()
          };
          relyCommodityArr[commodityServerId].push(item);
        }
      }

      //总价数据
      var total=0;
      var servicePrice=0;

      // console.log(relyCommodityArr,$("#shopServerPage>.installProductList>.footerSubmit>.typeTotal>span").html());
      //根据商品列表总价，如果没钱，那就是没有选择商品，那更新总价
      if($("#shopServerPage>.installProductList>.footerSubmit>.typeTotal>span").html()>0){
        //加上所选项目服务价格
        servicePrice=parseFloat($("#shopServerPage>.installProductList>.goodsList>ul").children().first().attr("data-serverprice"));
        var result= searchArr(totalArr,'id',commodityServerId);
        if(result.result){
          totalArr[result.index].total=parseFloat($("#shopServerPage>.installProductList>.footerSubmit>.typeTotal>span").html())+servicePrice;
        }else{
          totalArr.push({
            id:commodityServerId,
            total:parseFloat($("#shopServerPage>.installProductList>.footerSubmit>.typeTotal>span").html())+servicePrice
          });
        }

        //选中项目勾选
        var targetList=$("#shopServerPage>.serverList>.shopServerList>.serverItemList>.installList>ul").children();
        for(var i=0;i<targetList.length;i++){
          var one=$(targetList[i]);
          if(one.attr("data-serverid")==commodityServerId){
            if(!one.hasClass("active")){
              $scope.installNum++;
              // $scope.$apply();
            }
            one.addClass("active");
          }
        }

        // console.log(servicePrice);

      }else{
        //选中项目取消勾选
        var targetList=$("#shopServerPage>.serverList>.shopServerList>.serverItemList>.installList>ul").children();
        for(var i=0;i<targetList.length;i++){
          var one=$(targetList[i]);
          if(one.attr("data-serverid")==commodityServerId){
            if(one.hasClass("active")){
              $scope.installNum--;
              // $scope.$apply();
            }
            one.removeClass("active");
          }
        }
        // 查找合计数组中所在位置，删除
        var result=searchArr(totalArr,'id',commodityServerId);
        if(result.result){
          totalArr.splice(result.index,1);
        }

      }

      for(var i=0;i<totalArr.length;i++){
        var one=totalArr[i];
        total+=parseFloat(one.total);
      }
      $("#shopServerPage>.serverList>.statistics>ul>li.serverTotal>span").html(parseFloat(total).toFixed(2));
      //返回主页面
      $("#shopServerPage>.serverList").css({display:"block"}).siblings().css({display:"none"});

    }

    //保养依赖商品保存
    $scope.upkeepRelyCommodity=function(){
      //所依赖商品数组
      var commodityList=$("#shopServerPage>.upkeepProductList>.goodsList>ul").children();
      //所依赖商品数组的服务id
      var commodityServerId=$("#shopServerPage>.upkeepProductList>.goodsList>ul").children().first().attr("data-serviceid");
      relyCommodityArr[commodityServerId]=[];

      for(var i=0;i<commodityList.length;i++){
        var one=$(commodityList[i]);
        if(one.children(".buyNum").children(".inputNum").children(".itemBuyNum").html()>0){
          var item={
            id:one.attr("data-commentid"),
            no:one.children(".buyNum").children(".inputNum").children(".itemBuyNum").html()
          };
          relyCommodityArr[commodityServerId].push(item);
        }
      }

      //总价数据
      var total=0;
      var servicePrice=0;

      // console.log(relyCommodityArr,$("#shopServerPage>.upkeepProductList>.footerSubmit>.typeTotal>span").html());
      //根据商品列表总价，如果没钱，那就是没有选择商品，那更新总价
      if($("#shopServerPage>.upkeepProductList>.footerSubmit>.typeTotal>span").html()>0){
        //加上所选项目服务价格
        servicePrice=parseFloat($("#shopServerPage>.upkeepProductList>.goodsList>ul").children().first().attr("data-serverprice"));
        var result= searchArr(totalArr,'id',commodityServerId);
        if(result.result){
          totalArr[result.index].total=parseFloat($("#shopServerPage>.upkeepProductList>.footerSubmit>.typeTotal>span").html())+servicePrice;
        }else{
          totalArr.push({
            id:commodityServerId,
            total:parseFloat($("#shopServerPage>.upkeepProductList>.footerSubmit>.typeTotal>span").html())+servicePrice
          });
        }

        //选中项目勾选
        var targetList=$("#shopServerPage>.serverList>.shopServerList>.serverItemList>.upkeepList>ul").children();
        for(var i=0;i<targetList.length;i++){
          var one=$(targetList[i]);
          if(one.attr("data-serverid")==commodityServerId){
            if(!one.hasClass("active")){
              $scope.upkeepNum++;
              // $scope.$apply();
            }
            one.addClass("active");
          }
        }

        // console.log(servicePrice);

      }else{
        //选中项目取消勾选
        var targetList=$("#shopServerPage>.serverList>.shopServerList>.serverItemList>.upkeepList>ul").children();
        for(var i=0;i<targetList.length;i++){
          var one=$(targetList[i]);
          if(one.attr("data-serverid")==commodityServerId){
            if(one.hasClass("active")){
              $scope.upkeepNum--;
              // $scope.$apply();
            }
            one.removeClass("active");
          }
        }
        // 查找合计数组中所在位置，删除
        var result=searchArr(totalArr,'id',commodityServerId);
        if(result.result){
          totalArr.splice(result.index,1);
        }

      }

      for(var i=0;i<totalArr.length;i++){
        var one=totalArr[i];
        total+=parseFloat(one.total);
      }
      $("#shopServerPage>.serverList>.statistics>ul>li.serverTotal>span").html(parseFloat(total).toFixed(2));
      //返回主页面
      $("#shopServerPage>.serverList").css({display:"block"}).siblings().css({display:"none"});

    }    

    //美容依赖商品保存
    $scope.beautyRelyCommodity=function(){
      //所依赖商品数组
      var commodityList=$("#shopServerPage>.cleanProductList>.goodsList>ul").children();
      //所依赖商品数组的服务id
      var commodityServerId=$("#shopServerPage>.cleanProductList>.goodsList>ul").children().first().attr("data-serviceid");
      relyCommodityArr[commodityServerId]=[];

      for(var i=0;i<commodityList.length;i++){
        var one=$(commodityList[i]);
        if(one.children(".buyNum").children(".inputNum").children(".itemBuyNum").html()>0){
          var item={
            id:one.attr("data-commentid"),
            no:one.children(".buyNum").children(".inputNum").children(".itemBuyNum").html()
          };
          relyCommodityArr[commodityServerId].push(item);
        }
      }

      //总价数据
      var total=0;
      var servicePrice=0;

      // console.log(relyCommodityArr,$("#shopServerPage>.cleanProductList>.footerSubmit>.typeTotal>span").html());
      //根据商品列表总价，如果没钱，那就是没有选择商品，那更新总价
      if($("#shopServerPage>.cleanProductList>.footerSubmit>.typeTotal>span").html()>0){
        //加上所选项目服务价格
        servicePrice=parseFloat($("#shopServerPage>.cleanProductList>.goodsList>ul").children().first().attr("data-serverprice"));

        var result= searchArr(totalArr,'id',commodityServerId);
        if(result.result){
          totalArr[result.index].total=parseFloat($("#shopServerPage>.cleanProductList>.footerSubmit>.typeTotal>span").html())+servicePrice;
        }else{
          totalArr.push({
            id:commodityServerId,
            total:parseFloat($("#shopServerPage>.cleanProductList>.footerSubmit>.typeTotal>span").html())+servicePrice
          });
        }

        //选中项目勾选
        var targetList=$("#shopServerPage>.serverList>.shopServerList>.serverItemList>.cleanList>ul").children();
        for(var i=0;i<targetList.length;i++){
          var one=$(targetList[i]);
          if(one.attr("data-serverid")==commodityServerId){
            if(!one.hasClass("active")){
              $scope.beautyNum++;
              // $scope.$apply();
            }
            one.addClass("active");
          }
        }

        // console.log(servicePrice);

      }else{
        //选中项目取消勾选
        var targetList=$("#shopServerPage>.serverList>.shopServerList>.serverItemList>.cleanList>ul").children();
        for(var i=0;i<targetList.length;i++){
          var one=$(targetList[i]);
          if(one.attr("data-serverid")==commodityServerId){
            if(one.hasClass("active")){
              $scope.beautyNum--;
              // $scope.$apply();
            }
            one.removeClass("active");
          }
        }
        // 查找合计数组中所在位置，删除
        var result=searchArr(totalArr,'id',commodityServerId);
        if(result.result){
          totalArr.splice(result.index,1);
        }

      }

      for(var i=0;i<totalArr.length;i++){
        var one=totalArr[i];
        total+=parseFloat(one.total);
      }
      $("#shopServerPage>.serverList>.statistics>ul>li.serverTotal>span").html(parseFloat(total).toFixed(2));
      //返回主页面
      $("#shopServerPage>.serverList").css({display:"block"}).siblings().css({display:"none"});

    }

    //改装依赖商品保存
    $scope.refitRelyCommodity=function(){
      //所依赖商品数组
      var commodityList=$("#shopServerPage>.refitProductList>.goodsList>ul").children();
      //所依赖商品数组的服务id
      var commodityServerId=$("#shopServerPage>.refitProductList>.goodsList>ul").children().first().attr("data-serviceid");
      relyCommodityArr[commodityServerId]=[];

      for(var i=0;i<commodityList.length;i++){
        var one=$(commodityList[i]);
        if(one.children(".buyNum").children(".inputNum").children(".itemBuyNum").html()>0){
          var item={
            id:one.attr("data-commentid"),
            no:one.children(".buyNum").children(".inputNum").children(".itemBuyNum").html()
          };
          relyCommodityArr[commodityServerId].push(item);
        }
      }

      //总价数据
      var total=0;
      var servicePrice=0;

      // console.log(relyCommodityArr,$("#shopServerPage>.refitProductList>.footerSubmit>.typeTotal>span").html());
      //根据商品列表总价，如果没钱，那就是没有选择商品，那更新总价
      if($("#shopServerPage>.refitProductList>.footerSubmit>.typeTotal>span").html()>0){
        //加上所选项目服务价格
        servicePrice=parseFloat($("#shopServerPage>.refitProductList>.goodsList>ul").children().first().attr("data-serverprice"));

        var result= searchArr(totalArr,'id',commodityServerId);
        if(result.result){
          totalArr[result.index].total=parseFloat($("#shopServerPage>.refitProductList>.footerSubmit>.typeTotal>span").html())+servicePrice;
        }else{
          totalArr.push({
            id:commodityServerId,
            total:parseFloat($("#shopServerPage>.refitProductList>.footerSubmit>.typeTotal>span").html())+servicePrice
          });
        }

        //选中项目勾选
        var targetList=$("#shopServerPage>.serverList>.shopServerList>.serverItemList>.installList>ul").children();
        for(var i=0;i<targetList.length;i++){
          var one=$(targetList[i]);
          if(one.attr("data-serverid")==commodityServerId){
            if(!one.hasClass("active")){
              $scope.refitNum++;
              // $scope.$apply();
            }
            one.addClass("active");
          }
        }

        // console.log(servicePrice);

      }else{
        //选中项目取消勾选
        var targetList=$("#shopServerPage>.serverList>.shopServerList>.serverItemList>.installList>ul").children();
        for(var i=0;i<targetList.length;i++){
          var one=$(targetList[i]);
          if(one.attr("data-serverid")==commodityServerId){
            if(one.hasClass("active")){
              $scope.refitNum--;
              // $scope.$apply();
            }
            one.removeClass("active");
          }
        }
        // 查找合计数组中所在位置，删除
        var result=searchArr(totalArr,'id',commodityServerId);
        if(result.result){
          totalArr.splice(result.index,1);
        }

      }

      for(var i=0;i<totalArr.length;i++){
        var one=totalArr[i];
        total+=parseFloat(one.total);
      }
      $("#shopServerPage>.serverList>.statistics>ul>li.serverTotal>span").html(parseFloat(total).toFixed(2));
      //返回主页面
      $("#shopServerPage>.serverList").css({display:"block"}).siblings().css({display:"none"});

    }    

    //提交订单
    $scope.submitShopServerOrder=function(){
      // console.log(totalArr);
      // console.log(relyCommodityArr);
      
      //验证
      if(totalArr.length==0){
        alertMsg("确定","请选择要购买服务",function(){});
        return;
      };

      //根据数据规制数组
      var server=[];
      var list={};
      for(var i=0;i<totalArr.length;i++){
        var one=totalArr[i];
        server.push(one.id);
        if(relyCommodityArr[one.id]&&(relyCommodityArr[one.id].length>0)){
          list[one.id]=[];
          for(var item=0;item<relyCommodityArr[one.id].length;item++){
            var itemOne=relyCommodityArr[one.id][item];
            list[one.id].push(itemOne.id+"-"+itemOne.no);
          };
        }else{
          list[one.id]=null;
        }
        
      };

      
      // console.log(server,list);
      //提交数据
      //开始加载通讯
      commStart();
      $.ajax({
        type:"post",
        url:"http://180.76.243.205:8383/_API/_userService/confirmTemp",
        data:{
          user_id:ponyUserData.id,
          token:token,
          store_id:shopId,
          service_list:server,
          stock_list:list,
          service_types:0+($scope.upkeepNum>0?1:0)+($scope.beautyNum>0?1:0)+($scope.refitNum>0?1:0)+($scope.installList>0?1:0)
        },
        success:function(data){
          commFinish();
          console.log(data);
          
          if(data.code=="E0000"){
            var orderId=data.data.temp_order_id;
            // clearInterval(bannerTimer);
            // $location.path("/serverOrderDetail/"+orderId);
            // window.location.href="index.html#/serverOrderDetail/"+orderId;
            alertMsg("确定","下单成功",function(){
              clearInterval(bannerTimer);
              window.location.href="index.html#/serverOrderDetail/"+orderId;
            });
          }else if(data.code=="E0014"){
            alertMsg("确定",data.message,function(){
              clearInterval(bannerTimer);
              window.location.href="index.html#/login";
            });
          }else{
            // console.log(data.message);
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
      //页面从头
      $(document).scrollTop(0);

      //banner图片轮播
      bannerTimer=setInterval(function(){
        var num=$("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children(".active").index();
        var len=$("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children().length;
        if(num<(len-1)){
          $("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
          $("#shopServerPage>.serverList>.shopBanner>.imgListNum>ul").children(".active").next().addClass("active").siblings().removeClass("active");
        }else{
          $("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children().first().addClass("active").siblings().removeClass("active");
          $("#shopServerPage>.serverList>.shopBanner>.imgListNum>ul").children().first().addClass("active").siblings().removeClass("active");
        }  
      },10000);
      //banner图片点
      $("#shopServerPage>.serverList>.shopBanner>.imgListNum>ul").on("click","li",function(){
        var targetNum=$(this).index();
        $("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
        $("#shopServerPage>.serverList>.shopBanner>.imgListNum>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
      });
      //banner图片truch左右滑动事件
      var startX=null;
      $('#shopServerPage>.serverList>.shopBanner>').on('touchstart',function(e){
        startX = e.originalEvent.changedTouches[0].pageX;
      });
      $('#shopServerPage>.serverList>.shopBanner>').on('touchend',function(e){
        var endX = e.originalEvent.changedTouches[0].pageX;
        if(endX==startX){
          return;
        }
        var num=$("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children(".active").index();
        var len=$("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children().length;
        if(endX<startX){
          //向左 下一张
          if(num<(len-1)){
            $("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
            $("#shopServerPage>.serverList>.shopBanner>.imgListNum>ul").children(".active").next().addClass("active").siblings().removeClass("active");
          }else{
            $("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children().first().addClass("active").siblings().removeClass("active");
            $("#shopServerPage>.serverList>.shopBanner>.imgListNum>ul").children().first().addClass("active").siblings().removeClass("active");
          }  
        }else{
          //向右 上一张
          if(num>0){
            $("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
            $("#shopServerPage>.serverList>.shopBanner>.imgListNum>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
          }else{
            $("#shopServerPage>.serverList>.shopBanner>.imgList>ul").children().last().addClass("active").siblings().removeClass("active");
            $("#shopServerPage>.serverList>.shopBanner>.imgListNum>ul").children().last().addClass("active").siblings().removeClass("active");
          }
        }
      });

      // 服务类型列表切换
      $("#shopServerPage>.serverList>.shopServerList>.serverTypeList>ul").on("click","li",function(){
        var target=$(this);
        target.addClass("active").siblings().removeClass("active");
        $("#shopServerPage>.serverList>.shopServerList>.serverItemList").children().eq(target.index()).addClass("active").siblings().removeClass("active");
      });

      // ***********************
      //保养服务项目
      $("#shopServerPage>.serverList>.shopServerList>.serverItemList>.upkeepList").on("click",".itemTit",function(){
        //所有的项目要对其是否有依赖商品进行判断，有则进行依赖商品选择页面（商品选择完成后会对他的金额进行判断，为0的话不对该服务进行勾选，否则勾选），没有则对其本身进行判断来进行勾选
        var target=$(this).parent();
        console.log(target.attr("data-serverid"),target.attr("data-arrindex"));
        //所选择的服务项目ID
        var serverId=target.attr("data-serverid");
        // 服务项目所在数组的下标
        var serverIndex=target.attr("data-arrindex");
        // 服务项目服务价格
        var serverPrice=target.attr("data-serverprice");

        var subTotal=0;

        if($scope.upkeepList[serverIndex].stock_info&&$scope.upkeepList[serverIndex].stock_info.length){
          //有依赖商品
          // 跳转依赖商品列表选取页面
          $("#shopServerPage>.upkeepProductList").css({display:"block"}).siblings().css({display:"none"});

          upkeepRelyList=$scope.upkeepList[serverIndex].stock_info;
          var html="";
          for(var i=0;i<upkeepRelyList.length;i++){
            var one=upkeepRelyList[i];
            //当前库存商品数量小于1，不显示
            if(one.amount<1){
              continue;
            }
            html+="<li class='item' data-commentid='"+one.id+"' data-serviceid='"+serverId+"' data-itemprice='"+one.price+"' data-serverprice='"+serverPrice+"'>";
            html+="<div class='goodsInfo'><div class='goodsImg'><img src='"+one.img_url+"'></div>";
            html+="<div class='goodsMsg'><h4>"+one.name+"</h4><p class='inventory'>库存：<span>"+one.amount+"</span></p><p class='price'>￥<span>"+one.price+"</span></p></div></div>";
            html+="<div class='buyNum'><label>购买数量：</label>";
            html+="<div class='inputNum' data-maxnum='"+one.amount+"'><span class='itemBuyNumMinus fa fa-minus'></span>";
            //是否有上次选择过的值，赋值与求和
            if(relyCommodityArr[serverId]){
              var result=searchArr(relyCommodityArr[serverId],'id',one.id);
              if(result.result){
                html+="<span class='itemBuyNum'>"+relyCommodityArr[serverId][result.index].no+"</span>";
                subTotal+=(one.price*relyCommodityArr[serverId][result.index].no);
              }else{
                html+="<span class='itemBuyNum'>0</span>";
              }
            }else{
              html+="<span class='itemBuyNum'>0</span>";
            }
            html+="<span class='itemBuyNumPlus fa fa-plus'></span></div></div></li>";
          }
          $("#shopServerPage>.upkeepProductList>.goodsList>ul").html(html);

          $("#shopServerPage>.upkeepProductList>.footerSubmit>.typeTotal>span").html(subTotal.toFixed(2));
        }else{
          //没有依赖商品
          if(target.hasClass("active")){
            target.removeClass("active");
            $scope.upkeepNum--;

            // 查找合计数组中所在位置，删除
            var result=searchArr(totalArr,'id',serverId);
            if(result.result){
              totalArr.splice(result.index,1);
            }
          }else{
            target.addClass("active");
            $scope.upkeepNum++;
            
            totalArr.push({
              id:serverId,
              total:serverPrice
            });
          }

          //总价数据
          var total=0;

          for(var i=0;i<totalArr.length;i++){
            var one=totalArr[i];
            total+=parseFloat(one.total);
          }
          $("#shopServerPage>.serverList>.statistics>ul>li.serverTotal>span").html(parseFloat(total).toFixed(2));
        }


        $scope.$apply();
      });

      //保养服务依赖商品数量减少
      $("#shopServerPage>.upkeepProductList>.goodsList>ul").on("click",".itemBuyNumMinus",function(){
        // 当前商品数量
        var targetNum=$(this).next().html();
        // 当前商品单价
        var targetPrice=parseFloat($(this).parent().parent().parent().attr("data-itemprice")).toFixed(2);
        // 当前总价
        var subTotal=parseFloat($("#shopServerPage>.upkeepProductList>.footerSubmit>.typeTotal>span").html()).toFixed(2);
        if(targetNum>0){
          targetNum--;
          $(this).next().html(targetNum);
          $("#shopServerPage>.upkeepProductList>.footerSubmit>.typeTotal>span").html((subTotal-targetPrice).toFixed(2));
        }
      });

      //保养服务依赖商品数量增加
      $("#shopServerPage>.upkeepProductList>.goodsList>ul").on("click",".itemBuyNumPlus",function(){
        // 当前商品数量
        var targetNum=$(this).prev().html();
        //当前商品最大库存
        var maxNum=$(this).parent().attr("data-maxnum");
        // 当前商品单价
        var targetPrice=parseFloat($(this).parent().parent().parent().attr("data-itemprice")).toFixed(2);
        // 当前总价
        var subTotal=parseFloat($("#shopServerPage>.upkeepProductList>.footerSubmit>.typeTotal>span").html()).toFixed(2);
        if(parseInt(targetNum)<parseInt(maxNum)){
          targetNum++;
        }else{
          alertMsg("确定","已到当前最大库存商品数量",function(){});
          return;
        }
        $(this).prev().html(targetNum);
        $("#shopServerPage>.upkeepProductList>.footerSubmit>.typeTotal>span").html((parseFloat(subTotal)+parseFloat(targetPrice)).toFixed(2));
      });

      // ***********************
      //美容清洗服务项目
      $("#shopServerPage>.serverList>.shopServerList>.serverItemList>.cleanList").on("click",".itemTit",function(){
        //所有的项目要对其是否有依赖商品进行判断，有则进行依赖商品选择页面（商品选择完成后会对他的金额进行判断，为0的话不对该服务进行勾选，否则勾选），没有则对其本身进行判断来进行勾选
        var target=$(this).parent();
        console.log(target.attr("data-serverid"),target.attr("data-arrindex"));
        //所选择的服务项目ID
        var serverId=target.attr("data-serverid");
        // 服务项目所在数组的下标
        var serverIndex=target.attr("data-arrindex");
        // 服务项目服务价格
        var serverPrice=target.attr("data-serverprice");
        
        var subTotal=0;


        if($scope.beautyList[serverIndex].stock_info&&$scope.beautyList[serverIndex].stock_info.length){
          //有依赖商品
          // 跳转依赖商品列表选取页面
          $("#shopServerPage>.cleanProductList").css({display:"block"}).siblings().css({display:"none"});

          beautyRelyList=$scope.beautyList[serverIndex].stock_info;
          var html="";
          for(var i=0;i<beautyRelyList.length;i++){
            var one=beautyRelyList[i];
            //当前库存商品数量小于1，不显示
            if(one.amount<1){
              continue;
            }
            html+="<li class='item' data-commentid='"+one.id+"' data-serviceid='"+serverId+"' data-itemprice='"+one.price+"' data-serverprice='"+serverPrice+"'>";
            html+="<div class='goodsInfo'><div class='goodsImg'><img src='"+one.img_url+"'></div>";
            html+="<div class='goodsMsg'><h4>"+one.name+"</h4><p class='inventory'>库存：<span>"+one.amount+"</span></p><p class='price'>￥<span>"+one.price+"</span></p></div></div>";
            html+="<div class='buyNum'><label>购买数量：</label>";
            html+="<div class='inputNum' data-maxnum='"+one.amount+"'><span class='itemBuyNumMinus fa fa-minus'></span>";
            //是否有上次选择过的值，赋值与求和
            if(relyCommodityArr[serverId]){
              var result=searchArr(relyCommodityArr[serverId],'id',one.id);
              if(result.result){
                html+="<span class='itemBuyNum'>"+relyCommodityArr[serverId][result.index].no+"</span>";
                subTotal+=(one.price*relyCommodityArr[serverId][result.index].no);
              }else{
                html+="<span class='itemBuyNum'>0</span>";
              }
            }else{
              html+="<span class='itemBuyNum'>0</span>";
            }
            html+="<span class='itemBuyNumPlus fa fa-plus'></span></div></div></li>";
          }
          $("#shopServerPage>.cleanProductList>.goodsList>ul").html(html);

          $("#shopServerPage>.cleanProductList>.footerSubmit>.typeTotal>span").html(subTotal.toFixed(2));
        }else{
          //没有依赖商品
          if(target.hasClass("active")){
            target.removeClass("active");
            $scope.beautyNum--;

            // 查找合计数组中所在位置，删除
            var result=searchArr(totalArr,'id',serverId);
            if(result.result){
              totalArr.splice(result.index,1);
            }
          }else{
            target.addClass("active");
            $scope.beautyNum++;
            
            totalArr.push({
              id:serverId,
              total:serverPrice
            });
          }

          //总价数据
          var total=0;

          for(var i=0;i<totalArr.length;i++){
            var one=totalArr[i];
            total+=parseFloat(one.total);
          }
          $("#shopServerPage>.serverList>.statistics>ul>li.serverTotal>span").html(parseFloat(total).toFixed(2));
        }
        $scope.$apply();
      });

      //美容清洗服务依赖商品数量减少
      $("#shopServerPage>.cleanProductList>.goodsList>ul").on("click",".itemBuyNumMinus",function(){
        // 当前商品数量
        var targetNum=$(this).next().html();
        // 当前商品单价
        var targetPrice=parseFloat($(this).parent().parent().parent().attr("data-itemprice")).toFixed(2);
        // 当前总价
        var subTotal=parseFloat($("#shopServerPage>.cleanProductList>.footerSubmit>.typeTotal>span").html()).toFixed(2);
        if(targetNum>0){
          targetNum--;
          $(this).next().html(targetNum);
          $("#shopServerPage>.cleanProductList>.footerSubmit>.typeTotal>span").html((subTotal-targetPrice).toFixed(2));
        }
      });

      //美容清洗服务依赖商品数量增加
      $("#shopServerPage>.cleanProductList>.goodsList>ul").on("click",".itemBuyNumPlus",function(){
        // 当前商品数量
        var targetNum=$(this).prev().html();
        //当前商品最大库存
        var maxNum=$(this).parent().attr("data-maxnum");
        // 当前商品单价
        var targetPrice=parseFloat($(this).parent().parent().parent().attr("data-itemprice")).toFixed(2);
        // 当前总价
        var subTotal=parseFloat($("#shopServerPage>.cleanProductList>.footerSubmit>.typeTotal>span").html()).toFixed(2);
        if(parseInt(targetNum)<parseInt(maxNum)){
          targetNum++;
        }else{
          alertMsg("确定","已到当前最大库存商品数量",function(){});
          return;
        }
        $(this).prev().html(targetNum);
        $("#shopServerPage>.cleanProductList>.footerSubmit>.typeTotal>span").html((parseFloat(subTotal)+parseFloat(targetPrice)).toFixed(2));
      });

      // ***********************
      //安装服务项目
      $("#shopServerPage>.serverList>.shopServerList>.serverItemList>.installList").on("click",".itemTit",function(){
        //所有的项目要对其是否有依赖商品进行判断，有则进行依赖商品选择页面（商品选择完成后会对他的金额进行判断，为0的话不对该服务进行勾选，否则勾选），没有则对其本身进行判断来进行勾选
        var target=$(this).parent();

        console.log(target.attr("data-serverid"),target.attr("data-arrindex"));
        //所选择的服务项目ID
        var serverId=target.attr("data-serverid");
        // 服务项目所在数组的下标
        var serverIndex=target.attr("data-arrindex");
        // 服务项目服务价格
        var serverPrice=target.attr("data-serverprice");

        var subTotal=0;

        if($scope.installList[serverIndex].stock_info&&$scope.installList[serverIndex].stock_info.length){
          //有依赖商品
          // 跳转依赖商品列表选取页面
          $("#shopServerPage>.installProductList").css({display:"block"}).siblings().css({display:"none"});

          installRelyList=$scope.installList[serverIndex].stock_info;
          var html="";
          for(var i=0;i<installRelyList.length;i++){
            var one=installRelyList[i];
            //当前库存商品数量小于1，不显示
            if(one.amount<1){
              continue;
            }
            html+="<li class='item' data-commentid='"+one.id+"' data-serviceid='"+serverId+"' data-itemprice='"+one.price+"' data-serverprice='"+serverPrice+"'>";
            html+="<div class='goodsInfo'><div class='goodsImg'><img src='"+one.img_url+"'></div>";
            html+="<div class='goodsMsg'><h4>"+one.name+"</h4><p class='inventory'>库存：<span>"+one.amount+"</span></p><p class='price'>￥<span>"+one.price+"</span></p></div></div>";
            html+="<div class='buyNum'><label>购买数量：</label>";
            html+="<div class='inputNum' data-maxnum='"+one.amount+"'><span class='itemBuyNumMinus fa fa-minus'></span>";
            //是否有上次选择过的值，赋值与求和
            if(relyCommodityArr[serverId]){
              var result=searchArr(relyCommodityArr[serverId],'id',one.id);
              if(result.result){
                html+="<span class='itemBuyNum'>"+relyCommodityArr[serverId][result.index].no+"</span>";
                subTotal+=(one.price*relyCommodityArr[serverId][result.index].no);
              }else{
                html+="<span class='itemBuyNum'>0</span>";
              }
            }else{
              html+="<span class='itemBuyNum'>0</span>";
            }
            html+="<span class='itemBuyNumPlus fa fa-plus'></span></div></div></li>";
          }
          $("#shopServerPage>.installProductList>.goodsList>ul").html(html);

          $("#shopServerPage>.installProductList>.footerSubmit>.typeTotal>span").html(subTotal.toFixed(2));

        }else{
          //没有依赖商品
          if(target.hasClass("active")){
            target.removeClass("active");
            $scope.installNum--;

            // 查找合计数组中所在位置，删除
            var result=searchArr(totalArr,'id',serverId);
            if(result.result){
              totalArr.splice(result.index,1);
            }
          }else{
            target.addClass("active");
            $scope.installNum++;
            
            totalArr.push({
              id:serverId,
              total:serverPrice
            });
          }

          //总价数据
          var total=0;

          for(var i=0;i<totalArr.length;i++){
            var one=totalArr[i];
            total+=parseFloat(one.total);
          }
          $("#shopServerPage>.serverList>.statistics>ul>li.serverTotal>span").html(parseFloat(total).toFixed(2));
        }



        $scope.$apply();
      });

      //安装服务依赖商品数量减少
      $("#shopServerPage>.installProductList>.goodsList>ul").on("click",".itemBuyNumMinus",function(){
        // 当前商品数量
        var targetNum=$(this).next().html();
        // 当前商品单价
        var targetPrice=parseFloat($(this).parent().parent().parent().attr("data-itemprice")).toFixed(2);
        // 当前总价
        var subTotal=parseFloat($("#shopServerPage>.installProductList>.footerSubmit>.typeTotal>span").html()).toFixed(2);
        if(targetNum>0){
          targetNum--;
          $(this).next().html(targetNum);
          $("#shopServerPage>.installProductList>.footerSubmit>.typeTotal>span").html((subTotal-targetPrice).toFixed(2));
        }
      });

      //安装服务依赖商品数量增加
      $("#shopServerPage>.installProductList>.goodsList>ul").on("click",".itemBuyNumPlus",function(){
        // 当前商品数量
        var targetNum=$(this).prev().html();
        //当前商品最大库存
        var maxNum=$(this).parent().attr("data-maxnum");
        // console.log(maxNum);
        // 当前商品单价
        var targetPrice=parseFloat($(this).parent().parent().parent().attr("data-itemprice")).toFixed(2);
        // 当前总价
        var subTotal=parseFloat($("#shopServerPage>.installProductList>.footerSubmit>.typeTotal>span").html()).toFixed(2);
        if(parseInt(targetNum)<parseInt(maxNum)){
          targetNum++;
        }else{
          alertMsg("确定","已到当前最大库存商品数量",function(){});
          return;
        }
        $(this).prev().html(targetNum);
        $("#shopServerPage>.installProductList>.footerSubmit>.typeTotal>span").html((parseFloat(subTotal)+parseFloat(targetPrice)).toFixed(2));
      });

      // ***********************
      //改装服务项目
      $("#shopServerPage>.serverList>.shopServerList>.serverItemList>.refitList").on("click",".itemTit",function(){
        //所有的项目要对其是否有依赖商品进行判断，有则进行依赖商品选择页面（商品选择完成后会对他的金额进行判断，为0的话不对该服务进行勾选，否则勾选），没有则对其本身进行判断来进行勾选
        var target=$(this).parent();

        console.log(target.attr("data-serverid"),target.attr("data-arrindex"));
        //所选择的服务项目ID
        var serverId=target.attr("data-serverid");
        // 服务项目所在数组的下标
        var serverIndex=target.attr("data-arrindex");
        // 服务项目服务价格
        var serverPrice=target.attr("data-serverprice");
        
        var subTotal=0;


        if($scope.refitList[serverIndex].stock_info&&$scope.refitList[serverIndex].stock_info.length){
          //有依赖商品
          // 跳转依赖商品列表选取页面
          $("#shopServerPage>.refitProductList").css({display:"block"}).siblings().css({display:"none"});

          refitRelyList=$scope.refitList[serverIndex].stock_info;
          var html="";
          for(var i=0;i<refitRelyList.length;i++){
            var one=refitRelyList[i];
            //当前库存商品数量小于1，不显示
            if(one.amount<1){
              continue;
            }
            html+="<li class='item' data-commentid='"+one.id+"' data-serviceid='"+serverId+"' data-itemprice='"+one.price+"' data-serverprice='"+serverPrice+"'>";
            html+="<div class='goodsInfo'><div class='goodsImg'><img src='"+one.img_url+"'></div>";
            html+="<div class='goodsMsg'><h4>"+one.name+"</h4><p class='inventory'>库存：<span>"+one.amount+"</span></p><p class='price'>￥<span>"+one.price+"</span></p></div></div>";
            html+="<div class='buyNum'><label>购买数量：</label>";
            html+="<div class='inputNum' data-maxnum='"+one.amount+"'><span class='itemBuyNumMinus fa fa-minus'></span>";
            //是否有上次选择过的值，赋值与求和
            if(relyCommodityArr[serverId]){
              var result=searchArr(relyCommodityArr[serverId],'id',one.id);
              if(result.result){
                html+="<span class='itemBuyNum'>"+relyCommodityArr[serverId][result.index].no+"</span>";
                subTotal+=(one.price*relyCommodityArr[serverId][result.index].no);
              }else{
                html+="<span class='itemBuyNum'>0</span>";
              }
            }else{
              html+="<span class='itemBuyNum'>0</span>";
            }
            html+="<span class='itemBuyNumPlus fa fa-plus'></span></div></div></li>";
          }
          $("#shopServerPage>.refitProductList>.goodsList>ul").html(html);

          $("#shopServerPage>.refitProductList>.footerSubmit>.typeTotal>span").html(subTotal.toFixed(2));
        }else{
          //没有依赖商品
          if(target.hasClass("active")){
            target.removeClass("active");
            $scope.refitNum--;

            // 查找合计数组中所在位置，删除
            var result=searchArr(totalArr,'id',serverId);
            if(result.result){
              totalArr.splice(result.index,1);
            }
          }else{
            target.addClass("active");
            $scope.refitNum++;
            
            totalArr.push({
              id:serverId,
              total:serverPrice
            });
          }

          //总价数据
          var total=0;

          for(var i=0;i<totalArr.length;i++){
            var one=totalArr[i];
            total+=parseFloat(one.total);
          }
          $("#shopServerPage>.serverList>.statistics>ul>li.serverTotal>span").html(parseFloat(total).toFixed(2));
        }


        $scope.$apply();
      });

      //改装服务依赖商品数量减少
      $("#shopServerPage>.refitProductList>.goodsList>ul").on("click",".itemBuyNumMinus",function(){
        // 当前商品数量
        var targetNum=$(this).next().html();
        // 当前商品单价
        var targetPrice=parseFloat($(this).parent().parent().parent().attr("data-itemprice")).toFixed(2);
        // 当前总价
        var subTotal=parseFloat($("#shopServerPage>.refitProductList>.footerSubmit>.typeTotal>span").html()).toFixed(2);
        if(targetNum>0){
          targetNum--;
          $(this).next().html(targetNum);
          $("#shopServerPage>.refitProductList>.footerSubmit>.typeTotal>span").html((subTotal-targetPrice).toFixed(2));
        }
      });

      //改装服务依赖商品数量增加
      $("#shopServerPage>.refitProductList>.goodsList>ul").on("click",".itemBuyNumPlus",function(){
        // 当前商品数量
        var targetNum=$(this).prev().html();
        //当前商品最大库存
        var maxNum=$(this).parent().attr("data-maxnum");
        // 当前商品单价
        var targetPrice=parseFloat($(this).parent().parent().parent().attr("data-itemprice")).toFixed(2);
        // 当前总价
        var subTotal=parseFloat($("#shopServerPage>.refitProductList>.footerSubmit>.typeTotal>span").html()).toFixed(2);
        if(parseInt(targetNum)<parseInt(maxNum)){
          targetNum++;
        }else{
          alertMsg("确定","已到当前最大库存商品数量",function(){});
          return;
        }
        $(this).prev().html(targetNum);
        $("#shopServerPage>.refitProductList>.footerSubmit>.typeTotal>span").html((parseFloat(subTotal)+parseFloat(targetPrice)).toFixed(2));
      });

    });

  });

  //商铺服务订单详情页面(补充订单数据  联系人，电话，时间)
  horseApp.controller("serverOrderDetailCtrl",function($scope,$location,$http,$routeParams){
    $scope.height=vHeight;
    
    var token=sessionStorage['ponyUserToken'];
    
    //传入临时订单ID
    var orderId=$routeParams.orderId;

    //订单数据 
    $scope.orderDetail=null;

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_userService/confirmContact",
      data:"user_id="+ponyUserData.id+"&token="+token+"&temp_order_id="+orderId
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        $scope.orderDetail=data.data;
      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });

    //返回按钮
    $scope.toBack=function(){
      window.history.back(-1);
    } 

    //提交订单
    $scope.submitOrder=function(){
      //联系人
      var userName=$("#ponyServerOrderUserName").val();
      //联系电话
      var userTel=$("#ponyServerOrderUserTel").val();
      //预约时间
      var userTime=$("#orderReserveTime").val();

      //验证信息
      if(!userName){
        alertMsg("确定","请输入您的联系人",function(){});
        return;
      }
      if(!userTel){
        alertMsg("确定","请输入您的联系电话",function(){});
        return;
      }else if(!(/^1[34578]\d{9}$/.test(userTel))){
        alertMsg("确定","请输入正确的联系电话",function(){});
        return;
      }
      if(!userTime){
        alertMsg("确定","请选择您的预约时间",function(){});
        return;
      }else if(Date.parse(new Date(userTime))+57600000<=new Date()){
        alertMsg("确定","请选择正确的预约时间",function(){});
        return;
      }

      //提交数据
      //开始加载通讯
      commStart();
      $http({
        method:"post",
        url:"http://180.76.243.205:8383/_API/_userService/submitTemp",
        data:"user_id="+ponyUserData.id+"&token="+token+"&temp_order_id="+orderId+"&name="+userName+"&phone="+userTel+"&appointment="+userTime
      }).success(function(data){
        commFinish();
        console.log(data);
        if(data.code=="E0000"){
          $location.path("/checkoutCounter/"+data.data.obj_id+"/"+data.data.trade_mode);
        }else if(data.code=="E0014"){
          alertMsg("确定",data.message,function(){
            window.location.href="index.html#/login";
          });
        }else{
          alertMsg("确定",data.message,function(){});
        }
      });



    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //订单预约时间
      $("#orderReserveTime").val(nowDateYear+"-"+(nowDateMonth>10?nowDateMonth:"0"+nowDateMonth)+"-"+(nowDateDay>10?nowDateDay:"0"+nowDateDay));
    });
  });

  //商铺详情页面
  horseApp.controller("shopDetailCtrl",function($scope,$location,$http,$routeParams){
    
    var token=sessionStorage["ponyUserToken"];

    // 传入店铺ID
    var shopId=$routeParams.shopId;

    //店铺信息
    $scope.shopDetail=null;
    //店铺合作项目
    $scope.shopCooperation=null;
    //店铺评论
    $scope.shopComment=null;

    //获取数据
    $http({
      method:"post",
      url:"http://180.76.243.205:8383/_API/_userStore/getDetails",
      data:"user_id="+ponyUserData.id+"&token="+token+"&longitude="+(deviceLocation.longitude?deviceLocation.longitude:"120.428666")+"&latitude="+(deviceLocation.latitude?deviceLocation.latitude:'36.164666')+"&store_id="+shopId
    }).success(function(data){
      console.log(data);
      if(data.code=="E0000"){
        $scope.shopDetail=data.data.store;
        $scope.shopCooperation=data.data.service.slice(1);
        $scope.shopComment=data.data.commit;

      }else if(data.code=="E0014"){
        alertMsg("确定",data.message,function(){
          window.location.href="index.html#/login";
        });
      }else{
        console.log(data.message);
      }
    });

    //返回按钮
    $scope.toBack=function(){
      clearInterval(bannerTime);
      window.history.back(-1);
    }

    //跳转商铺异航页面
    $scope.toShopMap=function(lon,lat){
      clearInterval(bannerTime);
      $location.path("/shopMap/"+lon+"/"+lat);
    }

    //banner图片
    var bannerTime=null;

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //页面从头
      $(document).scrollTop(0);

      //banner图片轮播
      bannerTime=setInterval(function(){
        var num=$("#shopDetailPage>.shopBanner>.imgList>ul").children(".active").index();
        var len=$("#shopDetailPage>.shopBanner>.imgList>ul").children().length;
        if(num<(len-1)){
          $("#shopDetailPage>.shopBanner>.imgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
          $("#shopDetailPage>.shopBanner>.imgListNum>ul").children(".active").next().addClass("active").siblings().removeClass("active");
        }else{
          $("#shopDetailPage>.shopBanner>.imgList>ul").children().first().addClass("active").siblings().removeClass("active");
          $("#shopDetailPage>.shopBanner>.imgListNum>ul").children().first().addClass("active").siblings().removeClass("active");
        }  
      },10000);
      //banner图片点
      $("#shopDetailPage>.shopBanner>.imgListNum>ul").on("click","li",function(){
        var targetNum=$(this).index();
        $("#shopDetailPage>.shopBanner>.imgList>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
        $("#shopDetailPage>.shopBanner>.imgListNum>ul").children().eq(targetNum).addClass("active").siblings().removeClass("active");
      });
      //banner图片truch左右滑动事件
      var startX=null;
      $('#shopDetailPage>.shopBanner>').on('touchstart',function(e){
        startX = e.originalEvent.changedTouches[0].pageX;
      });
      $('#shopDetailPage>.shopBanner>').on('touchend',function(e){
        var endX = e.originalEvent.changedTouches[0].pageX;
        if(endX==startX){
          return;
        }
        var num=$("#shopDetailPage>.shopBanner>.imgList>ul").children(".active").index();
        var len=$("#shopDetailPage>.shopBanner>.imgList>ul").children().length;
        if(endX<startX){
          //向左 下一张
          if(num<(len-1)){
            $("#shopDetailPage>.shopBanner>.imgList>ul").children(".active").next().addClass("active").siblings().removeClass("active");
            $("#shopDetailPage>.shopBanner>.imgListNum>ul").children(".active").next().addClass("active").siblings().removeClass("active");
          }else{
            $("#shopDetailPage>.shopBanner>.imgList>ul").children().first().addClass("active").siblings().removeClass("active");
            $("#shopDetailPage>.shopBanner>.imgListNum>ul").children().first().addClass("active").siblings().removeClass("active");
          }  
        }else{
          //向右 上一张
          if(num>0){
            $("#shopDetailPage>.shopBanner>.imgList>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
            $("#shopDetailPage>.shopBanner>.imgListNum>ul").children(".active").prev().addClass("active").siblings().removeClass("active");
          }else{
            $("#shopDetailPage>.shopBanner>.imgList>ul").children().last().addClass("active").siblings().removeClass("active");
            $("#shopDetailPage>.shopBanner>.imgListNum>ul").children().last().addClass("active").siblings().removeClass("active");
          }
        }
      });


    });



  });

  //商铺导航页面
  horseApp.controller("shopMapCtrl",function($scope,$http,$routeParams,$location){
    $scope.height=vHeight;

    //传入店铺纬度，经度
    var shopLon=$routeParams.lon;
    var shopLat=$routeParams.lat;

    //返回按钮
    $scope.toBack=function(){
      window.history.back(-1);
    }

    //监听页面加载
    $scope.$watch("$viewContentLoaded",function(){
      //延时对地图进行加载
      setTimeout(function(){
        // 百度地图API功能
        var map = new BMap.Map("baiduMap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(deviceLocation.longitude, deviceLocation.latitude));  // 初始化地图,设置中心点坐标和地图级别
        //起点
        var p1 = new BMap.Point(deviceLocation.longitude,deviceLocation.latitude);
        // 终点
        var p2 = new BMap.Point(shopLon, shopLat);
        //画行车路线
        var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
        driving.search(p1, p2);
      },100);
    
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
    // console.log(btnArr,Object.prototype.toString.call(btnArr)=='[object Array]');
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

  //千位符
  function thousandSeparator(str){
    str=parseFloat(str).toFixed(2);
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

  //通讯load加载
  function commStart(){
    $(".commLoad").css("display","block");
  }
  function commFinish(){
    $(".commLoad").css("display","none");
  }
  //数组查询
  function searchArr(arr,key,val){
    for(var i=0;i<arr.length;i++){
      var one=arr[i];
      if(one[key]==val){
        return {result:true,index:i};
      }
    }
    return {result:false};
  }
  // if(searchArr(arr1,'id',7).result){console.log(111);}else{console.log(222);}

})();
