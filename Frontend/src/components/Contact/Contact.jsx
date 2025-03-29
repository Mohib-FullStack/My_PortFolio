// import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axiosInstance from "../../axiosInstance";
// import { createContact, resetContactState, } from "../../features/contact/contactSlice";
// import { showSnackbar } from "../../features/snackbar/snackbarSlice";
// import EarthCanvas from "../canvas/Earth";
// import StarsCanvas from "../canvas/Stars";


// const Contact = () => {
//   const dispatch = useDispatch();
//   const { isLoading, successMessage, error } = useSelector((state) => state.contact);

//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Fetch CSRF token when component mounts
//   useEffect(() => {
//     const fetchCSRFToken = async () => {
//       try {
//         await axiosInstance.get('/csrf-token/');
//       } catch (error) {
//         console.error('Error fetching CSRF token:', error);
//       }
//     };
//     fetchCSRFToken();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Validate form before submission
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.full_name.trim()) newErrors.full_name = "Le nom complet est requis";
//     if (!formData.email.trim()) newErrors.email = "L'email est requis";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide";
//     if (!formData.message.trim()) newErrors.message = "Le message ne peut pas être vide";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
    
//     // Dispatch the form submission with proper data structure
//     dispatch(createContact({
//       full_name: formData.full_name,
//       email: formData.email,
//       message: formData.message
//     }));
//   };

//   // Reset form and handle success/error messages
//   useEffect(() => {
//     if (successMessage) {
//       dispatch(showSnackbar({ message: successMessage, severity: "success" }));
//       setFormData({ full_name: "", email: "", message: "" });
//       setTimeout(() => {
//         dispatch(resetContactState());
//       }, 2000);
//     }
//     if (error) {
//       dispatch(showSnackbar({ message: error, severity: "error" }));
//       setTimeout(() => {
//         dispatch(resetContactState());
//       }, 3000);
//     }
//   }, [successMessage, error, dispatch]);

//   return (
//     <Box sx={{ position: "relative" }}>
//       {/* Background Stars */}
//       <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, backgroundColor: "#1F1346" }}>
//         <StarsCanvas />
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 8, mb: 10, textAlign: "center", position: "relative", zIndex: 2 }}>
//         <Typography variant="subtitle1" sx={{ color: "#FFD700", fontWeight: "700", fontSize: "1.8rem", letterSpacing: "2px" }} mt={8}>
//           CONTACT
//         </Typography>
//         <Typography variant="h3" sx={{ fontSize: "3rem", color: "#FFF", fontWeight: "bold", mt: 2 }}>
//           Entrons en Contact
//         </Typography>

//         <Box sx={{ mt: 6, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center", gap: 6 }}>
//           {/* EarthCanvas Section */}
//           <Box sx={{ flex: 1, display: "flex", justifyContent: "center", width: "100%" }}>
//             <Box sx={{ width: { xs: "80%", sm: "60%", md: "400px" }, height: { xs: "250px", sm: "350px", md: "450px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
//               <EarthCanvas />
//             </Box>
//           </Box>

//           {/* Contact Form Section */}
//           <Box sx={{ flex: 1, width: "100%" }}>
//             <div style={{ width: "100%", padding: "2px", borderRadius: 20, background: "linear-gradient(135deg, #2F1C6A, #1F1346)" }}>
//               <Paper elevation={4} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, background: "rgba(47, 28, 106, 0.85)", textAlign: "center" }}>
//                 <Typography variant="h6" sx={{ color: "#FFD700", fontWeight: "bold", fontSize: "1.5rem" }} gutterBottom>
//                   Restons Connectés
//                 </Typography>

