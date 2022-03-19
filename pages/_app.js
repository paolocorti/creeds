import "tailwindcss/tailwind.css";
import "../styles/styles.css";
import {
  LazyMotion,
  AnimatePresence,
  domAnimation,
  motion,
} from "framer-motion";

const slideUp = {
  name: "Slide Up",
  variants: {
    initial: {
      //opacity: 0,
      top: "100vh",
    },
    animate: {
      //opacity: 1,
      top: "0vh",
    },
    exit: {
      //opacity: 0,
      top: "-100vh",
    },
  },
  transition: {
    duration: 0.7,
  },
};

function MyApp({ Component, pageProps, router }) {
  return (
    <div className="app-wrap">
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route.concat(slideUp.name)}
            className="page-wrap"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideUp.variants}
            transition={slideUp.transition}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}

export default MyApp;
