import { PlusIcon } from '@heroicons/react/24/outline';
import { RedirectButton } from '../../../components/Buttons/RedirectButton.tsx';

export function IntersticialHome() {
  return (
    <>
      <RedirectButton
        className="absolute bottom-3 right-3 flex items-center justify-center bg-gray-200 w-11 h-11 rounded-full dark:bg-gray-700"
        redirect="create"
      >
        <PlusIcon className="h-5 stroke-gray-500 hover:stroke-gray-900 dark:stroke-gray-300 dark:hover:stroke-white" />
      </RedirectButton>
    </>
  );
}