//                 {/* Contact Form */}
//                 <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}>
//                   <TextField
//                     label="Votre Nom Complet"
//                     name="full_name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     error={!!errors.full_name}
//                     helperText={errors.full_name}
//                     fullWidth
//                     variant="outlined"
//                     sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px" } }}
//                   />
//                   <TextField
//                     label="Votre Email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     error={!!errors.email}
//                     helperText={errors.email}
//                     fullWidth
//                     variant="outlined"
//                     type="email"
//                     sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px" } }}
//                   />
//                   <TextField
//                     label="Votre Message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     error={!!errors.message}
//                     helperText={errors.message}
//                     fullWidth
//                     multiline
//                     rows={5}
//                     variant="outlined"
//                     sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px" } }}
//                   />
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={isLoading}
//                     sx={{ mt: 2, py: 1.5, fontSize: "1rem", backgroundColor: "#FFD700", color: "#282C35", borderRadius: "10px", fontWeight: "bold" }}
//                   >
//                     {isLoading ? <CircularProgress size={24} sx={{ color: "#282C35" }} /> : "Envoyer le Message"}
//                   </Button>
//                 </form>
//               </Paper>
//             </div>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Contact;



//! test
// import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axiosInstance from "../../axiosInstance";
// import { createContact } from "../../features/contact/contactSlice";
// import { showSnackbar } from "../../features/snackbar/snackbarSlice";
// import EarthCanvas from "../canvas/Earth";
// import StarsCanvas from "../canvas/Stars";

// const Contact = () => {
//   const dispatch = useDispatch();
//   const { isLoading, successMessage, error } = useSelector((state) => state.contact);

//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [csrfToken, setCsrfToken] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Fetch CSRF token when component mounts
//   useEffect(() => {
//     const fetchCSRFToken = async () => {
//       try {
//         const response = await axiosInstance.get('/csrf-token/');
//         setCsrfToken(response.data.csrf_token);
//       } catch (error) {
//         console.error('Error fetching CSRF token:', error);
//         dispatch(showSnackbar({
//           message: "Failed to initialize form. Please refresh.",
//           severity: "error"
//         }));
//       }
//     };
//     fetchCSRFToken();
//   }, [dispatch]);

//   // Handle input changes with validation
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ""
//       }));
//     }
//   };

//   // Validate form fields
//   const validateForm = () => {
//     const newErrors = {};
//     const trimmedName = formData.full_name.trim();
//     const trimmedEmail = formData.email.trim();
//     const trimmedMessage = formData.message.trim();
  
//     if (!trimmedName) newErrors.full_name = "Full name is required";
//     if (!trimmedEmail) newErrors.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!trimmedMessage) newErrors.message = "Message is required";
  
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm() || isSubmitting) return;
//     setIsSubmitting(true);
  
//     try {
//       // Format data exactly as Django expects
//       const formPayload = {
//         full_name: formData.full_name.trim(),
//         email: formData.email.trim(),
//         message: formData.message.trim()
//       };
  
//       const result = await dispatch(createContact({
//         data: formPayload,
//         config: {
//           headers: {
//             'X-CSRFToken': csrfToken,
//             'Content-Type': 'application/json'
//           }
//         }
//       })).unwrap();
  
//       if (result.success) {
//         dispatch(showSnackbar({
//           message: result.message || "Message sent successfully!",
//           severity: "success"
//         }));
//         setFormData({ full_name: "", email: "", message: "" });
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
      
//       // Handle Django validation errors
//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//         dispatch(showSnackbar({
//           message: "Please correct the form errors",
//           severity: "error"
//         }));
//       } else {
//         dispatch(showSnackbar({
//           message: error.message || "Failed to send message",
//           severity: "error"
//         }));
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle success/error messages
//   useEffect(() => {
//     if (successMessage) {
//       dispatch(showSnackbar({
//         message: successMessage,
//         severity: "success"
//       }));
//     }

//     if (error && !error.response?.data?.errors) {
//       dispatch(showSnackbar({
//         message: typeof error === 'string' ? error : "An error occurred",
//         severity: "error"
//       }));
//     }
//   }, [successMessage, error, dispatch]);

//   return (
//     <Box sx={{ 
//       position: "relative", 
//       minHeight: "100vh",
//       backgroundColor: "#1F1346",
//       overflow: "hidden"
//     }}>
//       {/* Background Stars */}
//       <Box sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 0
//       }}>
//         <StarsCanvas />
//       </Box>

