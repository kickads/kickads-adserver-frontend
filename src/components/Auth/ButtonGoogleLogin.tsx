import { useGoogleLogin } from '@react-oauth/google';
import { useStore } from '../../state/store';
import { axiosInstance } from '../../config';
import logoGoogle from '../../assets/images/logos/google.svg';
import { setCookie } from '../../helpers';
import { User } from '../../models';

export interface UserResponse {
  data: Data;
}

export interface Data {
  kads_token: string;
  user: User;
  status: string;
}

export function ButtonGoogleLogin() {
  const setUser = useStore(state => state.setUser);
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const accessToken = tokenResponse.access_token;
      const { data: { data } } = await axiosInstance.post<UserResponse>(`auth/login`, { accessToken });

      setUser(data.user);
      setCookie('credentials', JSON.stringify(data.user));
    },
  });

  return (
    <button className="flex items-center bg-gray-100 rounded-3xl p-1" onClick={ () => login() }>
      <span>
        <img src={ logoGoogle } alt="Logo google" width="40"/>
      </span>
      <p className="px-4 font-inter font-semibold">Iniciar sesión con Google</p>
    </button>
  );
}