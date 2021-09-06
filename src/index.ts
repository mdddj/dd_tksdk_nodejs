import ServerUtil from "./utils/ServerUtil";
import request from "umi-request";

/**
 * 接口访问类
 */
class DdTaokeSdk {

    private serverUtil : ServerUtil = ServerUtil.getInstance()
    get host():string {
        return this.serverUtil.host
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
    async login(loginNumber:string,password:string){
        return request(`${this.host}/api/user/login`, {
            method: 'POST',
            data: {loginNumber,password},
        });
    }



}