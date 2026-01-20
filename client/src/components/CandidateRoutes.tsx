import { Badge } from "@/components/ui/badge";
import { BusRoute } from "@/lib/busRouteData";
import { Bus } from "lucide-react";

interface CandidateRoutesProps {
  routes: BusRoute[];
  onSelectRoute?: (route: BusRoute) => void;
}

export default function CandidateRoutes({ routes, onSelectRoute }: CandidateRoutesProps) {
  if (routes.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground" data-testid="text-no-routes">
        該当する系統が見つかりませんでした
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Bus className="h-4 w-4" />
        候補系統 ({routes.length}件)
      </p>
      <div className="flex flex-wrap gap-2">
        {routes.map((route) => (
          <Badge
            key={route.routeNumber}
            variant="secondary"
            className="text-base px-4 py-2 cursor-pointer"
            onClick={() => onSelectRoute?.(route)}
            data-testid={`badge-route-${route.routeNumber}`}
          >
            <span className="font-bold mr-2">{route.routeNumber}番</span>
            <span className="text-muted-foreground">{route.destination}行き</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
