import { Group } from "./group.type";
import { User } from "./user.type";

export interface invite{
  InviteId: string;
  Host?: User;
  hostId: string;
  Guest?: User;
  guestId: string;
  Group: Group;
  grpId: string;
  InviteState: InviteStateEnum;
  createdDate: Date;
  updateDate?: Date;
}

export enum InviteStateEnum {
  Accepted = "Accepted",
  Rejected = "Rejected",
  Pending = "Pending"
}
