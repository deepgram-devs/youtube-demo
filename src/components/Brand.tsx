"use client";

import { useTranscriptionContext } from "@/context/transcription";
import DeepgramLogo from "./DeepgramLogo";

const Brand = () => {
  const { reset } = useTranscriptionContext();

  return (
    <a href={`/`} onClick={reset} className="flex items-center mb-5">
      <DeepgramLogo />
      <h1 className="ml-4 pb-1 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EE028B] to-[#AE29FF]">
        YouTube Demo
      </h1>
    </a>
  );
};

export default Brand;
