import { Intersticial } from '../../models/intersticial.model.ts';

interface StepTwoProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  creative: Intersticial
}

export function StepTwo({ handleInputChange, creative }: StepTwoProps) {

  return (
    <form action="#" className="flex flex-col gap-8 py-8">
      <div>
        <label
          htmlFor="creativeClicksCant"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
        >Clicks</label>
        <div className="mt-2">
          <input
            type="number"
            id="creativeClicksCant"
            name="creativeClicksCant"
            value={ creative.creativeClicksCant ?? 0 }
            onChange={ (e) => handleInputChange(e) }
            placeholder="0"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-kickads ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white dark:focus:ring-kickads"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="creativeInteractionsCant"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
        >Interactions</label>
        <div className="mt-2">
          <input
            type="number"
            id="creativeInteractionsCant"
            name="creativeInteractionsCant"
            value={ creative.creativeInteractionsCant ?? 0 }
            onChange={ (e) => handleInputChange(e) }
            placeholder="0"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-kickads ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white dark:focus:ring-kickads"
            required
          />
        </div>
      </div>
    </form>
  );
}