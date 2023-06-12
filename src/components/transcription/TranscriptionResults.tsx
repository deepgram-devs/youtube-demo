import TranscriptionDetection from "./TranscriptionDetection";
import CodeBlock from "@/components/CodeBlock";
import CopyButton from "@/components/CopyButton";
import { Feature } from "@/context/transcription";
import classNames from "@/util/classNames";
import isEmpty from "@/util/isEmpty";
import { Tab } from "@headlessui/react";
import querystring from "querystring";
import { Fragment, useState } from "react";

const Transcription = ({ data, features }: { data: any; features: any }) => {
  console.log(features);
  return <>{data.results.channels[0].alternatives[0].transcript}</>;
};

const Summarize = ({ data }: { data: any }) => {
  return <>Summarize</>;
};

const DetectTopics = ({ data }: { data: any }) => {
  return <>DetectTopics</>;
};

const DetectEntities = ({ data }: { data: any }) => {
  return <>DetectEntities</>;
};

const Utterances = ({ data }: { data: any }) => {
  return <>Utterances</>;
};

const Paragraphs = ({ data }: { data: any }) => {
  return <>Paragraphs</>;
};

const DetectLanguage = ({ data }: { data: any }) => {
  return <>DetectLanguage</>;
};

const Diarize = ({ data }: { data: any }) => {
  return <>Diarize</>;
};

const RequestDetails = ({ data }: { data: any }) => {
  const features: { [key: string]: boolean | string } = {};
  data.features
    .filter((feature: Feature) => feature.value !== false)
    .forEach((feature: Feature) => {
      features[feature.key] = feature.value;
    });

  const curl = `curl --request POST \\
     --url https://api.deepgram.com/v1/listen?${querystring.stringify(
       features
     )}  \\
     --header 'Authorization: Token DEEPGRAM_API_KEY'  \\
     --data-binary @~/your-video.mp4`;

  return (
    <>
      <h4>Request</h4>
      <div>
        <CodeBlock language="bash">{curl}</CodeBlock>
        <CopyButton code={curl} />
      </div>
      {/* <h4>Features</h4>
      <div>
        <CodeBlock language="json">
          {JSON.stringify(features, null, "  ")}
        </CodeBlock>
        <CopyButton code={JSON.stringify(features, null, "  ")} />
      </div> */}
      <h4>Raw Response</h4>
      <div>
        <CodeBlock language="json">
          {JSON.stringify(
            { metadata: data.metadata, results: data.results },
            null,
            "  "
          )}
        </CodeBlock>
        <CopyButton
          code={JSON.stringify(
            { metadata: data.metadata, results: data.results },
            null,
            "  "
          )}
        />
      </div>
    </>
  );
};

const TranscriptionResults = ({ data }: { data: any }) => {
  if (isEmpty(data)) return <></>;

  const features: { [key: string]: boolean | string } = {};
  data.features
    .filter((feature: Feature) => feature.value !== false)
    .forEach((feature: Feature) => {
      features[feature.key] = feature.value;
    });

  const [tab, setTab] = useState<any>();

  const FeatureTab = ({ children }: { children: any }) => {
    return (
      <Tab as={Fragment}>
        {({ selected }) => (
          <a
            className={
              selected ? "bg-blue-500 text-white" : "bg-white text-black"
            }
            href="#"
          >
            {children}
          </a>
        )}
      </Tab>
    );
  };

  const FeaturePanel = ({ children }: { children: any }) => {
    return <Tab.Panel>{children}</Tab.Panel>;
  };

  return (
    <div className="mt-8 border rounded-md">
      <Tab.Group selectedIndex={tab} onChange={setTab}>
        <Tab.List className="p-4">
          <div>
            <FeatureTab>Transcription</FeatureTab>
            {features.summarize_v2 && <FeatureTab>Summarisation</FeatureTab>}
            {features.detect_topics && <FeatureTab>Topic Detection</FeatureTab>}
            {features.detect_entities && (
              <FeatureTab>Entity Detection</FeatureTab>
            )}
            {features.utterances && <FeatureTab>Utterances</FeatureTab>}
            {features.paragraphs && <FeatureTab>Paragraphs</FeatureTab>}
            {features.detect_language && (
              <FeatureTab>Language Detection</FeatureTab>
            )}
            {features.diarize && <FeatureTab>Diarization</FeatureTab>}
            <FeatureTab>Request Details</FeatureTab>
          </div>
        </Tab.List>
        <Tab.Panels className="border-t p-4">
          <FeaturePanel>
            <Transcription data={data} features={features} />
          </FeaturePanel>
          {features.summarize_v2 && (
            <FeaturePanel>
              <Summarize data={data} />
            </FeaturePanel>
          )}
          {features.detect_topics && (
            <FeaturePanel>
              <DetectTopics data={data} />
            </FeaturePanel>
          )}
          {features.detect_entities && (
            <FeaturePanel>
              <DetectEntities data={data} />
            </FeaturePanel>
          )}
          {features.utterances && (
            <FeaturePanel>
              <Utterances data={data} />
            </FeaturePanel>
          )}
          {features.paragraphs && (
            <FeaturePanel>
              <Paragraphs data={data} />
            </FeaturePanel>
          )}
          {features.detect_language && (
            <FeaturePanel>
              <DetectLanguage data={data} />
            </FeaturePanel>
          )}
          {features.diarize && (
            <FeaturePanel>
              <Diarize data={data} />
            </FeaturePanel>
          )}
          <FeaturePanel>
            <RequestDetails data={data} />
          </FeaturePanel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TranscriptionResults;
