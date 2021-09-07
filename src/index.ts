import ServerUtil from "./utils/ServerUtil";
import request from "umi-request";
import {Result} from "./utils/ResultUtil";
import {User} from "./model/UserModel";

/**
 * 接口访问类
 */
class DdTaokeSdk {

    _host: string | undefined

    set host(v: string) {
        this._host = v
    }

    get host(): string {
        return this._host ?? ServerUtil.getInstance().host
    }

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

    /**
     * 根据jwt token 获取用户资料
     *
     *
     *
     * @param token jwt token
     */
    async getUserInfo(token: string): Promise<Result<User>> {
        return request<Result<User>>(`${this.host}/api/get-user-by-token?token=${token}`)
    }


}

export default DdTaokeSdk