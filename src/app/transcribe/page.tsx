"use client";

import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useErrorContext } from "@/context/error";
import { useTranscriptionContext } from "@/context/transcription";
import YouTube from "react-youtube";
import classNames from "@/util/classNames";

const Results = ({ data }: { data: any }) => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Transcription
        </Tab>
        {data.summary !== null && (
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Summary
          </Tab>
        )}
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
          )}
        >
          {data.transcript}
        </Tab.Panel>
        {data.summary !== null && (
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            {data.summary}
          </Tab.Panel>
        )}
      </Tab.Panels>
    </Tab.Group>
  );
};

const Features = () => {
  const { setError } = useErrorContext();
  const { features, url } = useTranscriptionContext();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(false);

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
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [features, url]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="flex flex-col prose">
      <YouTube
        videoId={urlParser(url) as string}
        id="the-video"
        className="w-full aspect-w-16 aspect-h-9 rounded-xl overflow-hidden"
        opts={{
          width: "auto",
          height: "auto",
        }}
      />
      {data && <Results data={data} />}
    </div>
  );
};

export default Features;
