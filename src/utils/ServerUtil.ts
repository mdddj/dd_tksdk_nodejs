class ServerUtil {


    private defaultHost: string = 'https://itbug.shop'

    /**
     * 服务器地址
     * @private
     */
    private _host: string | undefined;

    /**
     * 私有化构造函数
     * @constructor
     * @private
     */
    private ServeUtil() {
    }


    /**
     * 对象实例,只会创建一个对象
     */
    public static instance: ServerUtil

    /**
     * 外部获取实例的方法
     */
    public static getInstance(): ServerUtil {
        return this.instance ?? new ServerUtil()
    }

    /**
     * 初始化服务器host
     * @param value  服务器接口地址
     */
    set host(value: string) {
        this._host = value
    }

    /**
     * 获取服务器ip地址
     */
    get host(): string {
        return this._host ?? this.defaultHost
    }

}

export default ServerUtil