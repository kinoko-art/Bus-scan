import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, MapPin } from "lucide-react";
import { allStops } from "@/lib/busRouteData";

interface DestinationInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function DestinationInput({ value, onChange, disabled }: DestinationInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = allStops.filter(stop => 
        stop.includes(value) || value.includes(stop)
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const handleSelectSuggestion = (stop: string) => {
    onChange(stop);
    setShowSuggestions(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="目的地を入力 (例: 八丁堀)"
          disabled={disabled}
          className="h-14 pl-12 pr-12 text-lg rounded-md border-2 focus:border-primary"
          data-testid="input-destination"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            data-testid="button-clear-destination"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-card-border rounded-md shadow-lg z-50 overflow-hidden">
          {suggestions.map((stop, index) => (
            <button
              key={stop}
              onClick={() => handleSelectSuggestion(stop)}
              className="w-full px-4 py-3 text-left text-base hover-elevate flex items-center gap-3"
              data-testid={`suggestion-stop-${index}`}
            >
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{stop}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
