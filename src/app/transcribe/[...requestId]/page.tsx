"use client";

import {
  ArrowLongLeftIcon,
  ShareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useErrorContext } from "@/context/error";
import { useTranscriptionContext } from "@/context/transcription";
import PaginationBar from "@/components/pagination/Bar";
import PaginationButton from "@/components/pagination/Button";
import TranscriptionLoader from "@/components/transcription/TranscriptionLoader";
import TranscriptionResults from "@/components/transcription/TranscriptionResults";
import urlParser from "@/util/urlParser";
import YouTubePreview from "@/components/transcription/YouTubePreview";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const copy = () => {
  const origin = typeof window !== "undefined" ? window.location.href : "";

  typeof window !== "undefined"
    ? window.navigator.clipboard.writeText(origin)
    : null;
};

const Next = () => {
  const { reset } = useTranscriptionContext();

  return (
    <div className="flex gap-4">
      <a
        onClick={() => copy()}
        href="#copied-to-clipboard"
        className="dg-button dg-button--tertiary"
      >
        <span>
          Share
          <ShareIcon className="ml-3 h-6" aria-hidden="true" />
        </span>
      </a>
      <PaginationButton href={`/`} validator={reset}>
        Start over
        <SparklesIcon className="ml-3 h-6" aria-hidden="true" />
      </PaginationButton>
    </div>
  );
};

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

const Transcript = ({
  params: { requestId },
}: {
  params: { requestId: string };
}) => {
  const { setError } = useErrorContext();
  const { features, url, setRequestId, setFeatures, setUrl } =
    useTranscriptionContext();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [output, setOutput] = useState(
    <TranscriptionLoader isLoading={isLoading} message="Preparing..." />
  );

  useEffect(() => {
    setLoading(true);
    setRequestId(requestId);

    const getTranscription = async () => {
      const { data: result, error } = await supabase
        .from("transcriptions")
        .select("url, data, features")
        .eq("request_id", requestId)
        .limit(1)
        .single();

      if (error) setError(error.message);

      setData(result?.data);
      setUrl(result?.url);
      setFeatures(result?.features);
      setLoading(false);
    };

    getTranscription();
  }, [requestId]);

  useEffect(() => {
    if (url) {
      try {
        setVideoId(urlParser(url));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  }, [features, url]);

  useEffect(() => {
    if (isLoading) {
      setOutput(
        <TranscriptionLoader isLoading={isLoading} message="Loading..." />
      );
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && data) {
      setOutput(<TranscriptionResults data={data} />);
    }
  }, [isLoading, data]);

  return (
    <div className="flex flex-col prose prose-invert max-w-full">
      <YouTubePreview videoId={videoId} />
      <PaginationBar prev={Prev} next={Next} />
      {output}
    </div>
  );
};

export default Transcript;
