import { FileInfo } from "./FileInfo";
import { ResCategory } from "./ResCategory";
import { User } from "./UserModel";
export interface ResourceModel {
    title: string;
    label: string;
    thumbnailImage: string;
    createDate: Date;
    updateDate: Date;
    description: string;
    links: string;
    type: string;
    clickCount: number;
    content: string;
    category: ResCategory | undefined;
    user?: User;
    images?: FileInfo[] | undefined;
    id: number;
}
/**
 * 发布动态返回的结果数据。
 */
export interface PublishPostResult {
    images: FileInfo[] | undefined;
    post: ResourceModel;
}
