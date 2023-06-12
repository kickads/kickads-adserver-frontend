import { ArrowPathIcon } from '@heroicons/react/24/outline';

export function Guest() {
  return (
    <>
      <section className="hidden min-h-screen lg:flex">
        <div className="w-8/12 bg-mural-kickads-mono bg-[size:125%] bg-no-repeat bg-[-300px]"></div>
        <div className="w-4/12 flex flex-col gap-8 items-center justify-center">
          <div className="overflow-hidden">
            <img
              src="https://i.pravatar.cc/300"
              alt="Avatar"
              className="mx-auto w-36 rounded-full grayscale"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-zinc-700 font-exo font-black text-5xl text-center">En Proceso...</h2>
            <div>
              <ol className="w-fit mx-auto">
                <li className='flex items-center gap-1 text-sm text-zinc-600 md:text-lg'>
                  <ArrowPathIcon className="w-4 animate-spin md:w-5" />
                  Tu acceso esta en proceso de aprobación
                </li>
                <li className='flex items-center gap-1 text-sm text-zinc-600 md:text-lg'>
                  <ArrowPathIcon className="w-4 animate-spin md:w-5" />
                  Ya aprobado recibirás una confirmación por email
                </li>
                <li className='flex items-center gap-1 text-sm text-zinc-600 md:text-lg'>
                  <ArrowPathIcon className="w-4 animate-spin md:w-5" />
                  Finalmente ya podrás acceder al AdServer
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-mural-kickads-mono bg-cover bg-[center_bottom_-20rem] bg-no-repeat md:bg-[center_bottom_-23rem] lg:hidden">
        <div className="flex flex-col gap-8 py-6 bg-white rounded-3xl">
          <div className="overflow-hidden">
            <img
              src="https://i.pravatar.cc/300"
              alt="Avatar"
              className="mx-auto w-24 rounded-full grayscale sm:w-36"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center justify-center gap-2 text-zinc-700 font-exo font-black text-3xl text-center md:text-5xl">
              En Proceso...
            </h2>
            <div>
              <ol className="w-fit mx-auto">
                <li className='flex items-center gap-1 text-sm text-zinc-600 md:text-lg'>
                  <ArrowPathIcon className="w-4 animate-spin md:w-5" />
                  Tu acceso esta en proceso de aprobación
                </li>
                <li className='flex items-center gap-1 text-sm text-zinc-600 md:text-lg'>
                  <ArrowPathIcon className="w-4 animate-spin md:w-5" />
                  Ya aprobado recibirás una confirmación por email
                </li>
                <li className='flex items-center gap-1 text-sm text-zinc-600 md:text-lg'>
                  <ArrowPathIcon className="w-4 animate-spin md:w-5" />
                  Finalmente ya podrás acceder al AdServer
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}