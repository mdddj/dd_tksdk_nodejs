import { User } from "./UserModel";
export interface ResCategory {
    id: number;
    name: string;
    logo: string;
    description: string;
    announcement: any;
    users: User[];
    type: string | undefined;
    childers: ResCategory[];
    parentNode: ResCategory | undefined;
    navJsonString: string | undefined;
}
