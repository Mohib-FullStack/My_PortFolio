import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import Tilt from 'react-parallax-tilt';
import angularIcon from "../../assets/icons/angular.png";
import cssIcon from "../../assets/icons/css.png";
import djangoIcon from "../../assets/icons/django.png";
import htmlIcon from "../../assets/icons/html.png";
import jsIcon from "../../assets/icons/javascript.png";
import mongoIcon from "../../assets/icons/mongodb.png";
import muiIcon from "../../assets/icons/mui.png";
import mysqlIcon from "../../assets/icons/mysql.png";
import nodeIcon from "../../assets/icons/nodejs.png";
import numpyIcon from "../../assets/icons/numpy.png";
import pandasIcon from "../../assets/icons/Pandas.png";
import postgresIcon from "../../assets/icons/postgresql.png";
import powerbiIcon from "../../assets/icons/powerbi.png";
import pythonIcon from "../../assets/icons/python.png";
import reactIcon from "../../assets/icons/react.png";
import reduxIcon from "../../assets/icons/redux.png";
import { fadeIn, textVariant } from "../../utils/motion";

const techStack = [
  { title: "HTML", icon: htmlIcon },
  { title: "CSS", icon: cssIcon },
  { title: "Material UI", icon: muiIcon },
  { title: "JavaScript", icon: jsIcon },
  { title: "React.js", icon: reactIcon },
  { title: "Angular", icon: angularIcon },
  { title: "Redux Toolkit", icon: reduxIcon },
  { title: "Node.js", icon: nodeIcon },
  { title: "Python", icon: pythonIcon },
  { title: "Django", icon: djangoIcon },
  { title: "MySQL", icon: mysqlIcon },
  { title: "PostgreSQL", icon: postgresIcon },
  { title: "MongoDB", icon: mongoIcon },
  { title: "NumPy", icon: numpyIcon },
  { title: "Pandas", icon: pandasIcon },
  { title: "Power BI", icon: powerbiIcon },
];

