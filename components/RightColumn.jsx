const RightColumn = ({ children, fullscreen }) => {
  return (
    <div
      className={`w-full px-4 md:px-8 py-8 bg-pink border-b border-black overflow-hidden relative md:min-h-screen ${
        fullscreen ? "md:w-full" : "md:w-72"
      }`}
    >
      {children}
    </div>
  );
};

export default RightColumn;
