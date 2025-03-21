import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import useTranslation for translation
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import theme from "../theme";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const { t } = useTranslation(); // Translation hook
  const currentLanguage = useSelector((state) => state.language.language); // Get the current language from Redux

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1F1346, #2F1C6A)", // Gradient background
        paddingTop: { xs: "64px", md: "80px" }, // Prevent overlap with navbar
        paddingBottom: { xs: "48px", md: "64px" }, // Ensure space above footer
      }}
    >
      {/* Hero Text */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "12%", sm: "20%", md: "25%" },
          maxWidth: "1200px",
          width: "100%",
          px: theme.paddingX,
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
          <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#915EFF" }} />
          <Box sx={{ width: 4, height: { xs: 160, sm: 320 }, bgcolor: "violet.main" }} />
        </Box>

        <Box>
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "3.5rem" },
              textShadow: "2px 2px 10px rgba(255, 255, 255, 0.3)", // Glow effect
            }}
          >
            {t("hero.greeting")}{" "}
            <Box component="span" sx={{ color: "#915EFF" }}>
              {t("hero.name")}
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 1,
              color: "white",
              fontSize: { xs: "1rem", md: "1.5rem" },
              textShadow: "1px 1px 5px rgba(255, 255, 255, 0.2)", // Subtle glow
            }}
          >
            {t("hero.description")}
          </Typography>
        </Box>
      </Box>

      {/* 3D Canvas */}
      <Box sx={{ position: "relative", width: "100%", marginBottom: "100px", mb: "1" }}>
        <ComputersCanvas />
      </Box>

      {/* Scroll Down Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 10, sm: 32 },
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="#about">
          <Box
            sx={{
              width: 35,
              height: 64,
              borderRadius: "20px",
              border: "4px solid",
              borderColor: "secondary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              p: 1,
              background: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)", // Glow effect
            }}
          >
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#915EFF",
                marginBottom: 4,
                boxShadow: "0px 2px 5px rgba(145, 94, 255, 0.5)", // Glow effect
              }}
            />
          </Box>
        </a>
      </Box>
    </Box>
  );
};

export default Hero;

//! with french
// import { Box, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import theme from "../theme";
// import { ComputersCanvas } from "./canvas";

// const Hero = () => {
//   return (
//     <Box
//       component="section"
//       sx={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//         mx: "auto",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #1F1346, #2F1C6A)", // Gradient background
//         paddingTop: { xs: "64px", md: "80px" }, // Prevent overlap with navbar
//         paddingBottom: { xs: "48px", md: "64px" }, // Ensure space above footer
//       }}
//     >
//       {/* Hero Text */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: { xs: "12%", sm: "20%", md: "25%" },
//           maxWidth: "1200px",
//           width: "100%",
//           px: theme.paddingX,
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "start",
//           gap: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
//           <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#915EFF" }} />
//           <Box sx={{ width: 4, height: { xs: 160, sm: 320 }, bgcolor: "violet.main" }} />
//         </Box>

//         <Box>
//           <Typography
//             variant="h2"
//             sx={{
//               color: "white",
//               fontWeight: "bold",
//               fontSize: { xs: "2rem", md: "3.5rem" },
//               textShadow: "2px 2px 10px rgba(255, 255, 255, 0.3)", // Glow effect
//             }}
//           >
//             Bonjour, je suis <Box component="span" sx={{ color: "#915EFF" }}>Mohib</Box>
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               mt: 1,
//               color: "white",
//               fontSize: { xs: "1rem", md: "1.5rem" },
//               textShadow: "1px 1px 5px rgba(255, 255, 255, 0.2)", // Subtle glow
//             }}
//           >
//             Je développe des visuels 3D, des interfaces utilisateur, <br style={{ display: "none", sm: "block" }} />
//             et des applications web
//           </Typography>
//         </Box>
//       </Box>

//       {/* 3D Canvas */}
//       <Box sx={{ position: "relative", width: "100%", marginBottom: "100px", mb: "1" }}>
//         <ComputersCanvas />
//       </Box>

//       {/* Scroll Down Indicator */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: { xs: 10, sm: 32 },
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <a href="#about">
//           <Box
//             sx={{
//               width: 35,
//               height: 64,
//               borderRadius: "20px",
//               border: "4px solid",
//               borderColor: "secondary.main",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "start",
//               p: 1,
//               background: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
//               boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)", // Glow effect
//             }}
//           >
//             <motion.div
//               animate={{ y: [0, 24, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
//               style={{
//                 width: 12,
//                 height: 12,
//                 borderRadius: "50%",
//                 backgroundColor: "#915EFF",
//                 marginBottom: 4,
//                 boxShadow: "0px 2px 5px rgba(145, 94, 255, 0.5)", // Glow effect
//               }}
//             />
//           </Box>
//         </a>
//       </Box>
//     </Box>
//   );
// };

// export default Hero;

//! with english
// import { Box, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import theme from "../theme";
// import { ComputersCanvas } from "./canvas";

// const Hero = () => {
//   return (
// <Box
//   component="section"
//   sx={{
//     position: "relative",
//     width: "100%",
//     height: "100vh",
//     mx: "auto",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: { xs: "64px", md: "80px" }, // Prevent overlap with navbar
//     paddingBottom: { xs: "48px", md: "64px" }, // Ensure space above footer
//   }}
// >

  
//       {/* Hero Text */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: { xs: "12%", sm: "20%", md: "25%" },
//           maxWidth: "1200px",
//           width: "100%",
//           px: theme.paddingX,
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "start",
//           gap: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
//           <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#915EFF" }} />
//           <Box sx={{ width: 4, height: { xs: 160, sm: 320 }, bgcolor: "violet.main" }} />
//         </Box>

//         <Box>
//           <Typography
//             variant="h2"
//             sx={{
//               color: "white",
//               fontWeight: "bold",
//               fontSize: { xs: "2rem", md: "3.5rem" },
//             }}
//           >
//             Hi, I'm <Box component="span" sx={{ color: "#915EFF" }}>Mohib</Box>
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               mt: 1,
//               color: "white",
//               fontSize: { xs: "1rem", md: "1.5rem" },
//             }}
//           >
//             I develop 3D visuals, user interfaces, <br style={{ display: "none", sm: "block" }} />
//             and web applications
//           </Typography>
//         </Box>
//       </Box>

//       {/* 3D Canvas */}
//      <Box sx={{ position: "relative", width: "100%", marginBottom: "100px",mb:"1" }}> 
//   <ComputersCanvas />
// </Box>


//       {/* Scroll Down Indicator */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: { xs: 10, sm: 32 },
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <a href="#about">
//           <Box
//             sx={{
//               width: 35,
//               height: 64,
//               borderRadius: "20px",
//               border: "4px solid",
//               borderColor: "secondary.main",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "start",
//               p: 1,
//             }}
//           >
//             <motion.div
//               animate={{ y: [0, 24, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
//               style={{
//                 width: 12,
//                 height: 12,
//                 borderRadius: "50%",
//                 backgroundColor: "#915EFF",
//                 marginBottom: 4,
//               }}
//             />
//           </Box>
//         </a>
//       </Box>
//     </Box>
//   );
// };

// export default Hero;










//! original
// import { Box, Typography } from "@mui/material";
// import { motion } from "framer-motion";


// import theme from "../theme";
// import { ComputersCanvas } from "./canvas";

// const Hero = () => {
//   return (
//     <Box component="section" sx={{ position: "relative", width: "100%", height: "100vh", mx: "auto" }}>
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           top: { xs: 100, sm: 120 },
//           maxWidth: "1200px",
//           mx: "auto",
//           px: theme.paddingX,
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "start",
//           gap: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
//           <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#915EFF"  }} />
//           <Box sx={{ width: 4, height: { xs: 160, sm: 320 }, bgcolor: "violet.main" }} />
//         </Box>

//         <Box>
//           <Typography variant="h1" sx={{ ...theme.heroHeadText, color: "white" }}>
//             Hi, I'm <Box component="span" sx={{ color: "#915EFF" }}>Mohib</Box>
//           </Typography>
//           <Typography variant="body1" sx={{ ...theme.heroSubText, mt: 2, color: "white" }}>
//             I develop 3D visuals, user <br style={{ display: "none", sm: "block" }} />
//             interfaces and web applications
//           </Typography>
//         </Box>
//       </Box>

//       <ComputersCanvas />

//       <Box sx={{ position: "absolute", bottom: { xs: 10, sm: 32 }, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
//         <a href="#about">
//           <Box sx={{ width: 35, height: 64, borderRadius: "20px", border: "4px solid", borderColor: "secondary.main", display: "flex", justifyContent: "center", alignItems: "start", p: 1 }}>
//             <motion.div
//               animate={{
//                 y: [0, 24, 0],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 repeatType: "loop",
//               }}
//               style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#915EFF", marginBottom: 4 }}
//             />
//           </Box>
//         </a>
//       </Box>
//     </Box>
//   );
// };

// export default Hero;

