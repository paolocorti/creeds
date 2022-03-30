const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://creds.vercel.app/";

export const siteUrl = "https://creds.vercel.app";
