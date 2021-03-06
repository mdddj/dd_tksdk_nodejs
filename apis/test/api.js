"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TaokeApi_1 = __importDefault(require("../TaokeApi"));
var DdServerApiByWeb_1 = __importDefault(require("../DdServerApiByWeb"));
var tkApi = TaokeApi_1.default.getInstance();
tkApi.host = 'https://itbug.shop';
var blogApi = DdServerApiByWeb_1.default.getInstance();
blogApi.host = 'https://itbug.shop';
/// 登录接口测试
// req.login("admin", "123456").then(data => {
//     successResultHandle<string>(data, async value => {
//         const result = await req.getUserInfo(value)
//         successResultHandle<User>(result,data1 => {
//             console.log(data1)
//         })
//     })
// })
/// 获取大分类
// tkApi.getCategorys().then(value => {
//     console.log(value[0].cid)
// })
/// 获取美团推广链接
// tkApi.getMeituanCoupon({actId: '2', linkType: '1', miniCode: '1'}).then(r => {
//     console.log(r)
// })
// 获取博客列表
// req.getBlogList(1,4).then(value => {
//     console.log(value)
// })
// /// 获取轮播图列表
//
// tkApi.getCarouselList().then(value => {
//     console.log(value)
// })
/// 获取品牌列表
// tkApi.getBrandList(6, {pageId: 1, pageSize: 20}).then(value => {
//     console.log(value)
// })
/// 获取品牌详情
// tkApi.getBrandDetail('66590', {pageSize: 20, pageId: 1}).then(value => {
//     console.log(value)
// })
// tkApi.getProductById(35470316).then(value => {
//     let util  =new ProductUtil()
//     let images = util.detailCovert(value.detailPics)
//     console.log(images)
//
// })
//
// blogApi.getPics(1).then(value => {
//     console.log(value)
// })
