import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { Tilt } from "react-tilt";
import { technologies } from "../../constants";
import theme from "../../theme";
import { fadeIn, textVariant } from "../../utils/motion";
import BallCanvas from "../canvas/Ball";

import { extend } from "@react-three/fiber";
import * as THREE from "three"; 

extend(THREE); // Extends Three.js features into React Three Fiber

const experiences = [
  {
    title: "Développeur Full-Stack",
    company: "SNCF Réseau",
    date: "Septembre 2022 - Présent",
    project: "Projet Egipte_lll (Transport Technique)",
    details: [
      "Refonte complète d'une application existante en React.js et Node.js, avec PostgreSQL.",
      "Optimisation et modernisation d’un projet initialement développé sous Windev.",
      "Développement et intégration d’API performantes pour la gestion des transports.",
      "Travail en méthodologie Agile au sein d’une équipe technique pluridisciplinaire.",
    ],
  },
  {
    title: "Responsable Commercial",
    company: "Login Informatique, Clinique Informatique, Mavisha Informatique",
    date: "2015 - 2022",
    details: [
      "Analyse des ventes et des tendances clients avec Excel et Power BI.",
      "Mise en place de stratégies de croissance ayant augmenté le chiffre d’affaires de 15%.",
      "Gestion et optimisation des bases de données clients.",
    ],
  },
];

