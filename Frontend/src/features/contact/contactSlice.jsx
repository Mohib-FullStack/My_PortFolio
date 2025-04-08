import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

// ✅ Submit Contact Form
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/contacts/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.response?.data?.message || 
        "Failed to submit contact form"
      );
    }
  }
);

// ✅ Fetch All Contacts
// export const fetchContacts = createAsyncThunk(
//   "contact/fetchContacts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/api/contacts/");
//       return response.data.date; // Changed from payload to date
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to fetch contacts");
//     }
//   }
// );

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      // Temporary fix - use full URL to test
      const response = await axios.get('https://my-portfolio-pmve.onrender.com/api/contacts/');
      return response.data.date;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch contacts");
    }
  }
);

// ✅ Update Contact
export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async ({ id, ...contactData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/contacts/${id}/`, contactData);
      return response.data.payload || response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.response?.data?.message || 
        "Failed to update contact"
      );
    }
  }
);

// ✅ Delete Contact
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/contacts/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.response?.data?.message || 
        "Failed to delete contact"
      );
    }
  }
);

// ✅ Contact Slice
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearContactState: (state) => {
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
      // .addCase(fetchContacts.fulfilled, (state, action) => {
      //   state.contacts = action.payload;
      //   state.isLoading = false;
      //   state.error = null;
      // })

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload || []; // Ensure we always have an array
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Submit Contact Form
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message || "Contact submitted successfully";
        if (action.payload.id) {
          state.contacts.unshift(action.payload); // Add new contact to beginning
        }
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Delete Contact
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        state.successMessage = "Contact deleted successfully";
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // 🔹 Update Contact
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.contacts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
        state.successMessage = action.payload.message || "Contact updated successfully";
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactState } = contactSlice.actions;
export default contactSlice.reducer;



// //! update

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../axiosInstance";


// // ✅ Submit Contact Form
// export const createContact = createAsyncThunk(
//   "contact/createContact",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post("/contacts/", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response.data; // Return the entire response
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.error || "Failed to submit contact form");
//     }
//   }
// );

// // ✅ Fetch All Contacts
// export const fetchContacts = createAsyncThunk(
//   "contact/fetchContacts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/contacts/"); // Note the /api prefix here
//       return response.data.payload;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to fetch contacts");
//     }
//   }
// );

// // ✅ Update Contact
// export const updateContact = createAsyncThunk(
//   "contact/updateContact",
//   async ({ id, ...contactData }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`/api/contacts/${id}/`, contactData);
//       return response.data.payload;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.error || "Failed to update contact");
//     }
//   }
// );

// // ✅ Delete Contact
// export const deleteContact = createAsyncThunk(
//   "contact/deleteContact",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axiosInstance.delete(`/api/contacts/${id}/`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.error || "Failed to delete contact");
//     }
//   }
// );




// // Update your slice's initialState to include contacts
// // ✅ Contact Slice
// const contactSlice = createSlice({
//   name: "contact",
//   initialState: {
//     contacts: [],
//     isLoading: false,
//     error: null,
//     successMessage: null, // For storing success message after form submission
//   },
//   reducers: {
//     // Clear the contact state (used after showing success/error messages)
//     clearContactState: (state) => {
//       state.successMessage = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // 🔹 Fetch Contacts
//       .addCase(fetchContacts.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         state.messages = action.payload; // Store fetched contacts
//         state.isLoading = false;
//       })

//       .addCase(fetchContacts.rejected, (state, action) => {
//         state.isLoading = false;
//         // Extract error message properly
//         state.error = action.payload?.message || 
//                       action.payload?.error || 
//                       "Failed to fetch contacts";
//       })
   

      
//        // 🔹 Submit Contact Form
//        .addCase(createContact.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.successMessage = null; // Reset success message
//       })
//       .addCase(createContact.fulfilled, (state, action) => {
//         state.isLoading = false;
//         console.log("Backend response:", action.payload); // Debug log

//         // Handle different response structures
//         if (action.payload.message) {
//           state.successMessage = action.payload.message; // Use message field if available
//         } else if (action.payload.success) {
//           state.successMessage = "Your message has been sent successfully!"; // Fallback message
//         } else {
//           state.successMessage = "Form submitted successfully!"; // Default message
//         }
//       })
//       .addCase(createContact.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload; // Store error message
//         console.error("Contact form submission failed:", action.payload); // Debug log
//       })

//          // 🔹 Delete Contact
//     .addCase(deleteContact.pending, (state) => {
//       state.isLoading = true;
//       state.error = null;
//     })
//     .addCase(deleteContact.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
//       state.successMessage = "Contact deleted successfully";
//     })
//     .addCase(deleteContact.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload?.message || 
//                     action.payload?.error || 
//                     "Failed to delete contact";
//     })
    
//     // 🔹 Update Contact
//     .addCase(updateContact.pending, (state) => {
//       state.isLoading = true;
//       state.error = null;
//     })
//     .addCase(updateContact.fulfilled, (state, action) => {
//       state.isLoading = false;
//       const index = state.contacts.findIndex(c => c.id === action.payload.id);
//       if (index !== -1) {
//         state.contacts[index] = action.payload;
//       }
//       state.successMessage = "Contact updated successfully";
//     })
//     .addCase(updateContact.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload?.message || 
//                     action.payload?.error || 
//                     "Failed to update contact";
//     })
//   },
// });

// export const { clearContactState } = contactSlice.actions;
// export default contactSlice.reducer;
