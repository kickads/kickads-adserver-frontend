import { User } from '../../../models';

export interface UserSlice {
  user: User,
  setUser: (credentials: User) => void
}