import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface Props {
  className: string
}

export function Loader({ className }: Props) {
  return <ArrowPathIcon className={ className } />;
}