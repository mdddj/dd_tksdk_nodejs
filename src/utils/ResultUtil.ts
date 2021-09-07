import {RequestParamError} from "../model/RequestParamError";
import {AntdTableResultData} from "../model/PageModel";

export interface Page<T> {
  list: T[];
  page: PagerModel;
}

export interface Result<T> {
  state: number;
  message: string;
  data: T;
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
export function responseIsSuccess<T>(result: Result<T>) {
  return result.state === 200;
}

/**
 * 简单处理服务器的消息
 * @param result  服务器返回的数据
 * @param success 操作成功返回的数据
 * @param showSuccessMessage 是否显示成功消息
 * @param error 操作失败的回调
 */
export async function simpleHandleResultMessage<T>(
  result: Result<T>,
  success?: (data: T) => void,
  showSuccessMessage?: boolean,
  error?: (params: RequestParamError[] | undefined) => void,
) {
  if (responseIsSuccess<T>(result)) {
    success && success(result.data);
  } else {
    if (result.state == 505) {
      // 请求参数错误
      const data = result.data as any;
      const paramsError = data as RequestParamError[];
      error?.(paramsError);
    }
    error?.(undefined);
  }
}

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
export const ParseResultToProTable = <T>(result: Result<any>): AntdTableResultData<T> => {
  return {
    data: result.data.list as T[],
    success: responseIsSuccess(result),
    total: result.data.page.total,
    current: result.data.page.currentPage,
  } as AntdTableResultData<T>;
};

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
export const antdTableParamAsT = <T>(params: any) => {
  if (params.current) {
    delete params.current;
  }
  if (params.pageSize) {
    delete params.pageSize;
  }
  for (let key in params) {
    if (params[key] === '') {
      delete params[key];
    }
  }
  return params as T;
};