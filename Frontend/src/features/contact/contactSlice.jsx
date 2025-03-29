// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import axiosInstance from "../../axiosInstance";

// // // ✅ Fetch All Contacts (Admin Feature)
// // export const fetchContacts = createAsyncThunk(
// //   "contact/fetchContacts",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await axiosInstance.get("/contacts/");
// //       return response.data.payload; // Return the list of contacts
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || "Failed to fetch contacts");
// //     }
// //   }
// // );

// // // ✅ Submit Contact Form
// // export const submitContactForm = createAsyncThunk(
// //   "contact/submitContactForm",
// //   async (formData, { rejectWithValue }) => {
// //     try {
// //       const response = await axiosInstance.post("/contacts/", formData, {
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       return response.data; // Return the entire response
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data?.error || "Failed to submit contact form");
// //     }
// //   }
// // );

// // // export const submitContactForm = createAsyncThunk(
// // //   "contact/submitContactForm",
// // //   async (formData, { rejectWithValue }) => {
// // //     try {
// // //       const response = await axiosInstance.post("/contacts/", formData);
// // //       return response.data;
// // //     } catch (error) {
// // //       return rejectWithValue(
// // //         error.response?.data?.error || 
// // //         error.message || 
// // //         "Failed to submit contact form"
// // //       );
// // //     }
// // //   }
// // // );

// // // ✅ Contact Slice
// // const contactSlice = createSlice({
// //   name: "contact",
// //   initialState: {
// //     isLoading: false,
// //     error: null,
// //     successMessage: null, // For storing success message after form submission
// //   },
// //   reducers: {
// //     // Clear the contact state (used after showing success/error messages)
// //     clearContactState: (state) => {
// //       state.successMessage = null;
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // 🔹 Fetch Contacts
// //       .addCase(fetchContacts.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchContacts.fulfilled, (state, action) => {
// //         state.messages = action.payload; // Store fetched contacts
// //         state.isLoading = false;
// //       })
// //       .addCase(fetchContacts.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload; // Store error message
// //       })

      
// //        // 🔹 Submit Contact Form
// //        .addCase(submitContactForm.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //         state.successMessage = null; // Reset success message
// //       })
// //       .addCase(submitContactForm.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         console.log("Backend response:", action.payload); // Debug log

// //         // Handle different response structures
// //         if (action.payload.message) {
// //           state.successMessage = action.payload.message; // Use message field if available
// //         } else if (action.payload.success) {
// //           state.successMessage = "Your message has been sent successfully!"; // Fallback message
// //         } else {
// //           state.successMessage = "Form submitted successfully!"; // Default message
// //         }
// //       })
// //       .addCase(submitContactForm.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload; // Store error message
// //         console.error("Contact form submission failed:", action.payload); // Debug log
// //       });
// //   },
// // });

// // export const { clearContactState } = contactSlice.actions;
// // export default contactSlice.reducer;



// //! test
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../axiosInstance";

