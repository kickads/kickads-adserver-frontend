import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice } from '../slices';

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

export const useStore = create<UserSlice>()(devtools((...a) => ({
  ...createUserSlice(...a)
})));