import { API } from '../utils/api';

export const getRequestData = (id) => API.get(`/executor-requests/`, id);

export const getPhotos = (params) =>
  API.get('/executor-requests/filenames/list/', undefined, params);

export const addPhoto = (requestId, params, file) =>
  API.addFiles('/executor-requests/add_file/', requestId, params, file);

export const addAttachments = (requestId, params, file) =>
  API.addFiles('/executor-requests/add_attachment/', requestId, params, file);

export const deletePhoto = (requestId, params) =>
  API.patchFiles('/executor-requests/delete_file/', requestId, params);
