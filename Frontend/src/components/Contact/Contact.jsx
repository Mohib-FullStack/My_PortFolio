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
import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosInstance";
import { createContact, resetContactState } from "../../features/contact/contactSlice";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";
import EarthCanvas from "../canvas/Earth";
import StarsCanvas from "../canvas/Stars";

const Contact = () => {
  const dispatch = useDispatch();
  const { isLoading, successMessage, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [csrfToken, setCsrfToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch CSRF token when component mounts
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await axiosInstance.get('/csrf-token/');
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        dispatch(showSnackbar({
          message: "Failed to initialize form. Please refresh.",
          severity: "error"
        }));
      }
    };
    fetchCSRFToken();
  }, [dispatch]);

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await dispatch(createContact({
        data: formData,
        config: {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
          }
        }
      })).unwrap();

      if (result.success) {
        dispatch(showSnackbar({
          message: result.message || "Message sent successfully!",
          severity: "success"
        }));
        setFormData({ full_name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      let errorMessage = "Failed to send message";
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        errorMessage = "Please correct the form errors";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      dispatch(showSnackbar({
        message: errorMessage,
        severity: "error"
      }));
    } finally {
      setIsSubmitting(false);
      setTimeout(() => dispatch(resetContactState()), 3000);
    }
  };

  // Handle success/error messages
  useEffect(() => {
    if (successMessage) {
      dispatch(showSnackbar({
        message: successMessage,
        severity: "success"
      }));
    }

    if (error && !error.response?.data?.errors) {
      dispatch(showSnackbar({
        message: typeof error === 'string' ? error : "An error occurred",
        severity: "error"
      }));
    }
  }, [successMessage, error, dispatch]);

  return (
    <Box sx={{ 
      position: "relative", 
      minHeight: "100vh",
      backgroundColor: "#1F1346",
      overflow: "hidden"
    }}>
      {/* Background Stars */}
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}>
        <StarsCanvas />
      </Box>

      <Container maxWidth="lg" sx={{
        pt: 8,
        pb: 10,
        position: "relative",
        zIndex: 1
      }}>
        <Typography variant="subtitle1" sx={{
          color: "#FFD700",
          fontWeight: "700",
          fontSize: "1.8rem",
          letterSpacing: "2px"
        }} mt={8}>
          CONTACT
        </Typography>
        
        <Typography variant="h3" sx={{
          fontSize: "3rem",
          color: "#FFF",
          fontWeight: "bold",
          mt: 2
        }}>
          Get In Touch
        </Typography>

        <Box sx={{
          mt: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 6
        }}>
          {/* EarthCanvas Section */}
          <Box sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}>
            <EarthCanvas />
          </Box>

          {/* Contact Form Section */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box sx={{
              width: "100%",
              p: "2px",
              borderRadius: 4,
              background: "linear-gradient(135deg, #2F1C6A, #1F1346)"
            }}>
              <Paper elevation={4} sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 2,
                background: "rgba(47, 28, 106, 0.85)",
                textAlign: "center"
              }}>
                <Typography variant="h6" sx={{
                  color: "#FFD700",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  mb: 2
                }}>
                  Let's Connect
                </Typography>

                <form onSubmit={handleSubmit} style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  marginTop: "28px"
                }}>
                  <TextField
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    error={!!errors.full_name}
                    helperText={errors.full_name}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "#FFF",
                        borderRadius: "10px"
                      }
                    }}
                  />
                  
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    variant="outlined"
                    type="email"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "#FFF",
                        borderRadius: "10px"
                      }
                    }}
                  />
                  
                  <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "#FFF",
                        borderRadius: "10px"
                      }
                    }}
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontSize: "1rem",
                      backgroundColor: "#FFD700",
                      color: "#282C35",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#E6C200"
                      },
                      "&:disabled": {
                        backgroundColor: "rgba(255, 215, 0, 0.5)"
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} sx={{ color: "#282C35" }} />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
















































