import TranscriptionDetection from "./TranscriptionDetection";
import CodeBlock from "@/components/CodeBlock";
import CopyButton from "@/components/CopyButton";
import { Feature } from "@/context/transcription";
import classNames from "@/util/classNames";
import isEmpty from "@/util/isEmpty";
import { Switch, Tab } from "@headlessui/react";
import querystring from "querystring";
import { Fragment, useRef, useState } from "react";

const colorMap = [
  "text-blue-400",
  "text-pink-400",
  "text-cyan-400",
  "text-orange-400",
  "text-red-400",
  "text-green-400",
  "text-magenta-400",
  "text-purple-400",
];

const SpeakerLine = ({
  transcriptSpeaker,
  speaker,
}: {
  transcriptSpeaker: number | undefined;
  speaker: any;
}) => {
  if (speaker.current === undefined || transcriptSpeaker !== speaker.current) {
    speaker.current = transcriptSpeaker;
    return (
      <p className={`-mb-5 speaker ${colorMap[speaker.current]}`}>
        Speaker {speaker.current}:
      </p>
    );
  }

  return <></>;
};

const Utterances = ({ data }: { data: any }) => {
  const speaker = useRef();

  return (
    <>
      {data.results.utterances.map(
        (
          utterance: {
            channel: number;
            confidence: number;
            end: number;
            id: string;
            start: number;
            transcript: string;
            speaker?: number;
            words: [];
          },
          idx: number
        ) => (
          <Fragment key={idx}>
            {utterance.speaker !== undefined && (
              <SpeakerLine
                transcriptSpeaker={utterance.speaker}
                speaker={speaker}
              />
            )}
            <p>{utterance.transcript}</p>
          </Fragment>
        )
      )}
    </>
  );
};

const Paragraphs = ({ data }: { data: any }) => {
  const speaker = useRef();

  return (
    <>
      {data.results.channels[0].alternatives[0].paragraphs.paragraphs.map(
        (
          paragraph: {
            end: 29.446638;
            num_words: 40;
            sentences: { end: number; start: number; text: string }[];
            speaker?: number;
            words: [];
          },
          idx: number
        ) => (
          <Fragment key={idx}>
            {paragraph.speaker !== undefined && (
              <SpeakerLine
                transcriptSpeaker={paragraph.speaker}
                speaker={speaker}
              />
            )}
            <p>
              {paragraph.sentences.map((sentence, idxx: number) => (
                <Fragment key={idxx}> {sentence.text}</Fragment>
              ))}
            </p>
          </Fragment>
        )
      )}
    </>
  );
};

const UtterancesParagraphsSwitching = ({ data }: { data: any }) => {
  const [paragraphs, setParagraphs] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <span className={paragraphs ? "text-gray-200" : "text-[#687ef7]"}>
          Utterances
        </span>
        <Switch
          checked={paragraphs}
          onChange={setParagraphs}
          className="bg-gray-500 relative inline-flex h-6 w-11 items-center rounded-full"
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              paragraphs ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <span className={paragraphs ? "text-[#687ef7]" : "text-gray-200"}>
          Paragraphs
        </span>
      </div>
      <div>
        {paragraphs ? <Paragraphs data={data} /> : <Utterances data={data} />}
      </div>
    </>
  );
};

const Transcript = ({ data }: { data: any }) => {
  if (data.results.channels[0].alternatives[0].paragraphs) {
    return <Paragraphs data={data} />;
  }

  return <p>{data.results.channels[0].alternatives[0].transcript}</p>;
};

const Words = ({ data }: { data: any }) => {
  if (data.results.channels[0].alternatives[0].paragraphs) {
    return <Paragraphs data={data} />;
  }

  const paragraphs: { speaker: undefined | number; text: string }[] = [];
  let currentSpeaker: undefined | number;
  let currentParagraph = "";

  data.results.channels[0].alternatives[0].words.forEach(
    (word: {
      word: string;
      start: number;
      end: number;
      confidence: number;
      speaker?: number;
      speaker_confidence?: number;
      punctuated_word?: string;
    }) => {
      if (currentSpeaker === undefined) {
        currentSpeaker = word.speaker;
      }

      if (currentSpeaker !== word.speaker) {
        paragraphs.push({
          speaker: currentSpeaker,
          text: currentParagraph.trim(),
        });
        currentSpeaker = word.speaker;
        currentParagraph = "";
      }

      currentParagraph += ` ${word.punctuated_word || word.word}`;
    }
  );

  paragraphs.push({ speaker: currentSpeaker, text: currentParagraph.trim() });

  const speaker = useRef();

  return (
    <>
      {paragraphs.map(
        (
          paragraph: { speaker: undefined | number; text: string },
          idx: number
        ) => (
          <Fragment key={idx}>
            {paragraph.speaker !== undefined && (
              <SpeakerLine
                transcriptSpeaker={paragraph.speaker}
                speaker={speaker}
              />
            )}
            <p>{paragraph.text}</p>
          </Fragment>
        )
      )}
    </>
  );
};