//       <Container maxWidth="lg" sx={{
//         pt: 8,
//         pb: 10,
//         position: "relative",
//         zIndex: 1
//       }}>
//         <Typography variant="subtitle1" sx={{
//           color: "#FFD700",
//           fontWeight: "700",
//           fontSize: "1.8rem",
//           letterSpacing: "2px"
//         }} mt={8}>
//           CONTACT
//         </Typography>
        
//         <Typography variant="h3" sx={{
//           fontSize: "3rem",
//           color: "#FFF",
//           fontWeight: "bold",
//           mt: 2
//         }}>
//           Get In Touch
//         </Typography>

//         <Box sx={{
//           mt: 6,
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 6
//         }}>
//           {/* EarthCanvas Section */}
//           <Box sx={{
//             flex: 1,
//             display: "flex",
//             justifyContent: "center",
//             width: "100%"
//           }}>
//             <EarthCanvas />
//           </Box>

//           {/* Contact Form Section */}
//           <Box sx={{ flex: 1, width: "100%" }}>
//             <Box sx={{
//               width: "100%",
//               p: "2px",
//               borderRadius: 4,
//               background: "linear-gradient(135deg, #2F1C6A, #1F1346)"
//             }}>
//               <Paper elevation={4} sx={{
//                 p: { xs: 3, sm: 4 },
//                 borderRadius: 2,
//                 background: "rgba(47, 28, 106, 0.85)",
//                 textAlign: "center"
//               }}>
//                 <Typography variant="h6" sx={{
//                   color: "#FFD700",
//                   fontWeight: "bold",
//                   fontSize: "1.5rem",
//                   mb: 2
//                 }}>
//                   Let's Connect
//                 </Typography>

//                 <form onSubmit={handleSubmit} style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "20px",
//                   marginTop: "28px"
//                 }}>
//                   <TextField
//                     label="Full Name"
//                     name="full_name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     error={!!errors.full_name}
//                     helperText={errors.full_name}
//                     fullWidth
//                     variant="outlined"
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         background: "#FFF",
//                         borderRadius: "10px"
//                       }
//                     }}
//                   />
                  
//                   <TextField
//                     label="Email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     error={!!errors.email}
//                     helperText={errors.email}
//                     fullWidth
//                     variant="outlined"
//                     type="email"
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         background: "#FFF",
//                         borderRadius: "10px"
//                       }
//                     }}
//                   />
                  
//                   <TextField
//                     label="Message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     error={!!errors.message}
//                     helperText={errors.message}
//                     fullWidth
//                     multiline
//                     rows={5}
//                     variant="outlined"
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         background: "#FFF",
//                         borderRadius: "10px"
//                       }
//                     }}
//                   />
                  
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={isSubmitting}
//                     sx={{
//                       mt: 2,
//                       py: 1.5,
//                       fontSize: "1rem",
//                       backgroundColor: "#FFD700",
//                       color: "#282C35",
//                       borderRadius: "10px",
//                       fontWeight: "bold",
//                       "&:hover": {
//                         backgroundColor: "#E6C200"
//                       },
//                       "&:disabled": {
//                         backgroundColor: "rgba(255, 215, 0, 0.5)"
//                       }
//                     }}
//                   >
//                     {isSubmitting ? (
//                       <CircularProgress size={24} sx={{ color: "#282C35" }} />
//                     ) : (
//                       "Send Message"
//                     )}
//                   </Button>
//                 </form>
//               </Paper>
//             </Box>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Contact;



//! new
// contact/Contact.js
import {
  Check as CheckIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  Mail as MailIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Pagination,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createContact,
  deleteContact,
  fetchContact,
  fetchContacts,
  markAsRead,
  resetSuccess,
  setFilters,
  updateContact,
} from './contactSlice';

