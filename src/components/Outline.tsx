const Outline = ({ children }: { children: any }) => {
  return (
    <div className="rounded-md min-w-full p-5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 flex gap-4 min-h-fit">
      {children}
    </div>
  );
};

export default Outline;
