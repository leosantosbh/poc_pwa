import React, { useRef, useState } from 'react';
import { Camera, CameraType } from 'react-camera-pro';
import { ChangeFacingCameraButton, Control, TakePhotoButton, Wrapper } from './services/cameraStyled';

interface CameraProps {
  onPhoto: (photo: string) => void;
}

const CameraView: React.FC<CameraProps> = ({ onPhoto }) => {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const camera = useRef<CameraType>(null);

  return (
    <Wrapper className='camera-wrapper'>
      <Camera
        ref={camera}
        aspectRatio="cover"
        numberOfCamerasCallback={setNumberOfCameras}
        errorMessages={{
          noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
          permissionDenied: 'Permission denied. Please refresh and give camera permission.',
          switchCamera:
            'It is not possible to switch camera to different one because there is only one video device accessible.',
          canvas: 'Canvas is not supported.',
        }}
      />
      <Control>
        <TakePhotoButton
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto();
              onPhoto(photo);
            }
          }}
        />
        <ChangeFacingCameraButton
          disabled={numberOfCameras <= 1}
          onClick={() => {
            if (camera.current) {
              camera.current.switchCamera();
            }
          }}
        />
      </Control>
    </Wrapper>
  );
};

export default CameraView;