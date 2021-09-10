export interface BrandListModel {
    lists:       BrandListItem[];
    pageSize:    number;
    currentPage: number;
    totalCount:  number;
}

export interface BrandListItem {
    brandName:         string;
    brandId:           number;
    maxDiscountAmount: number;
    goodsList:         BrandGoodsList[];
    brandFeatures:     string;
    brandLogo:         string;
    sales:             number;
    maxDiscount:       number;
}

export interface BrandGoodsList {
    commissionRate:        number;
    actualPrice:           number;
    goodsId:               string;
    discount:              number;
    video:                 string;
    originPrice:           number;
    title:                 string;
    couponId:              string;
    monthSales:            number;
    couponLink:            string;
    marketingMainPic:      string;
    couponStartTime:       Date;
    mainPic:               string;
    id:                    number;
    dTitle:                string;
    couponConditions:      string;
    dailySales:            number;
    couponTotalNum:        number;
    commissionType:        number;
    freeshipRemoteDistrct: number;
    couponEndTime:         Date;
    brandId:               string;
    couponReceiveNum:      number;
    specialText:           string[];
    couponPrice:           number;
    activityType:          number;
    cid:                   number;
    desc:                  string;
}
