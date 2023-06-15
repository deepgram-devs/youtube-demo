"use client";

const PaginationBar = ({
  prev = null,
  next = null,
}: {
  prev?: (() => JSX.Element) | null;
  next?: (() => JSX.Element) | null;
}) => {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-0 mt-8">
      <div className="-mt-px flex w-0 flex-1">{prev ? prev() : null}</div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {next ? next() : null}
      </div>
    </nav>
  );
};

export default PaginationBar;
