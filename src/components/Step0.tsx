import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Outline from "@/components/Outline";

const Step0 = ({ context }: { context: any }) => {
  const { youTube, setYouTube, step } = context;

  if (step !== 0) return;

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-md min-w-full p-5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 flex gap-4">
        <svg
          role="img"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 fill-[#ff0000]"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        <div className="grow flex flex-col gap-2">
          <label htmlFor="name" className="block font-medium text-gray-900">
            YouTube video link
          </label>
          <input
            type="url"
            name="youtube"
            value={youTube}
            onChange={(event) => {
              setYouTube(event.target.value);
            }}
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 text-sm leading-6"
            placeholder="https://www.youtube.com/watch?v=xfr..."
          />
        </div>
      </div>
      <div className="text-xs">
        Dont have a video?{" "}
        <button
          className="focus:outline-none focus:ring-0 text-sky-700 hover:underline"
          onClick={() => {
            setYouTube("https://www.youtube.com/watch?v=uqcfZZR7_v0");
          }}
        >
          Use my one
          <ChevronRightIcon className="ml-1 w-[1em] inline border-0 focus:outline-none focus:ring-0 stroke-2" />
        </button>
      </div>
    </div>
  );
};

export default Step0;
