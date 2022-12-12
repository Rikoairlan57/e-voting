import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import Button from "../../components/Button";
import Menu from "../../components/Menu";
import "react-datepicker/dist/react-datepicker.css";
import CandidateForm from "../../components/CandidateForm";
import AddCandidateButton from "../../components/AddCandidateButton";
import { useRouter } from "next/router";
import Form from "../../components/Form";
import RestrictedPage from "../../components/page/RestrictedPage";
import id from "date-fns/locale/id";
import { showAlert } from "../../components/Alert";
registerLocale("id", id);

export default function NewVote() {
  const { data: session } = useSession();

  const router = useRouter();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) return <RestrictedPage />;

  const addCandidateForm = () => {
    const newCandidate: Candidate = {
      name: "",
      key: candidates.length + 1,
      title: "",
    };
    setCandidates([...candidates, newCandidate]);
  };

  const removeCandidateForm = (key: number) => {
    const newCandidates = candidates.filter(
      (candidate) => candidate.key !== key
    );
    newCandidates.forEach((candidate, index) => {
      candidate.key = index + 1;
    });

    setCandidates(newCandidates);
  };

  const submitCandidate = (candidate: Candidate) => {
    setCandidates(
      candidates.map((c) => (c.key === candidate.key ? candidate : c))
    );
  };

  const createVote = () => {
    if (title === "") {
      showAlert({ title: "Hmmh", subtitle: "Title cannot be empty" });
      return;
    }
    if (candidates.length < 2) {
      showAlert({ title: "Hmmh", subtitle: "There are at least 2 candidates" });
      return;
    }
    if (startDate > endDate) {
      showAlert({
        title: "Hmmh",
        subtitle: "Tanggal mulai tidak boleh lebih besar dari tanggal selesai",
      });
      return;
    }
    if (candidates.some((c) => c.name === "")) {
      showAlert({
        title: "Hmmh",
        subtitle: "Candidate name cannot be empty",
      });
      return;
    }

    setLoading(true);

    fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        startDate,
        endDate,
        candidates,
        publisher: session.user.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/vote/success");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Head>
        <title>News Voting</title>
      </Head>
      <Menu />

      <div className="container mx-auto py-10">
        <Image
          src={"/images/vote.png"}
          alt="vote"
          width={200}
          height={200}
          objectFit="contain"
        />
        <h1 className="text-4xl font-bold ">Create New Vote</h1>
        <h2 className="text-zinc-700 mt-3">
          Please enter the required data before making an online vote
        </h2>

        <form className="flex flex-col">
          <div className="space-y-5">
            <h3 className="font-medium text-xl mt-10">Detail Voting</h3>
            <div className="flex flex-col">
              <label className="text-sm">Title</label>
              <Form
                onChange={setTitle}
                value={title}
                placeholder="Your name voting"
                className="w-1/2"
              />
            </div>
            <div className="flex flex-col w-2/3">
              <label className="text-sm">When does it start?</label>
              <div className="inline-flex">
                <ReactDatePicker
                  locale={"id"}
                  showTimeSelect
                  dateFormat="Pp"
                  selected={startDate}
                  minDate={new Date()}
                  onChange={(date) => date && setStartDate(date)}
                  className="w-full border bg-zinc-100 border-transparent py-2 px-3"
                />
                <span className="text-sm text-center p-3">until</span>
                <ReactDatePicker
                  locale={"id"}
                  dateFormat="Pp"
                  showTimeSelect
                  selected={endDate}
                  minDate={startDate}
                  onChange={(date) => date && setEndDate(date)}
                  className="w-full border bg-zinc-100 border-transparent py-2 px-3"
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-sm"></label>
            </div>
          </div>

          <h3 className="font-medium text-xl mt-10">Candidate</h3>
          <div className="grid gap-4 grid-cols-4 mt-5">
            {candidates.map((candidate, index) => (
              <CandidateForm
                key={index}
                candidate={candidate}
                submitCandidate={submitCandidate}
                removeCandidateForm={removeCandidateForm}
              />
            ))}
            <AddCandidateButton onClick={addCandidateForm} />
          </div>

          <div className="py-10 text-right">
            <Button text="Create Voting👍🏻" size="lg" onClick={createVote} />
          </div>
        </form>
      </div>
    </div>
  );
}
