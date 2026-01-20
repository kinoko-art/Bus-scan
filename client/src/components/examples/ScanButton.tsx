import { useState } from "react";
import ScanButton from "../ScanButton";

export default function ScanButtonExample() {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="w-full max-w-md p-4 space-y-4">
      <ScanButton onClick={handleScan} isScanning={isScanning} />
      <ScanButton onClick={() => {}} disabled={true} />
    </div>
  );
}
