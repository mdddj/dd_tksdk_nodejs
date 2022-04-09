declare class ServerUtil {
    private defaultHost;
    private _host;
    private ServeUtil;
    static instance: ServerUtil;
    static getInstance(): ServerUtil;
    set host(value: string);
    get host(): string;
}
export default ServerUtil;
