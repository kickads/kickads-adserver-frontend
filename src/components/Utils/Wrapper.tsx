interface Props {
  children: React.ReactNode,
  className?: string
}

export function Wrapper({ children, className }: Props) {
  return (
    <div className={ `max-w-[1366px] mx-auto ${ className }`}>
      { children }
    </div>
  );
}