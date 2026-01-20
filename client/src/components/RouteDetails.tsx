import { BusRoute } from "@/lib/busRouteData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, MapPin, ArrowRight } from "lucide-react";

interface RouteDetailsProps {
  route: BusRoute;
  destination?: string;
  onClose: () => void;
}

export default function RouteDetails({ route, destination, onClose }: RouteDetailsProps) {
  return (
    <Card className="w-full max-w-md" data-testid="card-route-details">
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
        <CardTitle className="text-xl">
          <Badge variant="default" className="text-lg px-3 py-1 mr-2">
            {route.routeNumber}番
          </Badge>
          {route.destination}行き
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          data-testid="button-close-details"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            停留所一覧
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {route.stops.map((stop, index) => {
              const isDestination = destination && 
                (stop.includes(destination) || destination.includes(stop));
              
              return (
                <div key={stop} className="flex items-center gap-2">
                  <Badge 
                    variant={isDestination ? "default" : "secondary"}
                    className="text-sm"
                    data-testid={`badge-stop-${index}`}
                  >
                    {stop}
                  </Badge>
                  {index < route.stops.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