// // Async Thunks
// export const fetchContacts = createAsyncThunk(
//   "contact/fetchContacts",
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const { page = 1, search = '', isRead = null } = params;
//       const response = await axiosInstance.get("/contacts/", {
//         params: {
//           page,
//           search,
//           is_read: isRead
//         }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const createContact = createAsyncThunk(
//   "contact/create",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post("/contacts/create/", formData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updateContact = createAsyncThunk(
//   "contact/update",
//   async ({ id, formData }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`/contacts/${id}/`, formData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const deleteContact = createAsyncThunk(
//   "contact/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axiosInstance.delete(`/contacts/${id}/`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const markAsRead = createAsyncThunk(
//   "contact/markAsRead",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.patch(`/contacts/${id}/mark-read/`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Slice
// const contactSlice = createSlice({
//   name: "contact",
//   initialState: {
//     contacts: [],
//     currentContact: null,
//     loading: false,
//     error: null,
//     success: null,
//     pagination: {
//       count: 0,
//       next: null,
//       previous: null,
//       page: 1,
//       pageSize: 10
//     }
//   },
//   reducers: {
//     resetContactState: (state) => {
//       state.error = null;
//       state.success = null;
//     },
//     setCurrentContact: (state, action) => {
//       state.currentContact = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Contacts
//       .addCase(fetchContacts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.contacts = action.payload.data;
//         state.pagination = {
//           count: action.payload.count,
//           next: action.payload.next,
//           previous: action.payload.previous,
//           page: action.meta.arg?.page || 1,
//           pageSize: 10
//         };
//       })
//       .addCase(fetchContacts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Create Contact
//       .addCase(createContact.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = null;
//       })
//       .addCase(createContact.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload.message;
//         state.contacts.unshift(action.payload.data);
//       })
//       .addCase(createContact.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Update Contact
//       .addCase(updateContact.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = null;
//       })
//       .addCase(updateContact.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload.message;
//         const index = state.contacts.findIndex(c => c.id === action.payload.data.id);
//         if (index !== -1) {
//           state.contacts[index] = action.payload.data;
//         }
//         if (state.currentContact?.id === action.payload.data.id) {
//           state.currentContact = action.payload.data;
//         }
//       })
//       .addCase(updateContact.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Delete Contact
//       .addCase(deleteContact.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = null;
//       })
//       .addCase(deleteContact.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = "Contact deleted successfully";
//         state.contacts = state.contacts.filter(c => c.id !== action.payload);
//         if (state.currentContact?.id === action.payload) {
//           state.currentContact = null;
//         }
//       })
//       .addCase(deleteContact.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Mark as Read
//       .addCase(markAsRead.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(markAsRead.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.contacts.findIndex(c => c.id === action.payload.data.id);
//         if (index !== -1) {
//           state.contacts[index] = action.payload.data;
//         }
//         if (state.currentContact?.id === action.payload.data.id) {
//           state.currentContact = action.payload.data;
//         }
//       })
//       .addCase(markAsRead.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { resetContactState, setCurrentContact } = contactSlice.actions;
// export default contactSlice.reducer;


//! test
// features/contact/contactSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../../axiosInstance";

// 🎯 Initial state
const initialState = {
  contacts: [],
  loading: false,
  error: null,
  success: false,
  currentContact: null,
  pagination: {
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
  filters: {
    isRead: null,
    search: '',
  },
};

// 📨 Async thunk for creating a contact
export const createContact = createAsyncThunk(
  'contact/create',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/contacts/create/', contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 📜 Async thunk for fetching contacts with filters
export const fetchContacts = createAsyncThunk(
  'contact/fetchAll',
  async ({ page = 1, isRead = null, search = '' }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page,
        ...(isRead !== null && { is_read: isRead }),
        ...(search && { search }),
      });
      
      const response = await axiosInstance.get(`/contacts/?${params}`);
      return {
        data: response.data.data,
        pagination: {
          page,
          totalCount: response.data.count,
        },
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🔍 Async thunk for fetching single contact
export const fetchContact = createAsyncThunk(
  'contact/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/contacts/${id}/`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✏️ Async thunk for updating contact
export const updateContact = createAsyncThunk(
  'contact/update',
  async ({ id, contactData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/contacts/${id}/`, contactData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🗑️ Async thunk for deleting contact
export const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/contacts/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ Async thunk for marking as read
export const markAsRead = createAsyncThunk(
  'contact/markAsRead',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/contacts/${id}/mark-read/`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🎭 Create contact slice
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    // 🧹 Reset success state
    resetSuccess: (state) => {
      state.success = false;
    },
    // 🔄 Set filters
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // 🌀 Loading states
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      // ✅ Success cases
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.data;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContact = action.payload;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        );
        if (state.currentContact?.id === action.payload.id) {
          state.currentContact = action.payload;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        );
      })
      
      // ❌ Error cases
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetSuccess, setFilters } = contactSlice.actions;
export default contactSlice.reducer;



