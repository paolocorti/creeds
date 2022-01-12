const RightColumn = ({ children }) => {
  return (
    <div
      className="w-2/3 px-8 py-8 border-b-2 border-black"
      style={{ backgroundColor: "#F5E3E0" }}
    >
      {children}
    </div>
  );
};

export default RightColumn;
