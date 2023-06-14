import { useGoogleLogin } from '@react-oauth/google';
import { useStore } from '../../state/store';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config';
import logoGoogle from '../../assets/images/logos/google.svg';
import { setCookie } from '../../helpers';
import { User } from '../../models';

export interface UserResponse {
  data: ApiResponse;
}

export interface ApiResponse {
  user_token: string;
  user: User;
  status: string;
}

async function loginUser(accessToken: string): Promise<ApiResponse> {
  const { data: { data } } = await axiosInstance.post<UserResponse>(`auth/login`, { accessToken });

  return data;
}

export function ButtonGoogleLogin() {
  const setUserAuth = useStore(state => state.setUserAuth);
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const accessToken = tokenResponse.access_token;
      const loginPromise = loginUser(accessToken);

      await toast.promise(loginPromise, {
        loading: 'Iniciando Sesión',
        success: 'Bienvenido!',
        error: 'Error al iniciar sesión'
      })

      const { user, user_token } = await loginPromise;

      setUserAuth(user, user_token);
      setCookie('userCredentials', JSON.stringify(user));
      setCookie('userToken', JSON.stringify(user_token));
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