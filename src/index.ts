import ServerUtil from "./utils/ServerUtil";
import request from "umi-request";
import {merge} from 'lodash';
import {Page, PagerModel, Result} from "./utils/ResultUtil";
import {User} from "./model/UserModel";
import PushNewBlogParams from "./model/param/PushNewBlogParamsModel";
import {BlogData, BlogListData, BlogPushNewResultData, Category} from "./model/result/BlogPushNewResultData";
import {PageParam} from "./model/PageModel";
import {ResCategory} from "./model/ResCategory";
import {FileInfo} from "./model/FileInfo";
import {ResourceModel} from "./model/ResourceModel";
import {TextModel} from "./model/TextModel";
import {ArchiveModel} from "./model/ArchiveModel";

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


    /**
     * 发布一篇新博客
     */
    async pushNewBlog(params: PushNewBlogParams) {
        return request<BlogPushNewResultData>(this._host + '/api/auth/blog-push-new', {
            method: 'POST',
            data: params,
        });
    }

    /**
     * 删除一篇博客
     * @param blogId 博客id
     */
    async deleteBlog(blogId: number) {
        return request(this._host + '/api/blog/delete', {
            method: 'DELETE',
            data: {
                id: blogId,
            },
        });
    }

    /**
     * 获取分类列表
     */
    async getBlogCategorys() {
        return request(this._host + '/api/blog/category-list', {
            method: 'GET',
        });
    }

    /**
     * 获取全部的标签列表
     */
    async getBlogTags() {
        return request(this._host + '/api/blog/tags', {method: 'GET'});
    }

    /**
     * 使用博客id获取博客信息
     * @param id  博客id
     */
    async getBlogDetailById(id: number) {
        return request(this._host + '/api/blog/get/' + id, {method: 'GET'});
    }

    /**
     * 或者博客分类列表
     * @param pageModel 分页
     * @param category? 查询条件
     * @constructor
     */
    async getCategoryForTableData(pageModel: PageParam, category?: Category) {
        return request(this._host + '/api/blog/category/list', {
            method: 'GET',
            params: merge(pageModel, category),
        });
    }

    /**
     * 添加或者修改一个博客分类
     * @param category 修改或者添加的模型
     * @constructor
     */
    async saveAndUpdateBlogCategory(category: Category): Promise<Result<Category>> {
        return request<Result<Category>>(this._host + '/api/auth/blog-category-save', {
            method: 'POST',
            data: category,
        });
    }

    /**
     * 删除一个分类,如果分类下存在博客,需要将该分类下的全部博客删除,才能删除此分类
     * @param id  分类id
     * @constructor
     */
    async deleteBlogCategory(id: number) {
        return request(this._host + '/api/auth/blog-category-delete', {
            data: {id},
            method: 'DELETE',
        });
    }


    /**
     * 上传文件
     * @param data 数据
     */
    async uploadFile(data: any) {
        return request(this._host + '/api/auth/file-upload', {
            method: 'POST',
            data: data,
        });
    }

    /**
     * 获取文件夹列表
     * @param id  父文件夹
     * @constructor
     */
    async getFolders(id?: number): Promise<Result<ResCategory[]>> {
        return request<Result<ResCategory[]>>(this._host + '/api/file/get-folders', {
            method: 'GET',
            params: {
                id,
            },
        });
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
        return request<Result<Page<FileInfo>>>(this._host + '/api/file/get-files', {
            method: 'GET',
            params: merge({id: folderId}, pageModel),
        });
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
        return request<Result<{
            page: PagerModel;
            list: ResCategory[];
        }>>(this._host + '/api/res/list', {
            method: 'GET',
            params: merge(pageModel, resCategory),
        });
    }

    /**
     * 添加或者修改一个资源分类
     * @param category  分类
     * @constructor
     */
    async saveOrUpdateResourceCategory(category: ResCategory) {
        return request(this._host + '/api/auth/res-cate-save', {
            method: 'POST',
            data: category,
        });
    }

    /**
     * 根据id删除某个群组
     * @param category  群组数据, 后台只会取id删除
     * @constructor
     */
    async deleteResourceCategoryById(category: ResCategory) {
        return request(this._host + '/api/auth/res-cate-delete', {
            method: 'DELETE',
            data: category,
        });
    }

    /**
     * 根据名字模糊查询某个群组
     * @param name  群组名
     * @constructor
     */
    async findResCategoryListByNameLike(name: string) {
        return request(this._host + '/api/res/like-list', {
            params: {
                name,
            },
        });
    }

    /**
     * 添加一个资源
     * @param model ResourceModel 对象模型
     * @constructor
     */
    async saveOrUpdateResourcesModel(model: ResourceModel) {
        return request(this._host + '/api/auth/resource-save', {
            method: 'POST',
            data: model,
        });
    }


