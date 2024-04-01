import React, { useState } from 'react';
import { ConfirmModal } from '../components/ConfirmModal/ConfirmModal';

let promise;

const defaultConfirmSettings = {
  title: 'Подтверждение',
  type: 'confirm',
  confirmText: 'Да',
  dismissText: 'Нет',
};

export const useConfirm = () => {
  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState({
    ...defaultConfirmSettings,
  });

  const handleShow = (confirmSettings) => {
    setSettings({
      ...defaultConfirmSettings,
      ...confirmSettings,
    });
    setShow(true);
    return new Promise((resolve, reject) => {
      promise = {
        resolve,
        reject,
      };
    });
  };
  const handleConfirm = () => {
    promise?.resolve('');
    setShow(false);
  };
  const handleDismiss = () => {
    promise?.reject();
    setShow(false);
  };
  const Component = () => (
    <>
      {show && (
        <ConfirmModal
          {...settings}
          onConfirm={handleConfirm}
          onDismiss={handleDismiss}
        />
      )}
    </>
  );

  return [Component, handleShow];
};
