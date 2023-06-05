"use client";

import { useErrorContext } from "@/context/error";

const Errors = () => {
  const { error } = useErrorContext();
  return <>{error && <p className="text-red-500 mb-2">{error}</p>}</>;
};

export default Errors;
