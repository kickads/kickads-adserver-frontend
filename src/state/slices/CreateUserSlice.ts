import { StateCreator } from 'zustand';
import { UserSlice } from './models/slices.model.ts';
import { deleteCookie, getCookie } from '../../helpers/Cookies/cookies.helper.ts';

const userInitialState = getCookie('userCredentials') ? JSON.parse(getCookie('userCredentials') ?? '{}') : null;
const userTokenInitialState = getCookie('userToken') ? JSON.parse(getCookie('userToken') ?? '') : null;

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: userInitialState,
  userToken: userTokenInitialState,
  setUserAuth: (userCredentials, userToken) => {
    set(() => ({ user: userCredentials, userToken: userToken }));
  },
  removeUserAuth: () => {
    deleteCookie('userCredentials');
    deleteCookie('userToken');
    set(() => ({ user: null, userToken: null }));
  }
});