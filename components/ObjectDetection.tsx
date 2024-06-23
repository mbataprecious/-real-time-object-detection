"use client";
import { VIDEO_SIZE, checksData } from "@/utils/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import SvgIconStyle from "./SvgIconStyle";
import Loader from "./Loader";
import {
  drawResults,
  getObjectDetector,
} from "@/utils/midia-pipe-detect";
import { FaceDetector } from "@mediapipe/tasks-vision";
import { useUserMedia } from "@/hooks/useUserMedia";
import ProceedModal from "./ProceedModal";

const checksArray = ["webCam", "internet", "mic", "light"];
const initialSysData: IChecks = {
  mic: {
    status: "success",
    finished: true,
    error: false,
  },
  internet: {
    status: "success",
    finished: true,
    error: false,
  },
  light: {
    status: "success",
    finished: true,
    error: false,
  },
  webCam: {
    status: "success",
    finished: true,
    error: false,
  },
};

const ObjectDetectionSection = () => {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const timeInterval = useRef<number>();
  const lastVideoTime = useRef<number>();
  const displaySize = useRef<{ width: number; height: number } | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const detector = useRef<FaceDetector | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [systemData, setSystemData] = useState<IChecks>(initialSysData);
  const [start, setStart] = useState(false);
  const detectionCount = useRef(0);
  const detectionScores = useRef(0);
  const startCount = useRef(false);
  const isLightSuccess = useRef(false);
  const [open, setOpen] = useState(false);
  const [borderFlash, setBorderFlash] = useState(false);
  

  const requestedMedia = useMemo(
    () => ({
      audio: false,
      video: {
        facingMode: "user",
        width: VIDEO_SIZE["480 X 360"].width,
        height: VIDEO_SIZE["480 X 360"].height,

        // resizeMode: "crop-and-scale"
      },
    }),
    []
  );
  const mediaStream = useUserMedia(requestedMedia, start);

  useEffect(() => {
    if (videoEl.current && start) {
      videoEl.current.srcObject = mediaStream;
      return () => {
        mediaStream?.getTracks().forEach((track) => track.stop());
      };
    }
  }, [mediaStream, start]);

  const loadDetector = async () => {
    try {
      const myDetector = await getObjectDetector();
      console.log({ myDetector });
      if (myDetector) {
        setStart(true)
        setLoaded(true);
      }
      detector.current = myDetector;
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    if (canvasEl.current) {
      setContext(canvasEl.current.getContext("2d") as CanvasRenderingContext2D);
    }
    loadDetector()
      .then(() => {})
      .catch((e) => {
        loadDetector();
        console.log(e);
      });
    return () => {
      if (timeInterval.current !== null) {
        clearInterval(timeInterval.current);
      }
    };
  }, []);

  const handleCanPlay = () => {
    startCount.current = true;
    videoEl.current?.play();
    if (timeInterval.current !== null) {
      clearInterval(timeInterval.current);
    }
    timeInterval.current = window.setInterval(() => {
      handleProgress();
    }, 500);
    console.log("canPlay is pressed");
  };

  const onLoadVideo = () => {
    if (videoEl.current && canvasEl.current) {
      displaySize.current = {
        width: videoEl.current.videoWidth,
        height: videoEl.current.videoHeight,
      };
      canvasEl.current.width = videoEl.current.videoWidth;
      canvasEl.current.height = videoEl.current.videoHeight;
      const myContext = canvasEl.current.getContext("2d");
      if (myContext) {
        myContext.translate(videoEl.current.videoWidth, 0);
        myContext.scale(-1, 1);
        setContext(myContext);
      }
    }
  };

  const handleProgress = async () => {
    if (context && canvasEl.current) {
      context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
      if (!detector.current) {
        console.log("the detector is still loading", { detector });
        return;
      }
      if (videoEl.current) {
        let startTimeMs = performance.now();

        // Detect faces using detectForVideo
        if (videoEl.current.currentTime !== lastVideoTime.current) {
          lastVideoTime.current = videoEl.current.currentTime;
          const detections = detector.current.detectForVideo(
            videoEl.current,
            startTimeMs
          ).detections;
          let results = detections;

          drawResults(context, results, true, true);
        detectionCount.current++;  
         console.log("this is the result", results);
          if (results?.[0]) {
            // isLightSuccess.current = true;
            detectionScores.current++;
           
    
            if (detectionCount.current >= 7) {
              const meanConfidence = 
                detectionScores.current / 7;
    
              if (meanConfidence > 0.5) { // Set your confidence threshold here
                setBorderFlash(true);
                setTimeout(() => setBorderFlash(false), 1000); // Set duration of flash
              }
    
              // Reset counters
              detectionCount.current = 0;
              detectionScores.current = 0;

          }
        //   if (count.current === 0) {
        //     videoEl.current?.pause();
        //   }

        
        } else {
          window.onkeydown = null;
          context.clearRect(
            0,
            0,
            canvasEl.current.width,
            canvasEl.current.height
          );
        }
      }
    }
  };
}

  console.log(systemData);

  return (
    <>
      <div className="flex">
        <div className=" w-2/5">
          <div 
          
          className={`w-[275px] border border-[#755AE2] bg-[#F5F5F5] rounded-[10px] overflow-hidden ${borderFlash?" border-[rgba(255,0,0,1)] border-[3px]":""}`}>
            <div className="video-cam-container relative w-full flex justify-center items-center">
              <div className="position-relative">
                <video
                  ref={videoEl}
                  onCanPlay={handleCanPlay}
                  autoPlay
                  muted
                  playsInline
                  style={{
                    width: "auto",
                    height: "auto",
                    transform: "scaleX(-1)",
                    // visibility:"hidden",
                  }}
                  onLoadedMetadata={onLoadVideo}
                  height={360}
                  width={480}
                ></video>
                <canvas
                  className="absolute top-0 w-full left-0 z-[1000]"
                  ref={canvasEl}
                ></canvas>
                {!loaded && (
                  <div className="absolute top-0 h-full w-full left-0 z-[10000] flex justify-center items-center">
                    <div className=" flex items-center w-fit rounded-lg bg-[#000000a2] p-4">
                      <div >
                        <Loader
                          className={` border-[2px] w-[20px] h-[20px] `}
                        />
                      </div>
                      <p className=" ml-2 text-xs text-white italic font-medium">Model loading....</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 px-6">
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 max-w-[200px]">
            {checksArray.map((data) => {
              let item = data as keyof typeof checksData;
              return (
                <div
                  key={data}
                  className="relative w-[91px] h-[71px] rounded-[10px] bg-[#F5F3FF] flex justify-center items-center"
                >
                  <div
                    className={`absolute top-0.5 right-[3px] w-[16px] h-[16px] bg-[#755AE2] rounded-full flex justify-center items-center ${
                      systemData[item].error ? "!bg-[#FF5F56]" : ""
                    }`}
                  >
                    {systemData[item].finished && (
                      <SvgIconStyle
                        src={checksData[item].iconSm}
                        className=" w-[8px] h-[8px] text-white"
                      />
                    )}
                  </div>
                  <div className=" w-fit h-fit">
                    <div className=" relative w-[35px] h-[35px] mb-1.5 mx-auto bg-[#E6E0FF] rounded-full flex justify-center items-center">
                      {start && (
                        <Loader
                          className={`absolute border-[3px] top-0 left-0 w-[35px] h-[35px] !border-t-[#755AE2] !border-l-[#755AE2] ${
                            systemData[item].error
                              ? "  !border-t-[#FF5F56] !border-l-[#FF5F56] !animate-none"
                              : systemData[item].status === "success"
                              ? " !animate-none !border-[#755AE2]"
                              : " "
                          }`}
                        />
                      )}

                      {systemData[item].status === "success" ? (
                        <div className=" w-[27px] h-[27px] rounded-full flex justify-center bg-[#755AE2] items-center">
                          <SvgIconStyle
                            src={"/assets/good-icon.svg"}
                            className=" w-[13.74px] h-[9.86px] text-white"
                          />
                        </div>
                      ) : (
                        <>
                          {systemData[item].error ? (
                            <SvgIconStyle
                              src={"/assets/danger.svg"}
                              className=" w-[18px] h-[18px] text-[#FF5F56]"
                            />
                          ) : (
                            <SvgIconStyle
                              src={checksData[item].icon}
                              className=" w-[18px] h-[18px] text-[#755AE2]"
                            />
                          )}
                        </>
                      )}
                    </div>
                    <p className=" text-[#4A4A68] text-[10px] text-center">
                      {checksData[item].title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ProceedModal open={open} setOpen={setOpen} />

      <button className="py-[13px] px-[17px] bg-[#755AE2] text-white mt-[40px] rounded-lg">
        We are detection Objects Around You
      </button>
    </>
  );
};

export default ObjectDetectionSection;
