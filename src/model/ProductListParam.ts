// 商品列表的请求参数
import {Product} from "./ProductModel";

export interface ProductListParam {
    brand?: string;
    brandIds?: string;
    cids?: string;
    commissionRateLowerLimit?: string;
    couponPriceLowerLimit?: string;
    freeshipRemoteDistrict?: string;
    goldSeller?: string;
    haitao?: string;
    juHuaSuan?: string;
    monthSalesLowerLimit?: string;
    pageId: number;
    pageSize?: string;
    pre?: string;
    preSale?: string;
    priceLowerLimit?: string;
    priceUpperLimit?: string;
    sort?: string;
    specialId?: string;
    subcid?: string;
    taoQiangGou?: string;
    tchaoshi?: string;
    tmall?: string;
}

export interface ProductListResult {
    list: Product[];
    totalNum: number;
    
}