import { initiateWebCam } from "@/utils/sys_utils";
import { useState, useEffect } from "react";



export function useUserMedia(requestedMedia: MediaStreamConstraints,start:boolean) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    function enableStream() {
      const getUserMedia = initiateWebCam(requestedMedia)
        
      if (getUserMedia) {
        getUserMedia
          .then((stream: MediaStream) => {
            setMediaStream(stream);
          })
          .catch(() => {
            console.log("error getting media streams");
          });
      }
    }

    if (!mediaStream) {
        if(start){
          enableStream();   
        }
     
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
  }, [mediaStream, requestedMedia,start]);

  return mediaStream;
}