const TechCard = ({ title, icon, index }) => (
  <Tilt style={{ width: 180 }}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.2, 0.75)}
      style={{
        width: "100%",
        padding: "2px",
        borderRadius: 20,
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
      }}
    >
      <Card
        sx={{
          background: "linear-gradient(135deg, #2F1C6A, #1F1346)", // Gradient background
          borderRadius: 4,
          padding: "20px",
          minHeight: 180,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0px 8px 20px rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        <CardContent sx={{ padding: 0, textAlign: "center" }}>
          <Box
            component="img"
            src={icon}
            alt={title}
            sx={{
              width: 48,
              height: 48,
              objectFit: "contain",
              marginBottom: 2,
              borderRadius: "50%",
              border: "2px solid #fff",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <Box
      sx={{
        mt: 2,
        px: 3,
        background: "linear-gradient(135deg, #1F1346, #2F1C6A)", // Gradient background
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <motion.div variants={textVariant()}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#FFD700", // Gold color for the subtitle
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontSize: "1.8rem",
            textShadow: "2px 2px 10px rgba(255, 215, 0, 0.8)", // Glow effect
          }}
          mt={8}
        >
          À PROPOS DE MOI
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
            textShadow: "3px 3px 15px rgba(255, 255, 255, 0.9)", // Glow effect
          }}
        >
           Rahman Mohibur
        </Typography>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        style={{
          fontSize: "18px",
          fontWeight: "500",
          color: "#F0F0F0",
          marginTop: "1.5rem",
          lineHeight: "1.6",
          textAlign: "center",
          padding: "20px",
          background: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <strong>Développeur Full-Stack & Analyste de Données</strong> passionné par la transformation des données en insights exploitables et la création d'applications web performantes. J'ai une expertise en <strong>Python, SQL, ReactJS, Node.js et Power BI</strong>, avec une approche axée sur l'optimisation des processus métier.
      </motion.p>

      <Box
        sx={{
          mt: 6,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {techStack.map((tech, index) => (
          <TechCard key={tech.title} index={index} {...tech} />
        ))}
      </Box>
    </Box>
  );
};

export default About;








//! with english
// import { Box, Card, CardContent, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import React from "react";
// import Tilt from 'react-parallax-tilt';
// import angularIcon from "../../assets/icons/angular.png";
// import cssIcon from "../../assets/icons/css.png";
// import djangoIcon from "../../assets/icons/django.png";
// import htmlIcon from "../../assets/icons/html.png";
// import jsIcon from "../../assets/icons/javascript.png";
// import mongoIcon from "../../assets/icons/mongodb.png";
// import muiIcon from "../../assets/icons/mui.png";
// import mysqlIcon from "../../assets/icons/mysql.png";
// import nodeIcon from "../../assets/icons/nodejs.png";
// import numpyIcon from "../../assets/icons/numpy.png";
// import pandasIcon from "../../assets/icons/Pandas.png";
// import postgresIcon from "../../assets/icons/postgresql.png";
// import powerbiIcon from "../../assets/icons/powerbi.png";
// import pythonIcon from "../../assets/icons/python.png";
// import reactIcon from "../../assets/icons/react.png";
// import reduxIcon from "../../assets/icons/redux.png";
// import { fadeIn, textVariant } from "../../utils/motion";

// const techStack = [
//   { title: "HTML", icon: htmlIcon },
//   { title: "CSS", icon: cssIcon },
//   { title: "Material UI", icon: muiIcon },
//   { title: "JavaScript", icon: jsIcon },
//   { title: "React.js", icon: reactIcon },
//   { title: "Angular", icon: angularIcon },
//   { title: "Redux Toolkit", icon: reduxIcon },
//   { title: "Node.js", icon: nodeIcon },
//   { title: "Python", icon: pythonIcon },
//   { title: "Django", icon: djangoIcon },
//   { title: "MySQL", icon: mysqlIcon },
//   { title: "PostgreSQL", icon: postgresIcon },
//   { title: "MongoDB", icon: mongoIcon },
//   { title: "NumPy", icon: numpyIcon },
//   { title: "Pandas", icon: pandasIcon },
//   { title: "Power BI", icon: powerbiIcon },
// ];

// const TechCard = ({ title, icon, index }) => (
//   <Tilt style={{ width: 180 }}>
//     <motion.div
//       variants={fadeIn("right", "spring", index * 0.2, 0.75)}
//       style={{
//         width: "100%",
//         padding: "2px",
//         borderRadius: 20,
//         boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
//       }}
//     >
//       <Card
//         sx={{
//           background: "linear-gradient(135deg, #2F1C6A, #1F1346)", // Updated gradient colors
//           borderRadius: 4,
//           padding: "20px",
//           minHeight: 180,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//           "&:hover": {
//             transform: "scale(1.1)",
//             boxShadow: "0px 8px 20px rgba(255, 255, 255, 0.3)",
//           },
//         }}
//       >
//         <CardContent sx={{ padding: 0, textAlign: "center" }}>
//           <Box
//             component="img"
//             src={icon}
//             alt={title}
//             sx={{
//               width: 48,
//               height: 48,
//               objectFit: "contain",
//               marginBottom: 2,
//               borderRadius: "50%",
//               border: "2px solid #fff",
//             }}
//           />
//           <Typography
//             variant="body1"
//             sx={{
//               color: "#fff",
//               fontWeight: "bold",
//               fontSize: "1.1rem",
//             }}
//           >
//             {title}
//           </Typography>
//         </CardContent>
//       </Card>
//     </motion.div>
//   </Tilt>
// );

// const About = () => {
//   return (
//     <Box
//       sx={{
//         mt: 2,
//         px: 3,
//         background: "#1F1346", // Updated background color
//         borderRadius: "10px",
//         padding: "20px",
//       }}
//     >
//       <motion.div variants={textVariant()}>
//         <Typography
//           variant="subtitle1"
//           sx={{
//             color: "#ff9800",
//             fontWeight: "500",
//             textAlign: "center",
//             letterSpacing: "2px",
//             textTransform: "uppercase",
//           }}
//           mt={8}
//         >
//           À PROPOS DE MOI
//         </Typography>
//         <Typography
//           variant="h3"
//           sx={{
//             fontSize: "3rem",
//             color: "#fff",
//             fontWeight: "bold",
//             textAlign: "center",
//             mt: 2,
//           }}
//         >
//           Mohibur Rahman
//         </Typography>
//       </motion.div>

//       <motion.p
//         variants={fadeIn("", "", 0.1, 1)}
//         style={{
//           fontSize: "18px",
//           fontWeight: "500",
//           color: "#F0F0F0",
//           marginTop: "1rem",
//           lineHeight: "1.6",
//           textAlign: "justify",
//           padding: "10px",
//           background: "rgba(0, 0, 0, 0.6)",
//           borderRadius: "8px",
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
//         }}
//       >
//         <strong>Développeur Full-Stack & Analyste de Données</strong> passionné par la transformation des données en insights exploitables et la création d'applications web performantes. J'ai une expertise en <strong>Python, SQL, ReactJS, Node.js et Power BI</strong>, avec une approche axée sur l'optimisation des processus métier.
//       </motion.p>

//       <Box
//         sx={{
//           mt: 6,
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 4,
//         }}
//       >
//         {techStack.map((tech, index) => (
//           <TechCard key={tech.title} index={index} {...tech} />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default About;




