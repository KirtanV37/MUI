import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/client";

export const fetchUsers = createAsyncThunk(
  "users/fetchuser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.USERS.getAll(data);
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

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.USERS.create({ data: userData });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.USERS.getAll({
        params: { email, password },
      });
      console.log("response: ", response);
      const user = response?.data?.[0];
      console.log("user: ", user);
      if (!user || user.password !== password) {
        return rejectWithValue("Invalid credentials");
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

const users = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    total: 0,
    currentUser: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("action:- ", action);
        state.items = action.payload.data;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default users.reducer;
export const { logout } = users.actions;
