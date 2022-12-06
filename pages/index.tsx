import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>E-voting App</title>
        <meta name="description" content="Voting App No.1 di Indonesia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col container mx-auto justify-center py-44 m-auto space-y-3">
        <h1 className="text-center text-5xl font-bold">
          Let&apos;s Start Voting
        </h1>
      </div>
    </div>
  );
}
