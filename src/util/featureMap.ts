import { FeatureMap, Features, FeaturesMap } from "@/context/transcription";

const featureMap = (features: Features): FeaturesMap => {
  return features.map((f, i): FeatureMap => ({ [f.key]: f.value }));
};

export default featureMap;
