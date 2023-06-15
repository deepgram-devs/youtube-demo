"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Feature = {
  name: string;
  description: string;
  key: string;
  value: boolean;
  beta?: boolean;
  truthy?: string;
};

type Features = Feature[];

type FeatureMap = {
  [x: string]: boolean | string | number;
};

type FeaturesMap = FeatureMap[];

type TranscriptionContext = {
  url: string;
  setUrl: (index: string) => void;
  features: Features;
  setFeatures: (features: Features) => void;
  requestId: string;
  setRequestId: (index: string) => void;
  reset: () => boolean;
};

interface TranscriptionContextInterface {
  children: React.ReactNode;
}

const TranscriptionContext = createContext({} as TranscriptionContext);

const availableFeatures: Features = [
  {
    name: "Smart Format",
    description: "Improves readability by applying additional formatting.",
    key: "smart_format",
    value: true,
  },
  {
    name: "Summarization",
    description: "Provide a short summary for the spoken content.",
    key: "summarize",
    value: false,
    truthy: "v2",
  },
  {
    name: "Topic Detection",
    description: "Identify and extract key topics for sections of content.",
    key: "detect_topics",
    value: false,
  },
  {
    name: "Entity Detection",
    description: "Identify and extract key entities for sections of content.",
    key: "detect_entities",
    value: false,
    beta: true,
  },
  {
    name: "Utterances",
    description: "Segment speech into meaningful semantic units.",
    key: "utterances",
    value: false,
  },
  {
    name: "Paragraphs",
    description:
      "Split audio into paragraphs to improve transcript readability.",
    key: "paragraphs",
    value: false,
  },
  {
    name: "Language Detection",
    description: "Identify the dominant language spoken in submitted audio.",
    key: "detect_language",
    value: false,
  },
  {
    name: "Diarization",
    description:
      "Recognise speaker changes, and format showing who was speaking.",
    key: "diarize",
    value: false,
  },
];

const setLocalStorage = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
};

const getLocalStorage = (key: string, initialValue: unknown) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
};

const TranscriptionContextProvider = ({
  children,
}: TranscriptionContextInterface) => {
  const [url, setUrl] = useState(getLocalStorage("url", ""));
  const [features, setFeatures] = useState(
    getLocalStorage("features", availableFeatures)
  );
  const [requestId, setRequestId] = useState("");

  const reset = () => {
    setUrl("");
    let copyFeatures = [...availableFeatures]; //shallow copy features
    setFeatures(copyFeatures);
    setRequestId("");

    return true;
  };

  useEffect(() => {
    setLocalStorage("url", url);
  }, [url]);

  useEffect(() => {
    setLocalStorage("features", features);
  }, [features]);

  return (
    <TranscriptionContext.Provider
      value={{
        url,
        setUrl,
        features,
        setFeatures,
        requestId,
        setRequestId,
        reset,
      }}
    >
      {children}
    </TranscriptionContext.Provider>
  );
};

const useTranscriptionContext = () => {
  return useContext(TranscriptionContext);
};

export { TranscriptionContextProvider, useTranscriptionContext };
export type { Feature, Features, FeatureMap, FeaturesMap };
