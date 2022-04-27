import { motion } from "framer-motion";

const Loader = ({ style }) => {
  return (
    <div className="animate-loader">
      <svg x="0px" y="0px" viewBox="0 0 42 42" style={style}>
        <circle
          r={18}
          cx={21}
          cy={21}
          fill="none"
          stroke="#010202"
          strokeWidth={0.5}
        />
        <circle r={3} cx={21} cy={39} fill="010202" stroke="none" />
      </svg>
    </div>
  );
};

export default Loader;
