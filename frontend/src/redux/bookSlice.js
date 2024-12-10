import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  books: [],
  book: {},
  adminbooks: [],
  loading: false,
};

// User all books
export const getBooks = createAsyncThunk("books", async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/books`);
  const data = await response.json();
  return data;
});

// User Book detail
export const getBookDetail = createAsyncThunk(
  "book",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/book/${id}`
      );
      if (!response.ok) {
        throw new Error("API'den başarılı bir cevap alınamadı.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Hata:", error);
      return rejectWithValue(error.message);
    }
  }
);

// User review create
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      console.log(reviewData);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/book/newReview`,
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

// Admin Review Delete
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async ({ bookId, reviewId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/book/${bookId}/review/${reviewId}`,
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

      return { bookId, reviewId };
    } catch (error) {
      toast.error(`Hata: ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

// Admin get
export const getAdminBooks = createAsyncThunk("admin-books", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/books`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
});

// Admin Delete
export const adminDeleteBook = createAsyncThunk(
  "admin-books/delete",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/book/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Kitap silinirken bir hata oluştu.");
      }
      toast.success("Kitap başarıyla silindi!");
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error("Kitap  silinemedi!");
      return rejectWithValue(error.message);
    }
  }
);

// Admin create
export const addAdminBook = createAsyncThunk(
  "admin-add",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/book/new`,
        requestOptions
      );
      const newData = await response.json();

      if (response.ok) {
        toast.success("Kitap başarıyla oluşturuldu!");
      } else {
        throw new Error(
          newData.message || "Kitap oluşturulurken bir hata oluştu."
        );
      }

      return newData;
    } catch (error) {
      toast.error(`Hata: ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBookDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(getAdminBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.adminbooks = action.payload;
      })
      .addCase(addAdminBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAdminBook.fulfilled, (state, action) => {
        state.loading = false;
        state.adminbooks = [...state.adminbooks, action.payload];
      })
      .addCase(adminDeleteBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminDeleteBook.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(adminDeleteBook.rejected, (state) => {
        state.loading = false;
      });
    builder.addCase(addReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addReview.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default booksSlice.reducer;
