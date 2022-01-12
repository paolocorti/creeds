import { useStore } from "../store.js";

const RightColumn = ({ children }) => {
  const expanded = useStore((state) => state.expanded);

  return (
    <div
      className={`${
        expanded ? "w-2/3" : "w-11/12"
      } px-8 py-8 border-b-2 border-black`}
      style={{ backgroundColor: "#F5E3E0" }}
    >
      {children}
    </div>
  );
};

export default RightColumn;
