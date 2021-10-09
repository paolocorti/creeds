import Head from "next/head";
import Radar from "../components/Radar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Radar selected={0} />
        <Radar selected={1} />
        <Radar selected={2} />
        <Radar selected={3} />
        <Radar selected={4} />
        <Radar selected={5} />
        <Radar selected={6} />
        <Radar selected={7} />
        <Radar selected={8} />
        <Radar selected={9} />
        <Radar selected={10} />
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        CREEDS
      </footer>
    </div>
  );
}
