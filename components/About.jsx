import React, { useEffect } from "react";
import { LinkedinShareButton, TwitterShareButton } from "react-share";

const About = ({ aboutOpen, setAboutOpen }) => {
  return (
    <div
      className={`w-full md:w-4/5 bg-lightgreen p-8 z-50 overflow-y-auto overflow ${
        aboutOpen ? "left-0" : "-left-full"
      } transition-all duration-500	box-shadow fixed top-0 h-screen`}
    >
      <div className="flex w-full justify-end">
        <div
          className="border rounded-2xl w-24 z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-green"
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            lineHeight: 1.5,
          }}
          onClick={() => setAboutOpen((open) => !open)}
        >
          CLOSE X
        </div>
      </div>
      <p className="px-0 md:px-6">
        The aim of this project was to provide you with accessible,
        user-friendly visualisations that show the ways in which our activities
        impact our energy demands. These visualisations condense a wealth of
        data from a variety of sources into a single graphic that allows you to
        explore how our everyday lives unfold over the course of a day, and what
        impacts they have on the amount of energy required to provide us with
        the services we have become used to have access to. More importantly,
        the visuals also show us the opportunities for shifting those energy-
        intensive activities away from those busy periods of the day and into
        those periods where there is potential to be more flexible, thus
        reducing the strain on out power systems.
      </p>
      <p className="px-0 md:px-6">
        {" "}
        This project was brought to you by the Flexibility of Demand theme at
        the{" "}
        <a
          href="https://www.creds.ac.uk/"
          target="_blank"
          className="text-bold underline text-base"
          style={{ fontFamily: "EB Garamond" }}
        >
          Centre for research into Energy Demand Solutions (CREDS) &#8599;
        </a>
        . The project was funded through CREDS by UK Research and Innovation
        through the grant agreement EP/R035288/1.{" "}
      </p>
      <div className="flex justify-start px-0 md:px-6 pb-8">
        <LinkedinShareButton
          url={"https://creds.vercel.app/"}
          title={"Energy demand flexibility and the rhythms of everyday life"}
          summary={
            "Our everyday life – what we do at home, at work, at school, when moving around – and its relation to energy demand is rather complex. As part of our work as energy researchers, we have introduced fresh approaches to thinking about the social-temporal organisation of energy demand."
          }
          source={"https://creds.vercel.app/"}
        >
          <img src="/share-linkedin.svg" width={28} className="mr-1" />
        </LinkedinShareButton>
        <TwitterShareButton
          url={"https://creds.vercel.app/"}
          title={"Energy demand flexibility and the rhythms of everyday life"}
          summary={
            "Our everyday life – what we do at home, at work, at school, when moving around – and its relation to energy demand is rather complex. As part of our work as energy researchers, we have introduced fresh approaches to thinking about the social-temporal organisation of energy demand."
          }
          source={"https://creds.vercel.app/"}
        >
          <img src="/share-tw.svg" width={28} className="ml-1" />
        </TwitterShareButton>
      </div>

      <div className="px-0 md:px-6 text-left">
        <div className="text-lg font-bold">The Team </div> <br></br>{" "}
        <div className="font-bold">Project management:</div>
        <div className="flex items-start w-full justify-between">
          <div>
            <div className="text-base">Dr. Jose Luis Ramirez-Mendiola</div>
            <div className="text-base italic">
              Research Fellow on Flexibility in Energy Demand at the University
              of Reading, UK
            </div>
          </div>
          <a href="mailto:j.ramirez-mendiola@reading.ac.uk" target="_blank">
            <div
              className="border rounded-2xl w-24 z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-green"
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              CONTACT
            </div>
          </a>{" "}
        </div>
        <br></br>
        <div className="flex items-start w-full justify-between">
          <div>
            <div className="text-base">Professor Jacopo Torriti</div>
            <div className="text-base italic">
              Professor of Energy Economics and Policy at the University of
              Reading and co-director of CREDS
            </div>
          </div>
          <a href="mailto:j.torriti@reading.ac.uk " target="_blank">
            <div
              className="border rounded-2xl w-24 z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-green"
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              {" "}
              CONTACT
            </div>
          </a>{" "}
        </div>
        <div className="mt-4 font-bold">Visual design:</div>
        <a
          href="https://twitter.com/fedfragapane"
          target="_blank"
          className="text-bold underline text-base"
        >
          {" "}
          Federica Fragapane &#8599;
        </a>{" "}
        <div className="mt-4 font-bold">Web development:</div>
        <a
          href="https://twitter.com/paolocorti_"
          target="_blank"
          className="text-bold underline text-base "
        >
          Paolo Corti &#8599;
        </a>
        <div className="text-xs mt-8">
          © Copyright 2022
          <br />
          <br /> The visuals are made available under the Creative Commons
          License CC BY-ND 3.0, and may be used and displayed without charge by
          all commercial and non-commercial websites. <br /> Use is, however,
          only permitted with proper attribution to the project. When publishing
          one of these graphics, please include a backlink to the original site.
        </div>
        <div className="w-full flex mt-4">
          <img src={"/creds.svg"} width={100} />
          <div className="flex justify-center items-center ml-4">
            <img src={"/flex.svg"} width={24} />
            <div className="text-xs text-white">Flexibility</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