const TranscriptionTypes = ({
  data,
  features,
}: {
  data: any;
  features: any;
}) => {
  return (
    <>
      <div className="flex gap-2 mb-4">
        {features.smart_format ? <code>smart_format=true</code> : <></>}
        {features.paragraphs ? <code>paragraphs=true</code> : <></>}
        {features.utterances ? <code>utterances=true</code> : <></>}
        {features.diarize ? <code>diarize=true</code> : <></>}
      </div>
      {features.paragraphs && features.utterances && (
        <UtterancesParagraphsSwitching data={data} />
      )}
      {features.paragraphs && !features.utterances && (
        <Paragraphs data={data} />
      )}
      {!features.paragraphs && features.utterances && (
        <Utterances data={data} />
      )}
      {!features.paragraphs && !features.utterances && (
        <>
          {features.diarize ? (
            <Words data={data} />
          ) : (
            <Transcript data={data} />
          )}
        </>
      )}
    </>
  );
};

const Summarize = ({ data }: { data: any }) => {
  return (
    <>
      <div className="flex gap-2">
        <code>summarize_v2=true</code>
      </div>
      {data.results.summary ? (
        <p>{data.results.summary.short}</p>
      ) : (
        <p>No summary available.</p>
      )}
    </>
  );
};

const DetectTopics = ({ data }: { data: any }) => {
  let topics: { confidence: number; topic: string }[] = [];

  data.results.channels[0].alternatives[0].topics.forEach(
    (segment: { topics: [] }) => {
      segment.topics.forEach((topic) => {
        topics.push(topic);
      });
    }
  );

  return (
    <>
      <div className="flex gap-2">
        <code>detect_topics=true</code>
      </div>
      <ul>
        {topics.length > 0 &&
          topics.map((topic, index: number) => (
            <li key={`topic-${index}`}>
              {topic.topic} ({Math.round(topic.confidence * 100)}%)
            </li>
          ))}
      </ul>
    </>
  );
};

const DetectEntities = ({ data }: { data: any }) => {
  return (
    <>
      <div className="flex gap-2">
        <code>detect_entities=true</code>
      </div>
      <ul>
        {data.results.channels[0].alternatives[0].entities.length > 0 &&
          data.results.channels[0].alternatives[0].entities.map(
            (entity: any, index: number) => (
              <li key={`entity-${index}`}>
                {entity.value} ({Math.round(entity.confidence * 100)}% - label:{" "}
                {entity.label})
              </li>
            )
          )}
      </ul>
    </>
  );
};

const DetectLanguage = ({ data }: { data: any }) => {
  return (
    <>
      <div className="flex gap-2">
        <code>detect_language=true</code>
      </div>
      <p>Detected language: {data.results.channels[0].detected_language}</p>
    </>
  );
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

const FeatureTab = ({ children }: { children: any }) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <a
          className={classNames(
            selected ? "ghost--purple " : "ghost--black",
            "ghost whitespace-nowrap text-center rounded-md outline-0"
          )}
          href="#"
        >
          <span className="px-4 py-2 rounded-md">{children}</span>
        </a>
      )}
    </Tab>
  );
};

const FeaturePanel = ({ children }: { children: any }) => {
  return <Tab.Panel>{children}</Tab.Panel>;
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

  return (
    <div className="mt-8 bg-[#101014] rounded-lg transcription-results">
      <div>
        <Tab.Group selectedIndex={tab} onChange={setTab}>
          <Tab.List className="p-4">
            <div className="flex flex-wrap gap-2">
              <FeatureTab>Transcription</FeatureTab>
              {features.summarize_v2 && <FeatureTab>Summary</FeatureTab>}
              {features.detect_topics && (
                <FeatureTab>Topic Detection</FeatureTab>
              )}
              {features.detect_entities && (
                <FeatureTab>Entity Detection</FeatureTab>
              )}
              {features.detect_language && (
                <FeatureTab>Language Detection</FeatureTab>
              )}
              <FeatureTab>Request Details</FeatureTab>
            </div>
          </Tab.List>
          <Tab.Panels className="border-t border-[#26262c] px-4">
            <FeaturePanel>
              <TranscriptionTypes data={data} features={features} />
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
            {features.detect_language && (
              <FeaturePanel>
                <DetectLanguage data={data} />
              </FeaturePanel>
            )}
            <FeaturePanel>
              <RequestDetails data={data} />
            </FeaturePanel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default TranscriptionResults;
