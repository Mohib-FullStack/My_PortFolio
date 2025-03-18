//! test1
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      dispatch(showSnackbar({ message: "Please fill out all required fields", severity: "warning" }));
      return;
    }
    dispatch(submitContactForm(formData));
  };

  useEffect(() => {
    if (successMessage) {
      dispatch(showSnackbar({ message: successMessage, severity: "success" }));
      setFormData({ full_name: "", email: "", message: "" });
    }
    if (error) {
      dispatch(showSnackbar({ message: error, severity: "error" }));
    }
    dispatch(clearContactState());
  }, [successMessage, error, dispatch]);

  return (
    <Box sx={{ position: "relative", backgroundColor: "#1F1346", minHeight: "100vh", paddingTop: "80px" }}>
      <StarsCanvas />
      <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <Typography variant="subtitle1" sx={{ color: "#FFD700", fontWeight: "700", fontSize: "1.8rem", letterSpacing: "2px" }}>
          CONTACT
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "3rem", color: "#FFF", fontWeight: "bold", mt: 2 }}>
          Get in Touch
        </Typography>

        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, background: "rgba(47, 28, 106, 0.85)" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TextField
                label="Your Full Name"
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
                label="Your Email"
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
                label="Your Message"
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
                {isLoading ? <CircularProgress size={24} /> : "Send Message"}
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
      <EarthCanvas />
    </Box>
  );
};

export default Contact;

//! test2






//! with validation
// import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
// import React, { useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { submitContactForm } from "../../features/contact/contactSlice";
// import { showSnackbar } from "../../features/snackbar/snackbarSlice";
// import EarthCanvas from "../canvas/Earth";
// import StarsCanvas from "../canvas/Stars";

// const Contact = () => {
//   const formRef = useRef();
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({ fullName: "", email: "", message: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // ✅ Validate form before sending request
//   const validateForm = () => {
//     let newErrors = {};
//     if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
//     if (!form.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
//     if (!form.message.trim()) newErrors.message = "Message cannot be empty";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       dispatch(showSnackbar({ message: "Please fill out all required fields", severity: "warning" }));
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await dispatch(submitContactForm({ 
//         fullName: form.fullName, 
//         email: form.email, 
//         message: form.message 
//       })).unwrap();

//       if (response.success) {
//         dispatch(showSnackbar({ message: "Message sent successfully!", severity: "success" }));
//         setForm({ fullName: "", email: "", message: "" });
//         setErrors({});
//       } else {
//         console.error("Backend Error:", response.error);
//         dispatch(showSnackbar({ message: response.error?.message || "Failed to send message", severity: "error" }));
//       }
//     } catch (error) {
//       console.error("Submission Error:", error);
//       dispatch(showSnackbar({ message: "Something went wrong. Please try again.", severity: "error" }));
//     }

//     setLoading(false);
//   };

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
//                 <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}>
//                   <TextField
//                     label="Your Full Name"
//                     name="fullName"
//                     value={form.fullName}
//                     onChange={handleChange}
//                     error={!!errors.fullName}
//                     helperText={errors.fullName}
//                     fullWidth
//                     variant="outlined"
//                     sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px" } }}
//                   />
//                   <TextField
//                     label="Your Email"
//                     name="email"
//                     value={form.email}
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
//                     value={form.message}
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
//                     disabled={loading} 
//                     sx={{ mt: 2, py: 1.5, fontSize: "1rem", backgroundColor: "#FFD700", color: "#282C35", borderRadius: "10px", fontWeight: "bold" }}
//                   >
//                     {loading ? "Sending..." : "Send Message"}
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




















//! first
// import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
// import React, { useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { submitContactForm } from "../../features/contact/contactSlice";
// import { showSnackbar } from "../../features/snackbar/snackbarSlice";
// import EarthCanvas from "../canvas/Earth";
// import StarsCanvas from "../canvas/Stars";

// const Contact = () => {
//   const formRef = useRef();
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({ fullName: "", email: "", message: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await dispatch(submitContactForm(form)).unwrap();

//       if (response.success) {
//         dispatch(showSnackbar({ message: "Message sent successfully!", severity: "success" }));
//         setForm({ fullName: "", email: "", message: "" });
//       } else {
//         dispatch(showSnackbar({ message: "Failed to send message. Please try again.", severity: "error" }));
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       dispatch(showSnackbar({ message: "Something went wrong. Please try again.", severity: "error" }));
//     }

//     setLoading(false);
//   };

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
//                 <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}>
//                   <TextField
//                     label="Your Full Name"
//                     name="fullName"
//                     value={form.fullName}
//                     onChange={handleChange}
//                     fullWidth
//                     variant="outlined"
//                     sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px", "&:hover fieldset": { borderColor: "#FFD700" }, "&.Mui-focused fieldset": { borderColor: "#FFD700" } } }}
//                   />
//                   <TextField
//                     label="Your Email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     fullWidth
//                     variant="outlined"
//                     type="email"
//                     sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px", "&:hover fieldset": { borderColor: "#FFD700" }, "&.Mui-focused fieldset": { borderColor: "#FFD700" } } }}
//                   />
//                   <TextField
//                     label="Your Message"
//                     name="message"
//                     value={form.message}
//                     onChange={handleChange}
//                     fullWidth
//                     multiline
//                     rows={5}
//                     variant="outlined"
//                     sx={{ "& .MuiOutlinedInput-root": { background: "#FFF", borderRadius: "10px", "&:hover fieldset": { borderColor: "#FFD700" }, "&.Mui-focused fieldset": { borderColor: "#FFD700" } } }}
//                   />
//                   <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2, py: 1.5, fontSize: "1rem", backgroundColor: "#FFD700", color: "#282C35", borderRadius: "10px", fontWeight: "bold", "&:hover": { backgroundColor: "#FFF", color: "#282C35" } }}>
//                     {loading ? "Sending..." : "Send Message"}
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









































