import useSWR from "swr";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Landing from "../components/Landing";
import Intro from "../components/Intro";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section5 from "../components/Section5";
import { useRouter } from "next/router";
import { csv } from "d3-fetch";
import { server } from "../config";
import { flatten } from "lodash";
import { useStore } from "../store.js";
import { scroller } from "react-scroll";

// const Intro = dynamic(() => import("../components/Intro"), {
//   loading: () => <p>Loading...</p>,
// });
// const Section1 = dynamic(() => import("../components/Section1"), {
//   loading: () => <p>Loading...</p>,
// });
// const Section2 = dynamic(() => import("../components/Section2"), {
//   loading: () => <p>Loading...</p>,
// });
// const Section3 = dynamic(() => import("../components/Section3"), {
//   loading: () => <p>Loading...</p>,
// });
// const Section4 = dynamic(() => import("../components/Section4"), {
//   loading: () => <p>Loading...</p>,
// });
// const Section5 = dynamic(() => import("../components/Section5"), {
//   loading: () => <p>Loading...</p>,
// });

export default function Home({}) {
  const router = useRouter();
  const [loading, setLoading] = useState("Loading energy distributions");
  const [globalData, setData] = useState([]);

  useEffect(async () => {
    const dataCsv = await csv(
      `${server}/data/activity_frequency_distributions.csv`
    );
    setLoading("Loading energy demand");
    const energyDemandCsv = await csv(
      `${server}/data/mean_daily_elec_demand_profiles.csv`
    );
    const copiedValues = JSON.parse(JSON.stringify(energyDemandCsv));
    delete copiedValues.columns;
    const allValues = flatten(
      copiedValues.map((v) => {
        delete v.month;
        delete v.region;
        delete v.season;
        const val = Object.values(v);
        const parsed = val.map((n) => parseFloat(n));
        return parsed;
      })
    );
    const max = Math.max(...allValues);
    useStore.setState({
      energyMaximum: max,
    });

    setLoading("Loading energy price");
    const energyPriceCsv = await csv(
      `${server}/data/hourly_average_price_electricity.csv`
    );
    const copiedValues3 = JSON.parse(JSON.stringify(energyPriceCsv));
    delete copiedValues3.columns;
    const allValues3 = flatten(
      copiedValues3.map((v) => {
        delete v.month;
        delete v.region;
        delete v.season;
        const val = Object.values(v);
        const parsed = val.map((n) => parseFloat(n));
        return parsed;
      })
    );
    const max3 = Math.max(...allValues3);
    useStore.setState({
      energyPriceMaximum: max3,
    });

    setLoading("Loading gas demand");
    const gasDemandCsv = await csv(
      `${server}/data/mean_daily_gas_demand_profiles.csv`
    );
    const copiedValues2 = JSON.parse(JSON.stringify(gasDemandCsv));
    delete copiedValues2.columns;
    const allValues2 = flatten(
      copiedValues2.map((v) => {
        delete v.month;
        delete v.region;
        delete v.season;
        const val = Object.values(v);
        const parsed = val.map((n) => parseFloat(n));
        return parsed;
      })
    );
    const max2 = Math.max(...allValues2);
    useStore.setState({
      gasMaximum: max2,
    });
    setData({
      data: dataCsv,
      energyDemand: energyDemandCsv,
      energyPrice: energyPriceCsv,
      gasDemand: gasDemandCsv,
    });
    setLoading(false);
  }, []);

  const data = globalData.data || [];
  const energyDemand = globalData.energyDemand || [];
  const energyPrice = globalData.energyPrice || [];
  const gasDemand = globalData.gasDemand || [];

  console.log({ data, energyDemand, energyPrice, gasDemand });

  return (
    <div className="">
      <Head>
        <title>
          Energy demand flexibility and the rhythms of everyday life
        </title>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Our everyday life – what we do at home, at work, at school, when moving around – and its relation to energy demand is rather complex. As part of our work as energy researchers, we have introduced fresh approaches to thinking about the social-temporal organisation of energy demand."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:title"
          content={"Energy demand flexibility and the rhythms of everyday life"}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={
            "Our everyday life – what we do at home, at work, at school, when moving around – and its relation to energy demand is rather complex. As part of our work as energy researchers, we have introduced fresh approaches to thinking about the social-temporal organisation of energy demand."
          }
        />
        <meta property="og:url" content={`${siteUrl}`} />
        <meta property="og:image" content={`${siteUrl}/share.jpg`} />
        <meta property="twitter:image" content={`${siteUrl}/share.jpg`} />
        <link rel="alternate" hreflang="it" href="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@300;400;700&family=Nanum+Myeongjo:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#60ae7b" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#60ae7b" />
      </Head>
      <main
        className=" w-full text-center"
        id="container"
        style={{
          height: !loading ? "auto" : "100vh",
          overflow: !loading ? "auto" : "hidden",
        }}
      >
        <ReactTooltip effect="solid" backgroundColor="#111" delayShow={50} />
        <Landing
          nextChapter={() => {
            scroller.scrollTo("intro", {
              smooth: false,
            });
          }}
          loading={loading}
        />
        <Intro
          nextChapter={() => {
            scroller.scrollTo("section1", {
              smooth: false,
            });
          }}
        />
        {data.length && (
          <Section1
            data={data}
            energyDemand={energyDemand}
            energyPrice={energyPrice}
            nextChapter={() => {
              scroller.scrollTo("section2", {
                smooth: false,
              });
            }}
            fullscreen={false}
            setLoading={setLoading}
          />
        )}
        {data.length && (
          <Section2
            data={data}
            nextChapter={() => {
              scroller.scrollTo("section3", {
                smooth: false,
              });
            }}
            fullscreen={false}
          />
        )}
        {data.length && (
          <Section3
            data={data}
            energyDemand={energyDemand}
            gasDemand={gasDemand}
            energyPrice={energyPrice}
            nextChapter={() => {
              scroller.scrollTo("section4", {
                smooth: false,
              });
            }}
            fullscreen={false}
          />
        )}
        {data.length && (
          <Section4
            data={data}
            energyDemand={energyDemand}
            gasDemand={gasDemand}
            energyPrice={energyPrice}
            nextChapter={() => {
              scroller.scrollTo("section5", {
                smooth: false,
              });
            }}
            fullscreen={false}
          />
        )}
        {data.length && (
          <Section5
            data={data}
            energyDemand={energyDemand}
            gasDemand={gasDemand}
            energyPrice={energyPrice}
            previousChapter={() => {
              router.push("seasons");
            }}
            fullscreen={false}
          />
        )}{" "}
        <footer className="bg-lightgreen flex items-start flex-col justify-center w-full py-8 px-4 md:px-8">
          <div className="text-xs">
            © Copyright 2022
            <br />
            <br /> The visuals are made available under the Creative Commons
            License CC BY-ND 3.0, and may be used and displayed without charge
            by all commercial and non-commercial websites. <br /> Use is,
            however, only permitted with proper attribution to the project. When
            publishing one of these graphics, please include a backlink to the
            original site.
          </div>
          <div className="w-full flex mt-4">
            <img src={"/creds.svg"} width={100} />
            <div className="flex justify-center items-center ml-4">
              <img src={"/flex.svg"} width={24} />
              <div className="text-xs text-white">Flexibility</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// export async function getStaticProps(context) {
//   const data = await csv(`${server}/data/activity_frequency_distributions.csv`);
//   const energyDemand = await csv(
//     `${server}/data/mean_daily_elec_demand_profiles.csv`
//   );
//   const gasDemand = await csv(
//     `${server}/data/mean_daily_gas_demand_profiles.csv`
//   );
//   const energyPrice = await csv(
//     `${server}/data/hourly_average_price_electricity.csv`
//   );

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       data: data,
//       energyDemand: energyDemand,
//       gasDemand: gasDemand,
//       energyPrice: energyPrice,
//     },
//   };
// }
