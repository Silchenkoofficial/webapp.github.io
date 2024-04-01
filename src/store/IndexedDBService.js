const dbName = 'MediaDB3';
const dbVersion = 14;

export const openDB = (storeNames) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (e) => {
      reject('Database error:', e.target.errorCode);
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      storeNames.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'name' });
        }
      });
    };

    request.onsuccess = (e) => {
      resolve(e.target.result);
    };
  });
};

export const saveFileToIndexedDB = async (file, storeName) => {
  const db = await openDB(['photos', 'attachments', 'acts']);
  const transaction = db.transaction(storeName, 'readwrite');
  const objectStore = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const getRequest = objectStore.get(file.name);
    getRequest.onsuccess = () => {
      if (getRequest.result) {
        reject('Файл уже существует');
      } else {
        const addRequest = objectStore.add(file);
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = (e) =>
          reject('Error adding file:', e.target.error);
      }
    };
    getRequest.onerror = (e) =>
      reject('Error checking file existence:', e.target.error);
  });
};

export const deleteFileFromIndexedDB = async (fileName, storeName) => {
  const db = await openDB(['photos', 'attachments', 'acts']);
  const transaction = db.transaction(storeName, 'readwrite');
  const objectStore = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    console.log(fileName, storeName);
    const deleteRequest = objectStore.delete(fileName);
    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = (e) =>
      reject('Error deleting file:', e.target.error);
  });
};

export const clearIndexedDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (e) => {
      reject('Database error:', e.target.errorCode);
    };

    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction(db.objectStoreNames, 'readwrite');

      transaction.oncomplete = () => {
        console.log('Все хранилища объектов успешно очищены.');
        resolve();
      };

      transaction.onerror = (e) => {
        console.error('Ошибка при очистке хранилищ объектов:', e.target.error);
        reject('Ошибка при очистке хранилищ объектов.');
      };

      Array.from(db.objectStoreNames).forEach((storeName) => {
        const store = transaction.objectStore(storeName);
        store.clear();
      });
    };
  });
};

export const getFilesFromIndexedDB = async (storeName) => {
  const db = await openDB(['photos', 'attachments', 'acts', 'photos_show']);
  const transaction = db.transaction(storeName, 'readonly');
  const objectStore = transaction.objectStore(storeName);
  const files = [];

  return new Promise((resolve, reject) => {
    transaction.onerror = (e) => {
      reject('Transaction error:', e.target.error);
    };

    const cursorRequest = objectStore.openCursor();

    cursorRequest.onerror = (e) => {
      reject('Cursor request error:', e.target.error);
    };

    cursorRequest.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        files.push(cursor.value);
        cursor.continue();
      } else {
        resolve(files);
      }
    };
  });
};
