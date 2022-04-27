import { motion } from "framer-motion";

const Loader = ({ style }) => {
  return (
    <div className="animate-loader">
      <svg x="0px" y="0px" viewBox="0 0 42 42" style={style}>
        {/* <path
          class="st0"
          d="M12.3458,34.3184C7.7224,31.5237,4.6377,26.4923,4.6377,20.75c0-8.7813,7.2137-15.9,16.1123-15.9
		s16.1123,7.1187,16.1123,15.9c0,5.7425-3.0849,10.774-7.7086,13.5687"
          fill="none"
          stroke="#010202"
          opacity={0}
        />
        <path
          class="st1"
          d="M29.1542,7.1816c4.6234,2.7947,7.7082,7.8261,7.7082,13.5684c0,8.7813-7.2137,15.9-16.1123,15.9
		S4.6377,29.5313,4.6377,20.75c0-5.7425,3.0849-10.774,7.7086-13.5687"
          fill="none"
          stroke="#010202"
          strokeLinecap="round"
        /> */}

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
