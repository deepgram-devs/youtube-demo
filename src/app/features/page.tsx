"use client";

import PaginationBar from "@/components/pagination/Bar";
import PaginationButton from "@/components/pagination/Button";
import { useTranscriptionContext } from "@/context/transcription";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";

const Next = () => {
  const { features } = useTranscriptionContext();

  return (
    <PaginationButton
      href="/transcribe"
      validator={() => !!features.filter((f) => f.value).length}
      error="Please select at least one feature! I recommend smart formatting."
    >
      Get results
      <ArrowLongRightIcon className="ml-3 h-6" aria-hidden="true" />
    </PaginationButton>
  );
};

const Prev = () => {
  const { features } = useTranscriptionContext();

  return (
    <PaginationButton
      href="/"
      validator={() => !!features.filter((f) => f.value).length}
      error="Please select at least one feature! I recommend smart formatting."
      style="dg-button--secondary"
    >
      <ArrowLongLeftIcon className="mr-3 h-6 " aria-hidden="true" />
      Change video
    </PaginationButton>
  );
};

const Features = () => {
  const { features, setFeatures } = useTranscriptionContext();

  const updateFeature = (index: number, value: boolean) => {
    let copyFeatures = [...features]; //shallow copy features
    copyFeatures[index].value = value;
    setFeatures(copyFeatures);
  };

  return (
    <div className="flex flex-col prose prose-invert max-w-full">
      <div className="grid grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <div key={feature.key}>
            <input
              defaultChecked={feature.value}
              type="checkbox"
              name={feature.key}
              id={`feature-${feature.key}`}
              onChange={() => {
                updateFeature(index, !feature.value);
              }}
              className="hidden peer"
            />
            <label
              htmlFor={`feature-${feature.key}`}
              className="flex rounded-md min-w-full p-5 ring-1 ring-inset ring-gray-300 peer-checked:ring-[#677df5] gap-4"
            >
              <div className="grow flex flex-col gap-2 select-none">
                <span className="block font-medium">{feature.name}</span>
                <span className="text-gray-400">{feature.description}</span>
              </div>
            </label>
          </div>
        ))}
      </div>
      <PaginationBar prev={Prev} next={Next} />
    </div>
  );
};

export default Features;
