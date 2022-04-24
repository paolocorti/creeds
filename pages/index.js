import React, { useState, useEffect } from "react";
import PageHead from "../components/PageHead";
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
import { siteUrl } from "../config";

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

  return (
    <div className="">
      <PageHead />
      <main
        className=" w-full text-center"
        id="container"
        style={{
          height: !loading ? "auto" : "100vh",
          overflow: !loading ? "auto" : "hidden",
        }}
      >
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
          <div className="text-xs text-left">
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
