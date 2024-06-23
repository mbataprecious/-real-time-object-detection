interface NavigatorExtended extends Navigator {
  webkitGetUserMedia?: (constraints: MediaStreamConstraints, successCallback: (stream: MediaStream) => void, errorCallback: (error: MediaStreamError) => void) => void;
  mozGetUserMedia?: (constraints: MediaStreamConstraints, successCallback: (stream: MediaStream) => void, errorCallback: (error: MediaStreamError) => void) => void;
  msGetUserMedia?: (constraints: MediaStreamConstraints, successCallback: (stream: MediaStream) => void, errorCallback: (error: MediaStreamError) => void) => void;
  getUserMedia?: (constraints: MediaStreamConstraints, successCallback: (stream: MediaStream) => void, errorCallback: (error: MediaStreamError) => void) => void;
}
interface IChecks {
  [key: string]: {
    status: "loading" | "success" | "failed";
    finished: boolean;
    error: boolean;
  };
}


type Point = [number, number];

interface Face {
  keypoints: { x: number; y: number }[];
  box: { xMin: number; yMin: number; xMax: number; yMax: number };
}

interface MediaStreamConstraints {
  video?: boolean | MediaTrackConstraints;
  audio?: boolean | MediaTrackConstraints;
}