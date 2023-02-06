export interface IComment {
  _id: string;
  comment: string;
  user: {
    _id: string;
    fullName: string;
    avatarUrl: string;
  };
  createdAt: string;
}
