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
  ismember?:string
  updateDate?: string;
}
export type UserType = "Private" | "Public";


export interface AuthPayload {
  accessToken: string;
  refreshAccessToken: string;
  userId: string;
}
