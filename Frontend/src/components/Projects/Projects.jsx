import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import Tilt from 'react-parallax-tilt';
import { fadeIn, textVariant } from "../../utils/motion";

const projects = [
  {
    title: "E-Commerce Full Stack PERN",
    description: "Une plateforme eCommerce développée avec React, Node.js, PostgreSQL et Material UI.",
    techStack: ["React.js", "Node.js", "PostgreSQL", "Material UI"],
    link: "https://github.com/Mohib-FullStack/ECOMMERCE-PERN-STACK",
  },
  {
    title: "API Serveur MongoDB",
    description: "Une API backend développée avec Node.js et MongoDB, sans interface frontale.",
    techStack: ["Node.js", "MongoDB", "Express.js"],
    link: "https://github.com/Mohib-FullStack/ServerWithMongoDB",
  },
  {
    title: "Gestion de Bibliothèque (Angular)",
    description: "Un système de gestion de bibliothèque CRUD développé avec Angular.",
    techStack: ["Angular", "TypeScript", "Material UI"],
    link: "https://github.com/Mohib-FullStack/Biblioth-que",
  },
  {
    title: "E-Commerce Full Stack MERN",
    description: "Une plateforme eCommerce full-stack avec une API backend MongoDB.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js"],
    link: "https://github.com/Mohib-FullStack/ECOMMERCE-REACT-MERN",
  },
];

const ProjectCard = ({ title, description, techStack, link, index }) => (
  <Tilt style={{ width: 350 }}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.3, 0.75)}
      whileHover={{ scale: 1.07 }}
      style={{
        width: "100%",
        padding: "2px",
        borderRadius: 20,
        background: "linear-gradient(135deg, #2F1C6A, #1F1346)",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
      }}
    >
      <Card
        sx={{
          background: "rgba(47, 28, 106, 0.85)",
          borderRadius: 4,
          padding: "20px",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#BBB", mt: 1, fontSize: "1rem" }}>
            {description}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
            {techStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                sx={{
                  background: "#FFD700",
                  color: "#282C35",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  px: 2,
                  py: 1,
                  boxShadow: "0px 4px 6px rgba(255, 255, 255, 0.2)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    background: "#FFF",
                    transform: "scale(1.1)",
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
            borderColor: "#FFD700",
            borderRadius: "20px",
            borderWidth: "1px",
            padding: "8px 16px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#FFD700",
              color: "#282C35",
            },
          }}
          startIcon={<GitHubIcon />}
        >
          Voir sur GitHub
        </Button>
      </Card>
    </motion.div>
  </Tilt>
);

const Projects = () => {
  return (
    <Box sx={{ mt: 8, px: 3, background: "#1F1346", borderRadius: "10px", padding: "20px" }}>
      <motion.div variants={textVariant()}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#FFD700",
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontSize: "1.8rem",
            textShadow: "2px 2px 10px rgba(255, 215, 0, 0.8)",
          }}
          mt={8}
        >
          MES PROJETS
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: "3.2rem",
            color: "#FFF",
            fontWeight: "bold",
            textAlign: "center",
            mt: 2,
            letterSpacing: "1px",
            textShadow: "3px 3px 15px rgba(255, 255, 255, 0.9)",
          }}
        >
          Projets Développés
        </Typography>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
        <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} index={index} {...project} />
          ))}
        </Box>
      </motion.div>
    </Box>
  );
};

export default Projects;

//! with english
// import GitHubIcon from "@mui/icons-material/GitHub";
// import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import React from "react";
// import theme from "../../theme";
// import { fadeIn, textVariant } from "../../utils/motion";
// import Tilt from 'react-parallax-tilt';

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
//   <Tilt style={{ width: 350 }}>
//     <motion.div
//       variants={fadeIn("right", "spring", index * 0.3, 0.75)}
//       whileHover={{ scale: 1.07 }}
//       style={{
//         width: "100%",
//         padding: "2px",
//         borderRadius: 20,
//         background: "linear-gradient(135deg, #2F1C6A, #1F1346)",
//         boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
//       }}
//     >
//       <Card
//         sx={{
//           background: "rgba(47, 28, 106, 0.85)",
//           borderRadius: 4,
//           padding: "20px",
//           minHeight: 280,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           alignItems: "center",
//           textAlign: "center",
//         }}
//       >
//         <CardContent>
//           <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
//             {title}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "#BBB", mt: 1, fontSize: "1rem" }}>
//             {description}
//           </Typography>
//           <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
//             {techStack.map((tech) => (
//               <Chip
//                 key={tech}
//                 label={tech}
//                 sx={{
//                   background: "#FFD700",
//                   color: "#282C35",
//                   fontWeight: "bold",
//                   borderRadius: "20px",
//                   px: 2,
//                   py: 1,
//                   boxShadow: "0px 4px 6px rgba(255, 255, 255, 0.2)",
//                   transition: "transform 0.2s ease-in-out",
//                   "&:hover": {
//                     background: "#FFF",
//                     transform: "scale(1.1)",
//                   },
//                 }}
//               />
//             ))}
//           </Box>
//         </CardContent>
//         <Button
//           href={link}
//           target="_blank"
//           sx={{
//             color: "#fff",
//             textTransform: "none",
//             mt: 2,
//             borderColor: "#FFD700",
//             borderRadius: "20px",
//             borderWidth: "1px",
//             padding: "8px 16px",
//             transition: "background-color 0.3s ease",
//             "&:hover": {
//               backgroundColor: "#FFD700",
//               color: "#282C35",
//             },
//           }}
//           startIcon={<GitHubIcon />}
//         >
//           View on GitHub
//         </Button>
//       </Card>
//     </motion.div>
//   </Tilt>
// );

// const Projects = () => {
//   return (
//     <Box sx={{ mt: 8, px: 3, background: "#1F1346", borderRadius: "10px", padding: "20px" }}>
//       <motion.div variants={textVariant()}>
//         <Typography
//           variant="subtitle1"
//           sx={{
//             color: "#FFD700",
//             fontWeight: "700",
//             textAlign: "center",
//             letterSpacing: "2px",
//             textTransform: "uppercase",
//             fontSize: "1.8rem",
//             textShadow: "2px 2px 10px rgba(255, 215, 0, 0.8)",
//           }}
//           mt={8}
//         >
//           MES PROJETS
//         </Typography>
//         <Typography
//           variant="h3"
//           sx={{
//             fontSize: "3.2rem",
//             color: "#FFF",
//             fontWeight: "bold",
//             textAlign: "center",
//             mt: 2,
//             letterSpacing: "1px",
//             textShadow: "3px 3px 15px rgba(255, 255, 255, 0.9)",
//           }}
//         >
//           Projets Développés
//         </Typography>
//       </motion.div>

//       <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
//         <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>
//           {projects.map((project, index) => (
//             <ProjectCard key={project.title} index={index} {...project} />
//           ))}
//         </Box>
//       </motion.div>
//     </Box>
//   );
// };

// export default Projects;





