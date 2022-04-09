"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServerUtil_1 = __importDefault(require("./utils/ServerUtil"));
var axios_miniprogram_1 = __importDefault(require("axios-miniprogram"));
/**
 * 接口访问类
 */
var DdServerApiByWeb = /** @class */ (function () {
    /**
     * 私有化类构造
     * @constructor
     * @private
     */
    function DdServerApiByWeb() {
    }
    Object.defineProperty(DdServerApiByWeb.prototype, "host", {
        get: function () {
            var _a;
            return (_a = this._host) !== null && _a !== void 0 ? _a : ServerUtil_1.default.getInstance().host;
        },
        set: function (v) {
            this._host = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DdServerApiByWeb.prototype, "token", {
        get: function () {
            return this._token;
        },
        set: function (v) {
            this._token = v;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 接口实例
     */
    DdServerApiByWeb.getInstance = function () {
        var _a;
        return (_a = this._instance) !== null && _a !== void 0 ? _a : new DdServerApiByWeb();
    };
    /**
     * 封装通用请求函数
     * @param url   接口url
     * @param param 请求参数
     * @param method 请求方法
     * @param requestType 请求方法
     */
    DdServerApiByWeb.prototype.requestT = function (url, param, method, requestType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var result, response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, axios_miniprogram_1.default)("".concat(this._host).concat(url), {
                                        method: method !== null && method !== void 0 ? method : "GET",
                                        data: param,
                                        params: param,
                                        dataType: requestType == "json" ? "json" : "其他"
                                    })];
                                case 1:
                                    response = _a.sent();
                                    result = response.data;
                                    if (result) {
                                        resolve(result);
                                    }
                                    else {
                                        console.log('返回为空');
                                        reject('没有返回数据');
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 获取用户列表接口
     * @param pager 分页
     * @param user  查询条件
     */
    DdServerApiByWeb.prototype.userList = function (pager, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/user/list', Object.assign(user !== null && user !== void 0 ? user : {}, pager), 'GET')];
            });
        });
    };
    /**
     * 用户登录方法
     * @param loginNumber   登录名
     * @param password  密码
     * @param imageCode 图片验证码
     */
    DdServerApiByWeb.prototype.login = function (loginNumber, password, imageCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/user-public/login', { loginNumber: loginNumber, password: password, imageCode: imageCode }, 'POST', 'form')];
            });
        });
    };
    /**
     * 退出登录
     */
    DdServerApiByWeb.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/user/logout', {}, 'POST')];
            });
        });
    };
    /**
     * 根据jwt token 获取用户资料
     *
     *
     *
     * @param token jwt token
     */
    DdServerApiByWeb.prototype.getUserInfo = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT("/api/get-user-by-token?token=".concat(token))];
            });
        });
    };
    /**
     * 发布一篇新博客
     */
    DdServerApiByWeb.prototype.pushNewBlog = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/blog-push-new', params, 'POST')];
            });
        });
    };
    /**
     * 删除一篇博客
     * @param blogId 博客id
     */
    DdServerApiByWeb.prototype.deleteBlog = function (blogId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/blog-delete', {
                        id: blogId,
                    }, 'DELETE')];
            });
        });
    };
    /**
     * 获取分类列表
     */
    DdServerApiByWeb.prototype.getBlogCategorys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/blog/category-list')];
            });
        });
    };
    /**
     * 获取全部的标签列表
     */
    DdServerApiByWeb.prototype.getBlogTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/blog/tags')];
            });
        });
    };
    /**
     * 使用博客id获取博客信息
     * @param id  博客id
     */
    DdServerApiByWeb.prototype.getBlogDetailById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/blog/get/' + id)];
            });
        });
    };
    /**
     * 或者博客分类列表
     * @param pageModel 分页
     * @param category? 查询条件
     * @constructor
     */
    DdServerApiByWeb.prototype.getCategoryForTableData = function (pageModel, category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/blog/category/list', Object.assign(pageModel, category))];
            });
        });
    };
    /**
     * 添加或者修改一个博客分类
     * @param category 修改或者添加的模型
     * @constructor
     */
    DdServerApiByWeb.prototype.saveAndUpdateBlogCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/blog-category-save', category, 'POST')];
            });
        });
    };
    /**
     * 删除一个分类,如果分类下存在博客,需要将该分类下的全部博客删除,才能删除此分类
     * @param id  分类id
     * @constructor
     */
    DdServerApiByWeb.prototype.deleteBlogCategory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/blog-category-delete', id, 'DELETE')];
            });
        });
    };
    /**
     * 上传文件
     * @param data 数据
     */
    DdServerApiByWeb.prototype.uploadFile = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/file-upload', data, 'POST')];
            });
        });
    };
    /**
     * 获取文件夹列表
     * @param id  父文件夹
     * @constructor
     */
    DdServerApiByWeb.prototype.getFolders = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/file/get-folders', { id: id })];
            });
        });
    };
    /**
     * 根据文件夹id或者文件列表查找文件列表
     * @param folderId  文件夹id
     * @param pageModel 分页数据
     * @constructor
     */
    DdServerApiByWeb.prototype.getFilesWithFolderId = function (folderId, pageModel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/file/get-files', Object.assign({ id: folderId }, pageModel))];
            });
        });
    };
    /**
     * 创建文件夹接口
     * @param name  文件夹名字
     * @param parenFolder 父亲文件夹
     * @constructor
     */
    DdServerApiByWeb.prototype.createFolder = function (name, parenFolder) {
        return __awaiter(this, void 0, void 0, function () {
            var cate;
            return __generator(this, function (_a) {
                cate = {
                    name: name,
                    type: 'folder',
                };
                if (parenFolder) {
                    cate.parentNode = parenFolder;
                }
                return [2 /*return*/, this.saveOrUpdateResourceCategory(cate)];
            });
        });
    };
    /**
     * 获取资源列表
     * @param pageModel 分页数据
     * @param resCategory 查询条件
     * @constructor
     */
    DdServerApiByWeb.prototype.getResourceCategoryList = function (pageModel, resCategory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/res/list', Object.assign(pageModel, resCategory))];
            });
        });
    };
    /**
     * 添加或者修改一个资源分类
     * @param category  分类
     * @constructor
     */
    DdServerApiByWeb.prototype.saveOrUpdateResourceCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/res-cate-save', category, 'POST')];
            });
        });
    };
    /**
     * 根据id删除某个群组
     * @param category  群组数据, 后台只会取id删除
     * @constructor
     */
    DdServerApiByWeb.prototype.deleteResourceCategoryById = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/res-cate-delete', category, 'DELETE')];
            });
        });
    };
    /**
     * 根据名字模糊查询某个群组
     * @param name  群组名
     * @constructor
     */
    DdServerApiByWeb.prototype.findResCategoryListByNameLike = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/res/like-list', { name: name })];
            });
        });
    };
    /**
     * 添加一个资源
     * @param model ResourceModel 对象模型
     * @constructor
     */
    DdServerApiByWeb.prototype.saveOrUpdateResourcesModel = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/resource-save', model, 'POST')];
            });
        });
    };
    /**
     * 获取字典列表
     * @param page  第几页
     * @param pageSize 每页几条
     * @param name  查询条件
     */
    DdServerApiByWeb.prototype.getTextList = function (page, pageSize, name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT("/api/text/list", {
                        page: page,
                        pageSize: pageSize,
                        name: name,
                    })];
            });
        });
    };
    /**
     * 添加或者修改对象
     * @param text  字典对象
     */
    DdServerApiByWeb.prototype.saveText = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/text-update', text, 'POST')];
            });
        });
    };
    /**
     * 根据id删除某个标签,需要管理员权限
     * @param id 主键
     */
    DdServerApiByWeb.prototype.deleteTextById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/text-delete', { id: id }, 'DELETE')];
            });
        });
    };
    /**
     * 获取博客列表
     * @param page  第几页
     * @param pageSize 每页几条数据
     */
    DdServerApiByWeb.prototype.getBlogList = function (page, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/blog/list?page=' + page + '&pageSize=' + pageSize)];
            });
        });
    };
    /**
     * 获取博客归档数据
     */
    DdServerApiByWeb.prototype.getArchives = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT("/api/blog/statistics")];
            });
        });
    };
    /**
     * 根据博客别名获取博客详情
     * @param alias 博客别名
     */
    DdServerApiByWeb.prototype.getBlogWithAlias = function (alias) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT("/api/blog/alias?alias=".concat(alias))];
            });
        });
    };
    /**
     *
     * 获取特殊文本
     * @param name 别名
     * @param password 用户输入的密码
     * @returns
     */
    DdServerApiByWeb.prototype.getTextByName = function (name, password) {
        if (password === void 0) { password = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT("/api/blog/text", { password: password, name: name }, 'GET')];
            });
        });
    };
    /**
     * 根据标签id 获取博客列表
     * @param tagId 标签id
     * @param pageModel 分页数据
     */
    DdServerApiByWeb.prototype.getBlogsByTagId = function (tagId, pageModel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/blog/tag/blogs', Object.assign({ tagId: tagId }, pageModel))];
            });
        });
    };
    /**
     * 根据分类id 获取博客列表
     * @param categoryId    分类id
     * @param pageModel 分类数据
     */
    DdServerApiByWeb.prototype.getBlogsByCategoryId = function (categoryId, pageModel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/blog/category/blogs', Object.assign({ categoryId: categoryId }, pageModel))];
            });
        });
    };
    /**
     * 根据月份进行分页查询博客列表
     * @param month 月份
     * @param pageModel 分类数据
     */
    DdServerApiByWeb.prototype.getBlogsByMonth = function (month, pageModel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/blog/month/blogs', Object.assign({ month: month }, pageModel))];
            });
        });
    };
    /**
     * 获取图片列表
     * @param type 图片类型， 用户头像传 1
     */
    DdServerApiByWeb.prototype.getPics = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/pic/list', { 'type': type })];
            });
        });
    };
    /**
     * 注册用户
     * data 没有数据返回
     * 只显示消息提示就行
     * @param loginName 登录名
     * @param password  密码
     * @param pic   头像
     */
    DdServerApiByWeb.prototype.register = function (loginName, password, pic) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/user-addnew', {
                        'loginNumber': loginName,
                        'password': password,
                        'picture': pic
                    }, 'POST')];
            });
        });
    };
    /**
     * 修改用户信息
     * @param user 将要修改的用户信息
     */
    DdServerApiByWeb.prototype.updateUserProfile = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/u/update-profile', user, 'POST')];
            });
        });
    };
    /**
     * 查询flutter插件信息
     * @param name  插件名
     */
    DdServerApiByWeb.prototype.getFlutterPluginInfo = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/text/flutter-flugin', { 'name': name }, 'GET')];
            });
        });
    };
    /**
     * 申请或者修改一个友情链接
     * 如果修改，需要登陆且拥有管理员的权限
     * @param params 请求参数
     * @returns 返回操作成功的数据
     */
    DdServerApiByWeb.prototype.saveFriendsLink = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/friend/save', params, 'POST')];
            });
        });
    };
    /**
     * 查询全部友链
     * @param params 筛选条件
     * @returns 友链列表
     */
    DdServerApiByWeb.prototype.getFriends = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/friend/list', params, 'GET')];
            });
        });
    };
    /**
     * 根据分类名查询一个分类对象,可能会找不到
     * @param name 分类名
     * @returns 分类对象
     */
    DdServerApiByWeb.prototype.findBlogCategoryByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/blog/category/findByName', { name: name }, 'GET')];
            });
        });
    };
    /**
     *
     * 修改一个友情链接的数据
     * 注意事项：
     * 1. id不能为空
     * 2. 需要管理员权限
     * @param params 需要修改的参数
     * @returns
     */
    DdServerApiByWeb.prototype.updateFriendsObject = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/update-friends-obj', params, 'POST')];
            });
        });
    };
    /**
     * 删除某个友链
     * @param id 将要删除的友链对象ID
     * @returns 操作结果
     */
    DdServerApiByWeb.prototype.deleteFriendObject = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/delete-friends-obj', { id: id }, 'DELETE')];
            });
        });
    };
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
    DdServerApiByWeb.prototype.sendEmail = function (email, title, content, html) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/send-email', { email: email, title: title, content: content, html: html }, 'POST')];
            });
        });
    };
    /**
     * 发布动态
     * @param data 数据
     * @returns
     */
    DdServerApiByWeb.prototype.publishPost = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/resource/add-post', data, 'POST', 'form')];
            });
        });
    };
    /**
     * 删除一个资源
     * @param id    资源ID
     * @returns
     */
    DdServerApiByWeb.prototype.deleteResource = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/resource/delete', { id: id }, 'DELETE')];
            });
        });
    };
    /**
     * 查询一个资源分类
     * @param params 查询条件
     * @returns 查询结果，单个对象
     */
    DdServerApiByWeb.prototype.getResourceCategory = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/res/find', params, 'GET')];
            });
        });
    };
    /**
     * 获取资源子对象集合
     * @param id 分类ID
     */
    DdServerApiByWeb.prototype.getResourceSubObject = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/res/sub', { id: id }, 'GET')];
            });
        });
    };
    /**
     * 上传文件通用，
     * 需要管理员权限
     * @param file 上传的内容
     */
    DdServerApiByWeb.prototype.uploadFileWithSingle = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/simple-upload', file, 'POST')];
            });
        });
    };
    /**
     * 创建一个文档子目录,或者修改
     * @param params 参数 [CreateOrUpdateDocDirectoryParam]
     */
    DdServerApiByWeb.prototype.createOrUpdateDocDirectory = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/cate-director-action', params, 'POST')];
            });
        });
    };
    /**
     *
     * 管理员功能
     * 需要传入管理员账户的token
     * 查询某个字典的原始密码
     * @param selectKey 查询的关键字
     * @returns 原始密码结果
     */
    DdServerApiByWeb.prototype.adminSelectTextOriginPassword = function (selectKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/text/origin-password-select', { 'key': selectKey }, 'GET')];
            });
        });
    };
    /**
     * 获取全部ResourceCategory的已存在类型
     */
    DdServerApiByWeb.prototype.getResourceCategoryTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/rc/types', {}, 'GET')];
            });
        });
    };
    /**
     * 获取版本号列表
     * @param pageParam 分页参数,必填
     * @param selectParams 条件查询参数, 选填
     */
    DdServerApiByWeb.prototype.getVersionList = function (pageParam, selectParams) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/version/list', Object.assign(pageParam, selectParams), 'GET')];
            });
        });
    };
    /**
     * 上传文件通用
     * 后端接收的字段是 `file`
     * @param file 需要上传的文件
     *
     */
    DdServerApiByWeb.prototype.uploadPublic = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/file/upload', file, 'POST', 'form')];
            });
        });
    };
    /**
     * 删除某个文件
     * @param id FileInfo 的主键ID
     */
    DdServerApiByWeb.prototype.deleteFileinfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/file/delete', id, 'DELETE')];
            });
        });
    };
    /**
     * [需要管理员的权限]
     * 这是一个管理员功能, 专门用来修改的用户的密码,重新设置密码,但是需要记住以前设置的密码才能修改
     * @param currentPass 当前账号的密码
     * @param rePassword 重新设置的密码
     */
    DdServerApiByWeb.prototype.updateUserPasswordWithAdmin = function (currentPass, rePassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/user-update-pass', { currentPass: currentPass, rePassword: rePassword }, 'POST')];
            });
        });
    };
    /**
     * 获取用户信息
     * @param id 用户ID
     * @param loginNumber 用户登录名
     */
    DdServerApiByWeb.prototype.getUserDetail = function (id, loginNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/user-public/detail', { id: id, loginNumber: loginNumber })];
            });
        });
    };
    /**
     * 查询某个资源下的动态列表
     * @param page 分页数据
     * @param categoryId 可选  分类ID
     * @param params 可以 条件筛选参数
     * @param paramsHandle 参数回调
     */
    DdServerApiByWeb.prototype.getResourceList = function (page, categoryId, params, paramsHandle) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                obj = Object.assign(page, { categoryId: categoryId });
                paramsHandle && paramsHandle(obj);
                return [2 /*return*/, this.requestT('/api/resource/list', obj)];
            });
        });
    };
    /**
     * 获取全部动态类型
     */
    DdServerApiByWeb.prototype.getResourceAllTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/rc/types')];
            });
        });
    };
    /**
     * 获取全部资源分类列表
     */
    DdServerApiByWeb.prototype.getResourceCategoryAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/res/all')];
            });
        });
    };
    /**
     *
     * 提交一个留言
     * @param params 留言参数
     */
    DdServerApiByWeb.prototype.submitComment = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/comment/add', params, 'POST')];
            });
        });
    };
    /**
     * 查询评论列表
     * @param params 查询参数
     * @returns 查询结果
     */
    DdServerApiByWeb.prototype.findComment = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/comment/find', params, 'GET')];
            });
        });
    };
    /**
     * 删除某条评论
     * 需要管理员权限
     * @param id 主键
     */
    DdServerApiByWeb.prototype.removeComment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestT('/api/auth/comment/remove', { id: id }, 'DELETE')];
            });
        });
    };
    return DdServerApiByWeb;
}());
exports.default = DdServerApiByWeb;
