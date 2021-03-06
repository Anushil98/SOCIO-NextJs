import { User } from "./user.type";

export interface Group{
  grpId: string;
  cover:string;
  Owner?: User;
  ownerId: string;
  grpName: string;
  grpHandle: string;
  grpBio: string;
  createdDate: Date;
  updateDate?: Date;
}