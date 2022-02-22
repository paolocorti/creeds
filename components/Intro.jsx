import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
const Intro = () => {
  return (
    <section className="w-full flex">
      <LeftColumn>
        <h1 className="text-6xl text-left">
          Energy flexibility and the rhythms of everyday life
        </h1>
      </LeftColumn>

      <RightColumn>
        <p>
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
      </RightColumn>
    </section>
  );
};

export default Intro;
