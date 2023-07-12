import { useEffect, useState } from 'react';
import { AlertWarning } from '../../../../components/Alerts/AlertWarning.tsx';
import { Intersticial } from '../../models/intersticial.model.ts';

interface StepThreeProps {
  creative: Intersticial,
  handleInteractionsChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleClicksChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export function StepThree({ creative, handleClicksChange, handleInteractionsChange }: StepThreeProps) {
  const [ clicksCant, setClicksCant ] = useState<number[]>([]);
  const [ interactionsCant, setInteractionsCant ] = useState<number[]>([]);

  useEffect(() => {
    if (!creative.creativeClicksCant) return;

    for (let i = 0; i < creative.creativeClicksCant; i++) {
      setClicksCant(oldValue => [ ...oldValue, i ]);
    }
  }, []);

  useEffect(() => {
    if (!creative.creativeInteractionsCant) return;

    for (let i = 0; i < creative.creativeInteractionsCant; i++) {
      setInteractionsCant(oldValue => [ ...oldValue, i ]);
    }
  }, []);

  return (
    <form action="#" className="flex flex-col gap-8 py-8">
      <h2 className="block text-lg font-inter font-medium leading-6 text-gray-900 dark:text-gray-300">Clicks</h2>
      {
        clicksCant.length
          ? (
            clicksCant.map((value, index) => (
              <div key={ value }>
                <div className="mt-2">
                  <input
                    type="text"
                    name={ `click-${ index + 1 }` }
                    id="clicks"
                    placeholder={ `Nombre click ${ index + 1 }` }
                    onChange={ (e) => handleClicksChange(e) }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>
            ))
          )
          : <AlertWarning text="No hay clicks."/>
      }
      <h2 className="block text-lg font-inter font-medium leading-6 text-gray-900 dark:text-gray-300">Interacciones</h2>
      {
        interactionsCant.length
          ? (
            interactionsCant.map((value, index) => (
              <div key={ value }>
                <div className="mt-2">
                  <input
                    type="text"
                    name={ `interaction-${ index + 1 }` }
                    id="clicks"
                    placeholder={ `Nombre Interacción ${ index + 1 }` }
                    onChange={ (e) => handleInteractionsChange(e) }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>
            ))
          )
          : <AlertWarning text="No hay interacciones."/>
      }
    </form>
  );
}
