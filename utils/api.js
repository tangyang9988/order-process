// 默认全部导出
import $http from "./config.js";
export default {
  // 报警列表
  alarmList(params) {
    return $http.get("/system/alarm/list", params);
  },
  // 输入意见
  // 报警列表
  approveAdvice(params) {
    return $http.put("/system/alarm/edit", params);
  },
  
  // 账密登陆
  // login(params) {
  //   // console.log(uni.getStorageSync('token'));
  //   return $http.post(" /system/login", params);
  // },
  // 获取用户信息
  // userInfo(params) {
  //   return $http.get("/api/sys/user/v1/current/detail", params);
  // },
  // 微信一键登录
  // wxLogin(params) {
  //   return $http.post("/api/sys/user/v1/wxLogin", params);
  // },
  // // 医院列表
  // hospitalList(params) {
  //   return $http.post("/api/hp/hospital/v1/nearHospital", params);
  // },
  // // 历史救援列表
  // historyList(params) {
  //   return $http.post("/api/ri/rescueInfo/v1/list", params);
  // },
  // // 历史救援详情信息
  // historyDetail(params) {
  //   return $http.post("/api/ri/rescueInfo/v1/detail", params);
  // },
  // // 救援进度
  // historySteps(params) {
  //   return $http.post("/api/sr/rescueStatusRelation/v1/list", params);
  // },

  // // 添加车主信息
  // evaluationAdd(params) {
  //   return $http.post("/api/ea/evaluation/v1/add", params);
  // },

  // // 救援评价
  // evaluationInfo(params) {
  //   return $http.post("/api/ea/evaluation/v1/add", params);
  // },

  // // 添加救援信息
  // planRoute(params) {
  //   return $http.post("/api/ri/rescueInfo/v1/add", params);
  // },
  // // 更新紧急定制路线
  // planRouteUpdate(params) {
  //   return $http.post("/api/planRoute/v1/update", params);
  // },
  // // 附件上传
  // upload(params) {
  //   return $http.post("/api/sys/attachment/v1/upload", params);
  // },

  // // 首页安全宣教
  // rgulationConfig(params) {
  //   return $http.post("/api/safeRegulationsConfig/v1/list", params);
  // },
  // // 首页安全宣教详情
  // rgulationConfigDetail(params) {
  //   return $http.post("/api/safeRegulationsConfig/v1/detail", params);
  // },
  // // 道路救援操作指引
  // parkingCarDetail(params) {
  //   return $http.post("/api/parkingCar/v1/detail", params);
  // },
  // // 车主信息
  // carOwnerDetail(params) {
  //   return $http.post("/api/carOwner/v1/detail", params);
  // },
  // // 添加道路救援信息
  // rescueInfoAdd(params) {
  //   return $http.post("/api/rescueInfo/v1/add", params);
  // },
  // // 添加车辆
  // carOwnerAdd(params) {
  //   return $http.post("/api/carOwner/v1/add", params);
  // },
  // // 道路救援信息详情
  // rescueInfoDetail(params) {
  //   return $http.post("/api/rescueInfo/v1/detail", params);
  // },
  // rescueInfoUpdate(params) {
  //   return $http.post("/api/rescueInfo/v1/update", params);
  // },
  // // 救援列表
  // rescueInfoList(params) {
  //   return $http.post("/api/rescueInfo/v1/list", params);
  // },
  // // 道路救援未结束记录
  // rescueInfoOver(params) {
  //   return $http.post("/api/rescueInfo/v1/getNotOver", params);
  // },
  // // 紧急路线列表
  // planRouteList(params) {
  //   return $http.post("/api/planRoute/v1/list", params);
  // },
  // login(params) {
  //    return $http.get('/api/v1/login',{params:params})
  // },
};
