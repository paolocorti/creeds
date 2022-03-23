import Head from "next/head";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import Section2 from "../components/Section2";
import { server } from "../config";
import { flatten } from "lodash";
import { useStore } from "../store.js";
import { useRouter } from "next/router";

export default function Home({ data, energyDemand, gasDemand, energyPrice }) {
  const router = useRouter();
  const [allowEvents, setAllowEvents] = useState(false);

  useEffect(() => {
    //   csv("/data/activity_frequency_distributions.csv").then((values) => {
    //     setData(values);
    //   });

    //   csv("/data/mean_daily_elec_demand_profiles.csv").then((values) => {
    //     setEnergyDemand(values);

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
    //   });

    //   csv("/data/mean_daily_gas_demand_profiles.csv").then((values) => {
    //     setGasDemand(values);
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

    //   csv("/data/hourly_average_price_electricity.csv").then((values) => {
    //     setEnergyPrice(values);

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

    const timeout = setTimeout(() => {
      setAllowEvents(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>
          Energy demand flexibility and the rhythms of everyday life
        </title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Nanum+Myeongjo:wght@400;700&family=STIX+Two+Text:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
      </Head>

      <ReactTooltip effect="solid" backgroundColor="#111" />

      <main
        className="flex flex-col items-center justify-center w-full flex-1 text-center w-full"
        style={{
          pointerEvents: allowEvents ? "all" : "none",
        }}
      >
        <Section2
          data={data}
          previousChapter={() => {
            router.push("activities");
          }}
          nextChapter={() => {
            router.push("spatial_variation");
          }}
          fullscreen={false}
        />
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
