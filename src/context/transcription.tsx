"use client";

import { createContext, useContext, useState } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  FingerPrintIcon,
  ForwardIcon,
  MegaphoneIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

type Feature = {
  name: string;
  description: string;
  icon: any;
  key: string;
  value: boolean;
};

type Features = Feature[];

type FeatureMap = {
  [x: string]: boolean;
};

type FeaturesMap = FeatureMap[];

type TranscriptionContext = {
  url: string;
  setUrl: (index: string) => void;
  features: Features;
};

interface TranscriptionContextInterface {
  children: React.ReactNode;
}

const TranscriptionContext = createContext({} as TranscriptionContext);

const availableFeatures: Features = [
  {
    name: "Smart Format",
    description: "Improves readability by applying additional formatting.",
    icon: ChatBubbleLeftEllipsisIcon,
    key: "smart_format",
    value: true,
  },
  {
    name: "Summarization",
    description: "Provide a short summary for the spoken content.",
    icon: ForwardIcon,
    key: "summarize",
    value: false,
  },
  {
    name: "Topic Detection",
    description: "Identify and extract key topics for sections of content.",
    icon: MegaphoneIcon,
    key: "detect_topics",
    value: false,
  },
  {
    name: "Entity Detection",
    description: "identify and extract key entities for sections of content.",
    icon: FingerPrintIcon,
    key: "detect_entities",
    value: false,
  },
  {
    name: "Profanity Filter",
    description: "Automatically remove profanity from the transcript.",
    icon: ShieldExclamationIcon,
    key: "profanity_filter",
    value: false,
  },
  {
    name: "Diarization",
    description:
      "Recognise speaker changes, and format showing who was speaking.",
    icon: ChatBubbleLeftRightIcon,
    key: "diarize",
    value: false,
  },
];

const getInitialUrl = (): string => {
  const url = localStorage.getItem("transcriptionUrl");
  return url ? url : "";
};

const getInitialFeatures = (): Features => {
  const storedFeaturesString = localStorage.getItem("transcriptionFeatures");
  let features = availableFeatures;

  if (storedFeaturesString) {
    const storedFeatures: FeaturesMap = JSON.parse(storedFeaturesString);
    storedFeatures.forEach((sF, i) => (features[i].value = sF.value));
  }

  return features;
};

const TranscriptionContextProvider = ({
  children,
}: TranscriptionContextInterface) => {
  const [url, setUrl] = useState(getInitialUrl);
  const [features, setFeatures] = useState(getInitialFeatures);

  return (
    <TranscriptionContext.Provider value={{ url, setUrl, features }}>
      {children}
    </TranscriptionContext.Provider>
  );
};

const useTranscriptionContext = () => {
  return useContext(TranscriptionContext);
};

const featureMap = (features: Features): FeaturesMap => {
  return features.map((f): FeatureMap => ({ [f.key]: f.value }));
};

export { featureMap, TranscriptionContextProvider, useTranscriptionContext };
