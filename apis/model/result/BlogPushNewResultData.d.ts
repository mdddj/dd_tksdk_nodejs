import { PagerModel } from "../../utils/ResultUtil";
export interface BlogPushNewResultData {
    state: number;
    message: string;
    data: BlogData;
}
export interface BlogData {
    id: number;
    title: string;
    content: string;
    createTime: number;
    category: Category;
    author: string;
    thumbnail: null;
    dateString: string;
}
export interface Category {
    id: number;
    name: string;
    logo: string;
    intro: string;
    createTime: number;
}
export interface BlogListData {
    page: PagerModel;
    list: Array<BlogData>;
}
export declare class Convert {
    static toBlogPushNewResultData(json: string): BlogPushNewResultData;
    static blogPushNewResultDataToJson(value: BlogPushNewResultData): string;
}
