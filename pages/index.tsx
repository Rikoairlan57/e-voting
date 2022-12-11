import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Menu from "../components/Menu";

export default function Home() {
  return (
    <div>
      <Head>
        <title>E-voting App</title>
        <meta name="description" content="Voting App No.1 di Indonesia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <div className="flex flex-col container mx-auto justify-center py-44 m-auto space-y-3">
        <h1 className="text-center text-5xl font-bold">Ayo Mulai Voting</h1>
        <div className="text-center ">
          <span className="text-lg bg-zinc-100 py-1 px-3 font-medium">
            Web Voting No.1 Di Indonesia
          </span>
        </div>
        <Image
          src="/images/header-image.png"
          alt="Picture of the header"
          width={300}
          height={300}
          priority
          objectPosition="center"
          objectFit="contain"
        />

        <div className="flex flex-row items-center justify-center space-x-5">
          <Link href="/vote/create" legacyBehavior>
            <a className="bg-zinc-800 text-sm font-bold text-white w-40 text-center py-3 border-2 border-transparent hover:bg-zinc-200 hover:text-zinc-800">
              Create New Votes
            </a>
          </Link>
          <span>atau</span>
          <Link href="/participant" legacyBehavior>
            <a className="bg-white text-sm font-bold text-zinc-800  border-zinc-800 border-2 w-40 text-center py-3 hover:bg-zinc-800 hover:text-white">
              Follow Vote
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
