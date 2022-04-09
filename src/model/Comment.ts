import { BlogData } from "./result/BlogPushNewResultData";

export interface Comment {
    id: number;
    email: string;
    website: string;
    content: string;
    findKey: string;
    name: string;
    code: null;
    parentComment: Comment | undefined;
    type: string;
    blog: BlogData | undefined;
    childComment: Comment[];
    createDate: number;
    avatarUrl: string | undefined;
    likeUsers: null;
}
