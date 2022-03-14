import Head from "next/head";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import Section2 from "../components/Section2";
import { animateScroll as scroll, scrollSpy, scroller } from "react-scroll";

export default function UnpackingPeaks() {
  const [data, setData] = useState([]);
  const [energyDemand, setEnergyDemand] = useState([]);
  const [gasDemand, setGasDemand] = useState([]);
  const [energyPrice, setEnergyPrice] = useState([]);

  useEffect(() => {
    csv("/data/activity_frequency_distributions.csv").then((values) => {
      setData(values);
    });

    csv("/data/mean_daily_elec_demand_profiles.csv").then((values) => {
      setEnergyDemand(values);
    });

    csv("/data/mean_daily_gas_demand_profiles.csv").then((values) => {
      setGasDemand(values);
    });

    csv("/data/hourly_average_price_electricity.csv").then((values) => {
      setEnergyPrice(values);
    });
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

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center w-full">
        <Section2
          data={data}
          nextChapter={() => {
            scroller.scrollTo("section3", {
              duration: 500,
              smooth: true,
            });
          }}
          expanded={false}
          fullscreen={true}
        />
      </main>
    </div>
  );
}
