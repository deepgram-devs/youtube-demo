"use client";

import { CSSProperties, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
};

const randomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

const TranscriptionLoader = ({
  isLoading,
  message,
}: {
  isLoading: boolean;
  message: string;
}) => {
  const [color, setColor] = useState(randomColor());

  let timeout: any;

  useEffect(() => {
    clearInterval(timeout);

    timeout = setInterval(() => {
      setColor(randomColor());
    }, 1000);
  }, [timeout]);

  return (
    <div className="loader flex flex-col justify-center items-center p-8 gap-2">
      <ScaleLoader loading={isLoading} color={color} cssOverride={override} />
      <h3>{message}</h3>
    </div>
  );
};

export default TranscriptionLoader;
