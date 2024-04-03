import { createContext, useContext } from 'react';
import { useFilesStore, useFormDataStore, useRequestDataStore } from './hooks';

const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [requestData, setRequestData] = useRequestDataStore();
  const [formData, setFormData, clearFormData] = useFormDataStore();
  const [files, loadFiles, saveFile, deleteFile] = useFilesStore(
    requestData,
    formData,
    setFormData
  );

  return (
    <StoreContext.Provider
      value={{
        requestData,
        setRequestData,
        formData,
        setFormData,
        clearFormData,
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
