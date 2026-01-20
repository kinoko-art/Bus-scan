import { useState } from "react";
import DestinationInput from "../DestinationInput";

export default function DestinationInputExample() {
  const [destination, setDestination] = useState("");

  return (
    <div className="w-full max-w-md p-4">
      <DestinationInput 
        value={destination} 
        onChange={setDestination}
      />
      {destination && (
        <p className="mt-2 text-sm text-muted-foreground">
          入力中: {destination}
        </p>
      )}
    </div>
  );
}
