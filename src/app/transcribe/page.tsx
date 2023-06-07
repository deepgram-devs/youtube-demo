"use client";

import { useErrorContext } from "@/context/error";
import { useTranscriptionContext } from "@/context/transcription";
import { useEffect, useState } from "react";

const Features = () => {
  const { setError } = useErrorContext();
  const { features, url } = useTranscriptionContext();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/transcribe/api", {
      method: "POST",
      body: JSON.stringify({
        source: { url: "https://dpgr.am/spacewalk.wav" },
        features: {},
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  console.log(data);

  return <div className="flex flex-col">{url}</div>;
};

export default Features;
