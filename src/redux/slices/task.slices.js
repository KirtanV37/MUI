import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/client";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchtasks",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.TASKS.getAll(data);
      const totalHeader = response.headers["x-total-count"];
      const total = !isNaN(Number(totalHeader))
        ? Number(totalHeader)
        : response.data.length;

      console.log("response:", response);
      console.log("✔️ total:", total);
      return {
        data: response.data,
        total,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createtask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await api.TASKS.create({ data: taskData });
      // console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updatetaskstatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.TASKS.patch({ id, data });
      console.log("response: ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/*
export const updateTask = createAsyncThunk(
  "tasks/updatetask",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.TASKS.patch({ id, data });
      console.log("response: ", response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
*/

const tasks = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    total: 0,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action: ", action);

        const idx = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (idx !== -1) {
          state.items[idx] = { ...state.items[idx], ...action.payload };
        }
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tasks.reducer;
