import { BeakerIcon } from "@heroicons/react/24/outline";
import DeepgramLogo from "./DeepgramLogo";

const Brand = () => {
  return (
    <div className="flex items-center mb-5">
      <DeepgramLogo />
      <h1 className="ml-4 pb-1 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EE028B] to-[#AE29FF]">
        YouTube Demo
      </h1>
    </div>
  );
};

export default Brand;
