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

export const radToDeg = (radians) => {
  const pi = Math.PI;
  return radians * (180 / pi);
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
  sl: "#B83C3A",
  et: "#B83C3A",
  pc: "#B83C3A",
  hc: "#B83C3A",
  ha: "#9A1D18",
  tv: "#fa9bb2",
  it: "#fa9bb2",
  tw: "#9ab0ff",
  wr: "#9ab0ff",
  ab: "#888DBB",
  sh: "#fa9bb2",
  ot: "#9ab0ff",
  fp: "#4C3988",
  ln: "#4C3988",
  dw: "#4C3988",
  hu: "#4C3988",
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
