import ServerUtil from "./utils/ServerUtil";
import {Page, PagerModel, Result} from "./utils/ResultUtil";
import {User} from "./model/UserModel";
import PushNewBlogParams from "./model/param/PushNewBlogParamsModel";
import {BlogData, BlogListData, BlogPushNewResultData, Category} from "./model/result/BlogPushNewResultData";
import {PageParam} from "./model/PageModel";
import {ResCategory} from "./model/ResCategory";
import {FileInfo} from "./model/FileInfo";
import {PublishPostResult, ResourceModel} from "./model/ResourceModel";
import {TextModel} from "./model/TextModel";
import {ArchiveModel, Tag} from "./model/ArchiveModel";
import {SystemPicter} from "./model/avater";
import axios from "axios-miniprogram";
import {Friend} from "./model/friend";
import {ResourceTreeModel} from "./model/ResourceTreeModel";
import {ResourceCategoryType} from "./model/ResourceCategoryType";
import {VersionSelectParamModel} from "./model/VersionSelectParamModel";
import {Comment} from "./model/Comment";
import {SelectCommentParams} from "./model/SelectCommentParams";

interface TokenHandle {
    tokenGen(): string | undefined;
}

/**
 * 接口访问类
 */
class DdServerApiByWeb {


    _host: string | undefined

    /**
     * 鉴权token
     */
    _token: string | undefined

    set host(v: string) {
        this._host = v
    }

    get host(): string {
        return this._host ?? ServerUtil.getInstance().host
    }

    set token(v: string | undefined) {
        this._token = v
    }

    get token() {
        return this._token
    }

    /**
     * 私有化类构造
     * @constructor
     * @private
     */
    private constructor() {
    }

    public static _instance: DdServerApiByWeb

    /**
     * 接口实例
     */
    public static getInstance(): DdServerApiByWeb {
        return this._instance ?? new DdServerApiByWeb()
    }


