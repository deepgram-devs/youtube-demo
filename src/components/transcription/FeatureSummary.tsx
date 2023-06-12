"use client";

import { useTranscriptionContext } from "@/context/transcription";
import { useEffect, useState } from "react";
import type { Features } from "@/context/transcription";

const FeatureSummary = () => {
  const { features } = useTranscriptionContext();
  const [selectedFeatures, setSelectedFeatures] = useState<Features>();

  useEffect(() => {
    if (features) {
      setSelectedFeatures(features);
    }
  }, [features]);

  if (!selectedFeatures) return <></>;

  return (
    <>
      <h3>Features</h3>
      <ul>
        {selectedFeatures
          .filter((f) => f.value === true)
          .map((feature, index) => (
            <li key={index} className="text-sm leading-6">
              {feature.name}
            </li>
          ))}
      </ul>
    </>
  );
};

export default FeatureSummary;
