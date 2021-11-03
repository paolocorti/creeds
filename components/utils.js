// export const mapStyle =
//   "mapbox://styles/surgooperations/ck8yxwsns04au1iry19qpedz8";
// export const mapAfricaStyle =
//   "mapbox://styles/surgooperations/ckc08htbs394h1imng3lhau7l";
// export const mapToken =
//   "pk.eyJ1Ijoic3VyZ29vcGVyYXRpb25zIiwiYSI6ImNrOHl3dmt1ZDA4dGMzZWxjNTN4a2U4ejgifQ.2IX1o8wvWycKJqMx5GEu0w";
// export const serverUrl =
//   process.env.NODE_ENV === "development"
//     ? "https://rest.aws-surgofoundation.org"
//     : "https://restapi.aws-surgofoundation.org";

// //console.log(process.env.NODE_ENV === 'development')

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

export const activitiesCode = {
  ab: { index: 4, value: "absence" },
  ha: { index: 5, value: "generic in-home activity" },
  sl: { index: 6, value: "sleep" },
  fp: { index: 7, value: "food preparation" },
  ln: { index: 8, value: "laundry" },
  dw: { index: 9, value: "dishwashing" },
  tw: { index: 10, value: "trave to/from work" },
  tv: { index: 11, value: "tv watching" },
  it: { index: 12, value: "it-related" },
  et: { index: 13, value: "eating" },
  pc: { index: 14, value: "personal care" },
  wr: { index: 15, value: "work" },
  hc: { index: 16, value: "household care" },
  hu: { index: 17, value: "household upkeep" },
  sh: { index: 18, value: "shopping" },
  ot: { index: 19, value: "other travel activity" },
};
