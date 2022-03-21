import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";

const Intro = ({ nextChapter, expanded, scrolling }) => {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section
      id="intro"
      name="intro"
      className="w-full flex flex-col md:flex-row "
    >
      <LeftColumn sectionTitle={"/1.energy-vertical.svg"} expanded={expanded}>
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
          Energy demand flexibility and the rhythms of everyday life
        </h1>
      </LeftColumn>

      <RightColumn expanded={expanded}>
        <p className="px-0 md:px-6">
          One of the greatest challenges for a Net Zero Carbon future is{" "}
          <b>making the most out of our clean energy sources</b>.
        </p>

        <p className="px-0 md:px-6">
          More often than not, this requires us to have the ability to{" "}
          <b>
            shift our electricity demands to those times of day when clean power
            is plentiful
          </b>{" "}
          – this is what we call flexibility.
        </p>

        <p className="px-0 md:px-6">
          Flexibility is generally seen as a way of improving the balancing of
          our demand for energy with renewables’ output. The more renewables we
          use, the less carbon emissions we produce, and the closer we get to
          achieving our ambitious Net Zero targets.
        </p>

        <p className="px-0 md:px-6">So how do we achieve that flexibility?</p>

        <p className="px-0 md:px-6">
          <b>Energy demand goes hand in hand with what people do</b>, so our
          search for flexibility necessarily starts by looking at the rhythms of
          everyday life.
        </p>

        <p className="px-0 md:px-6">
          Essentially,{" "}
          <b>
            if we want to change energy demand, we need to change either what
            people do
          </b>{" "}
          or the way they do it.
        </p>

        <p className="px-0 md:px-6">
          But how exactly does demand for electricity relate to what people do
          on a day-to-day basis?
        </p>

        <p className="px-0 md:px-6">
          Our everyday life – what we do at home, at work, at school, when
          moving around – and its relation to energy demand is rather complex.
        </p>

        <p className="px-0 md:px-6">
          As part of our work as energy researchers, we have introduced fresh
          approaches to thinking about the social-temporal organisation of
          energy demand. We also try to understand what these mean in terms of
          the ‘different flexibilities’ across different temporal scales and
          dimensions of everyday life such as the timing of people’s activities
          while at home, their travels, the demand for electricity, and the cost
          of providing said electricity.
        </p>

        <p className="px-0 md:px-6">
          Perhaps it is best to just dive right in and start exploring of how
          these patterns of human activity translate into demand for energy.
          Here we share with you some tools that hopefully will allow you to
          visualise more easily these complex relations, and the ways in which
          we can increase our ability to be flexible.
        </p>
        <Button title="START EXPLORING ↓" callback={nextChapter} />
      </RightColumn>

      <div
        className={`w-full md:w-3/4 bg-lightgreen p-8 absolute z-50 h-screen overflow-y-auto	 overflow ${
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
            className="text-bold underline text-base"
          >
            Energy Demand Solutions (CREDS)
          </a>
          . The project was funded through CREDS by UK Research and Innovation
          through the grant agreement EP/R035288/1.{" "}
        </p>

        <div className="px-0 md:px-6">
          The Team Project management:<br></br>
          <br></br>{" "}
          <div className="text-base">Dr. Jose Luis Ramirez-Mendiola</div>
          <div className="text-sm	">
            Research Fellow on Flexibility in Energy Demand at the University of
            Reading, UK
          </div>
          <a href="mailto:j.ramirez-mendiola@reading.ac.uk" target="_blank">
            <div className="border rounded-2xl w-36 text-sm flex justify-center mt-4 z-40 px-4 py-1 block cursor-pointer hover:bg-black hover:text-green">
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
            <div className="border rounded-2xl w-36 text-sm flex justify-center mt-4 z-40 px-4 py-1 block cursor-pointer hover:bg-black hover:text-green">
              CONTACT
            </div>
          </a>{" "}
          <br></br>
          <br></br>Visual design:{" "}
          <a
            href="https://twitter.com/fedfragapane"
            target="_blank"
            className="text-bold underline text-base"
          >
            {" "}
            Federica Fragapane
          </a>{" "}
          <br></br> Web development:{" "}
          <a
            href="https://twitter.com/paolocorti_"
            target="_blank"
            className="text-bold underline text-base "
          >
            Paolo Corti
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
