import { useStore } from "../store.js";
import { isMobile } from "react-device-detect";
import { useState, useEffect } from "react";

const LeftColumn = ({ children }) => {
  const expanded = useStore((state) => state.expanded);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <div
      className={`w-full bg-green px-4 md:px-8 py-8 border-b border-black relative animation-width overflow-hidden`}
      style={{ width: mobile ? "100%" : expanded ? "28%" : "7%" }}
    >
      {expanded && <>{children}</>}
      {expanded && !mobile && (
        <div
          className="absolute top-2/4 cursor-pointer z-2 md:visible"
          onClick={() => useStore.setState({ expanded: !expanded })}
          style={{ right: "-9px" }}
        >
          <img src={"/collapse.svg"} width={30} />
        </div>
      )}
    </div>
  );
};

export default LeftColumn;
