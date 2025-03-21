import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearContactState, submitContactForm } from "../../features/contact/contactSlice";
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = "Le nom complet est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide";
    if (!formData.message.trim()) newErrors.message = "Le message ne peut pas être vide";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent dispatch if validation fails
    dispatch(submitContactForm(formData));
  };

  // Reset form and handle success/error messages
  useEffect(() => {
    console.log("useEffect triggered", { successMessage, error }); // Debug log
    if (successMessage) {
      console.log("Resetting form fields");
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
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, backgroundColor: "#1F1346" }}>
        <StarsCanvas />
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 10, textAlign: "center", position: "relative", zIndex: 2 }}>
        <Typography variant="subtitle1" sx={{ color: "#FFD700", fontWeight: "700", fontSize: "1.8rem", letterSpacing: "2px" }} mt={8}>
          CONTACT
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "3rem", color: "#FFF", fontWeight: "bold", mt: 2 }}>
          Entrons en Contact
        </Typography>

        <Box sx={{ mt: 6, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center", gap: 6 }}>
          {/* EarthCanvas Section */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", width: "100%" }}>
            <Box sx={{ width: { xs: "80%", sm: "60%", md: "400px" }, height: { xs: "250px", sm: "350px", md: "450px" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <EarthCanvas />
            </Box>
          </Box>

          {/* Contact Form Section */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <div style={{ width: "100%", padding: "2px", borderRadius: 20, background: "linear-gradient(135deg, #2F1C6A, #1F1346)" }}>
              <Paper elevation={4} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, background: "rgba(47, 28, 106, 0.85)", textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "#FFD700", fontWeight: "bold", fontSize: "1.5rem" }} gutterBottom>
                  Restons Connectés
                </Typography>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}>
                  <TextField
                    label="Votre Nom Complet"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    error={!!errors.full_name}
                    helperText={errors.full_name}
                    fullWidth
                    variant="outlined"
                    sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px" } }}
                  />
                  <TextField
                    label="Votre Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    variant="outlined"
                    type="email"
                    sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px" } }}
                  />
                  <TextField
                    label="Votre Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                    sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px" } }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ mt: 2, py: 1.5, fontSize: "1rem", backgroundColor: "#FFD700", color: "#282C35", borderRadius: "10px", fontWeight: "bold" }}
                  >
                    {isLoading ? <CircularProgress size={24} sx={{ color: "#282C35" }} /> : "Envoyer le Message"}
                  </Button>
                </form>
              </Paper>
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;

//! with english
// import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearContactState, submitContactForm } from "../../features/contact/contactSlice";
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

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Validate form before submission
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
//     if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return; // Prevent dispatch if validation fails
//     dispatch(submitContactForm(formData));
//   };

//   // Reset form and handle success/error messages
//   useEffect(() => {
//     console.log("useEffect triggered", { successMessage, error }); // Debug log
//     if (successMessage) {
//       console.log("Resetting form fields");
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
//           Get in Touch
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
//                   Let's Connect
//                 </Typography>

//                 {/* Contact Form */}
//                 <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}>
//                   <TextField
//                     label="Your Full Name"
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
//                     label="Your Email"
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
//                     label="Your Message"
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
//                     {isLoading ? <CircularProgress size={24} sx={{ color: "#282C35" }} /> : "Send Message"}
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











































