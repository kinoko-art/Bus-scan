import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";

interface ScanButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isScanning?: boolean;
}

export default function ScanButton({ onClick, disabled, isScanning }: ScanButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isScanning}
      size="lg"
      className="w-full h-14 text-lg font-medium gap-3"
      data-testid="button-scan"
    >
      {isScanning ? (
        <>
          <Loader2 className="h-6 w-6 animate-spin" />
          認識中...
        </>
      ) : (
        <>
          <Camera className="h-6 w-6" />
          スキャン開始
        </>
      )}
    </Button>
  );
}
