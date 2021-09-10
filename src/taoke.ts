/**
 * 淘客相关的接口
 */
import ServerUtil from "./utils/ServerUtil";
import request from "umi-request";
import {TCategory} from "./model/tk/CategoryModel";
import {Result, successResultHandle, tkDataToObject} from "./utils/ResultUtil";
import {MeituanCouponParam} from "./model/param/MeituanCouponParam";
import {TMeituanData} from "./model/tk/MeituanData";
import {CarouselModel} from "./model/CarouselModel";
import {PageParam} from "./model/PageModel";
import {merge} from "lodash";
import {BrandListModel} from "./model/result/BrandListModel";
import {BrandDetailModel} from "./model/result/BrandDetailModel";

const TAOKE_API = '/tkapi/api/v1/dtk/apis';

class TaokeApi {
    
    get url(): string {
        return `${this._host}${TAOKE_API}`
    }
    
    _host: string | undefined
    public static _instance: TaokeApi | undefined
    
    set host(v: string) {
        this._host = v
    }
    
    get host(): string {
        return this._host ?? ServerUtil.getInstance().host
    }
    
    private TaokeApi() {
    }
    
    /**
     * 封装通用请求函数
     * @param url   接口url
     * @param param 请求参数
     */
    async requestT<T>(url: string, param?: any): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const result = await request<Result<string>>(`${this.url}${url}`, {
                method: 'GET',
                params: param
            })
            successResultHandle<string>(result, data => {
                resolve(tkDataToObject<T>(data))
            },message => {
                console.log(message)
            })
        })
    }
    
    /**
     * 获取示例
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
        return new Promise(async resolve => {
            const result = await request(`${this._host}/api/zhe/mt/tg`, {
                params
            })
            successResultHandle<string>(result, data => {
                resolve(tkDataToObject<TMeituanData>(data))
            })
        })
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
        return this.requestT<BrandListModel>('/brand-list', merge({cid}, pageModel))
    }
    
    /**
     * 查询品牌详情
     * @param brandId 品牌id
     * @param pageModel 分页数据
     */
    async getBrandDetail(brandId: string,pageModel: PageParam) :Promise<BrandDetailModel>{
        return this.requestT<BrandDetailModel>('/brand-detail',merge({brandId},pageModel))
    }
    
}


export default TaokeApi