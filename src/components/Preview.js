const Preview = ({ watch }) => {
  return (
    <div className="w-full p-5 pb-32 gap-3 border-2 border-slate-800">
      <h1 className="text-md lg:text-xl font-bold">Live Preview</h1>

      <div className="flex items-center gap-16 mb-10">
        {watch("title.preview") ? (
          <div>
            <h1 className="text-xl lg:text-3xl font-bold ">
              {watch("title.value")}
            </h1>
          </div>
        ) : (
          ""
        )}

        <span>
          {watch("type.preview") ? (
            <span className="text-sm border-2 border-slate-800 p-1 lg:p-3 rounded-3xl">{`${watch(
              "type.value"
            ).toUpperCase()}`}</span>
          ) : (
            ""
          )}
        </span>
        <span>
          {watch("model.preview") ? (
            <span className="text-sm border-2 border-slate-800 p-1 lg:p-3 rounded-3xl">{`${watch(
              "model.value"
            ).toUpperCase()}`}</span>
          ) : (
            ""
          )}
        </span>
      </div>

      {watch("intro.preview") ? (
        <div className="flex gap-2 mb-8 items-center ">
          <h1 className="text-lg font-semibold self-start">Introduction: </h1>
          <p>{watch("intro.value")}</p>
        </div>
      ) : (
        ""
      )}

      {watch("responsibilities.preview") ? (
        <div className="flex flex-col gap-2 mb-8 items-center ">
          <h1 className="text-lg font-semibold self-start">
            Roles & Responsibilities:{" "}
          </h1>
          <p className="self-start">{watch("responsibilities.value")}</p>
        </div>
      ) : (
        ""
      )}

      {watch("experience.preview") ? (
        <div className="flex gap-2 mb-8 items-center ">
          <h1 className="text-lg font-semibold self-start">
            Preferred Experience:{" "}
          </h1>
          <p>
            {`${watch("experience.min")}`} to{" "}
            {`${watch("experience.max")} Years`}
          </p>
        </div>
      ) : (
        ""
      )}

      {watch("qualification.preview") ? (
        <div className="flex gap-2 mb-8 items-center ">
          <h1 className="text-lg font-semibold self-start">Qualification: </h1>
          <p>{watch("qualification.value")}</p>
        </div>
      ) : (
        ""
      )}

      {watch("salary.preview") ? (
        <div className="flex gap-2 mb-8 items-center ">
          <h1 className="text-lg font-semibold self-start">Salary Range: </h1>
          <p>{watch("salary.value")}</p>
        </div>
      ) : (
        ""
      )}

      {watch("statement.preview") ? (
        <div className="flex gap-2 mb-8 items-center ">
          <h1 className="text-lg font-semibold self-start">
            Concluding Statement:{" "}
          </h1>
          <p>{watch("statement.value")}</p>
        </div>
      ) : (
        ""
      )}

      {watch("company.preview") ? (
        <div className="flex gap-2 mb-8 items-center ">
          <h1 className="text-lg font-semibold self-start">Company: </h1>
          <p>{watch("company.value")}</p>
        </div>
      ) : (
        ""
      )}

      {watch("location.preview") ? (
        <div className="flex gap-2 mb-8 items-center ">
          <h1 className="text-lg font-semibold self-start">Location: </h1>
          <p>{watch("location.value")}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Preview;
