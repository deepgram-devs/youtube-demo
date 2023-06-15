"use client";

import YouTubeLogo from "@/components/YouTubeLogo";
import PaginationBar from "@/components/pagination/Bar";
import PaginationButton from "@/components/pagination/Button";
import { useErrorContext } from "@/context/error";
import { useTranscriptionContext } from "@/context/transcription";
import {
  ArrowLongRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Next = () => {
  const { url } = useTranscriptionContext();

  return (
    <PaginationButton
      href="/features"
      validator={() => !!url}
      error="Please enter a YouTube link, or use a sample link."
    >
      Select features
      <ArrowLongRightIcon className="ml-3 h-6" aria-hidden="true" />
    </PaginationButton>
  );
};

const Home = () => {
  const { setError } = useErrorContext();
  const { url, setUrl } = useTranscriptionContext();

  return (
    <div className="flex flex-col prose prose-invert max-w-full gap-2">
      <div className="bg-[#101014] rounded-md min-w-full p-5 ring-1 ring-inset ring-[#88888C] focus-within:ring-2 focus-within:ring-[#677df5] flex gap-4">
        <YouTubeLogo />
        <div className="grow flex flex-col gap-2">
          <label htmlFor="name" className="block font-medium text-[#E1E1E5]">
            YouTube video link
          </label>
          <input
            type="url"
            name="youtube"
            value={url}
            onChange={(event) => {
              setError("");
              setUrl(event.target.value);
            }}
            className="block w-2/3 border-0 border-b border-gray-600 p-0 px-2 focus:border-[#677df5] bg-[#101014] text-[#E1E1E5] placeholder:text-gray-400 focus:outline-none focus:ring-0 text-sm leading-6"
            placeholder="https://www.youtube.com/watch?v=xfr..."
          />
        </div>
      </div>
      <div className="text-xs">
        Don't have YouTube video to hand?{" "}
        <Link
          className="focus:outline-none focus:ring-0 text-[#81f4b4] hover:underline"
          href="/transcribe/8b3aa19b-c5f0-4f7f-9636-5cfc35ff90ba"
        >
          View sample result
          <ChevronRightIcon className="ml-1 w-[1em] inline border-0 focus:outline-none focus:ring-0 stroke-2" />
        </Link>
      </div>
      <PaginationBar next={Next} />
    </div>
  );
};

export default Home;
