import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "../features/folder/folderSlice";

export const store = configureStore({
  reducer: {
    folders: foldersReducer,
  },
});
