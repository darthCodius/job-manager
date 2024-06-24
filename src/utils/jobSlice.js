import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  status: "idle",
  error: "",
  titles: [],
};

export const fetchJobs = createAsyncThunk("job/getAllJobs", async function () {
  const res = await fetch("http://localhost:8000/jobs");

  const data = await res.json();

  return data;
});

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.status = "error";
      state.error = "There was a problem in getting jobs";
    });
  },
});

export default jobSlice.reducer;
