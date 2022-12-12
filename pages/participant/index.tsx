import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { showAlert } from "../../components/Alert";
import Button from "../../components/Button";
import Form from "../../components/Form";
import RestrictedPage from "../../components/page/RestrictedPage";

export default function Participant() {
  const router = useRouter();

  const { data: session } = useSession();

  const [code, setCode] = useState("");

  if (!session) {
    return <RestrictedPage />;
  }

  const handleSubmit = async () => {
    if (code === "") {
      showAlert({ title: "Hmmh..", subtitle: "Please enter the correct code" });
      return;
    }
    await fetch("/api/votes/" + code, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          showAlert({
            title: "Hmmh..",
            subtitle: "The code you entered is incorrect",
          });
          return;
        }
        router.push("/participant/" + code);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5 container mx-auto">
      <Head>
        <title>Successfully Made Voting</title>
      </Head>
      <Image
        src={"/images/participate.png"}
        alt="thinking"
        width={200}
        height={180}
        objectFit="contain"
      />
      <h1 className="text-4xl font-bold">Ikutan Voting </h1>
      <h2 className="w-full lg:w-1/2 text-center">
        To take part in voting, you must enter the voting code that has been
        entered give the committee/organizer
      </h2>
      <Form
        placeholder="Enter Voting Code"
        value={code}
        onChange={setCode}
        className="w-full lg:w-1/3 mt-3"
      />
      <Button onClick={handleSubmit} text="Next" size="lg" className="w-1/3" />
      <button className="text-sm" onClick={() => router.push("/")}>
        Back
      </button>
    </div>
  );
}
