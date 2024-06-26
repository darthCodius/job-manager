export const deleteJob = async (id) => {
  const res = await fetch(`http://localhost:8000/jobs/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  console.log(data);
};
