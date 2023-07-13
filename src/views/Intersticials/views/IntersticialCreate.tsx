import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Stepper from 'awesome-react-stepper';
import { StepThree } from '../components/steps/StepThree.tsx';
import { StepTwo } from '../components/steps/StepTwo.tsx';
import { StepOne } from '../components/steps/StepOne.tsx';
import { ButtonStepNext } from '../../../components/Buttons/ButtonStepNext.tsx';
import { ButtonStepPrevious } from '../../../components/Buttons/ButtonStepPrevious.tsx';
import { ButtonStepSave } from '../../../components/Buttons/ButtonStepSave.tsx';
import { axiosInstance } from '../../../config/axios/axios.config.ts';
import { Intersticial } from '../models/intersticial.model.ts';

export function IntersticialCreate() {
  const navigate = useNavigate();
  const [ clicks, setClicks ] = useState({});
  const [ interactions, setInteractions ] = useState({});
  const [ enabledButtonStepNextOne, setEnabledButtonStepNextOne ] = useState(true);
  const [ creative, setCreative ] = useState<Intersticial>({
    name: 'test 1',
    start_day: '2023-07-07',
    end_day: '2023-07-20',
    client_id: '',
    creative_id: '',
    business_model_id: '',
    country_id: '',
    creativeClicksCant: 0,
    creativeInteractionsCant: 0,
  });

  useEffect(() => {
    if (creative.client_id.length && creative.creative_id.length && creative.business_model_id.length && creative.country_id.length) {
      setEnabledButtonStepNextOne(false);
    } else {
      setEnabledButtonStepNextOne(true);
    }
  }, [ creative ]);

  const handleClicksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClicks(oldValue => ({ ...oldValue, [e.target.name]: e.target.value }));
  };

  const handleInteractionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInteractions(oldValue => ({ ...oldValue, [e.target.name]: e.target.value }));
  };

  const handleInputSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreative(oldValue => ({ ...oldValue, [e.target.name]: e.target.value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreative(oldValue => ({ ...oldValue, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-6 max-w-lg mx-auto">
      <Stepper
        activeColor="#14a8a4"
        fillStroke="#14a8a4"
        strokeColor="rgba(20, 168, 164, .2)"
        barWidth="200px"
        btnPos="center"
        activeProgressBorder="0px"
        continueBtn={ <ButtonStepNext enabled={ enabledButtonStepNextOne }/> }
        backBtn={ <ButtonStepPrevious/> }
        submitBtn={ <ButtonStepSave/> }
        allowClickControl={ false }
        onSubmit={ async () => {
          const clicksCollection: string[] = Object.values(clicks);
          const interactionsCollection: string[] = Object.values(interactions);

          const createIntersticialPromise = axiosInstance.post('intersticials', {
            intersticial: creative,
            clicks: clicksCollection,
            interactions: interactionsCollection,
          });

          await toast.promise(createIntersticialPromise, {
            loading: 'Creando',
            success: 'Creado',
            error: 'Error al crear',
          });

          navigate('/admin/creatives');
        } }
      >
         <div>
           <StepOne
             creative={ creative }
             handleInputSelectChange={ handleInputSelectChange }
           />
         </div>
         <div>
           <StepTwo
             creative={ creative }
             handleInputChange={ handleInputChange }
           />
         </div>
         <div>
           <StepThree
             creative={ creative }
             handleClicksChange={ handleClicksChange }
             handleInteractionsChange={ handleInteractionsChange }
           />
         </div>
      </Stepper>
    </div>
  );
}