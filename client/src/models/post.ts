export interface IPost {
  _id: string;
  title: string;
  commentsCount: number;
  text?: string;
  user: {
    _id: string;
    fullName: string;
    avatarUrl: string;
  };
  tags: string[];
  viewsCount: number;
  imageUrl: string;
  createdAt: string;
}
