import {
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  FingerPrintIcon,
  ForwardIcon,
  MegaphoneIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Smart Format",
    description: "Improves readability by applying additional formatting.",
    icon: ChatBubbleLeftEllipsisIcon,
    key: "smart_format",
    default: true,
  },
  {
    name: "Summarization",
    description: "Provide a short summary for the spoken content.",
    icon: ForwardIcon,
    key: "summarize",
    default: false,
  },
  {
    name: "Topic Detection",
    description: "Identify and extract key topics for sections of content.",
    icon: MegaphoneIcon,
    key: "detect_topics",
    default: false,
  },
  {
    name: "Entity Detection",
    description: "identify and extract key entities for sections of content.",
    icon: FingerPrintIcon,
    key: "detect_entities",
    default: false,
  },
  {
    name: "Profanity Filter",
    description: "Automatically remove profanity from the transcript.",
    icon: ShieldExclamationIcon,
    key: "profanity_filter",
    default: false,
  },
  {
    name: "Diarization",
    description:
      "Recognise speaker changes, and format showing who was speaking.",
    icon: ChatBubbleLeftRightIcon,
    key: "diarize",
    default: false,
  },
];

const Step1 = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {features.map((feature, index) => (
        <label
          key={feature.key}
          className="flex checkbox-label rounded-md min-w-full p-5 ring-1 ring-inset ring-gray-300 gap-4"
        >
          <feature.icon className="h-6 w-6 shrink-0 mr-2" aria-hidden="true" />
          <div className="grow flex flex-col gap-2 select-none">
            <input
              defaultChecked={feature.default}
              type="checkbox"
              name={feature.key}
              id={feature.key}
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
  );
};

export default Step1;
