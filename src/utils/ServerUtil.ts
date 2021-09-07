
class ServerUtil {
    private defaultHost: string = 'https://itbug.shop'
    private _host: string | undefined;
    private ServeUtil() {
    }
    public static instance: ServerUtil

    public static getInstance(): ServerUtil {
        return this.instance ?? new ServerUtil()
    }
    set host(value: string) {
        this._host = value
        console.log(`初始化host成功,host is :  ${value}`)
    }
    get host(): string {
        return this._host ?? this.defaultHost
    }
}
export default ServerUtil