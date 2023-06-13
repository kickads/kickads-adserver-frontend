import { StateCreator } from 'zustand';
import { deleteCookie } from '../../helpers';
import { UserSlice } from './models';

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (credentials) => {
    set(() => ({ user: credentials }));
  },
  deleteUser: () => {
    deleteCookie('credentials');
    set(() => ({ user: null }));
  }
});