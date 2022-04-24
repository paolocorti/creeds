import { useState, useEffect } from "react";

const LeftColumn = ({ children, expanded = true }) => {
  return (
    <div
      className={`w-full bg-green px-4 ${
        expanded ? "md:px-8" : "md:px-2"
      } py-8 border-b border-black relative md:min-h-screen w-full md:w-28`}
    >
      {children}
    </div>
  );
};

export default LeftColumn;
