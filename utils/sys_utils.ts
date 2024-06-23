

export const initiateWebCam = (requestedMedia?: MediaStreamConstraints): Promise<MediaStream> => {
  const navigatorExtended = navigator as NavigatorExtended;

  return new Promise((resolve, reject) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(requestedMedia??{ video: true })
        .then((stream) => {
          console.log(stream);
          resolve(stream);
        })
        .catch((error) => {
          console.log(error);
          reject(new Error("failure accessing camera"));
        });
    } else if (navigatorExtended.webkitGetUserMedia || navigatorExtended.mozGetUserMedia || navigatorExtended.msGetUserMedia) {
      const getUserMedia = (navigatorExtended.webkitGetUserMedia || navigatorExtended.mozGetUserMedia || navigatorExtended.msGetUserMedia)!.bind(navigatorExtended)!;
      getUserMedia!(
        requestedMedia??{ video: true },
        (stream) => {
          console.log(stream);
          resolve(stream);
        },
        (error) => {
          console.log(error);
          reject(new Error("failure accessing camera"));
        }
      );
    } else {
      reject(new Error("getUserMedia not supported"));
    }
  });
};

export const initiateMic = (): Promise<MediaStream> => {
  const navigatorExtended = navigator as NavigatorExtended;

  return new Promise((resolve, reject) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: { noiseSuppression: true } })
        .then((stream) => {
          console.log("initiateMic", stream);
          resolve(stream);
        })
        .catch((error) => {
          console.log(error);
          reject(new Error("failure accessing audio device"));
        });
    } else if (navigatorExtended.webkitGetUserMedia || navigatorExtended.mozGetUserMedia || navigatorExtended.msGetUserMedia) {
      const getUserMedia = (navigatorExtended.webkitGetUserMedia || navigatorExtended.mozGetUserMedia || navigatorExtended.msGetUserMedia)!.bind(navigatorExtended)!;
      getUserMedia!(
        { audio: { noiseSuppression: true } },
        (stream) => {
          console.log("initiateMic", stream);
          resolve(stream);
        },
        (error) => {
          console.log(error);
          reject(new Error("failure accessing audio device"));
        }
      );
    } else {
      reject(new Error("getUserMedia not supported"));
    }
  });
};

export const testInternetSpeed = async () => {
  const imageUrl = '/assets/skill-logo.png'; // URL of a sample file
  const startTime = new Date().getTime();
  const response = await fetch(imageUrl);
  const endTime = new Date().getTime();
  const fileSize = parseInt(response.headers.get('content-length') || '0', 10); // in bytes
  const duration = (endTime - startTime) / 1000; // in seconds
  return  (fileSize / duration / 1024 / 1024).toFixed(2); // in Mbps
};
