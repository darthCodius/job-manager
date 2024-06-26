import { useForm } from "react-hook-form";
import { defaultValues, inputPrimary } from "../utils/constants";
import { submitJobData } from "../helper/apiSubmitJobData";
import { useDispatch } from "react-redux";
import { fetchJobs } from "../utils/jobSlice";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { editForm } from "../helper/apiEditFormData";
import Preview from "./Preview";
import { MdDelete } from "react-icons/md";
import { deleteJob } from "../helper/apiDeleteJob";

const JobForm = ({ jobToEdit = {}, setJobToEdit }) => {
  const dispatch = useDispatch();
  const { id: editId, ...editValues } = jobToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const { errors, isSubmitSuccessful } = formState;

  useEffect(() => {
    isSubmitSuccessful &&
      toast.success(
        isEditSession
          ? "Job Edited Successfully"
          : "Job Submitted Successfully",
        {
          duration: 4000,
          position: "top-right",
        }
      );
  }, [isSubmitSuccessful]);

  useEffect(() => {
    isEditSession ? reset(editValues) : reset(defaultValues);
  }, [editId]);

  const onSubmit = async (data) => {
    const jobData = {
      ...data,
    };

    if (isEditSession) {
      editForm(jobData, editId)
        .then((data) => {
          reset(data);
          dispatch(fetchJobs());
          setJobToEdit((curr) => data);
        })
        .catch((err) => console.log(err.message));
    } else {
      submitJobData(jobData)
        .then(() => {
          dispatch(fetchJobs());
        })
        .catch((err) => console.log(err.message));
    }
  };

  const handleDeleteJob = (id) => {
    console.log(id);

    deleteJob(id).then(() => {
      setJobToEdit({});
      dispatch(fetchJobs());
    });
  };

  return (
    <>
      <div className="w-full">
        <form
          className="flex flex-col p-5 pb-32 gap-3 border-2 border-slate-800"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* title field */}
          <div className="flex justify-between">
            <span className="flex gap-3 lg:gap-5 items-center">
              <input
                type="checkbox"
                id="preview-title"
                {...register("title.preview")}
              />
              <span>
                <input
                  className={inputPrimary}
                  type="text"
                  placeholder="Job Post Title"
                  id="title"
                  {...register("title.value", {
                    required: {
                      value: true,
                      message: "Job Title is required!",
                    },
                    minLength: {
                      value: 10,
                      message: "Please enter at least 6 characters!",
                    },
                  })}
                />
                <p className="text-xs mt-1 text-red-400">
                  {errors.title?.value?.message}
                </p>
              </span>
            </span>
            <span className="flex gap-2 items-center">
              <label htmlFor="status">Is Active?</label>
              <input type="checkbox" id="status" {...register("status")} />
              {isEditSession && (
                <button
                  type="button"
                  className="text-red-400 lg:text-2xl"
                  title="Delete"
                  onClick={() => handleDeleteJob(editId)}
                >
                  <MdDelete />
                </button>
              )}
            </span>
          </div>

          {/* introfield */}
          <div className="flex flex-col items-start gap-2">
            <span className="flex gap-3 lg:gap-5">
              <input
                type="checkbox"
                id="preview-introduction"
                {...register("intro.preview")}
              />
              <label htmlFor="introduction" className="underline">
                Introduction
              </label>
            </span>
            <textarea
              id="introduction"
              className={`self-center w-full ${inputPrimary} `}
              name="introduction"
              rows={8}
              {...register("intro.value", {
                required: {
                  value: true,
                  message: "Introduction is required!",
                },
                minLength: {
                  value: 10,
                  message: "Please enter at least 10 characters!",
                },
              })}
            />
            <p className="text-xs  text-red-400">
              {errors.intro?.value?.message}
            </p>
          </div>

          {/* responsibilitiesField */}
          <div className="flex flex-col items-start gap-2">
            <span className="flex gap-3 lg:gap-5">
              <input
                type="checkbox"
                id="preview-responsibilities"
                {...register("responsibilities.preview")}
              />
              <label htmlFor="responsibilities" className="underline">
                Roles and Responsibilities
              </label>
            </span>
            <textarea
              id="responsibilities"
              className={`self-center w-full ${inputPrimary}`}
              name="responsibilities"
              rows={8}
              {...register("responsibilities.value", {
                required: {
                  value: true,
                  message: "This field is required!",
                },
                minLength: {
                  value: 10,
                  message: "Please enter at least 10 characters!",
                },
              })}
            />
            <p className="text-xs  text-red-400">
              {errors.responsibilities?.value?.message}
            </p>
          </div>

          {/* experienceField */}
          <div className="flex justify-between">
            <span className="flex gap-3 lg:gap-5">
              <input
                type="checkbox"
                id="preview-experience"
                {...register("experience.preview")}
              />
              <label htmlFor="experience" className="underline">
                Experience Range (yrs)
              </label>
            </span>
            <span className="flex gap-1 lg:gap-3">
              <input
                type="number"
                className="w-12 border-2 border-slate-800 rounded-md text-sm"
                placeholder="Min"
                min={0}
                name="min"
                id="min"
                {...register("experience.min", {
                  required: {
                    value: true,
                    message: "Minimum experience is required",
                  },
                  min: {
                    value: 0,
                    message: "Minimum experience can be 0 only!",
                  },
                })}
              />
              <span>-</span>

              <input
                type="number"
                className="w-12 border-2 border-slate-800 rounded-md text-sm "
                placeholder="Max"
                id="max"
                name="max"
                min={1}
                {...register("experience.max", {
                  required: {
                    value: true,
                    message: "Maximum experience is required",
                  },
                  min: {
                    value: 0,
                    message: "Maximum experience can be 0 only!",
                  },
                })}
              />
            </span>
          </div>
          <p className="text-xs mt-1 text-red-400">
            {errors.experience?.min?.message}
          </p>
          <p className="text-xs mt-1 text-red-400">
            {errors.experience?.max?.message}
          </p>

          {/* qualificationField */}
          <div className="flex gap-3 lg:gap-5 items-center">
            <input
              type="checkbox"
              id="preview-qualification"
              {...register("qualification.preview")}
            />
            <input
              type="text"
              placeholder="Qualification"
              id="qualification"
              className={`${inputPrimary} w-full`}
              name="qualification"
              {...register("qualification.value", {
                required: {
                  value: true,
                  message: "This field is required!",
                },
                minLength: {
                  value: 5,
                  message: "Please enter at least 5 characters!",
                },
              })}
            />
          </div>
          <p className="text-xs mt-1 text-red-400">
            {errors.qualification?.value?.message}
          </p>

          {/* salary */}
          <div className="flex gap-3 lg:gap-5 items-center">
            <input
              type="checkbox"
              id="preview-salary"
              {...register("salary.preview")}
            />
            <input
              type="text"
              placeholder="Salary Range"
              id="salary"
              className={`${inputPrimary} `}
              name="salary"
              {...register("salary.value", {
                pattern: {
                  value: /^[0-9\-\s(LPA)]+$/,
                  message: "Please enter in (min - max) LPA format!",
                },
                required: {
                  value: true,
                  message: "This field is required!",
                },
              })}
            />
          </div>
          <p className="text-xs  text-red-400">
            {errors.salary?.value?.message}
          </p>

          {/* statement */}
          <div className="flex gap-3 lg:gap-5 items-center">
            <input
              type="checkbox"
              id="preview-statement"
              {...register("statement.preview")}
            />
            <input
              type="text"
              placeholder="Call to Action Concluding Statement"
              id="statement"
              className={`${inputPrimary} w-full`}
              name="statement"
              {...register("statement.value", {
                required: {
                  value: true,
                  message: "This field is required!",
                },
                maxLength: {
                  value: 300,
                  message: "Please enter no more than 300 characters!",
                },
              })}
            />
          </div>
          <p className="text-xs mt-1 text-red-400">
            {errors.statement?.value?.message}
          </p>

          {/* Company */}
          <div className="flex gap-3 lg:gap-5 items-center">
            <input
              type="checkbox"
              id="preview-company"
              {...register("company.preview")}
            />
            <input
              type="text"
              placeholder="Company"
              id="company"
              className={`${inputPrimary} `}
              {...register("company.value", {
                required: {
                  value: true,
                  message: "This field is required!",
                },
              })}
            />
          </div>
          <p className="text-xs mt-1 text-red-400">
            {errors.company?.value?.message}
          </p>

          {/* Job Location */}
          <div className="flex justify-between">
            <span className="flex gap-3 lg:gap-5 items-center">
              <input
                type="checkbox"
                id="preview-location"
                {...register("location.preview")}
              />
              <input
                type="text"
                placeholder="Job Location"
                id="location"
                className={inputPrimary}
                name="location"
                {...register("location.value", {
                  required: {
                    value: true,
                    message: "This field is required!",
                  },
                })}
              />
            </span>
          </div>
          <p className="text-xs mt-1 text-red-400">
            {errors.location?.value?.message}
          </p>

          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="preview-type"
                {...register("type.preview")}
              />
              <select id="type" name="type" {...register("type.value")}>
                <option value="fullTime">Full Time</option>
                <option value="partTime">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="preview-model"
                {...register("model.preview")}
              />
              <select id="model" name="model" {...register("model.value")}>
                <option value="Remote">Is Remote</option>
                <option value="5-Day">5 Day week</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center mt-10 gap-3">
            <button className="py-1 px-5 border-2 border-slate-700 hover:bg-slate-300 transition-all duration-300">
              {isEditSession ? "Edit Job" : "Add New Job"}
            </button>
            <button
              type="reset"
              className="py-1 px-5 border-2 border-slate-700 hover:bg-slate-300 transition-all duration-300"
            >
              Reset
            </button>
          </div>
        </form>
        <Toaster />
      </div>
      <Preview watch={watch} />
    </>
  );
};

export default JobForm;
