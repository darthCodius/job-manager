export const editForm = async (formData, id) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const res = await fetch(`http://localhost:8000/jobs/${id}`, options);

  const data = await res.json();

  return data;
};
