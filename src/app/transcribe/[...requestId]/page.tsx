"use client";

import {
  ArrowLongLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { PacmanLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useErrorContext } from "@/context/error";
import { useTranscriptionContext } from "@/context/transcription";
import classNames from "@/util/classNames";
import PaginationBar from "@/components/pagination/Bar";
import PaginationButton from "@/components/pagination/Button";
import YouTube from "react-youtube";
import { useRouter } from "next/navigation";

const Prev = () => {
  return (
    <PaginationButton href="/features" validator={() => true}>
      <ArrowLongLeftIcon
        className="mr-3 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      Change features
    </PaginationButton>
  );
};

const FeatureSummary = () => {
  const { features } = useTranscriptionContext();

  return (
    <>
      <h2>Features</h2>
      <div className="grid grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <CheckCircleIcon
                className={classNames(
                  "w-5",
                  feature.value ? "stroke-green-500" : "stroke-gray-500"
                )}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">
                {feature.name}
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const urlParser = (url: string) => {
  var regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    //error
  }
};

const Results = ({ data }: { data: any }) => {
  return (
    <div>
      <h2>Results</h2>
      <div>
        {data.summary && (
          <p>
            <h3>Summary</h3>
            {data.summary}
          </p>
        )}
        <p>
          <h3>Transcript</h3>
          {data.transcript}
        </p>
      </div>
    </div>
  );
};

const Loader = ({
  isLoading,
  message,
}: {
  isLoading: boolean;
  message: string;
}) => {
  return (
    <div>
      <PacmanLoader loading={isLoading} />
      {message}
    </div>
  );
};

const Features = ({
  params: { requestId },
}: {
  params: { requestId: string };
}) => {
  const { replace } = useRouter();
  const { setError } = useErrorContext();
  const { features, url } = useTranscriptionContext();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(false);
  const [output, setOutput] = useState(
    <Loader isLoading={isLoading} message="Preparing..." />
  );

  useEffect(() => {
    if (!requestId) {
      setLoading(true);
      fetch("/transcribe/api", {
        method: "POST",
        body: JSON.stringify({
          source: { url },
          features,
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
    }
  }, []);

  useEffect(() => {
    if (isLoading)
      setOutput(<Loader isLoading={isLoading} message="Transcribing..." />);
  }, [isLoading]);

  useEffect(() => {
    if (data.requestId) {
      replace(`/transcribe/${data.requestId}`);
      setOutput(<Results data={data} />);
    }
  }, [data]);

  return (
    <div className="flex flex-col prose max-w-full">
      <YouTube
        videoId={urlParser(url) as string}
        id="the-video"
        className="w-full aspect-w-16 aspect-h-9 rounded-xl overflow-hidden"
        opts={{
          width: "auto",
          height: "auto",
        }}
      />
      <FeatureSummary />
      <PaginationBar prev={Prev} />
      {output}
    </div>
  );
};

export default Features;
