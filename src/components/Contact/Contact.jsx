import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { slideIn } from "../../utils/motion";
import EarthCanvas from "../canvas/Earth";

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
    <Container maxWidth="lg" sx={{ mt: 14, mb: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {/* EarthCanvas Section (Now Responsive) */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          style={{ flex: 1, display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Box
            sx={{
              width: { xs: "80%", sm: "60%", md: "400px" }, // Responsive width
              height: { xs: "250px", sm: "350px", md: "450px" }, // Responsive height
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EarthCanvas />
          </Box>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          style={{ flex: 1, width: "100%" }}
        >
          <Paper
            elevation={4}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              maxWidth: { xs: "90%", sm: "85%", md: "500px" },
              mx: "auto",
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Contact Me
            </Typography>

            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}
            >
              <TextField label="Your Name" name="name" value={form.name} onChange={handleChange} fullWidth variant="outlined" />
              <TextField label="Your Email" name="email" value={form.email} onChange={handleChange} fullWidth variant="outlined" type="email" />
              <TextField label="Your Message" name="message" value={form.message} onChange={handleChange} fullWidth multiline rows={5} variant="outlined" />
              <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Contact;









