"use client";

import { useEffect, useRef } from "react";

const AdSense = ({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: "block" },
  className = "",
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (
        typeof window !== "undefined" &&
        window.adsbygoogle &&
        adRef.current
      ) {
        // Check if ad is already initialized
        if (!adRef.current.hasAttribute("data-adsbygoogle-status")) {
          window.adsbygoogle.push({});
        }
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`adsense-container my-6 flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-3058178790781075"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdSense;
