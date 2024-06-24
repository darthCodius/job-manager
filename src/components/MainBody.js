import { useEffect, useState } from "react";
import JobForm from "./JobForm";
import Preview from "./Preview";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../utils/jobSlice";
import Shimmer from "./UI/Shimmer";
import { fetchJobData } from "../helper/apiFetchJobData";

const MainBody = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((store) => store.jobs.jobs);
  const status = useSelector((store) => store.jobs.status);
  const [jobToEdit, setJobToEdit] = useState({});

  const handleEdit = (id) => {
    fetchJobData(id)
      .then((data) => {
        setJobToEdit((curr) => {
          return {
            ...curr,
            id,
            status: data.status,
            title: {
              preview: data.title.preview,
              value: data.title.value,
            },
            intro: {
              preview: data.intro.preview,
              value: data.intro.value,
            },
            responsibilities: {
              preview: data.responsibilities.preview,
              value: data.responsibilities.value,
            },
            experience: {
              preview: data.experience.preview,
              min: data.experience.min,
              max: data.experience.max,
            },
            qualification: {
              preview: data.qualification.preview,
              value: data.qualification.value,
            },
            salary: {
              preview: data.salary.preview,
              value: data.salary.value,
            },
            statement: {
              preview: data.statement.preview,
              value: data.statement.value,
            },
            company: {
              preview: data.company.preview,
              value: data.company.value,
            },
            location: {
              preview: data.location.preview,
              value: data.location.value,
            },
            type: {
              preview: data.type.preview,
              value: data.type.value,
            },
            model: {
              preview: data.model.preview,
              value: data.model.value,
            },
          };
        });
      })
      .catch((err) => console.log(err.message));
  };

  const handleNewJob = () => {
    setJobToEdit({});
  };

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (status === "loading") return <Shimmer />;

  return (
    <div className="grid grid-cols-[120px_1fr] lg:grid-cols-[200px_1fr_1fr] gap-3">
      <div className="flex flex-col gap-2">
        <button
          onClick={handleNewJob}
          className="hover:bg-slate-300 transition-all duration-300 py-1 bg-white px-5 mr-[-14px] border-2 border-r-0  border-slate-700 z-50"
        >
          New Job
        </button>
        <ul className="flex flex-col gap-2 ">
          {jobs.map((job, idx) => {
            return (
              <li key={job.id}>
                <button
                  onClick={() => handleEdit(job.id)}
                  className="py-2 w-full px-2 border-2 border-slate-700 hover:bg-slate-300 transition-all duration-300"
                >
                  {job.title.value}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <JobForm jobToEdit={jobToEdit} setJobToEdit={setJobToEdit} />
      <Preview />
    </div>
  );
};

export default MainBody;
