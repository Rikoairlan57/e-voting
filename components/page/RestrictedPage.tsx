import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Button from "../Button";

export default function RestrictedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5">
      <Head>
        <title>Login</title>
      </Head>
      <Image
        src={"/images/thinking.png"}
        alt="thinking"
        width={200}
        height={200}
      />
      <h1 className="text-4xl font-bold">Login First Please!</h1>
      <h2>To access this page, you must login first</h2>
      <Button onClick={signIn} text="Login" size="lg" />
    </div>
  );
}
