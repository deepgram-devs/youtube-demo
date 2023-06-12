import classNames from "@/util/classNames";

const TranscriptionDetection = ({
  confidence,
  value,
  label,
}: {
  confidence: number;
  value: string;
  label: string;
}) => {
  return (
    <div
      className={classNames(
        confidence > 0.98
          ? "confidence-100"
          : confidence > 0.8
          ? "confidence-80"
          : confidence > 0.5
          ? "confidence-50"
          : confidence > 0.2
          ? "confidence-20"
          : "confidence-0",
        "confidence w-full"
      )}
    >
      <div className="flex flex-1 text-white">
        <div className="flex w-16 flex-shrink-0 items-center justify-center text-sm font-bold ">
          {Math.round(confidence * 100)}%
        </div>
        <div className="flex flex-1 items-center justify-between truncate ">
          <div className="flex-1 flex justify-between items-center truncate px-4 py-2 text-sm">
            <span className="font-thin truncate">{value}</span>
            <span className="text-gray-500 text-xs truncate">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionDetection;
