import {
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearContactState, deleteContact, fetchContacts, updateContact } from '../../features/contact/contactSlice';
import { showSnackbar } from '../../features/snackbar/snackbarSlice';

const ContactTable = () => {
  const dispatch = useDispatch();
  const { contacts, isLoading, error, successMessage } = useSelector((state) => state.contact);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editedContact, setEditedContact] = useState({
    full_name: '',
    email: '',
    message: '',
  });

  // Color palette
  const colors = {
    primary: '#6a5acd',        // Slate blue - main color
    secondary: '#9370db',      // Medium purple
    accent: '#ff7f50',         // Coral - for actions
    background: '#1a1a2e',     // Dark blue background
    cardBg: '#16213e',         // Darker blue for cards
    text: '#e6e6e6',           // Light grey text
    error: '#ff6b6b',          // Soft red
    success: '#4caf50',        // Green
    highlight: 'rgba(106, 90, 205, 0.2)'  // Semi-transparent primary
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      dispatch(showSnackbar({
        message: typeof successMessage === 'string' ? successMessage : "Operation completed successfully",
        severity: 'success'
      }));
      setTimeout(() => {
        dispatch(clearContactState());
      }, 3000);
    }
    if (error) {
      dispatch(showSnackbar({
        message: typeof error === 'string' ? error : "An error occurred",
        severity: 'error'
      }));
      setTimeout(() => {
        dispatch(clearContactState());
      }, 3000);
    }
  }, [successMessage, error, dispatch]);

  const filteredContacts = contacts?.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.full_name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.message.toLowerCase().includes(searchLower) ||
      new Date(contact.created_at).toLocaleString().includes(searchLower)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setEditedContact({
      full_name: contact.full_name,
      email: contact.email,
      message: contact.message,
    });
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await dispatch(updateContact({
        id: selectedContact.id,
        ...editedContact
      }));
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteClick = (contact) => {
    setSelectedContact(contact);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteContact(selectedContact.id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: colors.background,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        mt:10
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: `0px 0px 10px ${colors.highlight}`,
          flexShrink: 0
        }}>
          Contact Messages
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          flexGrow: 1,
          maxWidth: '500px',
          position: 'relative'
        }}>
          <TextField
            fullWidth
            variant="outlined"
            size="medium"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ 
                  color: colors.primary, 
                  mr: 1,
                  fontSize: '1.5rem'
                }} />
              ),
              sx: {
                borderRadius: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: colors.highlight,
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.primary,
                  boxShadow: `0 0 0 2px ${colors.highlight}`
                },
                transition: 'all 0.3s ease',
                paddingLeft: '16px',
                height: '50px'
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& input': {
                  padding: '12px 14px',
                  color: colors.text,
                  '&::placeholder': {
                    color: 'rgba(230, 230, 230, 0.7)',
                    opacity: 1
                  }
                }
              }
            }}
          />
          {searchTerm && (
            <IconButton
              onClick={() => setSearchTerm('')}
              sx={{
                position: 'absolute',
                right: '8px',
                color: colors.primary,
                '&:hover': {
                  backgroundColor: colors.highlight
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ 
          borderRadius: '12px', 
          overflow: 'hidden',
          border: `1px solid ${colors.highlight}`,
          background: colors.cardBg,
          backdropFilter: 'blur(10px)'
        }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ 
                background: `linear-gradient(135deg, ${colors.highlight}, rgba(25, 25, 60, 0.3))`
              }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary }}>Message</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <CircularProgress color="secondary" />
                    </TableCell>
                  </TableRow>
                ) : filteredContacts?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="textSecondary">
                        {searchTerm ? 'No matching contacts found' : 'No contacts available'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((contact) => (
                      <TableRow
                        key={contact.id}
                        hover
                        sx={{
                          '&:nth-of-type(odd)': {
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          },
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ 
                              bgcolor: colors.highlight, 
                              mr: 2,
                              width: 32,
                              height: 32
                            }}>
                              <PersonIcon sx={{ color: colors.primary, fontSize: '1rem' }} />
                            </Avatar>
                            <Typography color={colors.text}>
                              {contact.full_name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon sx={{ 
                              color: colors.secondary, 
                              mr: 1,
                              fontSize: '1rem'
                            }} />
                            <Typography color={colors.text}>
                              {contact.email}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color={colors.text} sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                            {contact.message}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ScheduleIcon sx={{ 
                              color: colors.secondary, 
                              mr: 1,
                              fontSize: '1rem'
                            }} />
                            <Typography color={colors.text}>
                              {formatDate(contact.created_at)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => handleEditClick(contact)}
                                sx={{
                                  color: colors.secondary,
                                  '&:hover': {
                                    backgroundColor: colors.highlight,
                                  },
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteClick(contact)}
                                sx={{
                                  color: colors.error,
                                  '&:hover': {
                                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                  },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredContacts?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: `1px solid ${colors.highlight}`,
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                color: colors.text,
              },
              '& .MuiSvgIcon-root': {
                color: colors.text,
              },
              '& .MuiSelect-select': {
                color: colors.text,
              }
            }}
          />
        </Paper>
      </motion.div>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: colors.cardBg,
            color: colors.text
          }
        }}
      >
        <DialogTitle sx={{ 
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          color: 'white',
          fontWeight: 'bold'
        }}>
          Edit Contact
        </DialogTitle>
        <DialogContent sx={{ pt: 3, minWidth: '400px' }}>
          <TextField
            fullWidth
            label="Full Name"
            name="full_name"
            value={editedContact.full_name}
            onChange={handleEditChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: colors.text } }}
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: colors.primary, mr: 1 }} />,
              style: { color: colors.text }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.highlight,
                },
                '&:hover fieldset': {
                  borderColor: colors.primary,
                },
              }
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={editedContact.email}
            onChange={handleEditChange}
            margin="normal"
            variant="outlined"
            type="email"
            InputLabelProps={{ style: { color: colors.text } }}
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: colors.primary, mr: 1 }} />,
              style: { color: colors.text }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.highlight,
                },
                '&:hover fieldset': {
                  borderColor: colors.primary,
                },
              }
            }}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={editedContact.message}
            onChange={handleEditChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            InputLabelProps={{ style: { color: colors.text } }}
            InputProps={{
              style: { color: colors.text }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.highlight,
                },
                '&:hover fieldset': {
                  borderColor: colors.primary,
                },
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditDialogOpen(false)}
            startIcon={<CloseIcon />}
            sx={{ color: colors.error }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            startIcon={<CheckIcon />}
            sx={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: 'white',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: colors.cardBg,
            color: colors.text
          }
        }}
      >
        <DialogTitle sx={{ 
          background: `linear-gradient(135deg, ${colors.error}, #d63031)`,
          color: 'white',
          fontWeight: 'bold'
        }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography color={colors.text}>
            Are you sure you want to delete this contact from {selectedContact?.email}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            startIcon={<CloseIcon />}
            sx={{ color: colors.secondary }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            startIcon={<DeleteIcon />}
            sx={{
              background: `linear-gradient(135deg, ${colors.error}, #d63031)`,
              color: 'white',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactTable;



//! update


// import {
//   Check as CheckIcon,
//   Close as CloseIcon,
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Email as EmailIcon,
//   Person as PersonIcon,
//   Schedule as ScheduleIcon,
//   Search as SearchIcon
// } from '@mui/icons-material';
// import {
//   Avatar,
//   Box,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TextField,
//   Tooltip,
//   Typography
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearContactState, deleteContact, fetchContacts, updateContact } from '../../features/contact/contactSlice';
// import { showSnackbar } from '../../features/snackbar/snackbarSlice';

// const ContactTable = () => {
//   const dispatch = useDispatch();
//   const { contacts, isLoading, error, successMessage } = useSelector((state) => state.contact);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [editedContact, setEditedContact] = useState({
//     full_name: '',
//     email: '',
//     message: '',
//   });

//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   useEffect(() => {
//     if (successMessage) {
//       dispatch(showSnackbar({
//         message: typeof successMessage === 'string' ? successMessage : "Operation completed successfully",
//         severity: 'success'
//       }));
//       setTimeout(() => {
//         dispatch(clearContactState());
//       }, 3000);
//     }
//     if (error) {
//       dispatch(showSnackbar({
//         message: typeof error === 'string' ? error : "An error occurred",
//         severity: 'error'
//       }));
//       setTimeout(() => {
//         dispatch(clearContactState());
//       }, 3000);
//     }
//   }, [successMessage, error, dispatch]);

//   const filteredContacts = contacts?.filter((contact) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       contact.full_name.toLowerCase().includes(searchLower) ||
//       contact.email.toLowerCase().includes(searchLower) ||
//       contact.message.toLowerCase().includes(searchLower) ||
//       new Date(contact.created_at).toLocaleString().includes(searchLower)
//     );
//   });

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleEditClick = (contact) => {
//     setSelectedContact(contact);
//     setEditedContact({
//       full_name: contact.full_name,
//       email: contact.email,
//       message: contact.message,
//     });
//     setEditDialogOpen(true);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedContact((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSubmit = async () => {
//     try {
//       await dispatch(updateContact({
//         id: selectedContact.id,
//         ...editedContact
//       }));
//       setEditDialogOpen(false);
//     } catch (error) {
//       console.error('Update failed:', error);
//     }
//   };

//   const handleDeleteClick = (contact) => {
//     setSelectedContact(contact);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await dispatch(deleteContact(selectedContact.id));
//       setDeleteDialogOpen(false);
//     } catch (error) {
//       console.error('Delete failed:', error);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//     {/* Header */}
// <Box sx={{ 
// mb: 4, 
// display: 'flex', 
// justifyContent: 'space-between', 
// alignItems: 'center',
// gap: 2
// }}>
// <Typography variant="h4" sx={{ 
//   fontWeight: 'bold',
//   background: 'linear-gradient(135deg, #915EFF, #2F1C6A)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   textShadow: '0px 0px 10px rgba(145, 94, 255, 0.3)',
//   flexShrink: 0,
//   mt:10
// }}>
//   Contact Messages
// </Typography>



// <Box sx={{ 
// display: 'flex', 
// alignItems: 'center',
// flexGrow: 1,
// maxWidth: '500px',
// position: 'relative',
// mt: 10
// }}>
// <TextField
//   fullWidth
//   variant="outlined"
//   size="medium"
//   placeholder="Search contacts by name, email, or message..."
//   value={searchTerm}
//   onChange={(e) => setSearchTerm(e.target.value)}
//   InputProps={{
//     startAdornment: (
//       <SearchIcon sx={{ 
//         color: '#915EFF', 
//         mr: 1,
//         fontSize: '1.5rem'
//       }} />
//     ),
//     sx: {
//       borderRadius: '50px',
//       backgroundColor: 'rgba(31, 19, 70, 0.7)', // Darker background for contrast
//       '& fieldset': {
//         borderColor: 'transparent',
//       },
//       '&:hover fieldset': {
//         borderColor: 'rgba(145, 94, 255, 0.3)',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: '#915EFF',
//         boxShadow: '0 0 0 2px rgba(145, 94, 255, 0.2)'
//       },
//       transition: 'all 0.3s ease',
//       paddingLeft: '16px',
//       height: '50px'
//     },
//   }}
//   sx={{
//     '& .MuiOutlinedInput-root': {
//       '& input': {
//         padding: '12px 14px',
//         color: 'white', // Ensures text is white
//         '&::placeholder': {
//           color: 'rgba(255, 255, 255, 0.7)',
//           opacity: 1
//         }
//       },
//       '&.Mui-focused': {
//         '& input': {
//           color: 'white' // Ensures text stays white when focused
//         }
//       }
//     }
//   }}
// />
// {searchTerm && (
//   <IconButton
//     onClick={() => setSearchTerm('')}
//     sx={{
//       position: 'absolute',
//       right: '8px',
//       color: '#915EFF',
//       '&:hover': {
//         backgroundColor: 'rgba(145, 94, 255, 0.1)'
//       }
//     }}
//   >
//     <CloseIcon fontSize="small" />
//   </IconButton>
// )}
// </Box>
// </Box>

//     {/* Table */}
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Paper elevation={3} sx={{ 
//         borderRadius: '12px', 
//         overflow: 'hidden',
//         border: '1px solid rgba(145, 94, 255, 0.2)',
//         background: 'rgba(31, 19, 70, 0.2)',
//         backdropFilter: 'blur(10px)'
//       }}>
//         <TableContainer>
//           <Table>
//             <TableHead sx={{ background: 'linear-gradient(135deg, rgba(145, 94, 255, 0.2), rgba(47, 28, 106, 0.2))' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#915EFF' }}>Name</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#915EFF' }}>Email</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#915EFF' }}>Message</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#915EFF' }}>Date</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#915EFF' }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     <CircularProgress color="secondary" />
//                   </TableCell>
//                 </TableRow>
//               ) : filteredContacts?.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                     <Typography variant="body1" color="textSecondary">
//                       {searchTerm ? 'No matching contacts found' : 'No contacts available'}
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredContacts
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((contact) => (
//                     <TableRow
//                       key={contact.id}
//                       hover
//                       sx={{
//                         '&:nth-of-type(odd)': {
//                           backgroundColor: 'rgba(145, 94, 255, 0.03)',
//                         },
//                         '&:hover': {
//                           backgroundColor: 'rgba(145, 94, 255, 0.05)',
//                         },
//                       }}
//                     >
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Avatar sx={{ 
//                             bgcolor: 'rgba(145, 94, 255, 0.2)', 
//                             mr: 2,
//                             width: 32,
//                             height: 32
//                           }}>
//                             <PersonIcon sx={{ color: '#915EFF', fontSize: '1rem' }} />
//                           </Avatar>
//                           {contact.full_name}
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <EmailIcon sx={{ 
//                             color: '#915EFF', 
//                             mr: 1,
//                             fontSize: '1rem'
//                           }} />
//                           {contact.email}
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="body2" sx={{
//                           display: '-webkit-box',
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: 'vertical',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                         }}>
//                           {contact.message}
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <ScheduleIcon sx={{ 
//                             color: '#915EFF', 
//                             mr: 1,
//                             fontSize: '1rem'
//                           }} />
//                           {formatDate(contact.created_at)}
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Tooltip title="Edit">
//                             <IconButton
//                               size="small"
//                               onClick={() => handleEditClick(contact)}
//                               sx={{
//                                 color: '#915EFF',
//                                 '&:hover': {
//                                   backgroundColor: 'rgba(145, 94, 255, 0.1)',
//                                 },
//                               }}
//                             >
//                               <EditIcon fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete">
//                             <IconButton
//                               size="small"
//                               onClick={() => handleDeleteClick(contact)}
//                               sx={{
//                                 color: '#ff6b6b',
//                                 '&:hover': {
//                                   backgroundColor: 'rgba(255, 107, 107, 0.1)',
//                                 },
//                               }}
//                             >
//                               <DeleteIcon fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredContacts?.length || 0}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{
//             borderTop: '1px solid rgba(145, 94, 255, 0.1)',
//             '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//               color: '#915EFF',
//             },
//           }}
//         />
//       </Paper>
//     </motion.div>

//     {/* Edit Dialog */}
//     <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
//       <DialogTitle sx={{ 
//         background: 'linear-gradient(135deg, #915EFF, #2F1C6A)',
//         color: 'white',
//         fontWeight: 'bold'
//       }}>
//         Edit Contact
//       </DialogTitle>
//       <DialogContent sx={{ pt: 3, minWidth: '400px' }}>
//         <TextField
//           fullWidth
//           label="Full Name"
//           name="full_name"
//           value={editedContact.full_name}
//           onChange={handleEditChange}
//           margin="normal"
//           variant="outlined"
//           InputProps={{
//             startAdornment: <PersonIcon sx={{ color: '#915EFF', mr: 1 }} />,
//           }}
//         />
//         <TextField
//           fullWidth
//           label="Email"
//           name="email"
//           value={editedContact.email}
//           onChange={handleEditChange}
//           margin="normal"
//           variant="outlined"
//           type="email"
//           InputProps={{
//             startAdornment: <EmailIcon sx={{ color: '#915EFF', mr: 1 }} />,
//           }}
//         />
//         <TextField
//           fullWidth
//           label="Message"
//           name="message"
//           value={editedContact.message}
//           onChange={handleEditChange}
//           margin="normal"
//           variant="outlined"
//           multiline
//           rows={4}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={() => setEditDialogOpen(false)}
//           startIcon={<CloseIcon />}
//           sx={{ color: '#ff6b6b' }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleEditSubmit}
//           startIcon={<CheckIcon />}
//           sx={{
//             background: 'linear-gradient(135deg, #915EFF, #2F1C6A)',
//             color: 'white',
//             '&:hover': {
//               opacity: 0.9,
//             },
//           }}
//         >
//           Save Changes
//         </Button>
//       </DialogActions>
//     </Dialog>

//     {/* Delete Dialog */}
//     <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//       <DialogTitle sx={{ 
//         background: 'linear-gradient(135deg, #ff6b6b, #d63031)',
//         color: 'white',
//         fontWeight: 'bold'
//       }}>
//         Confirm Delete
//       </DialogTitle>
//       <DialogContent sx={{ pt: 3 }}>
//         <Typography>
//           Are you sure you want to delete this contact from {selectedContact?.email}?
//         </Typography>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={() => setDeleteDialogOpen(false)}
//           startIcon={<CloseIcon />}
//           sx={{ color: '#915EFF' }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleDeleteConfirm}
//           startIcon={<DeleteIcon />}
//           sx={{
//             background: 'linear-gradient(135deg, #ff6b6b, #d63031)',
//             color: 'white',
//             '&:hover': {
//               opacity: 0.9,
//             },
//           }}
//         >
//           Delete
//         </Button>
//       </DialogActions>
//     </Dialog>
//   </Box>
//   );
// };

// export default ContactTable;







