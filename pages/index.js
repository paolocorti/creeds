import Head from "next/head";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Landing from "../components/Landing";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>
          Energy demand flexibility and the rhythms of everyday life
        </title>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
        />
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Nanum+Myeongjo:wght@400;700&family=STIX+Two+Text:wght@300;400;700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
      </Head>

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
