import { User } from '../../../models';

export interface UserSlice {
  user: User | null,
  userToken: string | null,
  setUserAuth: (userCredentials: User, userToken: string) => void,
  removeUserAuth: () => void,
}