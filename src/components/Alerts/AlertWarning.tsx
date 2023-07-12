import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface AlertWarning {
  text: string;
}

export function AlertWarning({ text }: AlertWarning) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[448px] w-full rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationCircleIcon className="h-5 w-5 text-yellow-400"/>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-yellow-700">{ text }</p>
          </div>
        </div>
      </div>
    </div>
  );
}