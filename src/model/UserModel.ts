
export interface User {
    id: number;
    loginNumber: string;
    nickName: string;
    email: string | null;
    picture: string;
    phone: String | null;
    loginTime: null;
    type: number;
    roles: Role[];
    resourcesCategories: any[];
    status: number;
    salt: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    createDate: number;
    status: number;
    roleSort: number;
}
