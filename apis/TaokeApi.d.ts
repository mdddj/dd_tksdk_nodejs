import { TCategory } from "./model/tk/CategoryModel";
import { MeituanCouponParam } from "./model/param/MeituanCouponParam";
import { TMeituanData } from "./model/tk/MeituanData";
import { CarouselModel } from "./model/CarouselModel";
import { PageParam } from "./model/PageModel";
import { BrandListModel } from "./model/result/BrandListModel";
import { BrandDetailModel } from "./model/result/BrandDetailModel";
import { Product } from "./model/ProductModel";
import { ProductListParam, ProductListResult } from "./model/ProductListParam";
declare class TaokeApi {
    /**
     * 大淘客api
     */
    get url(): string;
    /**
     * 服务器地址,局部变量
     */
    _host: string | undefined;
    /**
     * 对象实例
     */
    static _instance: TaokeApi | undefined;
    /**
     * 设置 服务器 host 地址
     * @param v 服务器地址,后面的请求将发送到这个地址获取,例子 [https://itbug.shop]
     */
    set host(v: string);
    /**
     * 获取当前设置的服务器host地址
     */
    get host(): string;
    /**
     * 私有化对象实例,只允许new一个对象,单例模式
     * @constructor
     * @private
     */
    private TaokeApi;
    /**
     * 封装通用请求函数
     * @param url   接口url
     * @param param 请求参数
     * @param taoke 是否为淘客api接口,默认为true,如果不是将直接使用url
     */
    requestT<T>(url: string, param?: any, taoke?: boolean): Promise<T>;
    /**
     * 获取请求实例
     */
    static getInstance(): TaokeApi;
    /**
     * 获取超级大分类
     */
    getCategorys(): Promise<TCategory[]>;
    /**
     * 获取美团推广链接
     * @param params    生成参数
     */
    getMeituanCoupon(params: MeituanCouponParam): Promise<TMeituanData>;
    /**
     * 获取轮播图列表
     */
    getCarouselList(): Promise<CarouselModel[]>;
    /**
     * 获取品牌列表
     * @param cid   品牌分类id
     * @param pageModel 分页数据
     */
    getBrandList(cid: number, pageModel: PageParam): Promise<BrandListModel>;
    /**
     * 查询品牌详情
     * @param brandId 品牌id
     * @param pageModel 分页数据
     */
    getBrandDetail(brandId: string, pageModel: PageParam): Promise<BrandDetailModel>;
    /**
     * 获取单品详情
     * @param id    大淘客商品id
     */
    getProductById(id: number): Promise<Product>;
    /**
     * 获取商品列表
     * @param params    请求参数
     */
    getProductList(params: ProductListParam): Promise<ProductListResult>;
}
export default TaokeApi;
