export const NUM_KEYPOINTS = 6;
export const GREEN = "#32EEDB";
export const RED = "#FF2C35";
export const BLUE = "#157AB3";
import {
  FaceDetector,
  FilesetResolver,
  Detection,
  ObjectDetector,
} from "@mediapipe/tasks-vision";
export const categoryDenylist = [
  "bird",
  "cat",
  "dog",
  "horse",
  "sheep",
  "cow",
  "elephant",
  "bear",
  "zebra",
  "giraffe",
  "banana",
  "apple",
  "sandwich",
  "orange",
  "person"
];
let faceDetector: FaceDetector;
let runningMode: "VIDEO" | "IMAGE" = "VIDEO";

// Initialize the object detector
export const getDetector = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
      delegate: "GPU",
    },
    runningMode: runningMode,
  });

  return faceDetector;
};
export function filterDetections(detections: Detection[]): Detection[] {
  return detections.filter(detection => {
    const categoryName = detection.categories?.[0]?.categoryName;

    console.log({categoryName})
    return !categoryDenylist.includes(categoryName);
  });
}
export const getObjectDetector = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm"
  );
  const objectDetector = await ObjectDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite`,
      delegate: "GPU",
    },
    categoryDenylist,
    scoreThreshold: 0.4,
    runningMode: runningMode,
  });

  return objectDetector;
};

/**
 * Draw the keypoints on the video.
 * @param ctx 2D rendering context.
 * @param faces A list of faces to render.
 * @param boundingBox Whether or not to display the bounding box.
 * @param showKeypoints Whether or not to display the keypoints.
 */
export function drawResults(
  ctx: CanvasRenderingContext2D,
  detections: Detection[],
  boundingBox: boolean,
  showKeypoints: boolean
) {
  // Clear previous drawings
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  detections.forEach((detection) => {
    if (detection.boundingBox) {
      const { width, height, originX, originY } = detection.boundingBox;

      if (boundingBox && width && height && originX && originY) {
        ctx.strokeStyle = GREEN;
        ctx.lineWidth = 1;
        ctx.strokeRect(originX, originY, width, height);
      }

      // Draw confidence text
      const confidence = Math.round(detection.categories[0].score * 100);
      const categoryName = detection.categories?.[0]?.categoryName;
      if (originX && originY) {
        ctx.fillStyle = GREEN;
        ctx.fillText(
          `${categoryName ?? ""}Confidence: ${confidence}%`,
          originX,
          originY - 10
        );
      }
    }

    // Draw keypoints
    if (showKeypoints) {
      detection.keypoints.forEach((keypoint) => {
        if (keypoint.x && keypoint.y) {
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      });
    }
  });
}
