import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice } from '../slices';
import { UserSlice } from '../slices/models';

export const useStore = create<UserSlice>()(devtools((...a) => ({
  ...createUserSlice(...a)
})));