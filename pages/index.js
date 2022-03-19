import Head from "next/head";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import Intro from "../components/Intro";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section5 from "../components/Section5";
import Landing from "../components/Landing";
import { animateScroll as scroll, scroller } from "react-scroll";
import { flatten } from "lodash";
import { useStore } from "../store.js";

export default function Home() {
  const [data, setData] = useState([]);
  const [energyDemand, setEnergyDemand] = useState([]);
  const [gasDemand, setGasDemand] = useState([]);
  const [energyPrice, setEnergyPrice] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    csv("/data/activity_frequency_distributions.csv").then((values) => {
      setData(values);
    });

    csv("/data/mean_daily_elec_demand_profiles.csv").then((values) => {
      setEnergyDemand(values);

      const copiedValues = JSON.parse(JSON.stringify(values));
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
    });

    csv("/data/mean_daily_gas_demand_profiles.csv").then((values) => {
      setGasDemand(values);
      const copiedValues = JSON.parse(JSON.stringify(values));
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
        gasMaximum: max,
      });
    });

    csv("/data/hourly_average_price_electricity.csv").then((values) => {
      setEnergyPrice(values);

      const copiedValues = JSON.parse(JSON.stringify(values));
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
        energyPriceMaximum: max,
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>
          Energy demand flexibility and the rhythms of everyday life
        </title>
        <meta
          name="description"
          content="Our everyday life – what we do at home, at work, at school, when moving around – and its relation to energy demand is rather complex. As part of our work as energy researchers, we have introduced fresh approaches to thinking about the social-temporal organisation of energy demand."
        />
        <link rel="alternate" hreflang="it" href="" />
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

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center w-full">
        <ReactTooltip effect="solid" backgroundColor="#111" delayShow={50} />
        <Landing
          nextChapter={() => {
            scroller.scrollTo("intro", {
              duration: 500,
              smooth: true,
            });
          }}
        />
        <Intro
          nextChapter={() => {
            scroller.scrollTo("section1", {
              duration: 500,
              smooth: true,
            });
          }}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <Section1
          data={data}
          energyDemand={energyDemand}
          gasDemand={gasDemand}
          energyPrice={energyPrice}
          nextChapter={() => {
            scroller.scrollTo("section2", {
              duration: 500,
              smooth: true,
            });
          }}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <Section2
          data={data}
          nextChapter={() => {
            scroller.scrollTo("section3", {
              duration: 500,
              smooth: true,
            });
          }}
          expanded={expanded}
          setExpanded={setExpanded}
        />{" "}
        <Section3
          data={data}
          energyDemand={energyDemand}
          gasDemand={gasDemand}
          energyPrice={energyPrice}
          nextChapter={() => {
            scroller.scrollTo("section4", {
              duration: 500,
              smooth: true,
            });
          }}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <Section4
          data={data}
          energyDemand={energyDemand}
          gasDemand={gasDemand}
          energyPrice={energyPrice}
          nextChapter={() => {
            scroller.scrollTo("section5", {
              duration: 500,
              smooth: true,
            });
          }}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <Section5
          data={data}
          energyDemand={energyDemand}
          gasDemand={gasDemand}
          energyPrice={energyPrice}
          expanded={expanded}
          setExpanded={setExpanded}
          nextChapter={() => {
            scroller.scrollTo("intro", {
              duration: 500,
              smooth: true,
            });
          }}
        />
      </main>

      <footer className="bg-lightgreen flex items-start flex-col justify-center w-full py-8 px-4 md:px-8">
        <div className="text-xs">
          © Copyright 2022
          <br />
          <br /> The visuals are made available under the Creative Commons
          License CC BY-ND 3.0, and may be used and displayed without charge by
          all commercial and non-commercial websites. <br /> Use is, however,
          only permitted with proper attribution to the project. When publishing
          one of these graphics, please include a backlink to the original site.
        </div>
      </footer>
    </div>
  );
}
