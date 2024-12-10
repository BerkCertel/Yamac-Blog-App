import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  isAuth: false,
  loading: false,
};

//Register
export const register = createAsyncThunk("register", async (data, thunkAPI) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/register`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const result = await response.json();
    toast.success("Kayıt Başarılı.");
    return result;
  } catch (error) {
    toast.error("Kayıt Başarısız.");
    return thunkAPI.rejectWithValue(error.message);
  }
});

//Login
export const login = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/login`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const res = await response.json();
    localStorage.setItem("token", res?.token);
    toast.success("Giriş Başarılı!");
    return res;
  } catch (error) {
    toast.error("Giriş Başarısız.");
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Forgot password
export const forgotPassword = createAsyncThunk("forgot", async (email) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/forgotPassword`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Forgot failed");
    }

    const res = await response.json();
    toast.success("Mail Gönderimibaşarılı.");
    return res;
  } catch (error) {
    toast.error("Mail Gönderimi Başarısız.");
    console.log(error);
  }
});

// reset password
export const resetPassword = createAsyncThunk(
  "reset",
  async (params, { rejectWithValue }) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: params.password }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reset/${params.token}`,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Reset Password failed");
      }

      const res = await response.json();
      toast.success("Şifre Değişikliği başarılı.");
      return res;
    } catch (error) {
      toast.error(error.message || "Şifre Değişikliği Başarısız.");
      return rejectWithValue(error.message);
    }
  }
);

// User Detail
export const profile = createAsyncThunk("profile", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
    headers: { authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(profile.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(profile.rejected, (state) => {
      state.loading = false;
      state.isAuth = false;
      state.user = {};
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
