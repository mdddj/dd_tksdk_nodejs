import { Page, PagerModel, Result } from "./utils/ResultUtil";
import { User } from "./model/UserModel";
import PushNewBlogParams from "./model/param/PushNewBlogParamsModel";
import { BlogData, BlogListData, BlogPushNewResultData, Category } from "./model/result/BlogPushNewResultData";
import { PageParam } from "./model/PageModel";
import { ResCategory } from "./model/ResCategory";
import { FileInfo } from "./model/FileInfo";
import { PublishPostResult, ResourceModel } from "./model/ResourceModel";
import { TextModel } from "./model/TextModel";
import { ArchiveModel, Tag } from "./model/ArchiveModel";
import { SystemPicter } from "./model/avater";
import { Friend } from "./model/friend";
import { ResourceTreeModel } from "./model/ResourceTreeModel";
import { ResourceCategoryType } from "./model/ResourceCategoryType";
import { VersionSelectParamModel } from "./model/VersionSelectParamModel";
import { Comment } from "./model/Comment";
import { SelectCommentParams } from "./model/SelectCommentParams";
/**
 * 接口访问类
 */
declare class DdServerApiByWeb {
    _host: string | undefined;
    /**
     * 鉴权token
     */
    _token: string | undefined;
    set host(v: string);
    get host(): string;
    set token(v: string | undefined);
    get token(): string | undefined;
    /**
     * 私有化类构造
     * @constructor
     * @private
     */
    private constructor();
    static _instance: DdServerApiByWeb;
    /**
     * 接口实例
     */
    static getInstance(): DdServerApiByWeb;
    /**
     * 封装通用请求函数
     * @param url   接口url
     * @param param 请求参数
     * @param method 请求方法
     * @param requestType 请求方法
     */
    requestT<T>(url: string, param?: any, method?: 'GET' | 'POST' | 'DELETE', requestType?: 'form' | 'json'): Promise<T>;
    /**
     * 获取用户列表接口
     * @param pager 分页
     * @param user  查询条件
     */
    userList(pager: PageParam, user?: User): Promise<Result<{
        page: PagerModel;
        list: User[];
    }>>;
    /**
     * 用户登录方法
     * @param loginNumber   登录名
     * @param password  密码
     * @param imageCode 图片验证码
     */
    login(loginNumber: string, password: string, imageCode?: string): Promise<Result<string>>;
    /**
     * 退出登录
     */
    logout(): Promise<Result<string>>;
    /**
     * 根据jwt token 获取用户资料
     *
     *
     *
     * @param token jwt token
     */
    getUserInfo(token: string): Promise<Result<User>>;
    /**
     * 发布一篇新博客
     */
    pushNewBlog(params: PushNewBlogParams): Promise<BlogPushNewResultData>;
    /**
     * 删除一篇博客
     * @param blogId 博客id
     */
    deleteBlog(blogId: number): Promise<Result<string>>;
    /**
     * 获取分类列表
     */
    getBlogCategorys(): Promise<Result<Category[]>>;
    /**
     * 获取全部的标签列表
     */
    getBlogTags(): Promise<Result<Tag[]>>;
    /**
     * 使用博客id获取博客信息
     * @param id  博客id
     */
    getBlogDetailById(id: number): Promise<Result<BlogData>>;
    /**
     * 或者博客分类列表
     * @param pageModel 分页
     * @param category? 查询条件
     * @constructor
     */
    getCategoryForTableData(pageModel: PageParam, category?: Category): Promise<Result<Category[]>>;
    /**
     * 添加或者修改一个博客分类
     * @param category 修改或者添加的模型
     * @constructor
     */
    saveAndUpdateBlogCategory(category: Category): Promise<Result<Category>>;
    /**
     * 删除一个分类,如果分类下存在博客,需要将该分类下的全部博客删除,才能删除此分类
     * @param id  分类id
     * @constructor
     */
    deleteBlogCategory(id: number): Promise<Result<string>>;
    /**
     * 上传文件
     * @param data 数据
     */
    uploadFile(data: any): Promise<Result<FileInfo>>;
    /**
     * 获取文件夹列表
     * @param id  父文件夹
     * @constructor
     */
    getFolders(id?: number): Promise<Result<ResCategory[]>>;
    /**
     * 根据文件夹id或者文件列表查找文件列表
     * @param folderId  文件夹id
     * @param pageModel 分页数据
     * @constructor
     */
    getFilesWithFolderId(folderId: number, pageModel: PageParam): Promise<Result<Page<FileInfo>>>;
    /**
     * 创建文件夹接口
     * @param name  文件夹名字
     * @param parenFolder 父亲文件夹
     * @constructor
     */
    createFolder(name: string, parenFolder?: ResCategory): Promise<Result<ResCategory>>;
    /**
     * 获取资源列表
     * @param pageModel 分页数据
     * @param resCategory 查询条件
     * @constructor
     */
    getResourceCategoryList(pageModel: PageParam, resCategory?: ResCategory): Promise<Result<{
        page: PagerModel;
        list: ResCategory[];
    }>>;
    /**
     * 添加或者修改一个资源分类
     * @param category  分类
     * @constructor
     */
    saveOrUpdateResourceCategory(category: ResCategory): Promise<Result<ResCategory>>;
    /**
     * 根据id删除某个群组
     * @param category  群组数据, 后台只会取id删除
     * @constructor
     */
    deleteResourceCategoryById(category: ResCategory): Promise<Result<string>>;
    /**
     * 根据名字模糊查询某个群组
     * @param name  群组名
     * @constructor
     */
    findResCategoryListByNameLike(name: string): Promise<unknown>;
    /**
     * 添加一个资源
     * @param model ResourceModel 对象模型
     * @constructor
     */
    saveOrUpdateResourcesModel(model: ResourceModel): Promise<Result<ResourceModel>>;
    /**
     * 获取字典列表
     * @param page  第几页
     * @param pageSize 每页几条
     * @param name  查询条件
     */
    getTextList(page: number, pageSize: number, name?: string): Promise<Result<{
        list: TextModel[];
        page: PagerModel;
    }>>;
    /**
     * 添加或者修改对象
     * @param text  字典对象
     */
    saveText(text: TextModel): Promise<Result<TextModel>>;
    /**
     * 根据id删除某个标签,需要管理员权限
     * @param id 主键
     */
    deleteTextById(id: string): Promise<Result<string>>;
    /**
     * 获取博客列表
     * @param page  第几页
     * @param pageSize 每页几条数据
     */
    getBlogList(page: number, pageSize: number): Promise<Result<BlogListData>>;
    /**
     * 获取博客归档数据
     */
    getArchives(): Promise<Result<ArchiveModel>>;
    /**
     * 根据博客别名获取博客详情
     * @param alias 博客别名
     */
    getBlogWithAlias(alias: string): Promise<Result<BlogData>>;
    /**
     *
     * 获取特殊文本
     * @param name 别名
     * @param password 用户输入的密码
     * @returns
     */
    getTextByName(name: string, password?: string): Promise<Result<TextModel>>;
    /**
     * 根据标签id 获取博客列表
     * @param tagId 标签id
     * @param pageModel 分页数据
     */
    getBlogsByTagId(tagId: number, pageModel: PageParam): Promise<Result<Page<BlogData>>>;
    /**
     * 根据分类id 获取博客列表
     * @param categoryId    分类id
     * @param pageModel 分类数据
     */
    getBlogsByCategoryId(categoryId: number, pageModel: PageParam): Promise<Result<Page<BlogData>>>;
    /**
     * 根据月份进行分页查询博客列表
     * @param month 月份
     * @param pageModel 分类数据
     */
    getBlogsByMonth(month: string, pageModel: PageParam): Promise<Result<Page<BlogData>>>;
    /**
     * 获取图片列表
     * @param type 图片类型， 用户头像传 1
     */
    getPics(type: number): Promise<Result<SystemPicter[]>>;
    /**
     * 注册用户
     * data 没有数据返回
     * 只显示消息提示就行
     * @param loginName 登录名
     * @param password  密码
     * @param pic   头像
     */
    register(loginName: string, password: string, pic: string): Promise<Result<undefined>>;
    /**
     * 修改用户信息
     * @param user 将要修改的用户信息
     */
    updateUserProfile(user: User): Promise<Result<User | undefined>>;
    /**
     * 查询flutter插件信息
     * @param name  插件名
     */
    getFlutterPluginInfo(name: string): Promise<Result<String>>;
    /**
     * 申请或者修改一个友情链接
     * 如果修改，需要登陆且拥有管理员的权限
     * @param params 请求参数
     * @returns 返回操作成功的数据
     */
    saveFriendsLink(params: any): Promise<Result<any>>;
    /**
     * 查询全部友链
     * @param params 筛选条件
     * @returns 友链列表
     */
    getFriends(params?: any): Promise<Result<Friend[]>>;
    /**
     * 根据分类名查询一个分类对象,可能会找不到
     * @param name 分类名
     * @returns 分类对象
     */
    findBlogCategoryByName(name: string): Promise<Result<Category | undefined>>;
    /**
     *
     * 修改一个友情链接的数据
     * 注意事项：
     * 1. id不能为空
     * 2. 需要管理员权限
     * @param params 需要修改的参数
     * @returns
     */
    updateFriendsObject(params: any): Promise<Result<Friend>>;
    /**
     * 删除某个友链
     * @param id 将要删除的友链对象ID
     * @returns 操作结果
     */
    deleteFriendObject(id: number): Promise<Result<any>>;
    /**
     * 给某个用户发送邮件
     * 注意
     * 1.需要管理员权限才能操作
     * 2.不能缺少任何一个参数
     * @param email 接收者邮箱
     * @param title 标题
     * @param content 正文内容
     * @param html 是否为html格式
     * @returns 处理结果字符串
     */
    sendEmail(email: string, title: string, content: string, html: boolean): Promise<Result<string>>;
    /**
     * 发布动态
     * @param data 数据
     * @returns
     */
    publishPost(data: any): Promise<Result<PublishPostResult>>;
    /**
     * 删除一个资源
     * @param id    资源ID
     * @returns
     */
    deleteResource(id: number): Promise<Result<string>>;
    /**
     * 查询一个资源分类
     * @param params 查询条件
     * @returns 查询结果，单个对象
     */
    getResourceCategory(params: ResCategory): Promise<Result<ResCategory | undefined>>;
    /**
     * 获取资源子对象集合
     * @param id 分类ID
     */
    getResourceSubObject(id: number): Promise<Result<ResourceTreeModel>>;
    /**
     * 上传文件通用，
     * 需要管理员权限
     * @param file 上传的内容
     */
    uploadFileWithSingle(file: any): Promise<Result<string>>;
    /**
     * 创建一个文档子目录,或者修改
     * @param params 参数 [CreateOrUpdateDocDirectoryParam]
     */
    createOrUpdateDocDirectory(params: CreateOrUpdateDocDirectoryParam): Promise<Result<ResCategory | string>>;
    /**
     *
     * 管理员功能
     * 需要传入管理员账户的token
     * 查询某个字典的原始密码
     * @param selectKey 查询的关键字
     * @returns 原始密码结果
     */
    adminSelectTextOriginPassword(selectKey: string): Promise<Result<string>>;
    /**
     * 获取全部ResourceCategory的已存在类型
     */
    getResourceCategoryTypes(): Promise<Result<ResourceCategoryType[]>>;
    /**
     * 获取版本号列表
     * @param pageParam 分页参数,必填
     * @param selectParams 条件查询参数, 选填
     */
    getVersionList(pageParam: PageParam, selectParams?: VersionSelectParamModel): Promise<Result<any>>;
    /**
     * 上传文件通用
     * 后端接收的字段是 `file`
     * @param file 需要上传的文件
     *
     */
    uploadPublic(file: any): Promise<Result<FileInfo | undefined>>;
    /**
     * 删除某个文件
     * @param id FileInfo 的主键ID
     */
    deleteFileinfo(id: number): Promise<Result<boolean>>;
    /**
     * [需要管理员的权限]
     * 这是一个管理员功能, 专门用来修改的用户的密码,重新设置密码,但是需要记住以前设置的密码才能修改
     * @param currentPass 当前账号的密码
     * @param rePassword 重新设置的密码
     */
    updateUserPasswordWithAdmin(currentPass: string, rePassword: string): Promise<Result<string>>;
    /**
     * 获取用户信息
     * @param id 用户ID
     * @param loginNumber 用户登录名
     */
    getUserDetail(id?: number, loginNumber?: string): Promise<Result<User | undefined>>;
    /**
     * 查询某个资源下的动态列表
     * @param page 分页数据
     * @param categoryId 可选  分类ID
     * @param params 可以 条件筛选参数
     * @param paramsHandle 参数回调
     */
    getResourceList(page: PageParam, categoryId?: number, params?: any, paramsHandle?: (p: any) => void): Promise<Result<{
        page: PagerModel;
        list: ResourceModel[];
    }>>;
    /**
     * 获取全部动态类型
     */
    getResourceAllTypes(): Promise<Result<{
        count: number;
        type: string;
    }[]>>;
    /**
     * 获取全部资源分类列表
     */
    getResourceCategoryAll(): Promise<Result<ResCategory[]>>;
    /**
     *
     * 提交一个留言
     * @param params 留言参数
     */
    submitComment(params: any): Promise<Result<Comment>>;
    /**
     * 查询评论列表
     * @param params 查询参数
     * @returns 查询结果
     */
    findComment(params: SelectCommentParams): Promise<Result<{
        list: Comment[];
        page: PagerModel;
    }>>;
    /**
     * 删除某条评论
     * 需要管理员权限
     * @param id 主键
     */
    removeComment(id: number): Promise<Result<string>>;
}
export default DdServerApiByWeb;
