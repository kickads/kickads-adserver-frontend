import cloudsnotFound from '../../assets/images/notFound/not-found.png';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div className="max-w-6xl">
        <img src={ cloudsnotFound } alt="Not found 404"/>
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