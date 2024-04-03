import { API } from '../utils/api';

export const getRequestData = (id) => API.get(`/executor-requests/`, id);

export const addPhoto = (requestId, params, file) =>
  API.addFiles('/executor-requests/add_file/', requestId, params, file);

export const addAttachments = (requestId, params, file) =>
  API.addFiles('/executor-requests/add_attachment/', requestId, params, file);

export const deletePhoto = (requestId, params) =>
  API.patchFiles('/executor-requests/delete_file/', requestId, params);

export const changeSocial = (params) =>
  API.patch('/executor-requests/change/socialnetworks/', undefined, params);

export const sendRequestWithPhoto = (requestId, params, file) =>
  API.addFiles('/executor-requests/request/finish/', requestId, params, file);

export const sendRequestWithoutPhoto = (requestId, params) =>
  API.patch('/executor-requests/request/finish/', requestId, params);

export const changeNote = (requestId, params) =>
  API.patch('/executor-requests/change/note/', requestId, params);
