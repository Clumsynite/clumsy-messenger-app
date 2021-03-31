import React, { useState, useRef, useCallback, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import _ from "lodash";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import ProfilePicture from "./ProfilePicture";

const PhotoUpload = ({ user, setPhoto }) => {
  const [image, setImage] = useState(null);
  const imgRef = useRef(null);

  const { addToast } = useToasts();

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    addToast("Press Esc Key or Close Button to confirm Selection", {
      appearance: "info",
    });
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        const result = reader.result;
        if (_.startsWith(result, "data:image")) setImage(result);
      };
    }
  };

  const EditAvatarModal = () => {
    const [crop, setCrop] = useState({
      crop: { unit: "px", minWidth: 400, aspect: 4 / 4 },
    });
    const previewCanvasRef = useRef(null);
    const [completedCrop, setCompletedCrop] = useState(null);

    const onLoad = useCallback((img) => {
      imgRef.current = img;
    }, []);

    useEffect(() => {
      if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
        return;
      }

      const image = imgRef.current;
      const canvas = previewCanvasRef.current;
      const crop = completedCrop;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");
      const pixelRatio = window.devicePixelRatio;

      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }, [completedCrop]);

    function generateDownload(canvas, crop) {
      if (!crop || !canvas) {
        return;
      }
      canvas.toBlob(
        (blob) => {
          if (blob) {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              var base64data = reader.result;
              setPhoto(base64data);
            };
          }
        },
        "image/jpeg",
        1
      );
    }

    return (
      <Rodal
        visible={image !== null}
        onClose={() => {
          generateDownload(previewCanvasRef.current, crop);
          setImage(null);
        }}
        closeOnEsc
        showCloseButton
        enterAnimation={"slideUp"}
        leaveAnimation={"fade"}
        customStyles={{
          backgroundColor: "transparent",
          height: "auto",
          width: "auto",
        }}
      >
        <ReactCrop
          locked
          src={image}
          onImageLoaded={onLoad}
          ruleOfThirds
          crop={crop}
          onChange={(c) =>
            setCrop({
              ...c,
              unit: "px",
              width: 400,
              height: 400,
              aspect: 4 / 4,
            })
          }
          onComplete={(c) => setCompletedCrop(c)}
        />
        <div>
          <canvas
            ref={previewCanvasRef}
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
              display: "none",
            }}
          />
        </div>
      </Rodal>
    );
  };

  return (
    <div className="row g-2">
      {image && <EditAvatarModal />}
      <div className="col-md-4">
        <ProfilePicture size={60} user={user} />
      </div>
      <div className="col-md-8">
        <div className="mb-3 text-start">
          <label htmlFor="formFile" className="form-label">
            Select your Profile Picture (Optional)
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={convertToBase64}
            multiple={false}
            accept="image/*"
            onClick={(e) => (e.target.value = "")}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
