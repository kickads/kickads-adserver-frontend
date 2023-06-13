import { StateCreator } from 'zustand';
import Cookies from 'js-cookie';

interface UserSlice {
  user: User,
  setUser: (credentials: User) => void
}

interface User {
  id: string,
  name: string,
  email: string,
  role: string,
  avatar?: string,
}

const credentials = Cookies.get('credentials');
const initialState = JSON.parse(credentials ?? '{}');

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: initialState,
  setUser: (credentials) => {
    set(() => ({ user: credentials }));
  }
});