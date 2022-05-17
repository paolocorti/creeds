import PageHead from "../components/PageHead";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import Section2 from "../components/Section2";
import { server } from "../config";
import { flatten } from "lodash";
import { useStore } from "../store.js";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [globalData, setData] = useState([]);
  const [loading, setLoading] = useState("Loading energy distributions");

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <PageHead shareImage="thumb-share2.png" />
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center w-full">
        <Section2
          data={data}
          previousChapter={() => {
            router.push("activities");
          }}
          nextChapter={() => {
            router.push("spatial_variation");
          }}
          fullscreen={true}
          shared={true}
        />
      </main>
    </div>
  );
}
