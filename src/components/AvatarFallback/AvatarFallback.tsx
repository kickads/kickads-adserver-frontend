import { useState } from 'react';

interface PropsImage {
  src: string,
  alt: string,
  className: string
}

export function AvatarFallback({ src, alt, className }: PropsImage): JSX.Element {
  const [ isError, setIsError ] = useState(false);

  if (isError) {
    return <AvatarInitials name={ alt } />;
  }

  return <img
    src={ src }
    alt={ alt }
    className={ className }
    onError={ () => setIsError(true) }
  />
}

interface FallbackAvatar {
  name: string
}

function AvatarInitials({ name }: FallbackAvatar): JSX.Element {
  return <div className="flex items-center justify-center font-inter text-lg h-10 bg-slate-400 text-white uppercase rounded-full">{ name.charAt(0) }</div>
}