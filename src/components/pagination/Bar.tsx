"use client";

const PaginationBar = ({
  prev = null,
  next = null,
}: {
  prev?: (() => JSX.Element) | null;
  next?: (() => JSX.Element) | null;
}) => {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {/*
        <PaginationButton href="/features">
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </PaginationButton>
        */}
        {prev ? prev() : null}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {/*
        <PaginationButton href="/features">
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </PaginationButton>
        */}
        {next ? next() : null}
      </div>
    </nav>
  );
};

export default PaginationBar;
