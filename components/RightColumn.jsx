import { useStore } from "../store.js";
import { isMobile } from "react-device-detect";

const RightColumn = ({ children }) => {
  const expanded = useStore((state) => state.expanded);

  console.log("isMobile", isMobile);

  return (
    <div
      className={`w-full px-8 py-8 bg-pink border-b border-black animation-width overflow-hidden relative`}
      style={{ width: isMobile ? "100%" : expanded ? "72%" : "93%" }}
    >
      {children}
      {!expanded && !isMobile && (
        <div
          className="absolute top-2/4 cursor-pointer z-2"
          onClick={() => useStore.setState({ expanded: !expanded })}
          style={{ left: "-2px" }}
        >
          <img src={"/expand.svg"} width={26} />
        </div>
      )}
    </div>
  );
};

export default RightColumn;
