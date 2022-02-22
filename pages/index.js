import Head from "next/head";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import Intro from "../components/Intro";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";

export default function Home() {
  const [data, setData] = useState([]);
  const [energyDemand, setEnergyDemand] = useState([]);
  const [energyPrice, setEnergyPrice] = useState([]);

  useEffect(() => {
    csv("/data/activity_frequency_distributions.csv").then((values) => {
      setData(values);
    });

    csv("/data/mean_daily_elec_demand_profiles.csv").then((values) => {
      setEnergyDemand(values);
    });

    csv("/data/hourly_average_price_electricity.csv").then((values) => {
      setEnergyPrice(values);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Creds</title>
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
      </Head>

      <ReactTooltip effect="solid" backgroundColor="#111" />

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <Intro />
        <Section1
          data={data}
          energyDemand={energyDemand}
          energyPrice={energyPrice}
        />
        <Section2 data={data} energyDemand={energyDemand} />{" "}
        <Section3
          data={data}
          energyDemand={energyDemand}
          energyPrice={energyPrice}
        />
        <Section4
          data={data}
          energyDemand={energyDemand}
          energyPrice={energyPrice}
        />
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
}
