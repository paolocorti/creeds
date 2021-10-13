import Head from "next/head";
import Radar from "../components/Radar";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    csv("/data/data.csv").then((values) => {
      console.log(values);
      setData(values);
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
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <ReactTooltip />

        <Radar globalData={data} selected={0} />
        <Radar globalData={data} selected={1} />
        <Radar globalData={data} selected={2} />
        <Radar globalData={data} selected={3} />
        <Radar globalData={data} selected={4} />
        <Radar globalData={data} selected={5} />
        <Radar globalData={data} selected={6} />
        <Radar globalData={data} selected={7} />
        <Radar globalData={data} selected={8} />
        <Radar globalData={data} selected={9} />
        <Radar globalData={data} selected={10} />
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        CREEDS
      </footer>
    </div>
  );
}
