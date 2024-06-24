const Preview = ({ watch }) => {
  return (
    <div className="w-full p-5 pb-32 gap-3 border-2 border-slate-800">
      <h1 className="text-xl font-bold">Live Preview</h1>

      {watch("title.preview") ? (
        <div className="flex">
          <h1 className="text-3xl font-bold">{watch("title.value")}</h1>
          <span>
            {watch("type.preview") ? (
              <span>{`${watch("type.value").toUpperCase()}`}</span>
            ) : (
              ""
            )}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Preview;
