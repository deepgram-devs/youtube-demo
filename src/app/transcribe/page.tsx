"use client";

import { ArrowLongLeftIcon, ShareIcon } from "@heroicons/react/24/outline";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useErrorContext } from "@/context/error";
import { useRouter } from "next/navigation";
import { useTranscriptionContext } from "@/context/transcription";
import PaginationBar from "@/components/pagination/Bar";
import PaginationButton from "@/components/pagination/Button";
import TranscriptionLoader from "@/components/transcription/TranscriptionLoader";
import urlParser from "@/util/urlParser";
import YouTubePreview from "@/components/transcription/YouTubePreview";

const Prev = () => {
  return (
    <PaginationButton
      href="/features"
      validator={() => true}
      style="dg-button--secondary"
    >
      <ArrowLongLeftIcon className="mr-3 h-6" aria-hidden="true" />
      Change features
    </PaginationButton>
  );
};

const Transcribe = () => {
  const { setError } = useErrorContext();
  const { features, url, requestId, setRequestId } = useTranscriptionContext();
  const [isLoading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [output, setOutput] = useState(
    <TranscriptionLoader isLoading={isLoading} message="Preparing..." />
  );

  const { replace } = useRouter();

  useEffect(() => {
    setLoading(true);

    if (url) {
      try {
        setVideoId(urlParser(url));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }

    fetch("/transcribe/api", {
      method: "POST",
      body: JSON.stringify({
        source: { url },
        features,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        replace(`/transcribe/${data.request_id}`);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [features, url]);

  useEffect(() => {
    if (isLoading) {
      setOutput(
        <TranscriptionLoader isLoading={isLoading} message="Transcribing..." />
      );
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col prose prose-invert max-w-full">
      <YouTubePreview videoId={videoId} />
      <PaginationBar prev={Prev} />
      {output}
    </div>
  );
};

export default Transcribe;
