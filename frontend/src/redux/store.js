import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallerySlice.js";
import booksReducer from "./bookSlice.js";
import articlesReducer from "./articleSlice.js";
import userReducer from "./userSlice.js";
import guestbookReducer from "./guestbookSlice.js";

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    books: booksReducer,
    articles: articlesReducer,
    user: userReducer,
    guestbook: guestbookReducer,
  },
});

export default store;
