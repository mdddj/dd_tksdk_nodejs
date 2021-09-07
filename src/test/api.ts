import DdTaokeSdk from "../index";
import {successResultHandle} from "../utils/ResultUtil";
import {User} from "../model/UserModel";
import TaokeApi from "../taoke";

const req = DdTaokeSdk.getInstance()
const tkApi = TaokeApi.getInstance()
req.host = 'http://localhost'
tkApi.host = 'http://localhost'

/// 登录接口测试
// req.login("admin", "123456").then(data => {
//     successResultHandle<string>(data, async value => {
//         const result = await req.getUserInfo(value)
//         successResultHandle<User>(result,data1 => {
//             console.log(data1)
//         })
//     })
// })


// /// 获取大分类
// tkApi.getCategorys().then(value => {
//     console.log(value)
// })