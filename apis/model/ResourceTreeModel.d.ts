import { ResourceModel } from "./ResourceModel";
export interface ResourceTreeModel {
    folders: TreeFolders;
    children: ResourceModel[];
}
export interface TreeFolders {
    title: string;
    id: number;
    hasChildren: boolean;
    childrenIds: number[];
    logo: string;
    children: TreeFolders[] | null;
    resources: ResourceModel[];
}
