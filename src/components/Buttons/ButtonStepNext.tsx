interface ButtonStepNext {
  enabled: boolean;
}

export function ButtonStepNext({ enabled = true }: ButtonStepNext) {
  return (
    <div>
      <button
        disabled={ enabled }
        className={ `flex w-full justify-center rounded-md bg-kickads px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${ enabled && 'cursor-not-allowed opacity-80' } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kickads dark:bg-kickads` }
      >Siguiente</button>
    </div>
  );
}