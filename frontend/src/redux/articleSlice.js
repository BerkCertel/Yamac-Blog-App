import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  articles: [],
  article: {},
  adminarticles: [],
  loading: false,
};

// User all articles
export const getArticles = createAsyncThunk("articles", async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
  const data = await response.json();
  return data;
});

// User Article detail
export const getArticleDetail = createAsyncThunk(
  "article",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/article/${id}`
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
export const addArticleReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      console.log(reviewData);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/article/newReview`,
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
  async ({ articleId, reviewId }, { rejectWithValue }) => {
    try {
      console.log("Gönderilen veriler:", { articleId, reviewId });
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/article/${articleId}/review/${reviewId}`,
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

      return { articleId, reviewId };
    } catch (error) {
      toast.error(`Hata: ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);

// Admin get
export const getAdminArticles = createAsyncThunk("admin-articles", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/admin/articles`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  return data;
});

// Admin Delete
export const adminDeleteArticle = createAsyncThunk(
  "admin-article/delete",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/article/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Makale silinirken bir hata oluştu.");
      }
      toast.success("Makale başarıyla silindi!");
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error("Makale  silinemedi!");
      return rejectWithValue(error.message);
    }
  }
);

// Admin create
export const addAdminArticle = createAsyncThunk(
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
        `${import.meta.env.VITE_API_URL}/article/new`,
        requestOptions
      );
      const newData = await response.json();

      if (response.ok) {
        toast.success("Makale başarıyla oluşturuldu!");
      } else {
        throw new Error(
          newData.message || "Makale oluşturulurken bir hata oluştu."
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
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(getArticleDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticleDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(getAdminArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.adminarticles = action.payload;
      })
      .addCase(addAdminArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAdminArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.adminarticles = [...state.adminarticles, action.payload];
      })
      .addCase(adminDeleteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminDeleteArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(adminDeleteArticle.rejected, (state) => {
        state.loading = false;
      });
    builder.addCase(addArticleReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addArticleReview.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default booksSlice.reducer;
