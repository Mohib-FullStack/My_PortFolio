import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunks
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/contacts/", formData, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to submit form",
        status: error.response?.status
      });
    }
  }
);

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/contacts/");
      return {
        contacts: Array.isArray(response.data.date) ? response.data.date : [],
        count: response.data.count || 0
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch contacts",
        status: error.response?.status
      });
    }
  }
);

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async ({ id, ...contactData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/contacts/${id}/`, contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to update contact",
        status: error.response?.status
      });
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/contacts/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to delete contact",
        status: error.response?.status
      });
    }
  }
);

// Slice
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    status: 'idle',
    isLoading: false,
    error: null,
    successMessage: null,
    totalCount: 0
  },
  reducers: {
    clearContactState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.contacts = action.payload.contacts;
        state.totalCount = action.payload.count;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create Contact
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.unshift(action.payload);
        state.totalCount += 1;
        state.successMessage = "Contact created successfully";
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update Contact
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.contacts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.contacts[index] = action.payload;
        state.successMessage = "Contact updated successfully";
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Delete Contact
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(c => c.id !== action.payload);
        state.totalCount -= 1;
        state.successMessage = "Contact deleted successfully";
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearContactState } = contactSlice.actions;
export default contactSlice.reducer;