import { useStore } from "../store.js";
import { isMobile } from "react-device-detect";
import { useState, useEffect } from "react";

const LeftColumn = ({ children, sectionTitle }) => {
  const expanded = useStore((state) => state.expanded);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <div
      className={`w-full bg-green px-4 ${
        expanded ? "md:px-8" : "md:px-2"
      } py-8 border-b border-black relative animation-width overflow-hidden transition-all duration-500`}
      style={{ width: mobile ? "100%" : expanded ? "28%" : "7%" }}
    >
      {expanded && <>{children}</>}
      {expanded && !mobile && (
        <div
          className="absolute cursor-pointer z-2 md:visible"
          onClick={() => useStore.setState({ expanded: !expanded })}
          style={{ right: "-9px", top: "200px" }}
        >
          <img src={"/collapse.svg"} width={30} />
        </div>
      )}
      {!expanded && (
        <div
          className="w-full h-full flex cursor-pointer justify-center items-center"
          style={{ opacity: expanded ? 0 : 1 }}
        >
          <img src={sectionTitle} className="w-2/3" />
        </div>
      )}
    </div>
  );
};

export default LeftColumn;
