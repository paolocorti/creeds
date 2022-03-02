import { useStore } from "../store.js";

const RightColumn = ({ children }) => {
  const expanded = useStore((state) => state.expanded);

  return (
    <div
      className={`w-full px-8 py-8 border-b border-black animation-width overflow-hidden`}
      style={{ backgroundColor: "#ffd6cc", width: expanded ? "72%" : "93%" }}
    >
      {children}
    </div>
  );
};

export default RightColumn;
