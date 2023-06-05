import { CheckIcon } from "@heroicons/react/20/solid";

const Progress = () => {
  return (
    <nav aria-label="Progress" className="grow w-full mb-4">
      <ol role="list" className="flex">
        {steps.map((obj: object, stepIdx: number) => (
          <>
            <li className="flex-none h-8 items-center">
              {step > stepIdx ? (
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                  <CheckIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Step {stepIdx + 1}</span>
                </span>
              ) : step === stepIdx ? (
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-indigo-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Step {stepIdx + 1}</span>
                </span>
              ) : (
                <span className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Step {stepIdx + 1}</span>
                </span>
              )}
            </li>
            {stepIdx !== steps.length - 1 && (
              <>
                {step > stepIdx ? (
                  <li className="grow flex h-8  items-center">
                    <div className="h-0.5 w-full bg-indigo-600" />
                  </li>
                ) : (
                  <li className="grow flex h-8  items-center">
                    <div className="h-0.5 w-full bg-gray-300" />
                  </li>
                )}
              </>
            )}
          </>
        ))}
      </ol>
    </nav>
  );
};

export default Progress;
