import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slices";
import taskSlice from "./slices/task.slices";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const usersPersistConfig = {
  key: "users",
  storage,
  whitelist: ["currentUser"],
  blacklist: ["tasks"],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, userSlice),
  tasks: taskSlice,
});

export default rootReducer;
