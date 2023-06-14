import { StateCreator } from 'zustand';
import { deleteCookie } from '../../helpers';
import { UserSlice } from './models';

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  userToken: null,
  setUserAuth: (userCredentials, userToken) => {
    set(() => ({ user: userCredentials, userToken: userToken }));
  },
  removeUserAuth: () => {
    deleteCookie('userCredentials');
    deleteCookie('userToken');
    set(() => ({ user: null, userToken: null }));
  }
});