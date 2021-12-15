import Head from "next/head";
import Radar from "../components/Radar";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import RadarYear from "../components/RadarYear";
import { ParentSize } from "@visx/responsive";
import TrendYear from "../components/TrendYear";

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
        <section className="w-full my-8">
          <h1 className="text-6xl">
            Energy flexibility and the rhythms of everyday life
          </h1>
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
        </section>
        <section className="w-full my-8">
          <h2 className="text-4xl">
            Activities, demand and price every 30 minutes
          </h2>
          <p>
            We visualise everyday life as happening inside the 24 hour clock
            because we want to place what people do at the centre of our
            understanding of energy demand. At the heart of this approach is the
            position that the timing of energy demand is determined by the way
            people’s activities are ordered in time.
          </p>
          <p>
            This type of visualisation is a conscious effort to visualise
            underlying regular patterns relating to the fundamental temporal
            characteristics of social events. It shows the complexities and
            regular trends in everyday life through the simultaneous
            representation of the temporal rhythm of social practices and its
            shaping influence over households’ energy demand throughout the day.
          </p>
          {/* <Radar globalData={data} selected={"all"} /> */}
          <div className="flex justify-center flex-col items-center">
            <div className="flex mt-8">
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("1")}
              >
                <div>JAN</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "1" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("2")}
              >
                <div>FEB</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "2" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("3")}
              >
                <div>MAR</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "3" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("4")}
              >
                <div>APR</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "4" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("5")}
              >
                <div>MAG</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "5" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("6")}
              >
                <div>JUN</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "6" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("7")}
              >
                <div>JUL</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "7" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("8")}
              >
                <div>AUG</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "8" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("9")}
              >
                <div>SET</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "9" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("10")}
              >
                <div>OCT</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "10" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("11")}
              >
                <div>NOV</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "11" ? "black" : "white",
                  }}
                ></div>
              </div>
              <div
                className="mx-2 flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMonth("12")}
              >
                <div>DIC</div>
                <div
                  className="dot"
                  style={{
                    backgroundColor: selectedMonth === "12" ? "black" : "white",
                  }}
                ></div>
              </div>
            </div>
            <div className="flex mt-8">
              <div
                className="mx-2 cursor-pointer"
                onClick={() => setSelectedRegion("all")}
                style={{
                  textDecoration:
                    selectedRegion === "all" ? "underline" : "none",
                }}
              >
                all
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "london" ? "underline" : "none",
                }}
                onClick={() => setSelectedRegion("london")}
              >
                london
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "south_east" ? "underline" : "none",
                }}
                onClick={() => setSelectedRegion("south_east")}
              >
                south_east
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "east_england" ? "underline" : "none",
                }}
                onClick={() => setSelectedRegion("east_england")}
              >
                east_england
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "east_midlands" ? "underline" : "none",
                }}
                onClick={() => setSelectedRegion("east_midlands")}
              >
                east_midlands
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "west_midlands" ? "underline" : "none",
                }}
                onClick={() => setSelectedRegion("west_midlands")}
              >
                west_midlands
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "yorkshire_humber"
                      ? "underline"
                      : "none",
                }}
                onClick={() => setSelectedRegion("yorkshire_humber")}
              >
                yorkshire_humber
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "north_east" ? "underline" : "none",
                }}
                onClick={() => setSelectedRegion("north_east")}
              >
                north_east
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "north_west" ? "underline" : "none",
                }}
                onClick={() => setSelectedRegion("north_west")}
              >
                north_west
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "wales" ? "underline" : "none",
                }}
                onClick={() => setSelectedRegion("wales")}
              >
                wales
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "scotland" ? "underline" : "none",
                }}
                onClick={() => setSelectedRegion("scotland")}
              >
                scotland
              </div>
              <div
                className="mx-2 cursor-pointer"
                style={{
                  textDecoration:
                    selectedRegion === "northern_ireland"
                      ? "underline"
                      : "none",
                }}
                onClick={() => setSelectedRegion("northern_ireland")}
              >
                northern_ireland
              </div>
            </div>
            <div className="w-2/3">
              <ParentSize>
                {(parent) => (
                  <RadarYear
                    globalData={data}
                    energyDemand={energyDemand}
                    selectedRegion={selectedRegion}
                    selectedMonth={selectedMonth}
                    width={parent.width}
                  />
                )}
              </ParentSize>
            </div>
            <div className="w-2/3">
              <ParentSize>
                {(parent) => (
                  <TrendYear
                    globalData={data}
                    energyDemand={energyDemand}
                    selectedRegion={selectedRegion}
                    selectedMonth={selectedMonth}
                    width={parent.width}
                  />
                )}
              </ParentSize>
            </div>
          </div>
        </section>
        <section className="w-full my-8">
          <h2 className="text-4xl">COMPARE</h2>
          <div className="flex w-full">
            <div className="w-1/2 pr-2">
              <h5>London</h5>
              <ParentSize>
                {(parent) => (
                  <RadarYear
                    globalData={data}
                    energyDemand={energyDemand}
                    selectedRegion={"london"}
                    selectedMonth={"1"}
                    width={parent.width}
                  />
                )}
              </ParentSize>
            </div>
            <div className="w-1/2 pl-2">
              <h5>Northern Ireland</h5>
              <ParentSize>
                {(parent) => (
                  <RadarYear
                    globalData={data}
                    energyDemand={energyDemand}
                    selectedRegion={"northern_ireland"}
                    selectedMonth={"1"}
                    width={parent.width}
                  />
                )}
              </ParentSize>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
}
