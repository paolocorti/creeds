import { useStore } from "../store.js";
import { isMobile } from "react-device-detect";
import { useState, useEffect } from "react";

const RightColumn = ({ children, expanded = true, fullscreen }) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <div
      className={`w-full px-4 md:px-8 py-8 bg-pink border-b border-black overflow-hidden relative md:min-h-screen w-full md:w-28`}
    >
      {children}
    </div>
  );
};

export default RightColumn;
