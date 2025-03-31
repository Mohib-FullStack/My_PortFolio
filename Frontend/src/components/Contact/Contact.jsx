// import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axiosInstance from "../../axiosInstance";
// import { clearContactState, createContact, } from "../../features/contact/contactSlice";
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
//         dispatch(clearContactState());
//       }, 2000);
//     }
//     if (error) {
//       dispatch(showSnackbar({ message: error, severity: "error" }));
//       setTimeout(() => {
//         dispatch(clearContactState());
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
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosInstance";
import { clearContactState, createContact } from "../../features/contact/contactSlice";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";
import theme from "../../theme";
import EarthCanvas from "../canvas/Earth";
import StarsCanvas from "../canvas/Stars";
// import theme from "../theme";

const Contact = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, successMessage, error } = useSelector((state) => state.contact);
  const currentLanguage = useSelector((state) => state.language.language);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch CSRF token when component mounts
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        await axiosInstance.get('/csrf-token/');
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCSRFToken();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = t("contact.errors.name");
    if (!formData.email.trim()) newErrors.email = t("contact.errors.email_required");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("contact.errors.email_invalid");
    if (!formData.message.trim()) newErrors.message = t("contact.errors.message");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    dispatch(createContact({
      full_name: formData.full_name,
      email: formData.email,
      message: formData.message
    }));
  };

  // Reset form and handle success/error messages
  useEffect(() => {
    if (successMessage) {
      dispatch(showSnackbar({ message: successMessage, severity: "success" }));
      setFormData({ full_name: "", email: "", message: "" });
      setTimeout(() => {
        dispatch(clearContactState());
      }, 2000);
    }
    if (error) {
      dispatch(showSnackbar({ message: error, severity: "error" }));
      setTimeout(() => {
        dispatch(clearContactState());
      }, 3000);
    }
  }, [successMessage, error, dispatch]);

  return (
    <Box sx={{ position: "relative" }}>
      {/* Background Stars */}
      <Box sx={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 1, 
        background: "linear-gradient(135deg, #1F1346, #2F1C6A)"
      }}>
        <StarsCanvas />
      </Box>

      <Container maxWidth="lg" sx={{ 
        mt: 8, 
        mb: 10, 
        textAlign: "center", 
        position: "relative", 
        zIndex: 2,
        px: theme.paddingX
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="subtitle1" sx={{ 
            color: "#915EFF", 
            fontWeight: "700", 
            fontSize: "1.8rem", 
            letterSpacing: "2px",
            textShadow: "0px 0px 10px rgba(145, 94, 255, 0.5)"
          }}>
            {t("contact_page.subtitle")}
          </Typography>
          <Typography variant="h3" sx={{ 
            fontSize: { xs: "2.5rem", md: "3rem" }, 
            color: "white", 
            fontWeight: "bold", 
            mt: 2,
            textShadow: "2px 2px 10px rgba(255, 255, 255, 0.3)"
          }}>
            {t("contact_page.title")}
          </Typography>
        </motion.div>

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
            width: "100%",
            order: currentLanguage === "ar" ? 2 : 1 // RTL support for Arabic
          }}>
            <Box sx={{ 
              width: { xs: "80%", sm: "60%", md: "400px" }, 
              height: { xs: "250px", sm: "350px", md: "450px" }, 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center" 
            }}>
              <EarthCanvas />
            </Box>
          </Box>

          {/* Contact Form Section */}
          <Box sx={{ 
            flex: 1, 
            width: "100%",
            order: currentLanguage === "ar" ? 1 : 2 // RTL support for Arabic
          }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ width: "100%" }}
            >
              <Box sx={{ 
                width: "100%", 
                padding: "2px", 
                borderRadius: 4, 
                background: "linear-gradient(135deg, #915EFF, #2F1C6A)",
                boxShadow: "0px 0px 20px rgba(145, 94, 255, 0.5)"
              }}>
                <Paper elevation={4} sx={{ 
                  p: { xs: 3, sm: 4 }, 
                  borderRadius: 3, 
                  background: "rgba(31, 19, 70, 0.8)", 
                  textAlign: "center",
                  backdropFilter: "blur(10px)"
                }}>
                  <Typography variant="h6" sx={{ 
                    color: "#915EFF", 
                    fontWeight: "bold", 
                    fontSize: "1.5rem",
                    mb: 3
                  }}>
                    {t("contact_page.form_title")}
                  </Typography>

                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <TextField
                      label={t("contact_page.form.name")}
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      error={!!errors.full_name}
                      helperText={errors.full_name}
                      fullWidth
                      variant="outlined"
                      sx={{ 
                        "& .MuiOutlinedInput-root": { 
                          background: "rgba(255, 255, 255, 0.9)", 
                          borderRadius: "10px",
                          "& fieldset": {
                            borderColor: "#915EFF"
                          }
                        } 
                      }}
                    />
                    <TextField
                      label={t("contact_page.form.email")}
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
                          background: "rgba(255, 255, 255, 0.9)", 
                          borderRadius: "10px",
                          "& fieldset": {
                            borderColor: "#915EFF"
                          }
                        } 
                      }}
                    />
                    <TextField
                      label={t("contact_page.form.message")}
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
                          background: "rgba(255, 255, 255, 0.9)", 
                          borderRadius: "10px",
                          "& fieldset": {
                            borderColor: "#915EFF"
                          }
                        } 
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      sx={{ 
                        mt: 2, 
                        py: 1.5, 
                        fontSize: "1rem", 
                        backgroundColor: "#915EFF", 
                        color: "white", 
                        borderRadius: "10px", 
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#7D4AFF",
                          boxShadow: "0px 0px 15px rgba(145, 94, 255, 0.7)"
                        }
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        t("contact_page.form.submit")
                      )}
                    </Button>
                  </form>
                </Paper>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;











































