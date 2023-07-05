import Stepper from 'awesome-react-stepper';
import { useEffect, useState } from 'react';

export function Creatives() {
  return (
    <div className="min-h-[calc(100vh-64px)] py-6 lg:min-h-[calc(100vh-56px)] max-w-lg mx-auto">
      <Stepper
        activeColor="#14a8a4"
        fillStroke="#14a8a4"
        strokeColor="rgba(20, 168, 164, .2)"
        barWidth="200px"
        btnPos="center"
        activeProgressBorder="0px"
        continueBtn={ <ButtonStepNext /> }
        backBtn={ <ButtonStepPrevious /> }
        submitBtn={ <ButtonStepSave /> }
        allowClickControl={ false }
      >
        <div>
          <StepOne />
        </div>
        <div>
          <StepTwo />
        </div>
        <div>
          <StepThree />
        </div>
      </Stepper>
    </div>
  );
}

function StepOne() {
  return (
    <form action="#" className="flex flex-col gap-8 py-8">

      <div>
        <label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Cliente</label>
        <div className="mt-2">
          <select
            id="client"
            required
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
        <label htmlFor="format" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Formato ITT</label>
        <div className="mt-2">
          <select
            id="format"
            required
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
        <label htmlFor="business-model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Business Model</label>
        <div className="mt-2">
          <select
            id="business-model"
            required
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
        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">País</label>
        <div className="mt-2">
          <select
            id="country"
            required
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

function StepTwo() {
  return (
    <form action="#" className="flex flex-col gap-8 py-8">

      <div>
        <label htmlFor="clicks" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Clicks</label>
        <div className="mt-2">
          <input
            type="number"
            id="clicks"
            placeholder="Cantidad de clicks"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="interactions" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Interactions</label>
        <div className="mt-2">
          <input
            type="number"
            id="interactions"
            placeholder="Cantidad de interactiones"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
            required
          />
        </div>
      </div>

    </form>
  )
}

function StepThree() {
  const cant = 4;
  const [ clicksCant, setClicksCant ] = useState<number[]>([]);
  const [ interactionsCant, setInteractionsCant ] = useState<number[]>([]);

  useEffect(() => {
    for (let i = 0; i < cant; i++) {
      setClicksCant(oldValue => [ ...oldValue, i ]);
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < cant; i++) {
      setInteractionsCant(oldValue => [ ...oldValue, i ]);
    }
  }, []);


  return (
    <form action="#" className="flex flex-col gap-8 py-8">
      <h2 className="block text-lg font-inter font-medium leading-6 text-gray-900 dark:text-gray-300">Clicks</h2>

      {
        clicksCant.map((value, index) => (
          <div key={ value }>
            <div className="mt-2">
              <input
                type="text"
                id="clicks"
                placeholder={ `Nombre click ${ index +  1 }` }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
        ))
      }


      <h2 className="block text-lg font-inter font-medium leading-6 text-gray-900 dark:text-gray-300">Interacciones</h2>
      {
        interactionsCant.map((value, index) => (
          <div key={ value }>
            <div className="mt-2">
              <input
                type="text"
                id="clicks"
                placeholder={ `Nombre Interacción ${ index +  1 }` }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
        ))
      }

    </form>
  )
}


function ButtonStepNext() {
  return (
    <div>
      <button className="flex w-full justify-center rounded-md bg-kickads px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kickads dark:bg-kickads">Siguiente</button>
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