"use client";

import {
  ArrowLongLeftIcon,
  ShareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "@supabase/supabase-js";
import { Popover, Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { useErrorContext } from "@/context/error";
import { useTranscriptionContext } from "@/context/transcription";
import PaginationBar from "@/components/pagination/Bar";
import PaginationButton from "@/components/pagination/Button";
import TranscriptionLoader from "@/components/transcription/TranscriptionLoader";
import TranscriptionResults from "@/components/transcription/TranscriptionResults";
import urlParser from "@/util/urlParser";
import YouTubePreview from "@/components/transcription/YouTubePreview";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

const CopyButton = () => {
  const copy = () => {
    const origin = typeof window !== "undefined" ? window.location.href : "";

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(origin);
    }
  };

  return (
    <Popover className="relative flex">
      <Popover.Button
        as="a"
        href="#copied-to-clipboard"
        className="dg-button dg-button--tertiary"
        onClick={copy}
      >
        <span>
          Share
          <ShareIcon className="ml-3 h-6" aria-hidden="true" />
        </span>
      </Popover.Button>

      <div className="absolute -left-40 top-0">
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="m-0 py-[0.4rem] rounded text-sm bg-zinc-200 text-zinc-800 w-40 text-center">
            {({ close }) => {
              setTimeout(() => {
                close();
              }, 1000);

              return <>Copied to clipboard</>;
            }}
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
};

const Next = () => {
  const { reset } = useTranscriptionContext();

  return (
    <div className="flex gap-4">
      <CopyButton />
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

type Props = {
  params: { requestId: string };
};

const Transcript = ({ params }: Props) => {
  const { requestId } = params;
  const { setError } = useErrorContext();
  const { features, url, setRequestId, setFeatures, setUrl } =
    useTranscriptionContext();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [output, setOutput] = useState(
    <TranscriptionLoader isLoading={isLoading} message="Preparing..." />
  );

  const [tab, setTab] = useState<any>();
  const speaker = useRef();

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
      setOutput(<TranscriptionResults data={data} tab={tab} setTab={setTab} />);
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