const ExperienceCard = ({ experience }) => (
  <Tilt style={{ width: 350 }}>
    <motion.div
      variants={fadeIn("right", "spring", 0.5, 0.75)}
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
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CardContent sx={{ padding: 0, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
            {experience.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#BBB", mt: 1 }}>
            {experience.company} | {experience.date}
          </Typography>
          {experience.project && (
            <Typography variant="subtitle2" sx={{ color: "#E0E0E0", mt: 1, fontStyle: "italic" }}>
              {experience.project}
            </Typography>
          )}
          <ul
            style={{
              textAlign: "left",
              marginTop: 10,
              paddingLeft: 20,
              color: "#DFDFDF",
            }}
          >
            {experience.details.map((point, index) => (
              <li key={index} style={{ fontSize: "14px", marginBottom: "8px" }}>
                {point}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  </Tilt>
);

const Experience = () => {
  return (
    <Box sx={{ mt: 8, px: 3, background: "#1F1346", borderRadius: "10px", padding: "20px" }}>
      <motion.div variants={textVariant()}>
        {/* <Typography variant="subtitle1" sx={theme.sectionSubText} mt={8}>
          EXPÉRIENCES PROFESSIONNELLES
        </Typography>
        <Typography variant="h3" sx={theme.sectionHeadText} mt={2}>
          Mon Parcours.
        </Typography> */}
        <Typography
  variant="subtitle1"
  sx={{
    color: "#FFD700", // Bright gold for visibility
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontSize: "1.8rem",
    textShadow: "2px 2px 10px rgba(255, 215, 0, 0.8)", // Soft glow
  }}
  mt={8}
>
  EXPÉRIENCES PROFESSIONNELLES
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
    textShadow: "3px 3px 15px rgba(255, 255, 255, 0.9)", // Stronger glow effect
  }}
>
  Mon Parcours.
</Typography>

      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
        <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </Box>
      </motion.div>

      {/* 3D Moving Icons */}
      <Box sx={{ mt: 10, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 5 }}>
        {technologies.map((tech) => (
          <Box key={tech.name} sx={{ width: 100, height: 100 }}>
            <BallCanvas icon={tech.icon} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Experience;











// import { Box, Card, CardContent, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import React from "react";
// import { Tilt } from "react-tilt";
// import { technologies } from "../../constants";
// import theme from "../../theme";
// import { fadeIn, textVariant } from "../../utils/motion";
// import BallCanvas from "../canvas/Ball";

// import { extend } from "@react-three/fiber";
// import * as THREE from "three"; 

// extend(THREE); // Extends Three.js features into React Three Fiber


// const experiences = [
//   {
//     title: "Développeur Full-Stack",
//     company: "SNCF Réseau",
//     date: "Septembre 2022 - Présent",
//     project: "Projet Egipte_lll (Transport Technique)",
//     details: [
//       "Refonte complète d'une application existante en React.js et Node.js, avec PostgreSQL.",
//       "Optimisation et modernisation d’un projet initialement développé sous Windev.",
//       "Développement et intégration d’API performantes pour la gestion des transports.",
//       "Travail en méthodologie Agile au sein d’une équipe technique pluridisciplinaire.",
//     ],
//   },
//   {
//     title: "Responsable Commercial",
//     company: "Login Informatique, Clinique Informatique, Mavisha Informatique",
//     date: "2015 - 2022",
//     details: [
//       "Analyse des ventes et des tendances clients avec Excel et Power BI.",
//       "Mise en place de stratégies de croissance ayant augmenté le chiffre d’affaires de 15%.",
//       "Gestion et optimisation des bases de données clients.",
//     ],
//   },
// ];

// const ExperienceCard = ({ experience }) => (
//   <Tilt style={{ width: 350 }}>
//     <motion.div
//       variants={fadeIn("right", "spring", 0.5, 0.75)}
//       whileHover={{ scale: 1.07 }}
//       style={{
//         width: "100%",
//         padding: "2px",
//         borderRadius: 20,
//         background: "linear-gradient(135deg, #0a0a23, #1c1c3c)",
//         boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
//       }}
//     >
//       <Card
//         sx={{
//           background: "rgba(10, 10, 35, 0.85)",
//           borderRadius: 4,
//           padding: "20px",
//           minHeight: 300,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//         }}
//       >
//         <CardContent sx={{ padding: 0, textAlign: "center" }}>
//           <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
//             {experience.title}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "#BBB", mt: 1 }}>
//             {experience.company} | {experience.date}
//           </Typography>
//           {experience.project && (
//             <Typography variant="subtitle2" sx={{ color: "#E0E0E0", mt: 1, fontStyle: "italic" }}>
//               {experience.project}
//             </Typography>
//           )}
//           <ul
//             style={{
//               textAlign: "left",
//               marginTop: 10,
//               paddingLeft: 20,
//               color: "#DFDFDF",
//             }}
//           >
//             {experience.details.map((point, index) => (
//               <li key={index} style={{ fontSize: "14px", marginBottom: "8px" }}>
//                 {point}
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//     </motion.div>
//   </Tilt>
// );

// const Experience = () => {
//   return (
//     <Box sx={{ mt: 8, px: 3 }}>
//       <motion.div variants={textVariant()}>
//         <Typography variant="subtitle1" sx={theme.sectionSubText} mt={8}>
//           EXPÉRIENCES PROFESSIONNELLES
//         </Typography>
//         <Typography variant="h3" sx={theme.sectionHeadText} mt={2}>
//           Mon Parcours.
//         </Typography>
//       </motion.div>

//       <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
//         <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>
//           {experiences.map((exp, index) => (
//             <ExperienceCard key={index} experience={exp} />
//           ))}
//         </Box>
//       </motion.div>

//       {/* 3D Moving Icons */}
//       <Box sx={{ mt: 10, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 5 }}>
//         {technologies.map((tech) => (
//           <Box key={tech.name} sx={{ width: 100, height: 100 }}>
//             <BallCanvas icon={tech.icon} />
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Experience;









//! previous
// import { Box, Card, CardContent, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import React from "react";
// import { Tilt } from "react-tilt";
// import theme from "../../theme";
// import { fadeIn, textVariant } from "../../utils/motion";

// const experiences = [
//   {
//     title: "Développeur Full-Stack",
//     company: "SNCF Réseau",
//     date: "Septembre 2022 - Présent",
//     project: "Projet Egipte_lll (Transport Technique)",
//     details: [
//       "Refonte complète d'une application existante en React.js et Node.js, avec PostgreSQL.",
//       "Optimisation et modernisation d’un projet initialement développé sous Windev.",
//       "Développement et intégration d’API performantes pour la gestion des transports.",
//       "Travail en méthodologie Agile au sein d’une équipe technique pluridisciplinaire.",
//     ],
//   },
//   {
//     title: "Responsable Commercial",
//     company: "Login Informatique, Clinique Informatique, Mavisha Informatique",
//     date: "2015 - 2022",
//     details: [
//       "Analyse des ventes et des tendances clients avec Excel et Power BI.",
//       "Mise en place de stratégies de croissance ayant augmenté le chiffre d’affaires de 15%.",
//       "Gestion et optimisation des bases de données clients.",
//     ],
//   },
// ];

// const ExperienceCard = ({ experience }) => (
//   <Tilt style={{ width: 350 }}>
//     <motion.div
//       variants={fadeIn("right", "spring", 0.5, 0.75)}
//       style={{
//         width: "100%",
//         padding: "2px",
//         borderRadius: 20,
//         background: "linear-gradient(135deg, #0a0a23, #1c1c3c)",
//         boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
//       }}
//     >
//       <Card
//         sx={{
//           background: "rgba(10, 10, 35, 0.85)",
//           borderRadius: 4,
//           padding: "20px",
//           minHeight: 300,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//           "&:hover": {
//             transform: "scale(1.07)",
//             boxShadow: "0px 6px 20px rgba(255, 255, 255, 0.2)",
//           },
//         }}
//       >
//         <CardContent sx={{ padding: 0, textAlign: "center" }}>
//           <Typography
//             variant="h6"
//             sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}
//           >
//             {experience.title}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "#BBB", mt: 1 }}>
//             {experience.company} | {experience.date}
//           </Typography>
//           {experience.project && (
//             <Typography
//               variant="subtitle2"
//               sx={{ color: "#E0E0E0", mt: 1, fontStyle: "italic" }}
//             >
//               {experience.project}
//             </Typography>
//           )}
//           <ul
//             style={{
//               textAlign: "left",
//               marginTop: 10,
//               paddingLeft: 20,
//               color: "#DFDFDF",
//             }}
//           >
//             {experience.details.map((point, index) => (
//               <li key={index} style={{ fontSize: "14px", marginBottom: "8px" }}>
//                 {point}
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//     </motion.div>
//   </Tilt>
// );

// const Experience = () => {
//   return (
//     <Box sx={{ mt: 8, px: 3 }}>
//       <motion.div variants={textVariant()}>
//         <Typography variant="subtitle1" sx={theme.sectionSubText} mt={8}>
//           EXPÉRIENCES PROFESSIONNELLES
//         </Typography>
//         <Typography variant="h3" sx={theme.sectionHeadText} mt={2}>
//           Mon Parcours.
//         </Typography>
//       </motion.div>

//       <Box
//         sx={{
//           mt: 6,
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 4,
//         }}
//       >F
//         {experiences.map((exp, index) => (
//           <ExperienceCard key={index} experience={exp} />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Experience;











