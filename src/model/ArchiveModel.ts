// To parse this data:
//
//   import { Convert, ArchiveModel } from "./file";
//
//   const archiveModel = Convert.toArchiveModel(json);

import { Category, Tag } from '@/model/BlogModel';

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
