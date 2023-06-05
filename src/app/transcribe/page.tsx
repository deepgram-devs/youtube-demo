"use client";

import { useErrorContext } from "@/context/error";
import { useTranscriptionContext } from "@/context/transcription";
import { useEffect } from "react";

const Features = () => {
  const { setError } = useErrorContext();
  const { features, url } = useTranscriptionContext();

  return <div className="flex flex-col">{url}</div>;
};

export default Features;
