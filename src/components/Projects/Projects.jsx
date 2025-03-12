// import { Box, Card, CardContent, Typography, Button, Chip } from "@mui/material";
// import { motion } from "framer-motion";
// import React from "react";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import theme from "../../theme";
// import { fadeIn } from "../../utils/motion";

// const projects = [
//   {
//     title: "E-Commerce PERN Stack",
//     description: "An eCommerce platform built with React, Node.js, PostgreSQL, and Material UI.",
//     techStack: ["React.js", "Node.js", "PostgreSQL", "Material UI"],
//     link: "https://github.com/Mohib-FullStack/ECOMMERCE-PERN-STACK",
//   },
//   {
//     title: "MongoDB Server API",
//     description: "A backend API built with Node.js and MongoDB, without a frontend.",
//     techStack: ["Node.js", "MongoDB", "Express.js"],
//     link: "https://github.com/Mohib-FullStack/ServerWithMongoDB",
//   },
//   {
//     title: "Library Management (Angular)",
//     description: "A CRUD-based library management system built with Angular.",
//     techStack: ["Angular", "TypeScript", "Material UI"],
//     link: "https://github.com/Mohib-FullStack/Biblioth-que",
//   },
//   {
//     title: "E-Commerce MERN Stack",
//     description: "A full-stack eCommerce platform with MongoDB backend API.",
//     techStack: ["React.js", "Node.js", "MongoDB", "Express.js"],
//     link: "https://github.com/Mohib-FullStack/ECOMMERCE-REACT-MERN",
//   },
// ];

// const ProjectCard = ({ title, description, techStack, link, index }) => (
//   <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.75)}>
//     <Card
//       sx={{
//         background: "linear-gradient(135deg, #100F29, #1C163C)",
//         borderRadius: 4,
//         padding: "20px",
//         minHeight: 200,
//         maxWidth: 400,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         textAlign: "center",
//         transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//         "&:hover": {
//           transform: "scale(1.05)",
//           boxShadow: "0px 6px 20px rgba(255, 255, 255, 0.15)",
//         },
//       }}
//     >
//       <CardContent>
//         <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
//           {title}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#bbb", mt: 1 }}>
//           {description}
//         </Typography>
//         <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
//           {techStack.map((tech) => (
//             <Chip key={tech} label={tech} sx={{ background: "#282C35", color: "#fff" }} />
//           ))}
//         </Box>
//       </CardContent>
//       <Button
//         href={link}
//         target="_blank"
//         sx={{ color: "#fff", textTransform: "none", mt: 2 }}
//         startIcon={<GitHubIcon />}
//       >
//         View on GitHub
//       </Button>
//     </Card>
//   </motion.div>
// );

// const Projects = () => {
//   return (
//     <Box sx={{ mt: 4, px: 3 }}>
//       <motion.div variants={fadeIn("", "", 0.1, 1)}>
//         <Typography variant="subtitle1" sx={theme.sectionSubText} mt={8}>
//           MES PROJETS
//         </Typography>
//         <Typography variant="h3" sx={theme.sectionHeadText} mt={2}>
//           Projets Développés
//         </Typography>
//       </motion.div>
//       <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
//         {projects.map((project, index) => (
//           <ProjectCard key={project.title} index={index} {...project} />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Projects;

//! update
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import theme from "../../theme";
import { fadeIn } from "../../utils/motion";

const projects = [
  {
    title: "E-Commerce PERN Stack",
    description: "An eCommerce platform built with React, Node.js, PostgreSQL, and Material UI.",
    techStack: ["React.js", "Node.js", "PostgreSQL", "Material UI"],
    link: "https://github.com/Mohib-FullStack/ECOMMERCE-PERN-STACK",
  },
  {
    title: "MongoDB Server API",
    description: "A backend API built with Node.js and MongoDB, without a frontend.",
    techStack: ["Node.js", "MongoDB", "Express.js"],
    link: "https://github.com/Mohib-FullStack/ServerWithMongoDB",
  },
  {
    title: "Library Management (Angular)",
    description: "A CRUD-based library management system built with Angular.",
    techStack: ["Angular", "TypeScript", "Material UI"],
    link: "https://github.com/Mohib-FullStack/Biblioth-que",
  },
  {
    title: "E-Commerce MERN Stack",
    description: "A full-stack eCommerce platform with MongoDB backend API.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js"],
    link: "https://github.com/Mohib-FullStack/ECOMMERCE-REACT-MERN",
  },
];

const ProjectCard = ({ title, description, techStack, link, index }) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.75)}>
    <Card
      sx={{
        background: "linear-gradient(135deg, #FF7F50, #FF6347)", // Colorful gradient background
        borderRadius: 4,
        padding: "20px",
        minHeight: 220,
        maxWidth: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 10px 30px rgba(255, 99, 71, 0.5)", // Enhanced hover effect
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#fff", mt: 1, fontSize: "1rem" }}>
          {description}
        </Typography>
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
          {techStack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              sx={{
                background: "#282C35",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "20px",
                px: 2,
                py: 1,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  background: "#FFD700", // Color change on hover
                  transform: "scale(1.1)", // Slight zoom effect
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
      <Button
        href={link}
        target="_blank"
        sx={{
          color: "#fff",
          textTransform: "none",
          mt: 2,
          borderColor: "#FF6347",
          borderRadius: "20px",
          borderWidth: "1px",
          padding: "8px 16px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#FF6347", // Colorful hover effect for button
          },
        }}
        startIcon={<GitHubIcon />}
      >
        View on GitHub
      </Button>
    </Card>
  </motion.div>
);

const Projects = () => {
  return (
    <Box sx={{ mt: 4, px: 3 }}>
      <motion.div variants={fadeIn("", "", 0.1, 1)}>
        <Typography variant="subtitle1" sx={theme.sectionSubText} mt={8}>
          MES PROJETS
        </Typography>
        <Typography variant="h3" sx={theme.sectionHeadText} mt={2}>
          Projets Développés
        </Typography>
      </motion.div>
      <Box
        sx={{
          mt: 6,
          mb: 10, // Added more space at the bottom between the cards and footer
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} {...project} />
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