const Contact = () => {
  const dispatch = useDispatch();
  const {
    contacts,
    loading,
    error,
    success,
    currentContact,
    pagination,
    filters,
  } = useSelector((state) => state.contact);

  // 📝 Form state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    message: '',
  });

  // 🎯 UI state
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // 🚀 Fetch contacts on mount and when filters change
  useEffect(() => {
    dispatch(fetchContacts({
      page: pagination.page,
      isRead: filters.isRead,
      search: filters.search,
    }));
  }, [dispatch, pagination.page, filters]);

  // 🎉 Reset success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  // ✍️ Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 📤 Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createContact(formData)).then(() => {
      setFormData({
        full_name: '',
        email: '',
        message: '',
      });
    });
  };

  // 🔄 Handle page change
  const handlePageChange = (event, value) => {
    dispatch(fetchContacts({
      page: value,
      isRead: filters.isRead,
      search: filters.search,
    }));
  };

  // 🔍 Handle search
  const handleSearch = () => {
    dispatch(setFilters({ search: searchInput }));
    setSearchInput('');
  };

  // 🏷️ Toggle read status filter
  const toggleReadFilter = (value) => {
    dispatch(setFilters({ isRead: value === filters.isRead ? null : value }));
  };

  // 🗑️ Confirm and delete contact
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(id));
    }
  };

  // ✏️ Open edit dialog
  const handleEdit = (contact) => {
    setFormData({
      full_name: contact.full_name,
      email: contact.email,
      message: contact.message,
    });
    setEditMode(true);
    setOpenDialog(true);
  };

  // 💾 Save edited contact
  const handleSaveEdit = () => {
    dispatch(updateContact({
      id: currentContact.id,
      contactData: formData,
    }));
    setOpenDialog(false);
    setEditMode(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* 🎊 Success notification */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => dispatch(resetSuccess())}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {editMode ? 'Contact updated successfully!' : 'Contact submitted successfully!'}
        </Alert>
      </Snackbar>

      {/* ❌ Error notification */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeof error === 'string' ? error : 'An error occurred'}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* 📝 Contact Form Column */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              Contact Us
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <MailIcon />}
              >
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* 📜 Contact List Column */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5" sx={{ color: 'primary.main' }}>
                Messages
              </Typography>
              
              {/* 🔍 Search and Filter */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
                <IconButton onClick={() => setShowFilters(!showFilters)}>
                  <FilterListIcon />
                </IconButton>
              </Box>
            </Box>

            {/* 🏷️ Filter chips */}
            {showFilters && (
              <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                <Chip
                  label="All"
                  onClick={() => dispatch(setFilters({ isRead: null }))}
                  color={filters.isRead === null ? 'primary' : 'default'}
                />
                <Chip
                  label="Read"
                  onClick={() => toggleReadFilter(true)}
                  color={filters.isRead === true ? 'primary' : 'default'}
                  icon={<CheckIcon />}
                />
                <Chip
                  label="Unread"
                  onClick={() => toggleReadFilter(false)}
                  color={filters.isRead === false ? 'primary' : 'default'}
                />
              </Box>
            )}

            <Divider sx={{ mb: 2 }} />

            {/* 📋 Contact List */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : contacts.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                No messages found
              </Typography>
            ) : (
              <>
                <List>
                  {contacts.map((contact) => (
                    <ListItem
                      key={contact.id}
                      button
                      onClick={() => dispatch(fetchContact(contact.id))}
                      sx={{
                        bgcolor: contact.is_read ? 'background.paper' : 'action.hover',
                        mb: 1,
                        borderRadius: 1,
                      }}
                    >
                      <Checkbox
                        checked={contact.is_read}
                        onChange={() => dispatch(markAsRead(contact.id))}
                        onClick={(e) => e.stopPropagation()}
                        color="primary"
                      />
                      <ListItemText
                        primary={contact.full_name}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ display: 'block' }}
                            >
                              {contact.email}
                            </Typography>
                            {contact.message.substring(0, 50)}...
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(contact);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>

                {/* 🔢 Pagination */}
                {pagination.totalCount > pagination.pageSize && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Pagination
                      count={Math.ceil(pagination.totalCount / pagination.pageSize)}
                      page={pagination.page}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* ✏️ Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveEdit}
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Contact;












































