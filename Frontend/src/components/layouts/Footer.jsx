import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Restons Connectés !
        </Typography>

        {/* Social Media Icons */}
        <Box>
          <IconButton href="https://github.com/Mohib-FullStack" target="_blank" color="inherit">
            <GitHub />
          </IconButton>
          <IconButton href="https://linkedin.com/in/mohiburrahmanofficial" target="_blank" color="inherit">
            <LinkedIn />
          </IconButton>
          <IconButton href="https://twitter.com/yourprofile" target="_blank" color="inherit">
            <Twitter />
          </IconButton>
        </Box>

        {/* Copyright */}
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          &copy; {new Date().getFullYear()} Rahman Mohibur. Tous droits réservés.
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Footer;



//! with english
// import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
// import { Box, IconButton, Typography } from "@mui/material";
// import { motion } from "framer-motion";

// import React from "react";

// const Footer = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: "#121212",
//           color: "white",
//           padding: "20px",
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
//           Let's Connect!
//         </Typography>

//         {/* Social Media Icons */}
//         <Box>
//           <IconButton href="https://github.com/yourprofile" target="_blank" color="inherit">
//             <GitHub />
//           </IconButton>
//           <IconButton href="https://linkedin.com/in/yourprofile" target="_blank" color="inherit">
//             <LinkedIn />
//           </IconButton>
//           <IconButton href="https://twitter.com/yourprofile" target="_blank" color="inherit">
//             <Twitter />
//           </IconButton>
//         </Box>

//         {/* Copyright */}
//         <Typography variant="body2" sx={{ marginTop: "10px" }}>
//           &copy; {new Date().getFullYear()} Rahman Mohibur. All rights reserved.
//         </Typography>
//       </Box>
//     </motion.div>
//   );
// };

// export default Footer;
