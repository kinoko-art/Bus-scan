import RouteDetails from "../RouteDetails";
import { BusRoute } from "@/lib/busRouteData";

const mockRoute: BusRoute = {
  routeNumber: "12",
  routeName: "12号線",
  destination: "八丁堀",
  stops: ["広島駅", "的場町", "稲荷町", "銀山町", "八丁堀"]
};

export default function RouteDetailsExample() {
  return (
    <div className="p-4">
      <RouteDetails 
        route={mockRoute}
        destination="銀山町"
        onClose={() => console.log("Close clicked")}
      />
    </div>
  );
}
