const LeftColumn = ({ children }) => {
  return (
    <div
      className="w-1/3 px-8 py-8 border-r-2 border-b-2 border-black"
      style={{ backgroundColor: "#FBAFA5" }}
    >
      {children}
    </div>
  );
};

export default LeftColumn;
