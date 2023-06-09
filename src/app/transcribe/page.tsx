"use client";

import {
  ArrowLongLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "@supabase/supabase-js";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState, CSSProperties } from "react";
import { useErrorContext } from "@/context/error";
import { useRouter } from "next/navigation";
import { useTranscriptionContext } from "@/context/transcription";
import classNames from "@/util/classNames";
import PaginationBar from "@/components/pagination/Bar";
import PaginationButton from "@/components/pagination/Button";
import YouTube from "react-youtube";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Prev = () => {
  return (
    <PaginationButton href="/features" validator={() => true}>
      <ArrowLongLeftIcon className="mr-3 h-6" aria-hidden="true" />
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
          <div key={index} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <CheckCircleIcon
                className={classNames(
                  "w-5",
                  feature.value ? "stroke-green-500" : "stroke-gray-500"
                )}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-200">
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
          <span>
            <h3>Summary</h3>
            {data.summary}
          </span>
        )}
        <span>
          <h3>Transcript</h3>
          {data.transcript}
        </span>
      </div>
    </div>
  );
};

const override: CSSProperties = {
  display: "block",
};

const randomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

const Loader = ({
  isLoading,
  message,
}: {
  isLoading: boolean;
  message: string;
}) => {
  const [color, setColor] = useState(randomColor());

  let timeout: any;

  useEffect(() => {
    clearInterval(timeout);

    timeout = setInterval(() => {
      setColor(randomColor());
    }, 1000);
  }, [timeout]);

  return (
    <div className="loader flex flex-col justify-center items-center p-8 gap-2">
      <ScaleLoader loading={isLoading} color={color} cssOverride={override} />
      <h3>{message}</h3>
    </div>
  );
};

const Features = () => {
  const { replace } = useRouter();
  const { setError } = useErrorContext();
  const { features, url } = useTranscriptionContext();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(false);
  const [output, setOutput] = useState(
    <Loader isLoading={isLoading} message="Preparing..." />
  );

  useEffect(() => {
    setLoading(true);
    fetch("/transcribe/api", {
      method: "POST",
      body: JSON.stringify({
        source: { url },
        features,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        const { error } = await supabase
          .from("transcriptions")
          .insert({ url, request_id: data.requestId, data, features });

        setData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading) {
      setOutput(<Loader isLoading={isLoading} message="Transcribing..." />);
    }
  }, [isLoading]);

  useEffect(() => {
    if (data.requestId) {
      setOutput(<Results data={data} />);
    }
  }, [data]);

  const videoId = urlParser(url);

  return (
    <div className="flex flex-col prose prose-invert max-w-full">
      <div
        style={{
          background: `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        }}
      >
        <YouTube
          videoId={videoId}
          id="the-video"
          className="w-full aspect-w-16 aspect-h-9 rounded-xl overflow-hidden"
          opts={{
            width: "auto",
            height: "auto",
          }}
        />
      </div>
      <FeatureSummary />
      <PaginationBar prev={Prev} />
      {output}
    </div>
  );
};

export default Features;
