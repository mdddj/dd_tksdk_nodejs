export default class PushNewBlogParams {
    title: string;
    content: string;
    tags: string[];
    categoryId: number;
    alias?: string;
    thumbnail?: string;
    id?: number;
    constructor(title: string, content: string, tags: string[], categoryId: number);
}
