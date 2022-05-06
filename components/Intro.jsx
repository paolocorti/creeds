import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import React, { useEffect } from "react";
import About from "./About";
import { isMobile } from "react-device-detect";

const Intro = ({ nextChapter, expanded, scrolling }) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <section
      id="intro"
      name="intro"
      className="w-full flex flex-col md:flex-row "
    >
      <LeftColumn sectionTitle={"/1.energy-vertical.svg"} expanded={expanded}>
        {mobile && (
          <div className="cursor-pointer">
            <div
              className="sticky bottom-4 border rounded-2xl w-24 z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-green"
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
              onClick={() => setAboutOpen((open) => !open)}
            >
              ABOUT
            </div>
          </div>
        )}
        <h1 className="text-left">
          Energy demand flexibility and the rhythms of everyday life
        </h1>
      </LeftColumn>

      <RightColumn expanded={expanded}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col grow">
            <p className="garamond px-0 md:px-6 !mt-0">
              One of the greatest challenges for a Net Zero Carbon future is{" "}
              <b>making the most out of our clean energy sources</b>.<br /> More
              often than not, this requires us to have the ability to{" "}
              <b>
                shift our electricity demands to those times of day when clean
                power is plentiful
              </b>{" "}
              – this is what we call flexibility.
              <br />
              Flexibility is generally seen as a way of improving the balancing
              of our demand for energy with renewables’ output. The more
              renewables we use, the less carbon emissions we produce, and the
              closer we get to achieving our ambitious Net Zero targets.
            </p>
            <div className="border-t mx-0 md:mx-6"></div>
            <p className="garamond px-0 md:px-6 ">
              So how do we achieve that flexibility?
            </p>
            <div className="border-t mx-0 md:mx-6"></div>
            <p className="garamond px-0 md:px-6">
              <b>Energy demand goes hand in hand with what people do</b>, so our
              search for flexibility necessarily starts by looking at the
              rhythms of everyday life.
              <br />
              Essentially,{" "}
              <b>
                if we want to change energy demand, we need to change either
                what people do
              </b>{" "}
              or the way they do it.
            </p>
            <div className="border-t mx-0 md:mx-6"></div>

            <p className="garamond px-0 md:px-6">
              But how exactly does demand for electricity relate to what people
              do on a day-to-day basis?
            </p>
            <div className="border-t mx-0 md:mx-6"></div>

            <p className="garamond px-0 md:px-6">
              Our everyday life – what we do at home, at work, at school, when
              moving around – and its relation to energy demand is rather
              complex.
              <br />
              As part of our work as energy researchers, we have introduced
              fresh approaches to thinking about the social-temporal
              organisation of energy demand. We also try to understand what
              these mean in terms of the ‘different flexibilities’ across
              different temporal scales and dimensions of everyday life such as
              the timing of people’s activities while at home, their travels,
              the demand for electricity, and the cost of providing said
              electricity.
              <br />
              Perhaps it is best to just dive right in and start exploring of
              how these patterns of human activity translate into demand for
              energy. Here we share with you some tools that hopefully will
              allow you to visualise more easily these complex relations, and
              the ways in which we can increase our ability to be flexible.
            </p>
          </div>
          <div>
            <Button title="START EXPLORING ↓" callback={nextChapter} />
          </div>
        </div>
      </RightColumn>

      <About aboutOpen={aboutOpen} setAboutOpen={setAboutOpen} />
    </section>
  );
};

export default React.memo(Intro);
