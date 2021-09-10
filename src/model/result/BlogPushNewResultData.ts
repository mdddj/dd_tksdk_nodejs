// To parse this data:
//
//   import { Convert, BlogPushNewResultData } from "./file";
//
//   const blogPushNewResultData = Convert.toBlogPushNewResultData(json);

import {PagerModel} from "../../utils/ResultUtil";

export interface BlogPushNewResultData {
  state:   number;
  message: string;
  data:    BlogData;
}

export interface BlogData {
  id:         number;
  title:      string;
  content:    string;
  createTime: number;
  category:   Category;
  author:     string;
  thumbnail:  null;
  dateString: string;
}

export interface Category {
  id:         number;
  name:       string;
  logo:       string;
  intro:      string;
  createTime: number;
}

export interface BlogListData {
  page: PagerModel;
  list: Array<BlogData>;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toBlogPushNewResultData(json: string): BlogPushNewResultData {
    return JSON.parse(json);
  }

  public static blogPushNewResultDataToJson(value: BlogPushNewResultData): string {
    return JSON.stringify(value);
  }
}
