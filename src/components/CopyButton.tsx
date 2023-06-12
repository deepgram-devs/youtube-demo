import { ClipboardIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";

const CopyButton = ({ code }: { code: string }) => {
  const copyCode = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
    }
  };

  return (
    <div className="-mt-12 float-right pr-4">
      <Popover className="relative border rounded px-2 pt-1">
        <Popover.Button onClick={copyCode}>
          <ClipboardIcon className="w-4 h-4" />
        </Popover.Button>

        <div className="absolute right-10 top-0">
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="m-0 py-[0.4rem] rounded text-sm bg-zinc-200 text-zinc-800 w-40 text-center">
              {({ close }) => {
                setTimeout(() => {
                  close();
                }, 1000);

                return <>Copied to clipboard</>;
              }}
            </Popover.Panel>
          </Transition>
        </div>
      </Popover>
    </div>
  );
};

export default CopyButton;
