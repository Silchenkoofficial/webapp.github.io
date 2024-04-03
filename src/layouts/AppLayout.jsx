import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../store/StoreContext';
import { LayoutWrapper } from './AppLayout.styled';
import { Footer, Header, MainContent } from './components';
import { RequestModal } from '../views';
import usePortal from 'react-useportal';
import { useParams } from 'react-router-dom';
import { getRequestData } from '../http-requests';
import { clearIndexedDB } from '../store/IndexedDBService';

export const AppLayout = () => {
  const { pk } = useParams();
  const { requestData, setRequestData, clearFormData, loadFiles } = useStore();
  const { Portal } = usePortal();
  const modalContentRef = useRef(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useEffect(() => {
    getRequestData(pk)
      .then((response) => {
        if (requestData.object_id !== response.object_id) {
          clearFormData();
          clearIndexedDB().then(() => {
            loadFiles('photos');
          });
        }
        setRequestData(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <LayoutWrapper isRequestModalOpen={isRequestModalOpen}>
        <Header setIsRequestModalOpen={setIsRequestModalOpen} />
        <MainContent />
        <Footer />
      </LayoutWrapper>
      <Portal>
        <RequestModal
          modalContentRef={modalContentRef}
          isRequestModalOpen={isRequestModalOpen}
          setIsRequestModalOpen={setIsRequestModalOpen}
        />
      </Portal>
    </>
  );
};
