"use client";

import { useErrorContext } from "@/context/error";
import Link from "next/link";

const PaginationButton = ({
  children,
  href,
  validator = () => true,
  error = "An error has occured.",
}: {
  children: any;
  href: string;
  validator?: () => boolean;
  error?: string;
}) => {
  const { setError } = useErrorContext();

  const validate = (e: any) => {
    setError("");

    if (!validator()) {
      e.preventDefault();
      setError(error);
    }
  };

  return (
    <Link
      onClick={validate}
      href={href}
      className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    >
      {children}
    </Link>
  );
};

export default PaginationButton;
