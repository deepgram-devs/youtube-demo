"use client";

import { useErrorContext } from "@/context/error";
import classNames from "@/util/classNames";
import Link from "next/link";

const PaginationButton = ({
  children,
  href,
  validator = () => true,
  error = "An error has occured.",
  style = "dg-button--primary",
}: {
  children: any;
  href: string;
  validator?: () => boolean;
  error?: string;
  style?: string;
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
      className={classNames("dg-button", style)}
    >
      <span>{children}</span>
    </Link>
  );
};

export default PaginationButton;
