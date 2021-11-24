import Head from "next/head";
import Radar from "../components/Radar";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import RadarYear from "../components/RadarYear";

export default function Home() {
  const [data, setData] = useState([]);
  const [energyDemand, setEnergyDemand] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");

  useEffect(() => {
    csv("/data/activity_frequency_distributions.csv").then((values) => {
      console.log(values);
      setData(values);
    });

    csv("/data/LCL.csv").then((values) => {
      setEnergyDemand(values);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Creeds</title>
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
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <ReactTooltip effect="solid" backgroundColor="#111" />

      <main className="flex flex-col items-center justify-center w-full flex-1 px-24 text-center">
        <div>
          <h1>Energy flexibility and the rhythms of everyday life</h1>
          <p>INTRO</p>
          <p>
            One of the greatest challenges for a Net Zero Carbon future is
            making the most out of our clean energy sources, and most of the
            time, that means shifting our electricity demand to those times of
            day when clean power is available – this is what we call
            flexibility. Flexibility is generally seen as a way of improving the
            balancing of demand with renewables. And since renewables are
            cheaper than other forms of producing electricity, this also means
            reducing the overall cost of electricity generation. So how do we
            achieve that flexibility? Energy demand and what people do go hand
            in hand, so if we want to change energy demand, we essentially need
            to change either what people do or the way they do it. But our
            everyday life – what we do at home, at work, at school, when moving
            around – is extremely complex. It is somewhat difficult to find
            examples of times of day, week, month or year when the timing of the
            things we do changes. But in reality, we are constantly doing just
            that, either out of own initiative or in response to external
            factors such as the weather. We are a group of researchers who are
            convinced – and trying to convince others – that the idea of
            flexibility needs to be grounded in a thorough understanding of the
            contemporary timing of energy demand (domestic, non-domestic and in
            relation to the mobility of things and people) and how it has come
            to be the way it is. Interventions with a view to mitigating demand
            peaks through increasing flexibility in the timing of energy demand
            encompass a variety of technologies, pricing mechanisms and shifts
            in institutional timings. But, as we mentioned before, energy demand
            is bound up with the temporal rhythm of society and what people do.
            Therefore, these seemingly isolated aspects of flexibility cannot be
            studied in isolation. Our search for flexibility necessarily starts
            by looking at the rhythms of everyday life, and here we share with
            you our attempts to visualise their complexity. So, how does demand
            for electricity relate to what people do day to day? As part of this
            work, we introduce fresh approaches to thinking of the
            social-temporal organisation of energy demand. We also try to
            understand what these mean for ‘flexibilities’ of different forms
            and scales, and across dimensions of everyday life, such as the
            timing of people’s activities in the home, their travels, demand for
            electricity and the price of it. But perhaps it is best to start by
            showing what the typical patterns of activity, demand, etc. look
            like.
          </p>
        </div>
        <div>
          <div>Activities, demand and price every 30 minutes</div>
          {/* <Radar globalData={data} selected={"all"} /> */}
          <div className="flex justify-center flex-col items-center">
            <div className="flex mt-8">
              <div className="mx-2" onClick={() => setSelectedMonth("1")}>
                JAN
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("2")}>
                FEB
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("3")}>
                MAR
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("4")}>
                APR
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("5")}>
                MAG
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("6")}>
                JUN
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("7")}>
                JUL
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("8")}>
                AUG
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("9")}>
                SET
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("10")}>
                OCT
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("11")}>
                NOV
              </div>
              <div className="mx-2" onClick={() => setSelectedMonth("12")}>
                DIC
              </div>
            </div>
            <div className="flex mt-8">
              <div className="mx-2" onClick={() => setSelectedRegion("all")}>
                all
              </div>
              <div className="mx-2" onClick={() => setSelectedRegion("london")}>
                london
              </div>
              <div
                className="mx-2"
                onClick={() => setSelectedRegion("south_east")}
              >
                south_east
              </div>
              <div
                className="mx-2"
                onClick={() => setSelectedRegion("east_england")}
              >
                east_england
              </div>
              <div
                className="mx-2"
                onClick={() => setSelectedRegion("east_midlands")}
              >
                east_midlands
              </div>
              <div
                className="mx-2"
                onClick={() => setSelectedRegion("west_midlands")}
              >
                west_midlands
              </div>
              <div
                className="mx-2"
                onClick={() => setSelectedRegion("yorkshire_humber")}
              >
                yorkshire_humber
              </div>
              <div
                className="mx-2"
                onClick={() => setSelectedRegion("north_east")}
              >
                north_east
              </div>
            </div>
            <RadarYear
              globalData={data}
              energyDemand={energyDemand}
              selectedRegion={selectedRegion}
              selectedMonth={selectedMonth}
            />
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
}
