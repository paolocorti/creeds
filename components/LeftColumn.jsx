import { useStore } from "../store.js";
import { isMobile } from "react-device-detect";

const LeftColumn = ({ children }) => {
  const expanded = useStore((state) => state.expanded);

  return (
    <div
      className={`w-full bg-green px-8 py-8 border-b border-black relative animation-width overflow-hidden`}
      style={{ width: isMobile ? "100%" : expanded ? "28%" : "7%" }}
    >
      {expanded && <>{children}</>}
      {expanded && !isMobile && (
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
