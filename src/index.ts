import ServerUtil from "./utils/ServerUtil";

/**
 * 接口访问类
 */
class DdTaokeSdk {

    private util : ServerUtil = ServerUtil.getInstance()

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





}