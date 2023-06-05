"use client";

import PaginationBar from "@/components/pagination/Bar";
import PaginationButton from "@/components/pagination/Button";
import { useTranscriptionContext } from "@/context/transcription";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";

const Next = () => {
  const { features } = useTranscriptionContext();

  return (
    <PaginationButton
      href="/transcribe"
      validator={() => !!features.filter((f) => f.value).length}
      error="Please select at least one feature! I recommend smart formatting."
    >
      Next
      <ArrowLongRightIcon
        className="ml-3 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
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
    >
      <ArrowLongLeftIcon
        className="mr-3 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      Prev
    </PaginationButton>
  );
};

const Features = () => {
  const { features } = useTranscriptionContext();

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <label
            key={feature.key}
            className="flex checkbox-label rounded-md min-w-full p-5 ring-1 ring-inset ring-gray-300 gap-4"
          >
            <feature.icon
              className="h-6 w-6 shrink-0 mr-2"
              aria-hidden="true"
            />
            <div className="grow flex flex-col gap-2 select-none">
              <input
                defaultChecked={feature.value}
                type="checkbox"
                name={feature.key}
                id={feature.key}
                onChange={() => (feature.value = !feature.value)}
                className="hidden focus:outline-none focus:ring-0"
              />
              <label
                htmlFor={feature.key}
                className="block font-medium text-gray-900"
              >
                {feature.name}
              </label>
              {feature.description}
            </div>
          </label>
        ))}
      </div>
      <PaginationBar prev={Prev} next={Next} />
    </div>
  );
};

export default Features;
