export interface IUserData {
  _id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  isActive: boolean;
}

export interface IUser {
  userData: IUserData | null;
  accessToken: string | null;
}
