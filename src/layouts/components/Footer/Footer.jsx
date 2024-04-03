import { useStore } from '../../../store/StoreContext';
import { clearIndexedDB } from '../../../store/IndexedDBService';
import { changeNote, sendRequestWithoutPhoto } from '../../../http-requests';
import { Wrapper } from './Footer.styled';
import { Button } from '../../../components';

export const Footer = () => {
  const { formData, setFormData, requestData } = useStore();

  const isNextButtonDisabled = () => {
    const {
      currentStep,
      photos,
      status,
      transferDate,
      description,
      attachments,
      acts,
    } = formData;

    switch (currentStep) {
      case 1:
        return !photos;
      case 2:
        if (status === 'transfer') {
          return !transferDate;
        }
        return status === 'run' || description.length < 3;
      case 3:
        if (status === 'performed') {
          return !attachments || !acts;
        } else if (status === 'delayed') {
          return !attachments || !transferDate;
        }
        return !attachments;
      case 4:
        return false;
      default:
        return true;
    }
  };

  const getNextButtonText = () => {
    switch (formData.currentStep) {
      case 1:
      case 2:
        return 'Следующий шаг';
      case 3:
        return 'Перейти к завершению работы';
      case 4:
        return 'Завершить работу';
      default:
        return 'Следующий шаг';
    }
  };

  const handleFinalStep = async () => {
    const requestID = requestData.object_id;
    const workerID = requestData.executor.object_id;
    const params = {
      status: formData.status === 'performed' ? 'finish' : formData.status,
      worker: workerID,
      comment: formData.status === 'transfer' ? '' : formData.description,
    };

    if (['transfer', 'delayed'].includes(formData.status)) {
      const [year, month, day] = formData.transferDate.split('-');
      params.month = +month;
      params.day = +day;
    }

    try {
      const res = await sendRequestWithoutPhoto(requestID, params);

      if (res.status !== 'OK') {
        alert('Ошибка при завершении работы');
        localStorage.clear();
        await clearIndexedDB();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleIntermediateStep = async () => {
    setFormData({ ...formData, currentStep: formData.currentStep + 1 });
  };

  const updateNotesIfNeeded = async () => {
    const notesToUpdate = [];
    const requestID = requestData.object_id;
    const workerID = requestData.executor.object_id;

    if (formData.currentStep === 1) {
      if (['no_way_to_add', 'not_required'].includes(formData.photos)) {
        notesToUpdate.push(
          changeNote(requestID, {
            worker: workerID,
            field: 'photos_tg_bot_notes',
            note: formData.photos,
          })
        );
      }
    }

    if (formData.currentStep === 3) {
      if (['no_way_to_add', 'not_required'].includes(formData.attachments)) {
        notesToUpdate.push(
          changeNote(requestID, {
            worker: workerID,
            field: 'attachments_tg_bot_notes',
            note: formData.attachments,
          })
        );
      }

      if (['uploaded_later', 'not_required'].includes(formData.acts)) {
        notesToUpdate.push(
          changeNote(requestID, {
            worker: workerID,
            field: 'completion_act_files_tg_bot_notes',
            note: formData.acts,
          })
        );
      }
    }

    try {
      await Promise.all(notesToUpdate);
    } catch (err) {
      console.log(err);
    }
  };

  const nextStep = async () => {
    if (formData.currentStep >= 4) {
      await handleFinalStep();
    } else {
      await updateNotesIfNeeded();
      await handleIntermediateStep();
    }
  };

  const prevStep = () => {
    if (formData.currentStep > 1) {
      setFormData({ ...formData, currentStep: formData.currentStep - 1 });
    }
  };

  return (
    <Wrapper>
      <Button
        isDisabled={isNextButtonDisabled()}
        variant={'primary'}
        onClick={nextStep}
      >
        {getNextButtonText()}
      </Button>
      <Button
        variant={'secondary'}
        onClick={prevStep}
        className={formData.currentStep === 1 && 'hidden'}
      >
        Назад
      </Button>
    </Wrapper>
  );
};
