/**
 * 淘客相关的接口
 */
import ServerUtil from "./utils/ServerUtil";
import request from "umi-request";
import {TCategory} from "./model/tk/CategoryModel";
import {successResultHandle, tkDataToObject} from "./utils/ResultUtil";

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
     * 获取示例
     */
    public static getInstance(): TaokeApi {
        return this._instance ?? new TaokeApi()
    }


    /**
     * 获取超级大分类
     */
    async getCategorys(): Promise<TCategory[]> {
        return new Promise(resolve => {
            request(`${this.url}/categorys`).then(value => {
                successResultHandle<string>(value, data => {
                    resolve(tkDataToObject<TCategory[]>(data))
                })
            })
        })
    }

}

export default TaokeApi