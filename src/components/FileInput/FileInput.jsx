import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import {
  Wrapper,
  AddPhotoIcon,
  InputWarning,
  AlertIcon,
} from './FileInput.styled';
import { Slider } from '../../components';
import { useStore } from '../../store/StoreContext';
import { useConfirm } from '../../hooks/useConfirm';

const FilesProperties = {
  photos: {
    folder: 'start_photos',
    bot: 'photos_tg_bot',
  },
  attachments: {
    folder: 'attachments',
    bot: 'attachments_tg_bot',
  },
  acts: {
    folder: 'acts',
    bot: 'completion_act_files_tg_bot',
  },
};

export const FileInput = ({ type, onlySlider = false }) => {
  const { files, loadFiles, saveFile, deleteFile } = useStore();
  const [Confirm, setConfirm] = useConfirm();
  const UploadRef = useRef(null);
  const [isMoreThanTen, setIsMoreThanTen] = useState(false);

  useEffect(() => {
    loadFiles(type);
  }, []);

  const handleFileChange = async (e) => {
    let selectedFiles = Array.from(e.target.files);

    if (
      selectedFiles?.length > 10 ||
      files[type]?.length + selectedFiles?.length > 10
    ) {
      setIsMoreThanTen(true);
      selectedFiles = selectedFiles.slice(0, 10 - files[type]?.length);
    }

    selectedFiles.forEach(async (file) => {
      try {
        await saveFile(file, type);
      } catch (err) {
        alert(`${file.name} - ${err}`);
      }
    });
  };

  const handleDeleteFile = async (fileName) => {
    setConfirm({
      title: 'Вы действительно хотите удалить эту фотографию?',
      type: 'confirm',
      confirmText: 'Удалить',
      dismissText: 'Отменить',
    }).then(
      async () => {
        setIsMoreThanTen(false);
        await deleteFile(fileName, type);
      },
      () => {}
    );
  };

  const chooseFiles = () => {
    UploadRef.current.click();
  };

  return (
    <>
      <Confirm />
      <Wrapper>
        <Slider onDelete={handleDeleteFile}>
          {files[type] &&
            files[type].length > 0 &&
            files[type].map((file, index) =>
              file.type?.startsWith('image/') ? (
                <img
                  className="image-slide"
                  src={URL.createObjectURL(file)}
                  data-file={file}
                />
              ) : (
                file.type?.startsWith('video/') && (
                  <video className="video-slide" autoPlay data-file={file}>
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )
              )
            )}
        </Slider>
        {!onlySlider && (
          <>
            <input
              ref={UploadRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              multiple
              style={{ display: 'none' }}
            />
            <Button
              variant="secondary"
              onClick={chooseFiles}
              isDisabled={files[type]?.length >= 10}
            >
              <AddPhotoIcon />
              {files[type] && files[type].length > 0
                ? 'Добавить ещё фото/видео'
                : 'Добавить фото/видео'}
            </Button>
            <InputWarning isError={isMoreThanTen}>
              {isMoreThanTen && <AlertIcon />}
              <div>
                {isMoreThanTen
                  ? 'Загружены только первые 10 фото/видео т.к. при загрузке было выбрано большее количество.'
                  : files[type] && files[type]?.length === 10
                    ? 'Загружено макс. количество: 10 фото/видео'
                    : 'Макс. количество: 10 фото/видео'}
              </div>
            </InputWarning>
          </>
        )}
      </Wrapper>
    </>
  );
};
