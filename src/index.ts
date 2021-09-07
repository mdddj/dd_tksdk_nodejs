import ServerUtil from "./utils/ServerUtil";
import request, {RequestMethod} from "umi-request";
import {Result} from "./utils/ResultUtil";

/**
 * 接口访问类
 */
class DdTaokeSdk {


    host: string = ServerUtil.getInstance().host

    /**
     * 私有化类构造
     * @constructor
     * @private
     */
    private DdTaokeSdk() {
    }

    public static _instance: DdTaokeSdk

    /**
     * 接口实例
     */
    public static getInstance(): DdTaokeSdk {
        return this._instance ?? new DdTaokeSdk()
    }

    /**
     * 用户登录方法
     * @param loginNumber   登录名
     * @param password  密码
     */
    async login(loginNumber: string, password: string): Promise<Result<string>> {
        return request<Result<string>>(`${this.host}/api/user/login`, {
            method: 'POST',
            data: {loginNumber, password},
        });
    }


}

export default DdTaokeSdk