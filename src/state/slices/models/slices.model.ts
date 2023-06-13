import { User } from '../../../models';

export interface UserSlice {
  user: User | null,
  setUser: (credentials: User) => void,
  deleteUser: () => void,
}