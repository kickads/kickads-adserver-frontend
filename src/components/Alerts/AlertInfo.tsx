import { InformationCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  text: string;
}

export function AlertInfo({ text }: Props) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[448px] w-full rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-5 w-5 text-blue-400"/>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">{ text }</p>
          </div>
        </div>
      </div>
    </div>
  );
}