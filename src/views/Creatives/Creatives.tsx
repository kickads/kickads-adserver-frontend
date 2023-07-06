import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from 'awesome-react-stepper';
import { addDoc, collection } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { db } from '../../config/firebase/firebase.config.ts';

interface Creative{
  creativeClientName: string,
  creativeFormatName: string,
  creativeBusinessModel: string,
  creativeCountry: string,
  creativeClicksCant?: number,
  creativeInteractionsCant?: number,
}

export function Creatives() {
  const navigate = useNavigate();
  const [ clicks, setClicks ] = useState({});
  const [ interactions, setInteractions ] = useState({});
  const [ enabledButtonStepNextOne, setEnabledButtonStepNextOne ] = useState(true);
  const [ creative, setCreative ] = useState<Creative>({
    creativeClientName: '',
    creativeFormatName: '',
    creativeBusinessModel: '',
    creativeCountry: '',
    creativeClicksCant: 0,
    creativeInteractionsCant: 0,
  });

  useEffect(() => {
    if (creative.creativeClientName.length && creative.creativeFormatName.length && creative.creativeBusinessModel.length && creative.creativeCountry.length) {
      setEnabledButtonStepNextOne(false);
    }
  }, [ creative ]);

  const handleClicksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClicks(oldValue => ({...oldValue, [e.target.name] : e.target.value }))
  }

  const handleInteractionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInteractions(oldValue => ({...oldValue, [e.target.name] : e.target.value }))
  }

  const handleInputSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreative(oldValue => ({...oldValue, [e.target.name] : e.target.value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreative(oldValue => ({...oldValue, [e.target.name] : e.target.value }))
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-6 lg:min-h-[calc(100vh-56px)] max-w-lg mx-auto">
      <Stepper
        activeColor="#14a8a4"
        fillStroke="#14a8a4"
        strokeColor="rgba(20, 168, 164, .2)"
        barWidth="200px"
        btnPos="center"
        activeProgressBorder="0px"
        continueBtn={ <ButtonStepNext enabled={ enabledButtonStepNextOne } /> }
        backBtn={ <ButtonStepPrevious /> }
        submitBtn={ <ButtonStepSave /> }
        allowClickControl={ false }
        onSubmit={ async () => {
          const docRef = addDoc(collection(db, `creatives/${ creative.creativeClientName }/${ creative.creativeFormatName }`), {
            ...creative,
            clicks: Object.fromEntries(Object.values(clicks).map(clicks => ([clicks, 0]))),
            interactions: Object.fromEntries(Object.values(interactions).map(interaction => ([interaction, 0]))),
          });

          await toast.promise(docRef, {
            loading: 'Creando',
            success: 'Creado',
            error: 'Error al crear',
          });

          navigate('/admin')
        }}
      >
        <div>
          <StepOne creative={ creative } handleInputSelectChange={ handleInputSelectChange } />
        </div>
        <div>
          <StepTwo creative={ creative } handleInputChange={ handleInputChange } />
        </div>
        <div>
          <StepThree creative={ creative } handleClicksChange={ handleClicksChange } handleInteractionsChange={ handleInteractionsChange } />
        </div>
      </Stepper>
    </div>
  );
}

interface StepOneProps {
  handleInputSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  creative: Creative
}
function StepOne({ handleInputSelectChange, creative }: StepOneProps) {
  return (
    <form action="#" className="flex flex-col gap-8 py-8">

      <div>
        <label htmlFor="creativeClientName" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Cliente</label>
        <div className="mt-2">
          <select
            id="creativeClientName"
            name="creativeClientName"
            required
            value={ creative.creativeClientName ?? '' }
            onChange={ (e) => handleInputSelectChange(e) }
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 capitalize placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
          >
            <option value="">Seleccionar</option>
            <option value="sernova">sernova</option>
            <option value="barbie">barbie</option>
            <option value="liliana">liliana</option>
            <option value="naldo">naldo</option>
            <option value="pepsi">pepsi</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="creativeFormatName" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Formato ITT</label>
        <div className="mt-2">
          <select
            id="creativeFormatName"
            name="creativeFormatName"
            required
            value={ creative.creativeFormatName ?? '' }
            onChange={ (e) => handleInputSelectChange(e) }
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 capitalize placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
          >
            <option value="">Seleccionar</option>
            <option value="zoomAd">zoomAd</option>
            <option value="galleryAd">galleryAd</option>
            <option value="weatherAd">weatherAd</option>
            <option value="touchAd">touchAd</option>
            <option value="fliAd">fliAd</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="creativeBusinessModel" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Business Model</label>
        <div className="mt-2">
          <select
            id="creativeBusinessModel"
            required
            value={ creative.creativeBusinessModel ?? '' }
            name="creativeBusinessModel"
            onChange={ (e) => handleInputSelectChange(e) }
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 capitalize placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
          >
            <option value="">Seleccionar</option>
            <option value="pmp">pmp</option>
            <option value="branding">branding</option>
            <option value="performance">performance</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="creativeCountry" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">País</label>
        <div className="mt-2">
          <select
            id="creativeCountry"
            required
            value={ creative.creativeCountry ?? '' }
            name="creativeCountry"
            onChange={ (e) => handleInputSelectChange(e) }
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 capitalize placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
          >
            <option value="">Seleccionar</option>
            <option value="argentina">argentina</option>
            <option value="mexico">mexico</option>
            <option value="chile">chile</option>
            <option value="colombia">colombia</option>
            <option value="españa">españa</option>
          </select>
        </div>
      </div>

    </form>
  )
}

interface StepTwoProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  creative: Creative
}
function StepTwo({ handleInputChange, creative }: StepTwoProps) {
  return (
    <form action="#" className="flex flex-col gap-8 py-8">

      <div>
        <label htmlFor="creativeClicksCant" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Clicks</label>
        <div className="mt-2">
          <input
            type="number"
            id="creativeClicksCant"
            name="creativeClicksCant"
            value={ creative.creativeClicksCant ?? 0 }
            onChange={ (e) => handleInputChange(e) }
            placeholder="0"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="creativeInteractionsCant" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Interactions</label>
        <div className="mt-2">
          <input
            type="number"
            id="creativeInteractionsCant"
            name="creativeInteractionsCant"
            value={ creative.creativeInteractionsCant ?? 0 }
            onChange={ (e) => handleInputChange(e) }
            placeholder="0"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
            required
          />
        </div>
      </div>

    </form>
  )
}

