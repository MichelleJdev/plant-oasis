import { useState, useEffect } from "react";

const maxMobileWidth = 500;
const maxTabletWidth = 720;
const maxDesktopWidth = 1000;

function useScreenSize() {
  const [screenDimensions, setScreenDimensions] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleScreenResize = () => {
      setScreenDimensions({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleScreenResize);
  }, []);

  const isMobile = screenDimensions.innerWidth <= maxMobileWidth;
  const isTablet =
    screenDimensions.innerWidth > maxMobileWidth &&
    screenDimensions.innerWidth <= maxTabletWidth;
  const isDesktop = screenDimensions.innerWidth > maxTabletWidth;
  return {
    screenDimensions,
    isMobile,
    isTablet,
    isDesktop,
  };
}

export default useScreenSize;
