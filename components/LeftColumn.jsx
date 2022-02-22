import { useStore } from "../store.js";

const LeftColumn = ({ children }) => {
  const expanded = useStore((state) => state.expanded);

  return (
    <div
      className={`${
        expanded ? "w-1/3" : "w-1/12"
      } px-8 py-8 border-r-2 border-b-2 border-black relative animation-width`}
      style={{ backgroundColor: "#3baf74" }}
    >
      {expanded && <>{children}</>}
      {expanded && (
        <div
          className="absolute -right-8 top-2/4 cursor-pointer z-2"
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
