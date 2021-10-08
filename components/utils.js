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
