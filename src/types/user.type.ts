export interface User {
  id: string;
  UserType?: UserType;
  email?: string;
  username: string;
  firstname: string;
  lastname: string;
  bio?: string;
  avatar: string;
  cover?: string;
  createdDate?: string;
  updateDate?: string;
}
export type UserType = "Private" | "Public";