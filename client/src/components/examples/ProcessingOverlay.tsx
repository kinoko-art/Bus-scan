import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProcessingOverlay from "../ProcessingOverlay";

export default function ProcessingOverlayExample() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (showOverlay) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowOverlay(false);
              setProgress(0);
            }, 500);
            return 100;
          }
          return p + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [showOverlay]);

  return (
    <div className="p-4">
      <Button onClick={() => setShowOverlay(true)}>
        処理を開始
      </Button>
      
      {showOverlay && (
        <ProcessingOverlay 
          message="画像を認識中..." 
          progress={progress}
        />
      )}
    </div>
  );
}
