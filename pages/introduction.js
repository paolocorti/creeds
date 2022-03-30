import Head from "next/head";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Intro from "../components/Intro";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main
        className="flex flex-col items-center justify-center w-full flex-1 text-center"
        id="container"
      >
        <ReactTooltip effect="solid" backgroundColor="#111" delayShow={50} />

        <Intro
          nextChapter={() => {
            router.push("activities");
          }}
        />
      </main>
    </div>
  );
}
