import { useNavigate } from 'react-router-dom';

interface Props {
  className: string,
  children: JSX.Element,
  redirect: string
}

export function RedirectButton({ children, className, redirect }: Props) {
  const navigate = useNavigate();

  return (
    <button className={ className } onClick={ () => navigate(redirect) } >
      { children }
    </button>
  );
}