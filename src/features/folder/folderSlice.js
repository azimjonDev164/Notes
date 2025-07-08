import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editFolder: "",
};

export const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    editFolder: (state, action) => {
      state.editFolder = action.payload;
    },
  },
});

export const { editFolder } = folderSlice.actions;
export default folderSlice.reducer;
