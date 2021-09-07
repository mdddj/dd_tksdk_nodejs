import DdTaokeSdk from "../index";

/// 登录接口测试
DdTaokeSdk.getInstance().login("admin","123456").then(data=>{
  console.log(data)
})