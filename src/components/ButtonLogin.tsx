import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

export function ButtonLogin() {
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const accessToken = tokenResponse.access_token;
      const res = await axios.post(`http://localhost/api/auth/login`, { accessToken });

      console.log(res);
    },
  });
  return (
    <>
      <h2>ButtonLogin</h2>
      <button onClick={ () => login() }>
        <img
          src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png"
          alt="google login"
          width="200"
        />
      </button>
    </>
  );
}