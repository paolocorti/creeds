import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";

const Intro = ({ nextChapter }) => {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section
      name="intro"
      className="w-full flex flex-col md:flex-row min-h-screen"
    >
      <LeftColumn>
        <div className="cursor-pointer">
          <div
            className="border rounded-2xl w-24 z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-green"
            style={{
              fontSize: "11px",
            }}
            onClick={() => setAboutOpen((open) => !open)}
          >
            ABOUT
          </div>
        </div>
        <h1
          className="text-left leading-snug"
          style={{
            fontSize: "65px",
            lineHeight: "75px",
          }}
        >
          Energy flexibility and the rhythms of everyday life
        </h1>
      </LeftColumn>

      <RightColumn>
        <p className="px-0 md:px-6">
          One of the greatest challenges for a Net Zero Carbon future is making
          the most out of our clean energy sources, and most of the time, that
          means shifting our electricity demand to those times of day when clean
          power is available – this is what we call flexibility. Flexibility is
          generally seen as a way of improving the balancing of demand with
          renewables. And since renewables are cheaper than other forms of
          producing electricity, this also means reducing the overall cost of
          electricity generation. So how do we achieve that flexibility? <br />
          <br />
          Energy demand and what people do go hand in hand, so if we want to
          change energy demand, we essentially need to change either what people
          do or the way they do it. But our everyday life – what we do at home,
          at work, at school, when moving around – is extremely complex. It is
          somewhat difficult to find examples of times of day, week, month or
          year when the timing of the things we do changes. But in reality, we
          are constantly doing just that, either out of own initiative or in
          response to external factors such as the weather. We are a group of
          researchers who are convinced – and trying to convince others – that
          the idea of flexibility needs to be grounded in a thorough
          understanding of the contemporary timing of energy demand (domestic,
          non-domestic and in relation to the mobility of things and people) and
          how it has come to be the way it is. Interventions with a view to
          mitigating demand peaks through increasing flexibility in the timing
          of energy demand encompass a variety of technologies, pricing
          mechanisms and shifts in institutional timings.
          <br />
          <br /> But, as we mentioned before, energy demand is bound up with the
          temporal rhythm of society and what people do. Therefore, these
          seemingly isolated aspects of flexibility cannot be studied in
          isolation. Our search for flexibility necessarily starts by looking at
          the rhythms of everyday life, and here we share with you our attempts
          to visualise their complexity. So, how does demand for electricity
          relate to what people do day to day? As part of this work, we
          introduce fresh approaches to thinking of the social-temporal
          organisation of energy demand. We also try to understand what these
          mean for ‘flexibilities’ of different forms and scales, and across
          dimensions of everyday life, such as the timing of people’s activities
          in the home, their travels, demand for electricity and the price of
          it. But perhaps it is best to start by showing what the typical
          patterns of activity, demand, etc. look like.
        </p>
        <Button title="NEXT CHAPTER ↓" callback={nextChapter} />
      </RightColumn>

      <div
        className={`w-full md:w-2/3 bg-lightgreen p-8 absolute z-50 h-screen overflow-y-auto	 overflow ${
          aboutOpen ? "left-0" : "-left-full"
        } transition-all duration-500	`}
      >
        <div className="flex w-full justify-end">
          <div
            className="border rounded-2xl w-24 z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-green"
            style={{
              fontSize: "11px",
            }}
            onClick={() => setAboutOpen((open) => !open)}
          >
            CLOSE
          </div>
        </div>
        <p className="px-0 md:px-6">
          The aim of this project was to provide you with accessible,
          user-friendly visualisations that show the ways in which our
          activities impact our energy demands. These visualisations condense a
          wealth of data from a variety of sources into a single graphic that
          allows you to explore how our everyday lives unfold over the course of
          a day, and what impacts they have on the amount of energy required to
          provide us with the services we have become used to have access to.
          More importantly, the visuals also show us the opportunities for
          shifting those energy- intensive activities away from those busy
          periods of the day and into those periods where there is potential to
          be more flexible, thus reducing the strain on out power systems.
        </p>
        <p className="px-0 md:px-6">
          {" "}
          This project was brought to you by the Flexibility of Demand theme at
          the Centre for research into{" "}
          <a
            href="https://www.creds.ac.uk/"
            target="_blank"
            className="text-bold underline"
          >
            Energy Demand Solutions (CREDS)
          </a>
          . The project was funded through CREDS by UK Research and Innovation
          through the grant agreement EP/R035288/1.{" "}
        </p>

        <p className="px-0 md:px-6">
          The Team Project management:<br></br>
          <br></br>{" "}
          <div className="text-base">Dr. Jose Luis Ramirez-Mendiola</div>
          <div className="text-sm	">
            Research Fellow on Flexibility in Energy Demand at the University of
            Reading, UK
          </div>
          <a href="mailto:j.ramirez-mendiola@reading.ac.uk" target="_blank">
            <div className="border rounded-2xl w-36 flex justify-center mt-4 z-40 px-4 py-1 block cursor-pointer hover:bg-black hover:text-green">
              CONTACT
            </div>
          </a>{" "}
          <br></br>
          <div className="text-base">Professor Jacopo Torriti</div>
          <div className="text-sm">
            Professor of Energy Economics and Policy at the University of
            Reading and co-director of CREDS
          </div>
          <a href="mailto:j.torriti@reading.ac.uk " target="_blank">
            <div className="border rounded-2xl w-36 flex justify-center mt-4 z-40 px-4 py-1 block cursor-pointer hover:bg-black hover:text-green">
              CONTACT
            </div>
          </a>{" "}
          <br></br>
          <br></br>Visual design:{" "}
          <a
            href="https://twitter.com/fedfragapane"
            target="_blank"
            className="text-bold underline"
          >
            {" "}
            Federica Fragapane
          </a>{" "}
          <br></br> Web development:{" "}
          <a
            href="https://twitter.com/paolocorti_"
            target="_blank"
            className="text-bold underline"
          >
            Paolo Corti
          </a>
        </p>
      </div>
    </section>
  );
};

export default Intro;
