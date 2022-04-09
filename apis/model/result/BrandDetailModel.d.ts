export interface BrandDetailModel {
    brandName: string;
    brandDesc: string;
    fansNum: number;
    totalNum: number;
    brandId: number;
    brandFeatures: string;
    list: BrandDetailGoodsItem[];
    pageId: string;
    brandLogo: string;
    sales: number;
}
export interface BrandDetailGoodsItem {
    commissionRate: number;
    actualPrice: number;
    goodsId: string;
    discount: number;
    video: string;
    originPrice: number;
    title: string;
    couponId: string;
    monthSales: number;
    couponLink: string;
    marketingMainPic: string;
    couponStartTime: Date;
    mainPic: string;
    id: number;
    dTitle: string;
    couponConditions: string;
    dailySales: number;
    couponTotalNum: number;
    commissionType: number;
    freeshipRemoteDistrct: number;
    couponEndTime: Date;
    brandId: string;
    couponReceiveNum: number;
    specialText: any[];
    couponPrice: number;
    activityType: number;
    cid: number;
    desc: string;
}
