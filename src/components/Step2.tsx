const Step1 = () => {
  return (
    <div>
      <label className="checkbox-label rounded-md min-w-full p-5 ring-1 ring-inset ring-gray-300 flex gap-4 min-h-fit">
        <input
          type="checkbox"
          id="choose-me"
          className="hidden focus:outline-none focus:ring-0"
        />
        Check me
      </label>
    </div>
  );
};

export default Step1;
