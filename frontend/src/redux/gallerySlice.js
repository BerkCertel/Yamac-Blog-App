import { createSlice } from "@reduxjs/toolkit";
import galleryData from "../utils/Gallery.json";

const initialState = {
  images: galleryData,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
});

export default gallerySlice.reducer;
