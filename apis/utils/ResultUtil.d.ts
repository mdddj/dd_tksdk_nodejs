import { RequestParamError } from "../model/RequestParamError";
import { AntdTableResultData } from "../model/PageModel";
export interface Page<T> {
    list: T[];
    page: PagerModel;
}
export interface Result<T> {
    state: number;
    message: string;
    data: T | undefined;
}
export interface PagerModel {
    total: number;
    currentPage: number;
    pageSize: number;
    maxPage: number;
    hasPrevious: boolean;
    paged: boolean;
}
/**
 * 判断请求是否成功
 * @param result  服务器返回的数据
 */
export declare function responseIsSuccess<T>(result: Result<T>): boolean;
/**
 * 当请求成功的时候处理函数
 * @param result    返回结果
 * @param success   成功执行方法 如果result.data 为null时不执行success方法
 * @param error 返回错误信息
 */
export declare function successResultHandle<T>(result: Result<T>, success: (data: T) => void, error?: (message: string) => void): void;
/**
 * 淘客数据转换 json string 字符串转对象
 * @param data  json字符串  Result.data 类型是json类型转成T
 */
export declare function tkDataToObject<T>(data: string): T;
/**
 * 简单处理服务器的消息
 * @param result  服务器返回的数据
 * @param success 操作成功返回的数据
 * @param showSuccessMessage 是否显示成功消息
 * @param error 操作失败的回调
 */
export declare function simpleHandleResultMessage<T>(result: Result<T>, success?: (data?: T) => void, showSuccessMessage?: boolean, error?: (params: RequestParamError[] | undefined) => void): Promise<void>;
/**
 * 使用实例
 const fetchDataList = async (params: any, _: any, __: any) => {
    const param = coverAntdPageParamModelToRequestParam(params);
    const result = await GetResourceCategoryList(param);
    return ParseResultToProTable<ResCategory>(result)  // <<<<<---------------这里
  }
 * @param result
 * @constructor
 */
export declare const ParseResultToProTable: <T>(result: Result<any>) => AntdTableResultData<T>;
/**
 *
 * 将查询参数转成对象类型
 *
 * 去除了 current 参数
 * 去除了value为空的参数
 *
 * 使用示例
 *  const fetchDataList = async (params: any, _: any, __: any) => {
    const param = coverAntdPageParamModelToRequestParam(params);
    const result = await GetResourceCategoryList(param,antdTableParamAsT(params)); // <<<<<---------------这里
    return ParseResultToProTable<ResCategory>(result);
  };
 *
 * @param params
 */
export declare const antdTableParamAsT: <T>(params: any) => T;
