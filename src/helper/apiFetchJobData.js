export const fetchJobData = async (id) => {
  if (!id) throw new Error("ID is null");

  const res = await fetch(`http://localhost:8000/jobs/${id}`, {
    method: "get",
  });

  const data = await res.json();

  return data;
};
