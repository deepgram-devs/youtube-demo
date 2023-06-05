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

const Next = () => {
  const { url } = useTranscriptionContext();

  return (
    <PaginationButton
      href="/features"
      validator={() => !!url}
      error="Please enter a YouTube link, or use my one."
    >
      Next
      <ArrowLongRightIcon
        className="ml-3 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </PaginationButton>
  );
};

const Home = () => {
  const { setError } = useErrorContext();
  const { url, setUrl } = useTranscriptionContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-md min-w-full p-5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 flex gap-4">
        <YouTubeLogo />
        <div className="grow flex flex-col gap-2">
          <label htmlFor="name" className="block font-medium text-gray-900">
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
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 text-sm leading-6"
            placeholder="https://www.youtube.com/watch?v=xfr..."
          />
        </div>
      </div>
      <div className="text-xs">
        Dont have a video?{" "}
        <button
          className="focus:outline-none focus:ring-0 text-sky-700 hover:underline"
          onClick={() => {
            setError("");
            setUrl("https://www.youtube.com/watch?v=uqcfZZR7_v0");
          }}
        >
          Use my one
          <ChevronRightIcon className="ml-1 w-[1em] inline border-0 focus:outline-none focus:ring-0 stroke-2" />
        </button>
      </div>
      <PaginationBar next={Next} />
    </div>
  );
};

export default Home;
