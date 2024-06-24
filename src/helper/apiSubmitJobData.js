export const submitJobData = async (job) => {
  const res = await fetch("http://localhost:8000/jobs", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  const data = await res.json();

  return data;
};