interface StepThreeProps {
  creative: Creative,
  handleInteractionsChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleClicksChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
function StepThree({ creative, handleClicksChange, handleInteractionsChange }: StepThreeProps) {
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
                      name={ `click-${ index +  1 }` }
                      id="clicks"
                      placeholder={ `Nombre click ${ index +  1 }` }
                      onChange={ (e) => handleClicksChange(e) }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
              ))
            )
          : <AlertWarning text="No hay clicks." />
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
                    name={ `interaction-${ index +  1 }` }
                    id="clicks"
                    placeholder={ `Nombre Interacción ${ index +  1 }` }
                    onChange={ (e) => handleInteractionsChange(e) }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>
            ))
          )
          : <AlertWarning text="No hay interacciones." />
      }

    </form>
  )
}





//   :::::: Custom Buttons
interface ButtonStepNext {
  enabled: boolean
}
function ButtonStepNext({ enabled = true }: ButtonStepNext) {
  return (
    <div>
      <button disabled={ enabled } className={ `flex w-full justify-center rounded-md bg-kickads px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${ enabled && 'cursor-not-allowed opacity-80'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kickads dark:bg-kickads` }>Siguiente</button>
    </div>
  )
}

function ButtonStepPrevious() {
  return (
    <div>
      <button className="flex w-full justify-center rounded-md bg-kickads px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kickads dark:bg-kickads">Anterior</button>
    </div>
  )
}

function ButtonStepSave() {
  return (
    <div>
      <button className="flex w-full justify-center rounded-md bg-kickads px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kickads dark:bg-kickads">Guardar</button>
    </div>
  )
}

interface AlertWarning {
  text: string
}
function AlertWarning({ text }:  AlertWarning) {
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