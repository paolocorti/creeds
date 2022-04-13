import "tailwindcss/tailwind.css";
import "../styles/styles.css";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
