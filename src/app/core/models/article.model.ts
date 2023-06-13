import { User } from 'src/app/core/models/user.model';

export interface Article {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  writer: Omit<User, 'email'>;
}
