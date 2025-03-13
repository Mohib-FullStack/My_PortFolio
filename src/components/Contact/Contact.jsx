import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import EarthCanvas from "../canvas/Earth";
import StarsCanvas from "../canvas/Stars"; // Import the StarsCanvas component

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://your-api.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Background Stars Canvas */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          backgroundColor: "#1F1346",  // Dark background to make stars visible
        }}
      >
        <StarsCanvas />
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 10, textAlign: "center", position: "relative", zIndex: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#FFD700",
            fontWeight: "700",
            textTransform: "uppercase",
            fontSize: "1.8rem",
            letterSpacing: "2px",
            textShadow: "2px 2px 10px rgba(255, 215, 0, 0.8)",
          }}
          mt={8}
        >
          CONTACT
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: "3rem",
            color: "#FFF",
            fontWeight: "bold",
            mt: 2,
            letterSpacing: "1px",
            textShadow: "3px 3px 15px rgba(255, 255, 255, 0.9)",
          }}
        >
          Get in Touch
        </Typography>

        <Box
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {/* EarthCanvas Section */}
          <Box
            style={{ flex: 1, display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Box
              sx={{
                width: { xs: "80%", sm: "60%", md: "400px" },
                height: { xs: "250px", sm: "350px", md: "450px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EarthCanvas />
            </Box>
          </Box>

          {/* Contact Form Section */}
          <Box style={{ flex: 1, width: "100%" }}>
            <div
              style={{
                width: "100%",
                padding: "2px",
                borderRadius: 20,
                background: "linear-gradient(135deg, #2F1C6A, #1F1346)",
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 3,
                  background: "rgba(47, 28, 106, 0.85)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#FFD700", fontWeight: "bold", fontSize: "1.5rem" }}
                  gutterBottom
                >
                  Let's Connect
                </Typography>

                {/* Contact Form */}
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}
                >
                  <TextField
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "#FFF",
                        borderRadius: "10px",
                        "&:hover fieldset": { borderColor: "#FFD700" },
                        "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                      },
                    }}
                  />
                  <TextField
                    label="Your Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    type="email"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "#FFF",
                        borderRadius: "10px",
                        "&:hover fieldset": { borderColor: "#FFD700" },
                        "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                      },
                    }}
                  />
                  <TextField
                    label="Your Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "#FFF",
                        borderRadius: "10px",
                        "&:hover fieldset": { borderColor: "#FFD700" },
                        "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontSize: "1rem",
                      backgroundColor: "#FFD700",
                      color: "#282C35",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      transition: "background 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#FFF",
                        color: "#282C35",
                      },
                    }}
                  >
                    {loading ? "Sending..." : "Send Message"}
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














//! last
// import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
// import React, { useRef, useState } from "react";
// import EarthCanvas from "../canvas/Earth";

// const Contact = () => {
//   const formRef = useRef();
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("https://your-api.com/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (response.ok) {
//         alert("Message sent successfully!");
//         setForm({ name: "", email: "", message: "" });
//       } else {
//         alert("Failed to send message. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 8, mb: 10, textAlign: "center" }}>
//       <Typography
//         variant="subtitle1"
//         sx={{
//           color: "#FFD700",
//           fontWeight: "700",
//           textTransform: "uppercase",
//           fontSize: "1.8rem",
//           letterSpacing: "2px",
//           textShadow: "2px 2px 10px rgba(255, 215, 0, 0.8)",
//         }}
//         mt={8}
//       >
//         CONTACT
//       </Typography>
//       <Typography
//         variant="h3"
//         sx={{
//           fontSize: "3rem",
//           color: "#FFF",
//           fontWeight: "bold",
//           mt: 2,
//           letterSpacing: "1px",
//           textShadow: "3px 3px 15px rgba(255, 255, 255, 0.9)",
//         }}
//       >
//         Get in Touch
//       </Typography>

//       <Box
//         sx={{
//           mt: 6,
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 6,
//         }}
//       >
//         {/* EarthCanvas Section */}
//         <Box
//           style={{ flex: 1, display: "flex", justifyContent: "center", width: "100%" }}
//         >
//           <Box
//             sx={{
//               width: { xs: "80%", sm: "60%", md: "400px" },
//               height: { xs: "250px", sm: "350px", md: "450px" },
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <EarthCanvas />
//           </Box>
//         </Box>

//         {/* Contact Form Section */}
//         <Box style={{ flex: 1, width: "100%" }}>
//           <div
//             style={{
//               width: "100%",
//               padding: "2px",
//               borderRadius: 20,
//               background: "linear-gradient(135deg, #2F1C6A, #1F1346)",
//               boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
//             }}
//           >
//             <Paper
//               elevation={4}
//               sx={{
//                 p: { xs: 3, sm: 4 },
//                 borderRadius: 3,
//                 background: "rgba(47, 28, 106, 0.85)",
//                 textAlign: "center",
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{ color: "#FFD700", fontWeight: "bold", fontSize: "1.5rem" }}
//                 gutterBottom
//               >
//                 Let's Connect
//               </Typography>

//               {/* Contact Form */}
//               <form
//                 ref={formRef}
//                 onSubmit={handleSubmit}
//                 style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}
//               >
//                 <TextField
//                   label="Your Name"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   fullWidth
//                   variant="outlined"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       background: "#FFF",
//                       borderRadius: "10px",
//                       "&:hover fieldset": { borderColor: "#FFD700" },
//                       "&.Mui-focused fieldset": { borderColor: "#FFD700" },
//                     },
//                   }}
//                 />
//                 <TextField
//                   label="Your Email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   fullWidth
//                   variant="outlined"
//                   type="email"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       background: "#FFF",
//                       borderRadius: "10px",
//                       "&:hover fieldset": { borderColor: "#FFD700" },
//                       "&.Mui-focused fieldset": { borderColor: "#FFD700" },
//                     },
//                   }}
//                 />
//                 <TextField
//                   label="Your Message"
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   fullWidth
//                   multiline
//                   rows={5}
//                   variant="outlined"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       background: "#FFF",
//                       borderRadius: "10px",
//                       "&:hover fieldset": { borderColor: "#FFD700" },
//                       "&.Mui-focused fieldset": { borderColor: "#FFD700" },
//                     },
//                   }}
//                 />
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={loading}
//                   sx={{
//                     mt: 2,
//                     py: 1.5,
//                     fontSize: "1rem",
//                     backgroundColor: "#FFD700",
//                     color: "#282C35",
//                     borderRadius: "10px",
//                     fontWeight: "bold",
//                     transition: "background 0.3s ease-in-out",
//                     "&:hover": {
//                       backgroundColor: "#FFF",
//                       color: "#282C35",
//                     },
//                   }}
//                 >
//                   {loading ? "Sending..." : "Send Message"}
//                 </Button>
//               </form>
//             </Paper>
//           </div>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Contact;















