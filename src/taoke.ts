/**
 * 淘客相关的接口
 */
import ServerUtil from "./utils/ServerUtil";
import {TCategory} from "./model/tk/CategoryModel";
import {Result, successResultHandle, tkDataToObject} from "./utils/ResultUtil";
import {MeituanCouponParam} from "./model/param/MeituanCouponParam";
import {TMeituanData} from "./model/tk/MeituanData";
import {CarouselModel} from "./model/CarouselModel";
import {PageParam} from "./model/PageModel";
import {BrandListModel} from "./model/result/BrandListModel";
import {BrandDetailModel} from "./model/result/BrandDetailModel";
import {Product} from "./model/ProductModel";
import axios from "axios-miniprogram";
import {ProductListParam, ProductListResult} from "./model/ProductListParam";
const TAOKE_API = '/tkapi/api/v1/dtk/apis';


class TaokeApi {
    
    /**
     * 大淘客api
     */
    get url(): string {
        return `${this._host}${TAOKE_API}`
    }
    
    /**
     * 服务器地址,局部变量
     */
    _host: string | undefined
    
    /**
     * 对象实例
     */
    public static _instance: TaokeApi | undefined
    
    /**
     * 设置 服务器 host 地址
     * @param v 服务器地址,后面的请求将发送到这个地址获取,例子 [https://itbug.shop]
     */
    set host(v: string) {
        this._host = v
    }
    
    /**
     * 获取当前设置的服务器host地址
     */
    get host(): string {
        return this._host ?? ServerUtil.getInstance().host
    }
    
    /**
     * 私有化对象实例,只允许new一个对象,单例模式
     * @constructor
     * @private
     */
    private TaokeApi() {
    }
    
    /**
     * 封装通用请求函数
     * @param url   接口url
     * @param param 请求参数
     * @param taoke 是否为淘客api接口,默认为true,如果不是将直接使用url
     */
    async requestT<T>(url: string, param?: any, taoke?: boolean): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            let result: undefined | Result<string>
            let response = await axios.get<Result<string>>( `${(taoke ?? true) ? this.url : this._host}${url}`,{
                method: "GET",
                data: param
            })
            result = response.data
            if (result) {
                successResultHandle<string>(result, data => {
                    resolve(tkDataToObject<T>(data))
                }, message => {
                    console.log(message)
                })
            } else {
                console.log('返回为空')
            }
            
        })
    }
    
    /**
     * 获取请求实例
     */
    public static getInstance(): TaokeApi {
        return this._instance ?? new TaokeApi()
    }
    
    
    /**
     * 获取超级大分类
     */
    async getCategorys(): Promise<TCategory[]> {
        return this.requestT<TCategory[]>('/categorys')
    }
    
    
    /**
     * 获取美团推广链接
     * @param params    生成参数
     */
    async getMeituanCoupon(params: MeituanCouponParam): Promise<TMeituanData> {
        return this.requestT<TMeituanData>('/api/zhe/mt/tg',params,false)
    }
    
    /**
     * 获取轮播图列表
     */
    async getCarouselList(): Promise<CarouselModel[]> {
        return this.requestT<CarouselModel[]>('/carousel-list')
    }
    
    /**
     * 获取品牌列表
     * @param cid   品牌分类id
     * @param pageModel 分页数据
     */
    async getBrandList(cid: number, pageModel: PageParam): Promise<BrandListModel> {
        return this.requestT<BrandListModel>('/brand-list', Object.assign({cid}, pageModel))
    }
    
    /**
     * 查询品牌详情
     * @param brandId 品牌id
     * @param pageModel 分页数据
     */
    async getBrandDetail(brandId: string, pageModel: PageParam): Promise<BrandDetailModel> {
        return this.requestT<BrandDetailModel>('/brand-detail', Object.assign({brandId}, pageModel))
    }
    
    /**
     * 获取单品详情
     * @param id    大淘客商品id
     */
    async getProductById(id: number): Promise<Product> {
        return this.requestT<Product>('/detail', {id})
    }

    /**
     * 获取商品列表
     * @param params    请求参数
     */
    async getProductList(params: ProductListParam): Promise<ProductListResult> {
        return this.requestT<ProductListResult>('/goods', params)
    }


}


export default TaokeApi