import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// ✅ Fetch All Contacts (Admin Feature)
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/contacts/");
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch contacts");
    }
  }
);

// ✅ Submit Contact Form
export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/contacts/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.message; // Returns success message
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to submit contact form");
    }
  }
);

// ✅ Contact Slice
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearContactState: (state) => {
      state.messages = [];
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Submit Contact Form
      .addCase(submitContactForm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactState } = contactSlice.actions;
export default contactSlice.reducer;














