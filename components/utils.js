import React, { useState, useEffect, useLayoutEffect } from "react";

export const mobileZoom = 2.5;
export const desktopZoom = 3.75;
export const popupOffset = 20;

export const format = (num) => {
  return num ? parseFloat(num).toFixed(2) : 0;
};

export const degToRad = (degrees) => {
  const pi = Math.PI;
  return degrees * (pi / 180);
};

export const radToDeg = (radians) => {
  const pi = Math.PI;
  return radians * (180 / pi);
};

export const regions = [
  "london",
  "south_east",
  "east_england",
  "east_midlands",
  "west_midlands",
  "yorkshire_humber",
  "north_east",
  "north_west",
  "wales",
  "scotland",
  "northern_ireland",
];

export const activities = {
  1: "absence",
  2: "generic home activity",
  3: "sleep",
  4: "food preparation",
  5: "laundry",
  6: "dishwashing",
  7: "travel to/from work",
  8: "TV-related",
  9: "IT-related",
  10: "eating",
  11: "personal care",
  12: "work",
  13: "household care",
  14: "household Upkeep",
  15: "shopping",
  16: "other Travel",
};

export const activitiesArray = [
  //{ key: "ab", index: 14, value: "absence" },
  //{ key: "ha", index: 9, value: "generic in-home activity" },
  { key: "sl", index: 5, value: "sleep" },
  { key: "et", index: 6, value: "eating" },
  { key: "pc", index: 7, value: "personal care" },
  { key: "hc", index: 8, value: "household care" },
  { key: "tv", index: 10, value: "tv watching" },
  { key: "it", index: 11, value: "it-related" },
  { key: "sh", index: 15, value: "shopping" },
  { key: "tw", index: 12, value: "travel to/from work" },
  { key: "wr", index: 13, value: "work" },
  { key: "ot", index: 16, value: "other travel act." },
  { key: "fp", index: 17, value: "food preparation" },
  { key: "ln", index: 18, value: "laundry" },
  { key: "dw", index: 19, value: "dishwashing" },
  { key: "hu", index: 20, value: "household upkeep" },
];

export const activitiesCode = {
  ab: { index: 14, value: "absence" },
  ha: { index: 9, value: "generic in-home activity" },
  sl: { index: 5, value: "sleep" },
  fp: { index: 17, value: "food preparation" },
  ln: { index: 18, value: "laundry" },
  dw: { index: 19, value: "dishwashing" },
  tw: { index: 12, value: "travel to/from work" },
  tv: { index: 10, value: "tv watching" },
  it: { index: 11, value: "it-related" },
  et: { index: 6, value: "eating" },
  pc: { index: 7, value: "personal care" },
  wr: { index: 13, value: "work" },
  hc: { index: 8, value: "household care" },
  hu: { index: 20, value: "household upkeep" },
  sh: { index: 15, value: "shopping" },
  ot: { index: 16, value: "other travel activity" },
};

export const colorByCategory = {
  sl: "#9e0f0d",
  et: "#9e0f0d",
  pc: "#9e0f0d",
  hc: "#9e0f0d",
  ha: "#9e0f0d",
  tv: "#e06373",
  it: "#e06373",
  tw: "#807ece",
  wr: "#807ece",
  ab: "#888DBB",
  sh: "#e06373",
  ot: "#807ece",
  fp: "#2b1475",
  ln: "#2b1475",
  dw: "#2b1475",
  hu: "#2b1475",
};

export const sortBy = [
  "sl",
  "et",
  "pc",
  "hc",
  "tv",
  "it",
  "sh",
  "tw",
  "wr",
  "ot",
  "ha",
  "ab",
  "fp",
  "ln",
  "dw",
  "hu",
];

export const customSort = ({ data, sortBy, sortField }) => {
  const sortByObject = sortBy.reduce((obj, item, index) => {
    return {
      ...obj,
      [item]: index,
    };
  }, {});
  return data.sort(
    (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
  );
};

export const regionLabels = {
  london: "London",
  south_east: "South East",
  east_england: "East England",
  east_midlands: "East Midlands",
  west_midlands: "West Midlands",
  yorkshire_humber: "Yorkshire Humber",
  north_east: "North East",
  north_west: "North West",
  wales: "Wales",
  scotland: "Scotland",
  northern_ireland: "Northern Ireland",
};

export const getEnergyPrice = (data, index) => {
  if (data.length === 0) return;

  console.log(index);

  const d = data[0].filter((v) => {
    return String(v.time) === String(index);
  });
  const value = d && d[0] ? d[0].value.toFixed(1) : null;

  return value;
};

export const getEnergyDemand = (data, index) => {
  if (data.length === 0) return;

  const d = data[0].filter((v) => {
    return String(v.time) === String(index);
  });
  const value = d && d[0] ? d[0].value.toFixed(1) : null;

  return value;
};

export const getTopActivity = (data, index) => {
  if (data.length === 0) return;

  const d = data.filter((v) => {
    return String(v.time) === String(index);
  });

  const value = d && d[0] ? d[0].maxCategory : null;
  return value;
};

export function useWindowDimension() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useLayoutEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      console.log("***** debounced resize"); // See the cool difference in console
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100); // 100ms

    debouncedResizeHandler();

    window.addEventListener("resize", debouncedResizeHandler);
    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, []); // Note this empty array. this effect should run only on mount and unmount
  return windowSize;
}

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useLayoutEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export const getVizWidth = (type, size, expanded) => {
  if (!size.width) {
    return 300;
  }

  if (type === "single") {
    return size.width > 1200
      ? size.width * 0.32
      : size.width > 700
      ? size.width * 0.34
      : size.width * 0.8;
  }

  if (type === "multiple") {
    return size.width > 1200
      ? size.width * 0.3
      : size.width > 700
      ? size.width * 0.3
      : size.width * 0.8;
  }

  if (type === "trend") {
    return size.width > 1200
      ? size.width * 0.65
      : size.width > 700
      ? size.width * 0.65
      : size.width * 0.9;
  }
};
