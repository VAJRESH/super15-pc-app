import { IonButton } from "@ionic/react";
import { useState } from "react";
import Cropper from "react-easy-crop";
import styles from "./uploadImage.module.css";

// https://github.com/ValentinH/react-easy-crop
export default function UploadImage({
  inputId = "uploadImage",
  overlayOpacity = 0.5,
  onUpload = async () => {},
}) {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });
  }

  async function getCroppedImg() {
    const image = await createImage(imgSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    // set canvas size to match the bounding box
    canvas.width = image?.width;
    canvas.height = image?.height;

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) return null;

    // Set the size of the cropped canvas
    croppedCanvas.width = croppedAreaPixels?.width;
    croppedCanvas.height = croppedAreaPixels?.height;

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
      canvas,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    // As Base64 string
    // return croppedCanvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      croppedCanvas.toBlob((file) => resolve(file), "image/jpeg");
    });
  }

  return (
    <>
      <input
        className={styles.input}
        id={inputId}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          let imageDataUrl = URL.createObjectURL(file);
          setImgSrc(imageDataUrl);

          e.target.value = "";
        }}
      />

      {!!imgSrc && (
        <>
          <div
            className={styles.overlay}
            style={{ opacity: overlayOpacity }}
          ></div>

          <div className={styles.uploadImageContainer}>
            <Cropper
              className={styles.cropper}
              image={imgSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              //   aspect={4 / 3}
              cropSize={{ height: 250, width: 250 }}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={(croppedArea, croppedAreaPixels) =>
                setCroppedAreaPixels(croppedAreaPixels)
              }
              onZoomChange={setZoom}
            />

            <div className={styles.btnContainer}>
              <IonButton color="danger" onClick={() => setImgSrc("")}>
                Cancel
              </IonButton>
              <IonButton
                onClick={async () => {
                  const img = await getCroppedImg();

                  await onUpload(img);
                  setImgSrc("");
                }}
              >
                Upload
              </IonButton>
            </div>
          </div>
        </>
      )}
    </>
  );
}
