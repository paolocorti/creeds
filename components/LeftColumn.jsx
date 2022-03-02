import { useStore } from "../store.js";

const LeftColumn = ({ children }) => {
  const expanded = useStore((state) => state.expanded);

  return (
    <div
      className={`w-full px-8 py-8 border-r border-b border-black relative animation-width overflow-hidden`}
      style={{ backgroundColor: "#3baf74", width: expanded ? "28%" : "7%" }}
    >
      {expanded && <>{children}</>}
      {expanded && (
        <div
          className="absolute -right-8 top-2/4 cursor-pointer z-2 md:visible"
          onClick={() => useStore.setState({ expanded: !expanded })}
        >
          <img src={"/collapse.svg"} width={50} />
        </div>
      )}
      {!expanded && (
        <div
          className="absolute -right-6 top-2/4 cursor-pointer z-2"
          onClick={() => useStore.setState({ expanded: !expanded })}
        >
          <img src={"/expand.svg"} width={40} />
        </div>
      )}
    </div>
  );
};

export default LeftColumn;
