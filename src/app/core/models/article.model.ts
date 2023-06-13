export interface Article {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  writer: {
    id: string;
    username: string;
  };
}
