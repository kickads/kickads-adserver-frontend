import { Link, useRouteError } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import getImagePath from '../../helpers/GetImagePath/getImagePath.ts';

export function NotFound() {
  const error = useRouteError();
  console.log(error);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div className="max-w-6xl">
        <img src={ getImagePath('notFound/not-found.png') } alt="Not found 404"/>
      </div>
      <h2 className="text-red-400 text-2xl text-center font-exo font-semibold md:text-4xl lg:text-6xl">Página no encontrada <br/> 404</h2>
      <Link to="/" className="flex items-center justify-center gap-1 p-2 bg-red-400 text-white font-inter rounded-xl">
        <span>
          <ChevronLeftIcon className="h-6" />
        </span>
        Volver
      </Link>
    </section>
  );
}