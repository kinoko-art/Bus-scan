import CandidateRoutes from "../CandidateRoutes";
import { BusRoute } from "@/lib/busRouteData";

const mockRoutes: BusRoute[] = [
  {
    routeNumber: "12",
    routeName: "12号線",
    destination: "八丁堀",
    stops: ["広島駅", "的場町", "稲荷町", "銀山町", "八丁堀"]
  },
  {
    routeNumber: "8",
    routeName: "8号線",
    destination: "横川駅",
    stops: ["八丁堀", "紙屋町", "十日市町", "横川駅"]
  },
  {
    routeNumber: "9",
    routeName: "9号線",
    destination: "白島",
    stops: ["八丁堀", "縮景園前", "白島"]
  }
];

export default function CandidateRoutesExample() {
  return (
    <div className="w-full max-w-md p-4 space-y-8">
      <CandidateRoutes 
        routes={mockRoutes} 
        onSelectRoute={(route) => console.log('Selected:', route)}
      />
      <div className="border-t border-border pt-4">
        <CandidateRoutes routes={[]} />
      </div>
    </div>
  );
}
