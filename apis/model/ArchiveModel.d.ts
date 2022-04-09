import { Category } from "./result/BlogPushNewResultData";
export interface ArchiveModel {
    blogCount: number;
    cateCount: number;
    tagCount: number;
    categoryList: Category[];
    tags: Tag[];
    monthsCounts: MonthsCount[];
}
export interface MonthsCount {
    count: number;
    months: string;
}
export interface Tag {
    id: number;
    name: string;
}