// 获取字典列表
    async getTextList(
        page: number,
        pageSize: number,
        name?: string,
    ): Promise<Result<{
        list: TextModel[];
        page: PagerModel;
    }>> {
        return request<Result<{
            list: TextModel[];
            page: PagerModel;
        }>>(`/api/text/list`, {
            method: 'GET',
            params: {
                page,
                pageSize,
                name,
            },
        });
    }

    /**
     * 添加或者修改对象
     * @param text  字典对象
     */
    async saveText(text: TextModel): Promise<Result<TextModel>> {
        return request<Result<TextModel>>('/api/auth/text-update', {
            method: 'POST',
            data: text,
        });
    }

    /**
     * 根据id删除某个标签,需要管理员权限
     * @param id 主键
     */
    async deleteTextById(id: string) {
        return request<Result<string>>('/api/auth/text-delete', {
            data: {
                id,
            },
            method: 'DELETE',
        });
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
        return request<Result<BlogListData>>(
            this._host + '/api/blog/list?page=' + page + '&pageSize=' + pageSize,
        );
    }


    /**
     * 获取博客归档数据
     */
    async getArchives(): Promise<Result<ArchiveModel>> {
        return request<Result<ArchiveModel>>(`${this._host}/api/blog/statistics`);
    }

    /**
     * 根据博客别名获取博客详情
     * @param alias 博客别名
     */
    async getBlogWithAlias(alias: string): Promise<Result<BlogData>> {
        return request<Result<BlogData>>(`${this._host}/api/blog/alias?alias=${alias}`);
    }

    /**
     *
     * 获取特殊文本
     * @param name 别名
     * @returns
     */
    async getTextByName(
        name: string,
    ): Promise<Result<TextModel>> {
        return request<Result<TextModel>>(
            `${this._host}/api/blog/text?name=${name}`,
        );
    }


    /**
     * 根据标签id 获取博客列表
     * @param tagId 标签id
     * @param pageModel 分页数据
     */
    async getBlogsByTagId(tagId: number, pageModel: PageParam): Promise<Result<Page<BlogData>>> {
        return request<Result<Page<BlogData>>>(this._host + '/api/blog/tag/blogs', {
                method: 'GET',
                params: merge({tagId}, pageModel)
            }
        )
    }

    /**
     * 根据分类id 获取博客列表
     * @param categoryId    分类id
     * @param pageModel 分类数据
     */
    async getBlogsByCategoryId(categoryId: number, pageModel: PageParam): Promise<Result<Page<BlogData>>> {
        return request<Result<Page<BlogData>>>(this._host + '/api/blog/category/blogs', {
            method: 'GET',
            params: merge({categoryId}, pageModel)
        })
    }


    /**
     * 根据月份进行分页查询博客列表
     * @param month 月份
     * @param pageModel 分类数据
     */
    async getBlogsByMonth(month: string, pageModel: PageParam) :Promise<Result<Page<BlogData>>> {
        return request<Result<Page<BlogData>>>(this._host + '/api/blog/month/blogs', {
            method: 'GET',
            params: merge({month}, pageModel)
        })
    }

}

export default DdTaokeSdk
