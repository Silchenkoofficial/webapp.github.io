import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../store/StoreContext';
import { LayoutWrapper } from './AppLayout.styled';
import { Footer, Header, MainContent } from './components';
import { RequestModal } from '../views';
import usePortal from 'react-useportal';
import { useParams } from 'react-router-dom';
import { getRequestData } from '../http-requests';
import { saveFileToIndexedDB } from '../store/IndexedDBService';

export const AppLayout = () => {
  const { pk } = useParams();
  const { state, files, loadFiles, saveFile } = useStore();
  const { Portal } = usePortal();
  const modalContentRef = useRef(null);

  useEffect(() => {
    getRequestData(pk)
      .then((requestData) => {
        localStorage.setItem('requestData', JSON.stringify(requestData));

        loadFiles('photos_show').then((loadedFiles) => {
          const filesFromDB = loadedFiles.map((el) => el.name) || [];
          requestData.photos.forEach((photo) => {
            if (!filesFromDB.includes(photo + '.jpg')) {
              requestData.photos.forEach((photo) => {
                fetch(`/media/photos_show/${photo}.jpg`)
                  .then((res) => res.blob())
                  .then((blob) => {
                    const file = new File([blob], `${photo}.jpg`, {
                      type: 'image/jpeg',
                    });
                    return saveFileToIndexedDB(file, 'photos_show');
                  });
              });
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <LayoutWrapper isRequestModalOpen={state.isRequestModalOpen}>
        <Header />
        <MainContent />
        <Footer />
      </LayoutWrapper>
      <Portal>
        <RequestModal modalContentRef={modalContentRef} />
      </Portal>
    </>
  );
};
