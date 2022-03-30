import Head from "next/head";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Landing from "../components/Landing";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main
        className="flex flex-col items-center justify-center w-full flex-1 text-center w-full"
        id="container"
      >
        <ReactTooltip effect="solid" backgroundColor="#111" delayShow={50} />
        <Landing
          nextChapter={() => {
            router.push("introduction");
          }}
        />
      </main>

      {/* <footer className="bg-lightgreen flex items-start flex-col justify-center w-full py-8 px-4 md:px-8">
        <div className="text-xs">
          © Copyright 2022
          <br />
          <br /> The visuals are made available under the Creative Commons
          License CC BY-ND 3.0, and may be used and displayed without charge by
          all commercial and non-commercial websites. <br /> Use is, however,
          only permitted with proper attribution to the project. When publishing
          one of these graphics, please include a backlink to the original site.
        </div>
      </footer> */}
    </div>
  );
}
