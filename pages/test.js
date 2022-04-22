import Head from "next/head";
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
import dynamic from "next/dynamic";

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

export default function Home({ data, energyDemand, energyPrice, gasDemand }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("here");
    const copiedValues = JSON.parse(JSON.stringify(energyDemand));
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

    const copiedValues2 = JSON.parse(JSON.stringify(gasDemand));
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

    const copiedValues3 = JSON.parse(JSON.stringify(energyPrice));
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
  }, []);

  return (
    <div className="">
      <main
        className="flex flex-col items-center justify-center w-full text-center"
        id="container"
      >
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

        {!loading && (
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
        {!loading && (
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
        {!loading && (
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
        {!loading && (
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
        )}
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await csv(`${server}/data/activity_frequency_distributions.csv`);
  const energyDemand = await csv(
    `${server}/data/mean_daily_elec_demand_profiles.csv`
  );
  const gasDemand = await csv(
    `${server}/data/mean_daily_gas_demand_profiles.csv`
  );
  const energyPrice = await csv(
    `${server}/data/hourly_average_price_electricity.csv`
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
      energyDemand: energyDemand,
      gasDemand: gasDemand,
      energyPrice: energyPrice,
    },
  };
}
