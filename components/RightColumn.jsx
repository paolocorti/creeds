import { useStore } from "../store.js";
import { isMobile } from "react-device-detect";
import { useState, useEffect } from "react";

const RightColumn = ({ children, expanded, setExpanded }) => {
  //const expanded = useStore((state) => state.expanded);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <div
      className={`w-full px-4 md:px-8 py-8 bg-pink border-b border-black animation-width overflow-hidden relative transition-all duration-500`}
      style={{ width: mobile ? "100%" : expanded ? "72%" : "93%" }}
    >
      {children}
      {!expanded && !mobile && (
        <div
          className="absolute top-2/4 cursor-pointer z-2"
          onClick={() => setExpanded(!expanded)}
          style={{ left: "-2px", top: "200px" }}
        >
          <img src={"/expand.svg"} width={26} />
        </div>
      )}
    </div>
  );
};

export default RightColumn;
