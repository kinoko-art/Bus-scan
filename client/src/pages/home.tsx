import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import DestinationInput from "@/components/DestinationInput";
import ScanButton from "@/components/ScanButton";
import CameraView from "@/components/CameraView";
import ProcessingOverlay from "@/components/ProcessingOverlay";
import JudgmentDisplay from "@/components/JudgmentDisplay";
import CandidateRoutes from "@/components/CandidateRoutes";
import RouteDetails from "@/components/RouteDetails";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { recognizeText, extractRouteInfo } from "@/lib/ocr";
import { 
  BusRoute, 
  matchRouteByNumber, 
  matchRouteByText, 
  checkCanReachDestination 
} from "@/lib/busRouteData";
import { RotateCcw } from "lucide-react";

type AppState = "input" | "camera" | "processing" | "result";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("input");
  const [destination, setDestination] = useState("");
  const [progress, setProgress] = useState(0);
  const [matchedRoutes, setMatchedRoutes] = useState<BusRoute[]>([]);
  const [canReach, setCanReach] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const { toast } = useToast();

  const handleStartScan = () => {
    if (!destination.trim()) {
      toast({
        title: "目的地を入力してください",
        description: "スキャンを開始する前に、行きたい停留所を入力してください。",
        variant: "destructive",
      });
      return;
    }
    setAppState("camera");
  };

  const handleCapture = useCallback(async (imageData: string) => {
    setAppState("processing");
    setProgress(0);

    try {
      const result = await recognizeText(imageData, (p) => setProgress(p));
      
      const { routeNumbers, destinations } = extractRouteInfo(result.text);
      
      let routes: BusRoute[] = [];
      
      for (const num of routeNumbers) {
        const route = matchRouteByNumber(num);
        if (route && !routes.some(r => r.routeNumber === route.routeNumber)) {
          routes.push(route);
        }
      }
      
      const textMatches = matchRouteByText(result.text);
      for (const route of textMatches) {
        if (!routes.some(r => r.routeNumber === route.routeNumber)) {
          routes.push(route);
        }
      }
      
      for (const dest of destinations) {
        const textMatches = matchRouteByText(dest);
        for (const route of textMatches) {
          if (!routes.some(r => r.routeNumber === route.routeNumber)) {
            routes.push(route);
          }
        }
      }

      setMatchedRoutes(routes);
      
      if (routes.length === 0) {
        toast({
          title: "系統を認識できませんでした",
          description: "もう一度撮影してください。明るい場所で掲示板全体が映るようにしてください。",
          variant: "destructive",
        });
        setAppState("input");
        return;
      }

      const { canReach: canReachDest } = checkCanReachDestination(routes, destination);
      setCanReach(canReachDest);
      setAppState("result");

    } catch (error) {
      console.error("Processing error:", error);
      toast({
        title: "認識エラー",
        description: "文字認識に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
      setAppState("input");
    }
  }, [destination, toast]);

  const handleCloseCamera = () => {
    setAppState("input");
  };

  const handleReset = () => {
    setAppState("input");
    setMatchedRoutes([]);
    setSelectedRoute(null);
    setCanReach(false);
    setProgress(0);
  };

  const handleSelectRoute = (route: BusRoute) => {
    setSelectedRoute(route);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {appState === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full"
            >
              <div className="flex-1 flex flex-col justify-center space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">目的地を入力</h2>
                  <p className="text-muted-foreground">
                    行きたい停留所名を入力して、バスの掲示板をスキャンしてください
                  </p>
                </div>
                
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <DestinationInput
                      value={destination}
                      onChange={setDestination}
                    />
                    
                    <ScanButton
                      onClick={handleStartScan}
                      disabled={!destination.trim()}
                    />
                  </CardContent>
                </Card>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>広島電鉄（広電）バスの系統に対応しています</p>
                </div>
              </div>
            </motion.div>
          )}

          {appState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full"
            >
              <div className="flex-1 flex flex-col">
                <JudgmentDisplay 
                  canReach={canReach} 
                  destination={destination} 
                />
                
                <div className="space-y-6 mt-auto">
                  {selectedRoute ? (
                    <RouteDetails
                      route={selectedRoute}
                      destination={destination}
                      onClose={() => setSelectedRoute(null)}
                    />
                  ) : (
                    <CandidateRoutes
                      routes={matchedRoutes}
                      onSelectRoute={handleSelectRoute}
                    />
                  )}
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                    className="w-full h-14 text-lg gap-2"
                    data-testid="button-reset"
                  >
                    <RotateCcw className="h-5 w-5" />
                    最初からやり直す
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {appState === "camera" && (
          <CameraView
            onCapture={handleCapture}
            onClose={handleCloseCamera}
          />
        )}

        {appState === "processing" && (
          <ProcessingOverlay
            message="画像を認識中..."
            progress={progress}
          />
        )}
      </main>
    </div>
  );
}
