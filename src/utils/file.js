export const getVideoDuration = (file) => {
  return new Promise((resolve) => {
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(file);
    videoElement.addEventListener('loadedmetadata', () => {
      resolve(videoElement.duration);
      URL.revokeObjectURL(videoElement.src);
    });
  });
};

export const getImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  });
};
