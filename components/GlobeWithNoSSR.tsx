// GlobeWithNoSSR.tsx
import dynamic from "next/dynamic";

// Dynamically import the Globe component with SSR disabled
const GlobeWithNoSSR = dynamic(() => import("./ui/Globe").then((mod) => mod.Globe), {
  ssr: false,
});

export default GlobeWithNoSSR;
