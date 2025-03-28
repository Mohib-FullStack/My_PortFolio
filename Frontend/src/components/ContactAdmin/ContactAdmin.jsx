import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    MarkEmailRead as MarkReadIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
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
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteContact,
    fetchContacts,
    markAsRead,
    resetContactState,
    updateContact
} from '../../features/contact/contactSlice';

const ContactAdmin = () => {
  const dispatch = useDispatch();
  const {
    contacts,
    currentContact,
    loading,
    error,
    success,
    pagination
  } = useSelector(state => state.contact);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRead, setShowRead] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  // Fetch contacts on mount and when filters change
  useEffect(() => {
    dispatch(fetchContacts({
      page: page + 1,
      pageSize: rowsPerPage,
      search: searchTerm,
      isRead: showRead
    }));
  }, [dispatch, page, rowsPerPage, searchTerm, showRead]);

  // Reset messages after showing them
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        dispatch(resetContactState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, dispatch]);

  const handleEditOpen = (contact) => {
    setEditData(contact);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSubmit = () => {
    dispatch(updateContact({
      id: editData.id,
      formData: editData
    }));
    handleEditClose();
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(deleteId));
    setDeleteId(null);
  };

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Contact Messages
      </Typography>
      
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <Typography sx={{ mr: 2 }}>Filter by read status:</Typography>
              <Button
                variant={showRead === null ? 'contained' : 'outlined'}
                onClick={() => setShowRead(null)}
                sx={{ mr: 1 }}
              >
                All
              </Button>
              <Button
                variant={showRead === true ? 'contained' : 'outlined'}
                onClick={() => setShowRead(true)}
                sx={{ mr: 1 }}
              >
                Read
              </Button>
              <Button
                variant={showRead === false ? 'contained' : 'outlined'}
                onClick={() => setShowRead(false)}
              >
                Unread
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Status Messages */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {success}
        </Typography>
      )}

      {/* Contacts Table */}
      <Card>
        <CardContent>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Read</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.full_name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>
                          <Typography noWrap sx={{ maxWidth: 200 }}>
                            {contact.message}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {new Date(contact.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={contact.is_read}
                            onChange={() => handleMarkAsRead(contact.id)}
                            icon={<MarkReadIcon />}
                            checkedIcon={<MarkReadIcon color="primary" />}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleEditOpen(contact)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(contact.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pagination.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Full Name"
            value={editData.full_name || ''}
            onChange={(e) => setEditData({...editData, full_name: e.target.value})}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            value={editData.email || ''}
            onChange={(e) => setEditData({...editData, email: e.target.value})}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            label="Message"
            value={editData.message || ''}
            onChange={(e) => setEditData({...editData, message: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this contact message?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactAdmin;