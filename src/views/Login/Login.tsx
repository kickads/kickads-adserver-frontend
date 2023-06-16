import { HeartIcon } from '@heroicons/react/24/solid';
import { ButtonGoogleLogin } from '../../components/Auth/ButtonGoogleLogin.tsx';
import getImagePath from '../../helpers/GetImagePath/getImagePath.ts';

export function Login() {
  return (
    <>
      <section className="hidden min-h-screen lg:flex dark:bg-slate-800">
        <div
          style={{backgroundImage: `url(${ getImagePath('mural-kickads.png') })`}}
          className="w-8/12 bg-[size:125%] bg-no-repeat bg-[-300px]"
        ></div>
        <div className="w-4/12 flex flex-col gap-8 items-center justify-center">
          <h2 className="text-zinc-700 font-exo font-black text-6xl text-center dark:text-white">Kickads <br/> Adserver 2.0</h2>
          <ButtonGoogleLogin />
          <p className="flex items-center text-zinc-500 font-exo text-sm dark:text-slate-400">Hecho con <span className="mx-1"><HeartIcon className="h-5 text-red-600" /></span> esta vez</p>
        </div>
      </section>

      <section
        style={{backgroundImage: `url(${ getImagePath('mural-kickads.png') })`}}
        className="min-h-screen bg-cover bg-[center_bottom_-20rem] bg-no-repeat lg:hidden dark:bg-slate-800"
      >
        <div className="flex flex-col gap-8 py-6 rounded-3xl">
          <h2 className="text-zinc-700 font-exo font-black text-3xl text-center md:text-5xl dark:text-white">Kickads <br/> Adserver 2.0</h2>
          <div className="flex justify-center">
            <ButtonGoogleLogin />
          </div>
          <p className="flex justify-center items-center text-zinc-500 font-exo text-sm dark:text-slate-400">Hecho con <span className="mx-1"><HeartIcon className="h-5 text-red-600" /></span> esta vez</p>
        </div>
      </section>
    </>
  );
}