    /**
     * 封装通用请求函数
     * @param url   接口url
     * @param param 请求参数
     * @param method 请求方法
     * @param requestType 请求方法
     */
    async requestT<T>(url: string, param?: any,method?: 'GET' | 'POST' | 'DELETE'　, requestType?: 'form' | 'json'): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            let result: undefined | T
            let response = await axios<T>( `${this._host}${url}`,{
                method: method ?? "GET",
                data: param,
                params: param,
                dataType: requestType == "json" ? "json" : "其他"
            })
            result = response.data
            if (result) {
                resolve(result)
            } else {
                console.log('返回为空')
                reject('没有返回数据')
            }

        })
    }



    /**
     * 获取用户列表接口
     * @param pager 分页
     * @param user  查询条件
     */
    async userList(pager: PageParam, user?: User,): Promise<Result<{ page: PagerModel, list: User[] }>> {
        return this.requestT<Result<{ page: PagerModel, list: User[] }>>('/api/user/list', Object.assign(user ?? {}, pager), 'GET')
    }

    /**
     * 用户登录方法
     * @param loginNumber   登录名
     * @param password  密码
     * @param imageCode 图片验证码
     */
    async login(loginNumber: string, password: string, imageCode?: string): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/user-public/login', {loginNumber, password, imageCode}, 'POST', 'form');
    }

    /**
     * 退出登录
     */
    async logout(): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/user/logout', {}, 'POST')
    }

    /**
     * 根据jwt token 获取用户资料
     *
     *
     *
     * @param token jwt token
     */
    async getUserInfo(token: string): Promise<Result<User>> {
        return this.requestT<Result<User>>(`/api/get-user-by-token?token=${token}`)
    }


    /**
     * 发布一篇新博客
     */
    async pushNewBlog(params: PushNewBlogParams): Promise<BlogPushNewResultData> {
        return this.requestT<BlogPushNewResultData>('/api/auth/blog-push-new', params, 'POST');
    }

    /**
     * 删除一篇博客
     * @param blogId 博客id
     */
    async deleteBlog(blogId: number): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/auth/blog-delete', {
            id: blogId,
        }, 'DELETE');
    }

    /**
     * 获取分类列表
     */
    async getBlogCategorys(): Promise<Result<Category[]>> {
        return this.requestT<Result<Category[]>>('/api/blog/category-list');
    }

    /**
     * 获取全部的标签列表
     */
    async getBlogTags(): Promise<Result<Tag[]>> {
        return this.requestT<Result<Tag[]>>('/api/blog/tags');
    }

    /**
     * 使用博客id获取博客信息
     * @param id  博客id
     */
    async getBlogDetailById(id: number): Promise<Result<BlogData>> {
        return this.requestT<Result<BlogData>>('/api/blog/get/' + id);
    }

    /**
     * 或者博客分类列表
     * @param pageModel 分页
     * @param category? 查询条件
     * @constructor
     */
    async getCategoryForTableData(pageModel: PageParam, category?: Category): Promise<Result<Category[]>> {
        return this.requestT<Result<Category[]>>('/api/blog/category/list', Object.assign(pageModel, category));
    }

    /**
     * 添加或者修改一个博客分类
     * @param category 修改或者添加的模型
     * @constructor
     */
    async saveAndUpdateBlogCategory(category: Category): Promise<Result<Category>> {
        return this.requestT<Result<Category>>('/api/auth/blog-category-save', category, 'POST');
    }

    /**
     * 删除一个分类,如果分类下存在博客,需要将该分类下的全部博客删除,才能删除此分类
     * @param id  分类id
     * @constructor
     */
    async deleteBlogCategory(id: number): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/auth/blog-category-delete', id, 'DELETE');
    }


    /**
     * 上传文件
     * @param data 数据
     */
    async uploadFile(data: any): Promise<Result<FileInfo>> {
        return this.requestT<Result<FileInfo>>('/api/auth/file-upload', data, 'POST');
    }

    /**
     * 获取文件夹列表
     * @param id  父文件夹
     * @constructor
     */
    async getFolders(id?: number): Promise<Result<ResCategory[]>> {
        return this.requestT<Result<ResCategory[]>>('/api/file/get-folders', {id});
    }

    /**
     * 根据文件夹id或者文件列表查找文件列表
     * @param folderId  文件夹id
     * @param pageModel 分页数据
     * @constructor
     */
    async getFilesWithFolderId(
        folderId: number,
        pageModel: PageParam,
    ): Promise<Result<Page<FileInfo>>> {
        return this.requestT<Result<Page<FileInfo>>>('/api/file/get-files', Object.assign({id: folderId}, pageModel));
    }

    /**
     * 创建文件夹接口
     * @param name  文件夹名字
     * @param parenFolder 父亲文件夹
     * @constructor
     */
    async createFolder(name: string, parenFolder?: ResCategory) {
        const cate = {
            name,
            type: 'folder',
        } as ResCategory;
        if (parenFolder) {
            cate.parentNode = parenFolder;
        }
        return this.saveOrUpdateResourceCategory(cate);
    }


    /**
     * 获取资源列表
     * @param pageModel 分页数据
     * @param resCategory 查询条件
     * @constructor
     */
    async getResourceCategoryList(
        pageModel: PageParam,
        resCategory?: ResCategory,
    ): Promise<Result<{
        page: PagerModel;
        list: ResCategory[];
    }>> {
        return this.requestT<Result<{
            page: PagerModel;
            list: ResCategory[];
        }>>('/api/res/list', Object.assign(pageModel, resCategory));
    }

    /**
     * 添加或者修改一个资源分类
     * @param category  分类
     * @constructor
     */
    async saveOrUpdateResourceCategory(category: ResCategory): Promise<Result<ResCategory>> {
        return this.requestT<Result<ResCategory>>('/api/auth/res-cate-save', category, 'POST');
    }

    /**
     * 根据id删除某个群组
     * @param category  群组数据, 后台只会取id删除
     * @constructor
     */
    async deleteResourceCategoryById(category: ResCategory): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/auth/res-cate-delete', category, 'DELETE');
    }

    /**
     * 根据名字模糊查询某个群组
     * @param name  群组名
     * @constructor
     */
    async findResCategoryListByNameLike(name: string) {
        return this.requestT('/api/res/like-list', {name});
    }

    /**
     * 添加一个资源
     * @param model ResourceModel 对象模型
     * @constructor
     */
    async saveOrUpdateResourcesModel(model: ResourceModel): Promise<Result<ResourceModel>> {
        return this.requestT<Result<ResourceModel>>('/api/auth/resource-save', model, 'POST');
    }

    /**
     * 获取字典列表
     * @param page  第几页
     * @param pageSize 每页几条
     * @param name  查询条件
     */
    async getTextList(
        page: number,
        pageSize: number,
        name?: string,
    ): Promise<Result<{
        list: TextModel[];
        page: PagerModel;
    }>> {
        return this.requestT<Result<{
            list: TextModel[];
            page: PagerModel;
        }>>(`/api/text/list`, {
            page,
            pageSize,
            name,
        });
    }

    /**
     * 添加或者修改对象
     * @param text  字典对象
     */
    async saveText(text: TextModel): Promise<Result<TextModel>> {
        return this.requestT<Result<TextModel>>('/api/auth/text-update', text, 'POST');
    }

    /**
     * 根据id删除某个标签,需要管理员权限
     * @param id 主键
     */
    async deleteTextById(id: string): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/auth/text-delete', {id}, 'DELETE');
    }

    /**
     * 获取博客列表
     * @param page  第几页
     * @param pageSize 每页几条数据
     */
    async getBlogList(
        page: number,
        pageSize: number,
    ): Promise<Result<BlogListData>> {
        return this.requestT<Result<BlogListData>>(
            '/api/blog/list?page=' + page + '&pageSize=' + pageSize,
        );
    }

    /**
     * 获取博客归档数据
     */
    async getArchives(): Promise<Result<ArchiveModel>> {
        return this.requestT<Result<ArchiveModel>>(`/api/blog/statistics`);
    }

    /**
     * 根据博客别名获取博客详情
     * @param alias 博客别名
     */
    async getBlogWithAlias(alias: string): Promise<Result<BlogData>> {
        return this.requestT<Result<BlogData>>(`/api/blog/alias?alias=${alias}`);
    }

    /**
     *
     * 获取特殊文本
     * @param name 别名
     * @param password 用户输入的密码
     * @returns
     */
    async getTextByName(
        name: string,
        password: string = ''
    ): Promise<Result<TextModel>> {
        return this.requestT<Result<TextModel>>(
            `/api/blog/text`,
            {password, name}, 'GET'
        );
    }


    /**
     * 根据标签id 获取博客列表
     * @param tagId 标签id
     * @param pageModel 分页数据
     */
    async getBlogsByTagId(tagId: number, pageModel: PageParam): Promise<Result<Page<BlogData>>> {
        return this.requestT<Result<Page<BlogData>>>('/api/blog/tag/blogs', Object.assign({tagId}, pageModel)
        )
    }

    /**
     * 根据分类id 获取博客列表
     * @param categoryId    分类id
     * @param pageModel 分类数据
     */
    async getBlogsByCategoryId(categoryId: number, pageModel: PageParam): Promise<Result<Page<BlogData>>> {
        return this.requestT<Result<Page<BlogData>>>('/api/blog/category/blogs', Object.assign({categoryId}, pageModel))
    }


    /**
     * 根据月份进行分页查询博客列表
     * @param month 月份
     * @param pageModel 分类数据
     */
    async getBlogsByMonth(month: string, pageModel: PageParam): Promise<Result<Page<BlogData>>> {
        return this.requestT<Result<Page<BlogData>>>('/api/blog/month/blogs', Object.assign({month}, pageModel))
    }

    /**
     * 获取图片列表
     * @param type 图片类型， 用户头像传 1
     */
    async getPics(type: number): Promise<Result<SystemPicter[]>> {
        return this.requestT<Result<SystemPicter[]>>('/api/pic/list', {'type': type})
    }


    /**
     * 注册用户
     * data 没有数据返回
     * 只显示消息提示就行
     * @param loginName 登录名
     * @param password  密码
     * @param pic   头像
     */
    async register(loginName: string, password: string, pic: string): Promise<Result<undefined>> {
        return this.requestT<Result<undefined>>('/api/auth/user-addnew', {
            'loginNumber': loginName,
            'password': password,
            'picture': pic
        }, 'POST')
    }


    /**
     * 修改用户信息
     * @param user 将要修改的用户信息
     */
    async updateUserProfile(user: User): Promise<Result<User | undefined>> {
        return this.requestT<Result<User | undefined>>('/api/u/update-profile', user, 'POST')
    }

    /**
     * 查询flutter插件信息
     * @param name  插件名
     */
    async getFlutterPluginInfo(name: string): Promise<Result<String>> {
        return this.requestT<Result<string>>('/api/text/flutter-flugin', {'name': name}, 'GET')
    }


    /**
     * 申请或者修改一个友情链接
     * 如果修改，需要登陆且拥有管理员的权限
     * @param params 请求参数
     * @returns 返回操作成功的数据
     */
    async saveFriendsLink(params: any): Promise<Result<any>> {
        return this.requestT<Result<any>>('/api/friend/save', params, 'POST')
    }


    /**
     * 查询全部友链
     * @param params 筛选条件
     * @returns 友链列表
     */
    async getFriends(params?: any): Promise<Result<Friend[]>> {
        return this.requestT<Result<Friend[]>>('/api/friend/list', params, 'GET')
    }


    /**
     * 根据分类名查询一个分类对象,可能会找不到
     * @param name 分类名
     * @returns 分类对象
     */
    async findBlogCategoryByName(name: string): Promise<Result<Category | undefined>> {
        return this.requestT<Result<Category | undefined>>('/api/blog/category/findByName', {name}, 'GET')
    }

    /**
     *
     * 修改一个友情链接的数据
     * 注意事项：
     * 1. id不能为空
     * 2. 需要管理员权限
     * @param params 需要修改的参数
     * @returns
     */
    async updateFriendsObject(params: any): Promise<Result<Friend>> {
        return this.requestT<Result<Friend>>('/api/auth/update-friends-obj', params, 'POST')
    }

    /**
     * 删除某个友链
     * @param id 将要删除的友链对象ID
     * @returns 操作结果
     */
    async deleteFriendObject(id: number): Promise<Result<any>> {
        return this.requestT<Result<any>>('/api/auth/delete-friends-obj', {id}, 'DELETE')
    }

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
    async sendEmail(email: string, title: string, content: string, html: boolean): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/auth/send-email', {email, title, content, html}, 'POST')
    }

    /**
     * 发布动态
     * @param data 数据
     * @returns
     */
    async publishPost(data: any): Promise<Result<PublishPostResult>> {
        return this.requestT<Result<PublishPostResult>>('/api/resource/add-post', data, 'POST', 'form')
    }

    /**
     * 删除一个资源
     * @param id    资源ID
     * @returns
     */
    async deleteResource(id: number) {
        return this.requestT<Result<string>>('/api/resource/delete', {id}, 'DELETE')
    }

    /**
     * 查询一个资源分类
     * @param params 查询条件
     * @returns 查询结果，单个对象
     */
    async getResourceCategory(params: ResCategory) {
        return this.requestT<Result<ResCategory | undefined>>('/api/res/find', params, 'GET')
    }

    /**
     * 获取资源子对象集合
     * @param id 分类ID
     */
    async getResourceSubObject(id: number): Promise<Result<ResourceTreeModel>> {
        return this.requestT<Result<ResourceTreeModel>>('/api/res/sub', {id}, 'GET')
    }

    /**
     * 上传文件通用，
     * 需要管理员权限
     * @param file 上传的内容
     */
    async uploadFileWithSingle(file: any): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/auth/simple-upload', file, 'POST')
    }

    /**
     * 创建一个文档子目录,或者修改
     * @param params 参数 [CreateOrUpdateDocDirectoryParam]
     */
    async createOrUpdateDocDirectory(params: CreateOrUpdateDocDirectoryParam): Promise<Result<ResCategory | string>> {
        return this.requestT<Result<ResCategory | string>>('/api/auth/cate-director-action', params, 'POST')
    }

    /**
     *
     * 管理员功能
     * 需要传入管理员账户的token
     * 查询某个字典的原始密码
     * @param selectKey 查询的关键字
     * @returns 原始密码结果
     */
    async adminSelectTextOriginPassword(selectKey: string): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/auth/text/origin-password-select', {'key': selectKey}, 'GET')
    }

    /**
     * 获取全部ResourceCategory的已存在类型
     */
    async getResourceCategoryTypes(): Promise<Result<ResourceCategoryType[]>> {
        return this.requestT<Result<ResourceCategoryType[]>>('/api/rc/types', {}, 'GET')
    }

    /**
     * 获取版本号列表
     * @param pageParam 分页参数,必填
     * @param selectParams 条件查询参数, 选填
     */
    async getVersionList(pageParam: PageParam, selectParams?: VersionSelectParamModel): Promise<Result<any>> {
        return this.requestT<Promise<Result<any>>>('/api/version/list', Object.assign(pageParam, selectParams), 'GET')
    }

    /**
     * 上传文件通用
     * 后端接收的字段是 `file`
     * @param file 需要上传的文件
     *
     */
    async uploadPublic(file: any): Promise<Result<FileInfo | undefined>> {
        return this.requestT<Result<FileInfo | undefined>>('/api/file/upload', file, 'POST', 'form')
    }

    /**
     * 删除某个文件
     * @param id FileInfo 的主键ID
     */
    async deleteFileinfo(id: number): Promise<Result<boolean>> {
        return this.requestT<Result<boolean>>('/api/file/delete', id, 'DELETE')
    }

    /**
     * [需要管理员的权限]
     * 这是一个管理员功能, 专门用来修改的用户的密码,重新设置密码,但是需要记住以前设置的密码才能修改
     * @param currentPass 当前账号的密码
     * @param rePassword 重新设置的密码
     */
    async updateUserPasswordWithAdmin(currentPass: string, rePassword: string): Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/auth/user-update-pass', {currentPass, rePassword}, 'POST')
    }

    /**
     * 获取用户信息
     * @param id 用户ID
     * @param loginNumber 用户登录名
     */
    async getUserDetail(id?: number, loginNumber?: string): Promise<Result<User | undefined>> {
        return this.requestT<Result<User | undefined>>('/api/user-public/detail', {id, loginNumber})
    }

    /**
     * 查询某个资源下的动态列表
     * @param page 分页数据
     * @param categoryId 可选  分类ID
     * @param params 可以 条件筛选参数
     * @param paramsHandle 参数回调
     */
    async getResourceList(page: PageParam, categoryId?: number, params?: any, paramsHandle?: (p: any) => void): Promise<Result<{ page: PagerModel, list: ResourceModel[] }>> {
        let obj = Object.assign(page, {categoryId: categoryId})
        paramsHandle && paramsHandle(obj)
        return this.requestT<Result<{ page: PagerModel, list: ResourceModel[] }>>('/api/resource/list', obj)
    }

    /**
     * 获取全部动态类型
     */
    async getResourceAllTypes(): Promise<Result<{ count: number, type: string }[]>> {
        return this.requestT<Result<{ count: number, type: string }[]>>('/api/rc/types')
    }

    /**
     * 获取全部资源分类列表
     */
    async getResourceCategoryAll(): Promise<Result<ResCategory[]>> {
        return this.requestT<Result<ResCategory[]>>('/api/res/all')
    }


    /**
     *
     * 提交一个留言
     * @param params 留言参数
     */
    async submitComment(params: any): Promise<Result<Comment>> {
        return this.requestT<Result<Comment>>('/api/comment/add',params,'POST')
    }

    /**
     * 查询评论列表
     * @param params 查询参数
     * @returns 查询结果
     */
    async findComment(params: SelectCommentParams) : Promise<Result<{
        list: Comment[],
        page: PagerModel
    }>> {
        return this.requestT<Result<{
            list: Comment[],
            page: PagerModel
        }>>('/api/comment/find',params,'GET')
    }


    /**
     * 删除某条评论
     * 需要管理员权限
     * @param id 主键
     */
    async removeComment(id : number) : Promise<Result<string>> {
        return this.requestT<Result<string>>('/api/auth/comment/remove',{id},'DELETE')
    }

}

export default DdServerApiByWeb
