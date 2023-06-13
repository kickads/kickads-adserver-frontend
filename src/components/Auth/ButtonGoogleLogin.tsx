import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';
import logoGoogle from '../../assets/images/logos/google.svg';
import { useStore } from '../../state/store';

export function ButtonGoogleLogin() {
  const setUser = useStore(state => state.setUser);
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const accessToken = tokenResponse.access_token;
      const res = await axios.post(`http://localhost/api/auth/login`, { accessToken });

      setUser(res.data.data.user);
      Cookies.set('credentials', JSON.stringify(res.data.data.user));
    },
  });

  return (
    <button className="flex items-center bg-gray-100 rounded-3xl p-1" onClick={ () => login()  }>
      <span>
        <img src={ logoGoogle } alt="Logo google" width="40"/>
      </span>
      <p className="px-4 font-inter font-semibold">Iniciar sesión con Google</p>
    </button>
  );
}