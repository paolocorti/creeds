import PageHead from "../components/PageHead";
import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import Section1 from "../components/Section1";
import { server } from "../config";
import { flatten } from "lodash";
import { useStore } from "../store.js";
import { useRouter } from "next/router";

export default function Home({ data, energyDemand, gasDemand, energyPrice }) {
  const router = useRouter();

  useEffect(() => {
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

  //const fullscreen = router.query && router.query.share ? true : false;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <PageHead />
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <Section1
          data={data}
          energyDemand={energyDemand}
          energyPrice={energyPrice}
          previousChapter={() => {
            router.push("introduction");
          }}
          nextChapter={() => {
            router.push("unpacking_peaks");
          }}
          fullscreen={true}
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
