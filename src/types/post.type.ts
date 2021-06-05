
import { Group } from "./group.type";
import { User } from "./user.type";

export interface Media {
  filename: string;
  baseurl: string;
}

export interface PostInput {
  userId:string;
  parentId?: string;
  grpId?: string;
  text: string;
  Media?: Media[];
}

export enum PostType {
  public = "Public",
  private = "Private"
}

export interface Post {
  postId: string;
  grpId?: string;
  Parent?: Post;
  parentId?: string;
  HasChildren?: boolean;
  children?: Post[];
  User: User;
  Group?:Group;
  userId: string;
  text?: string;
  Media?: Media[];
  createdDate: string;
  updateDate?: string;
}
