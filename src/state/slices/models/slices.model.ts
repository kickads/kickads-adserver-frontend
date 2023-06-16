import { User } from '../../../models/User/user.model.ts';

export interface UserSlice {
  user: User | null,
  userToken: string | null,
  setUserAuth: (userCredentials: User, userToken: string) => void,
  removeUserAuth: () => void,
}