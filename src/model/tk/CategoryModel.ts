export interface TCategory {
    cname:         string;
    cpic:          string;
    subcategories: TSubcategory[];
    cid:           number;
}

export interface TSubcategory {
    subcid:   number;
    scpic:    string;
    subcname: string;
}
