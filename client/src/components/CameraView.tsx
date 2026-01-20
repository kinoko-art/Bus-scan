import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X, FlashlightOff, Flashlight, RotateCcw } from "lucide-react";

interface CameraViewProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
  isProcessing?: boolean;
}

export default function CameraView({ onCapture, onClose, isProcessing }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.();
      if (capabilities && 'torch' in capabilities) {
        setHasFlash(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("カメラにアクセスできませんでした。カメラの許可を確認してください。");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const toggleFlash = async () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      try {
        await track.applyConstraints({
          advanced: [{ torch: !flashOn } as MediaTrackConstraintSet]
        });
        setFlashOn(!flashOn);
      } catch (err) {
        console.error("Flash toggle error:", err);
      }
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        ctx.filter = "grayscale(100%) contrast(150%)";
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = "none";
        
        const imageData = canvas.toDataURL("image/png");
        onCapture(imageData);
      }
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="bg-black/50 text-white"
          data-testid="button-close-camera"
        >
          <X className="h-6 w-6" />
        </Button>
        
        {hasFlash && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFlash}
            className="bg-black/50 text-white"
            data-testid="button-toggle-flash"
          >
            {flashOn ? (
              <Flashlight className="h-6 w-6" />
            ) : (
              <FlashlightOff className="h-6 w-6" />
            )}
          </Button>
        )}
      </div>

      <div className="flex-1 relative overflow-hidden">
        {cameraError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
            <p className="text-lg mb-4">{cameraError}</p>
            <Button onClick={startCamera} variant="secondary" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              再試行
            </Button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
              data-testid="video-camera"
            />
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-2 border-white/50 rounded-lg">
                <div className="absolute -top-px -left-px w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                <div className="absolute -top-px -right-px w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                <div className="absolute -bottom-px -left-px w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                <div className="absolute -bottom-px -right-px w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
              </div>
              <p className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-8 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                バスの掲示板を枠内に合わせてください
              </p>
            </div>
          </>
        )}
      </div>

      <div className="p-6 bg-black">
        <Button
          onClick={captureImage}
          disabled={isProcessing || !!cameraError}
          size="lg"
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center p-0"
          data-testid="button-capture"
        >
          <Camera className="h-10 w-10" />
        </Button>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
