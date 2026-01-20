import Tesseract from "tesseract.js";

export interface OCRResult {
  text: string;
  confidence: number;
}

export async function recognizeText(
  imageData: string,
  onProgress?: (progress: number) => void
): Promise<OCRResult> {
  try {
    const result = await Tesseract.recognize(
      imageData,
      "jpn+eng",
      {
        logger: (m) => {
          if (m.status === "recognizing text" && onProgress) {
            onProgress(m.progress * 100);
          }
        },
      }
    );

    return {
      text: result.data.text,
      confidence: result.data.confidence,
    };
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("文字認識に失敗しました");
  }
}

export function extractRouteInfo(text: string): {
  routeNumbers: string[];
  destinations: string[];
} {
  const routeNumbers: string[] = [];
  const destinations: string[] = [];

  const routePatterns = [
    /(\d+)\s*番/g,
    /(\d+)\s*号/g,
    /(\d+)\s*線/g,
    /No\.?\s*(\d+)/gi,
    /(\d{1,2})/g,
  ];

  for (const pattern of routePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const num = match[1];
      if (!routeNumbers.includes(num) && parseInt(num) <= 99) {
        routeNumbers.push(num);
      }
    }
  }

  const knownDestinations = [
    "広島駅", "八丁堀", "紙屋町", "横川駅", "西広島",
    "宮島口", "江波", "比治山下", "白島", "広電本社前",
    "的場町", "稲荷町", "銀山町", "十日市町", "土橋",
    "西観音町", "己斐", "廿日市", "本川町", "舟入町",
    "縮景園前", "段原一丁目", "胡町"
  ];

  for (const dest of knownDestinations) {
    if (text.includes(dest)) {
      destinations.push(dest);
    }
  }

  return { routeNumbers, destinations };
}
