import { useStore } from "../store.js";

const RightColumn = ({ children }) => {
  const expanded = useStore((state) => state.expanded);

  return (
    <div
      className={`w-full px-8 py-8 border-b border-black animation-width overflow-hidden relative`}
      style={{ backgroundColor: "#ffd6cc", width: expanded ? "72%" : "93%" }}
    >
      {children}
      {!expanded && (
        <div
          className="absolute top-2/4 cursor-pointer z-2"
          onClick={() => useStore.setState({ expanded: !expanded })}
          style={{ left: "-2px" }}
        >
          <img src={"/expand.svg"} width={30} />
        </div>
      )}
    </div>
  );
};

export default RightColumn;
