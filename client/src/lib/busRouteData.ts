export interface BusStop {
  name: string;
  nameReading?: string;
}

export interface BusRoute {
  routeNumber: string;
  routeName: string;
  destination: string;
  stops: string[];
}

export const busRoutes: BusRoute[] = [
  {
    routeNumber: "1",
    routeName: "1号線",
    destination: "広島駅",
    stops: ["紙屋町", "八丁堀", "的場町", "稲荷町", "広島駅"]
  },
  {
    routeNumber: "2",
    routeName: "2号線",
    destination: "宮島口",
    stops: ["紙屋町", "土橋", "西観音町", "己斐", "廿日市", "宮島口"]
  },
  {
    routeNumber: "3",
    routeName: "3号線",
    destination: "西広島",
    stops: ["紙屋町", "十日市町", "土橋", "西観音町", "西広島"]
  },
  {
    routeNumber: "5",
    routeName: "5号線",
    destination: "比治山下",
    stops: ["広島駅", "的場町", "段原一丁目", "比治山下"]
  },
  {
    routeNumber: "6",
    routeName: "6号線",
    destination: "江波",
    stops: ["紙屋町", "本川町", "舟入町", "江波"]
  },
  {
    routeNumber: "7",
    routeName: "7号線",
    destination: "横川駅",
    stops: ["紙屋町", "十日市町", "横川駅"]
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
  },
  {
    routeNumber: "12",
    routeName: "12号線",
    destination: "八丁堀",
    stops: ["広島駅", "的場町", "稲荷町", "銀山町", "八丁堀"]
  },
  {
    routeNumber: "15",
    routeName: "15号線",
    destination: "広電本社前",
    stops: ["八丁堀", "胡町", "銀山町", "広電本社前"]
  }
];

export const allStops: string[] = Array.from(new Set(busRoutes.flatMap(route => route.stops))).sort();

export function findRoutesForDestination(destination: string): BusRoute[] {
  return busRoutes.filter(route => 
    route.stops.some(stop => stop.includes(destination) || destination.includes(stop))
  );
}

export function matchRouteByNumber(routeNumber: string): BusRoute | undefined {
  const cleanNumber = routeNumber.replace(/[^\d]/g, '');
  return busRoutes.find(route => route.routeNumber === cleanNumber);
}

export function matchRouteByText(text: string): BusRoute[] {
  const matches: BusRoute[] = [];
  
  for (const route of busRoutes) {
    const routeNum = route.routeNumber;
    if (text.includes(routeNum) || 
        text.includes(route.routeName) || 
        text.includes(route.destination) ||
        route.stops.some(stop => text.includes(stop))) {
      matches.push(route);
    }
  }
  
  return matches;
}

export function checkCanReachDestination(
  matchedRoutes: BusRoute[], 
  destination: string
): { canReach: boolean; matchingRoutes: BusRoute[] } {
  const matchingRoutes = matchedRoutes.filter(route =>
    route.stops.some(stop => 
      stop.includes(destination) || destination.includes(stop)
    ) || route.destination.includes(destination) || destination.includes(route.destination)
  );
  
  return {
    canReach: matchingRoutes.length > 0,
    matchingRoutes
  };
}
