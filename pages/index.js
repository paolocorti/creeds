import Head from "next/head";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import RadarYear from "../components/Radar/RadarYear";
import { ParentSize } from "@visx/responsive";
import TrendYear from "../components/Trend/TrendYear";
import LeftColumn from "../components/LeftColumn";
import RightColumn from "../components/RightColumn";
import RadarVerticalLegend from "../components/Radar/RadarVeticalLegend";
import { colorByCategory, activitiesArray } from "../components/utils";
import { useStore } from "../store.js";

export default function Home() {
  const [data, setData] = useState([]);
  const [energyDemand, setEnergyDemand] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCompareRegion, setSelCompareRegion] = useState([
    "london",
    "south_east",
  ]);
  const hoverCategory = useStore((state) => state.hoverCategory);
  const selectedCategory = useStore((state) => state.selectedCategory);

  useEffect(() => {
    csv("/data/activity_frequency_distributions.csv").then((values) => {
      setData(values);
    });

    csv("/data/LCL.csv").then((values) => {
      setEnergyDemand(values);
    });
  }, []);

  const setSelectedCompareRegion = (val) => {
    if (selectedCompareRegion.length < 2) {
      setSelCompareRegion((state) => [...state, val]);
    }
  };

  const unsetSelectedCompareRegion = (val) => {
    setSelCompareRegion(selectedCompareRegion.filter((state) => state !== val));
  };

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
        <section className="w-full flex">
          <LeftColumn>
            <h1 className="text-6xl text-left">
              Energy flexibility and the rhythms of everyday life
            </h1>
          </LeftColumn>

          <RightColumn>
            <p>
              One of the greatest challenges for a Net Zero Carbon future is
              making the most out of our clean energy sources, and most of the
              time, that means shifting our electricity demand to those times of
              day when clean power is available – this is what we call
              flexibility. Flexibility is generally seen as a way of improving
              the balancing of demand with renewables. And since renewables are
              cheaper than other forms of producing electricity, this also means
              reducing the overall cost of electricity generation. So how do we
              achieve that flexibility? <br />
              <br />
              Energy demand and what people do go hand in hand, so if we want to
              change energy demand, we essentially need to change either what
              people do or the way they do it. But our everyday life – what we
              do at home, at work, at school, when moving around – is extremely
              complex. It is somewhat difficult to find examples of times of
              day, week, month or year when the timing of the things we do
              changes. But in reality, we are constantly doing just that, either
              out of own initiative or in response to external factors such as
              the weather. We are a group of researchers who are convinced – and
              trying to convince others – that the idea of flexibility needs to
              be grounded in a thorough understanding of the contemporary timing
              of energy demand (domestic, non-domestic and in relation to the
              mobility of things and people) and how it has come to be the way
              it is. Interventions with a view to mitigating demand peaks
              through increasing flexibility in the timing of energy demand
              encompass a variety of technologies, pricing mechanisms and shifts
              in institutional timings.
              <br />
              <br /> But, as we mentioned before, energy demand is bound up with
              the temporal rhythm of society and what people do. Therefore,
              these seemingly isolated aspects of flexibility cannot be studied
              in isolation. Our search for flexibility necessarily starts by
              looking at the rhythms of everyday life, and here we share with
              you our attempts to visualise their complexity. So, how does
              demand for electricity relate to what people do day to day? As
              part of this work, we introduce fresh approaches to thinking of
              the social-temporal organisation of energy demand. We also try to
              understand what these mean for ‘flexibilities’ of different forms
              and scales, and across dimensions of everyday life, such as the
              timing of people’s activities in the home, their travels, demand
              for electricity and the price of it. But perhaps it is best to
              start by showing what the typical patterns of activity, demand,
              etc. look like.
            </p>
          </RightColumn>
        </section>
        <section className="w-full flex">
          <LeftColumn>
            <h2 className="text-4xl mb-8">
              Activities, demand and price every 30 minutes
            </h2>
            <p>
              We visualise everyday life as happening inside the 24 hour clock
              because we want to place what people do at the centre of our
              understanding of energy demand. At the heart of this approach is
              the position that the timing of energy demand is determined by the
              way people’s activities are ordered in time.
            </p>
            <p>
              This type of visualisation is a conscious effort to visualise
              underlying regular patterns relating to the fundamental temporal
              characteristics of social events. It shows the complexities and
              regular trends in everyday life through the simultaneous
              representation of the temporal rhythm of social practices and its
              shaping influence over households’ energy demand throughout the
              day.
            </p>
          </LeftColumn>
          <RightColumn>
            <div className="flex justify-center items-center">
              <div className="w-2/3 px-8">
                <ParentSize>
                  {(parent) => (
                    <RadarYear
                      globalData={data}
                      energyDemand={energyDemand}
                      selectedRegion={selectedRegion}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      width={parent.width}
                    />
                  )}
                </ParentSize>
              </div>
              <div className="w-1/3 px-8">
                <div className="flex flex-col">
                  <div
                    className="radial-overview-toolbar text-left"
                    style={{ height: "auto" }}
                  >
                    The blue external trend indicates the energy consumption by
                    hour. Each circle is an activity, the colors indicate
                    macro-categories, the size indicates the frequency. The blue
                    internal shape indicates the price by hour.
                  </div>
                  <div className="mt-4">
                    <RadarVerticalLegend />
                  </div>
                </div>
              </div>
            </div>
          </RightColumn>
        </section>
        <section className="w-full flex">
          <LeftColumn>
            <h2 className="text-4xl mb-8">Unpacking peaks</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </LeftColumn>
          <RightColumn>
            <div className="w-full">
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
          </RightColumn>
        </section>
        <section className="w-full flex">
          <LeftColumn>
            <h2 className="text-4xl">Compare</h2>
            <p>
              Energy demand varies depending on where people live and work
              within a country or region and this has implications for the grid.
              Meeting peaks in electricity demand in a specific area is
              expensive (because it increases balancing costs) and bad for the
              environment (as extra supply is needed to meet demand peaks). But
              people don’t just stay in the same place all the time. For many
              people, moving around from one location to another is an essential
              part of their everyday life – we go to work, we go to school, we
              go places… And when we move around, we consume energy in different
              spaces. This has repercussions on where and when electricity
              demand occurs.
            </p>
          </LeftColumn>
          <RightColumn>
            <div className="flex w-full flex-col">
              <div>
                <div
                  className="radial-overview-toolbar text-left"
                  style={{ height: "auto" }}
                >
                  Select the region or the categories. Mouse over on the graphic
                  to explore the data. The blue external trend indicates the
                  energy consumption by hour. Each circle is an activity, the
                  colors indicate macro-categories, the size indicates the
                  frequency.
                </div>
              </div>
              <div className="my-2">
                <div className="flex flex-wrap justify-center">
                  {/* <div
                    className="mx-2 cursor-pointer regionButton"
                    onClick={() => setSelectedRegion("all")}
                    style={{
                      backgroundColor: selectedRegion.includes("all")
                        ? "black"
                        : "white",
                      color: selectedRegion.includes("all") ? "white" : "black",
                    }}
                  >
                    All
                  </div> */}
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes("london")
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("london")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("london")}
                  >
                    London
                    {selectedCompareRegion.includes("london") && (
                      <span
                        className="ml-2"
                        onClick={() => unsetSelectedCompareRegion("london")}
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes(
                        "south_east"
                      )
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("south_east")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("south_east")}
                  >
                    South East
                    {selectedCompareRegion.includes("south_east") && (
                      <span
                        className="ml-2"
                        onClick={() => unsetSelectedCompareRegion("south_east")}
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes(
                        "east_england"
                      )
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("east_england")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("east_england")}
                  >
                    East England
                    {selectedCompareRegion.includes("east_england") && (
                      <span
                        className="ml-2"
                        onClick={() =>
                          unsetSelectedCompareRegion("east_england")
                        }
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes(
                        "east_midlands"
                      )
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("east_midlands")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("east_midlands")}
                  >
                    East Midlands
                    {selectedCompareRegion.includes("east_midlands") && (
                      <span
                        className="ml-2"
                        onClick={() =>
                          unsetSelectedCompareRegion("east_midlands")
                        }
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes(
                        "west_midlands"
                      )
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("west_midlands")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("west_midlands")}
                  >
                    West Midlands
                    {selectedCompareRegion.includes("west_midlands") && (
                      <span
                        className="ml-2"
                        onClick={() =>
                          unsetSelectedCompareRegion("west_midlands")
                        }
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes(
                        "yorkshire_humber"
                      )
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("yorkshire_humber")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("yorkshire_humber")}
                  >
                    Yorkshire Humber
                    {selectedCompareRegion.includes("yorkshire_humber") && (
                      <span
                        className="ml-2"
                        onClick={() =>
                          unsetSelectedCompareRegion("yorkshire_humber")
                        }
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes(
                        "north_east"
                      )
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("north_east")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("north_east")}
                  >
                    North East
                    {selectedCompareRegion.includes("north_east") && (
                      <span
                        className="ml-2"
                        onClick={() => unsetSelectedCompareRegion("north_east")}
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes(
                        "north_west"
                      )
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("north_west")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("north_west")}
                  >
                    North West
                    {selectedCompareRegion.includes("north_west") && (
                      <span
                        className="ml-2"
                        onClick={() => unsetSelectedCompareRegion("north_west")}
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes("wales")
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("wales")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("wales")}
                  >
                    Wales
                    {selectedCompareRegion.includes("wales") && (
                      <span
                        className="ml-2"
                        onClick={() => unsetSelectedCompareRegion("wales")}
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes(
                        "scotland"
                      )
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("scotland")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("scotland")}
                  >
                    Scotland{" "}
                    {selectedCompareRegion.includes("scotland") && (
                      <span
                        className="ml-2"
                        onClick={() => unsetSelectedCompareRegion("scotland")}
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                  <div
                    className="mx-2 cursor-pointer regionButton"
                    style={{
                      backgroundColor: selectedCompareRegion.includes(
                        "northern_ireland"
                      )
                        ? "black"
                        : "white",
                      color: selectedCompareRegion.includes("northern_ireland")
                        ? "white"
                        : "black",
                    }}
                    onClick={() => setSelectedCompareRegion("northern_ireland")}
                  >
                    Northern Ireland
                    {selectedCompareRegion.includes("northern_ireland") && (
                      <span
                        className="ml-2"
                        onClick={() =>
                          unsetSelectedCompareRegion("northern_ireland")
                        }
                      >
                        <img src={"/close.svg"} width={9} />
                      </span>
                    )}
                  </div>
                </div>{" "}
              </div>
              <div className="my-1">
                <div className="flex flex-wrap ">
                  {activitiesArray.map((el) => {
                    return (
                      <div
                        className="mx-2 cursor-pointer categoryButton"
                        onClick={() => {
                          useStore.setState({
                            selectedCategory:
                              selectedCategory === el.key ? null : el.key,
                          });
                        }}
                        style={{
                          backgroundColor:
                            selectedCategory === el.key
                              ? "black"
                              : "rgba(255,255,255,.7)",
                          color:
                            selectedCategory === el.key ? "white" : "black",
                        }}
                      >
                        <span
                          className="mr-1 colorDot"
                          style={{
                            backgroundColor: colorByCategory[el.key],
                          }}
                        ></span>
                        <span className="mr-4">{el.value}</span>
                        {selectedCategory && (
                          <span
                            className="ml-2 absolute right-2 top-2"
                            onClick={() =>
                              useStore.setState({
                                selectedCategory: null,
                              })
                            }
                          >
                            <img src={"/close.svg"} width={9} />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>{" "}
              </div>
              <div className="flex w-full">
                <div className="w-1/2 px-8">
                  {selectedCompareRegion[0] && (
                    <ParentSize>
                      {(parent) => (
                        <RadarYear
                          globalData={data}
                          energyDemand={energyDemand}
                          selectedRegion={selectedCompareRegion[0]}
                          selectedMonth={selectedMonth}
                          setSelectedMonth={setSelectedMonth}
                          width={parent.width}
                          showDemand={false}
                        />
                      )}
                    </ParentSize>
                  )}
                </div>
                <div className="w-1/2 px-8">
                  {selectedCompareRegion[1] && (
                    <ParentSize>
                      {(parent) => (
                        <RadarYear
                          globalData={data}
                          energyDemand={energyDemand}
                          selectedRegion={selectedCompareRegion[1]}
                          selectedMonth={selectedMonth}
                          setSelectedMonth={setSelectedMonth}
                          width={parent.width}
                          showDemand={false}
                        />
                      )}
                    </ParentSize>
                  )}
                </div>
              </div>
            </div>
          </RightColumn>
        </section>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
}
