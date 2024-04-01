import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  deleteFileFromIndexedDB,
  getFilesFromIndexedDB,
  saveFileToIndexedDB,
} from './IndexedDBService';

const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const requestData = JSON.parse(localStorage.getItem('requestData')) || {};
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem('formData')) || {
      currentStep: 1,
      photos: '',
      status: 'run',
      description: '',
      transferDate: '',
      attachments: '',
      acts: '',
      percentage: 0,
    }
  );
  const [files, setFiles] = useState({});

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(state));
  }, [state]);

  // Отслеживание процентности заполнения формы
  useEffect(() => {
    const filledFields = [
      state.photos,
      state.attachments,
      state.status === 'performed' && state.acts,
      state.status !== 'run',
      state.status !== 'transfer' && state.description.length > 3,
      ['delayed', 'transfer'].includes(state.status) && state.transferDate,
    ].filter(Boolean).length;

    const totalFields = ['transfer', 'abandonment', 'refusal'].includes(
      state.status
    )
      ? 4
      : 5;
    const percentageFilled = Math.round((filledFields / totalFields) * 100);

    setState((prevState) => ({
      ...prevState,
      percentage: percentageFilled,
    }));
  }, [
    state.photos,
    state.attachments,
    state.acts,
    state.status,
    state.description,
    state.transferDate,
  ]);

  // Работа с сохранением файлов в IndexedDB
  const loadFiles = async (storeName) => {
    const loadedFiles = await getFilesFromIndexedDB(storeName);

    setState((prevState) => ({
      ...prevState,
      [storeName]:
        loadedFiles.length > 0
          ? 'mediaFiles'
          : state[storeName] === 'mediaFiles'
            ? ''
            : state[storeName],
    }));

    setFiles((prevFiles) => ({ ...prevFiles, [storeName]: loadedFiles }));
    return loadedFiles;
  };

  const saveFile = async (fileName, storeName) => {
    await saveFileToIndexedDB(fileName, storeName).then(async () => {
      await loadFiles(storeName);
    });
  };

  const deleteFile = async (fileName, storeName) => {
    await deleteFileFromIndexedDB(fileName, storeName).then(async () => {
      await loadFiles(storeName);
    });
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        setState,
        requestData,
        files,
        loadFiles,
        saveFile,
        deleteFile,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };
