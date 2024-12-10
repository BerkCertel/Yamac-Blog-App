import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  guestbook: [],
  loading: false,
};

// Kullanıcı Yorum Ekleme
export const addReview = createAsyncThunk(
  "guestbook/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/guestreview/newReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error("Yorum eklenirken hata oluştu.");
      }

      const data = await response.json();
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
// Admin Yorum Silme
export const deleteReview = createAsyncThunk(
  "guestbook/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/guestreview/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Yorum silinirken bir hata oluştu.");
      }

      toast.success("Yorum başarıyla silindi!");
      return reviewId;
    } catch (error) {
      toast.error(`Hata: ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

// Tüm Yorumları Getir
export const getAllReviews = createAsyncThunk(
  "guestbook/getAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/guestreviews`
      );
      if (!response.ok) {
        throw new Error("Yorumlar alınırken hata oluştu.");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      toast.error(`Hata: ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

const guestbookSlice = createSlice({
  name: "guestbook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Yorumları alırken
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.guestbook = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Yorum eklerken
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.guestbook = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Yorum silerken
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default guestbookSlice.reducer;
