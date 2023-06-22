import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface Props {
  className: string
}

export function Loader({ className }: Props) {
  return (
    <div className="overflow-hidden w-full">
      <ArrowPathIcon className={ className } />
    </div>
  );
}