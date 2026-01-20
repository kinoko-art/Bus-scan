import { useState } from "react";
import { Button } from "@/components/ui/button";
import CameraView from "../CameraView";

export default function CameraViewExample() {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
    console.log("Image captured");
  };

  return (
    <div className="p-4 space-y-4">
      <Button onClick={() => setShowCamera(true)} data-testid="button-open-camera">
        カメラを開く
      </Button>
      
      {capturedImage && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">撮影した画像:</p>
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="max-w-full h-auto rounded-md border"
          />
        </div>
      )}
      
      {showCamera && (
        <CameraView
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
