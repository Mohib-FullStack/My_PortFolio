import DarkModeIcon from '@mui/icons-material/DarkMode'; // Moon alternative
import GetAppIcon from '@mui/icons-material/GetApp'; // Download alternative
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun alternative

import { School } from '@mui/icons-material';
import TranslateIcon from '@mui/icons-material/Translate';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
// import { Download, Moon, Sun } from 'lucide-react';

import React, { useEffect, useState } from 'react';
const Resume = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = 'Rahman Mohibur - Full-Stack Developer Resume';
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content =
      'Explore the resume of Rahman Mohibur, an experienced Full-Stack Developer specializing in React.js, Node.js, and PostgreSQL.';
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <Container
      maxWidth="lg"
      className={`transition-all duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'
      }`}
      sx={{ minHeight: '100vh', padding: '24px', paddingTop: '50px' }} // Added paddingTop for more space at the top
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
            sx={{
              borderBottom: `2px solid ${darkMode ? '#fff' : '#000'}`,
              paddingBottom: '16px',
              marginTop: '40px', // Added marginTop here to give more space between top and header
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              Resume
            </Typography>

            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{
                color: darkMode ? '#FFD700' : '#000',
                transition: 'color 0.3s ease',
              }}
            >
              {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Grid>

        {/* Personal Info Section */}
        <Grid item xs={12}>
          <Card
            sx={{
              backgroundColor: darkMode ? '#333' : '#fff',
              borderRadius: '16px',
              padding: '20px',
            }}
          >
            <CardContent
              sx={{ textAlign: 'center', color: darkMode ? '#fff' : '#000' }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: darkMode ? '#fff' : '#000' }}
                >
                  Rahman Mohibur
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: darkMode ? '#ccc' : '#555', marginTop: 2 }}
                >
                  Full-Stack Developer | React.js | Node.js | PostgreSQL
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginTop: 2, color: darkMode ? '#aaa' : '#777' }}
                >
                  📍 47 Avenue Reille, 75014 Paris | 📞 +33 7 67 42 07 84 | 📩
                  mohibur_rahman09@yahoo.fr
                </Typography>
                <Box mt={3} display="flex" justifyContent="center" gap={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="https://www.linkedin.com/in/mohiburrahmanofficial"
                    target="_blank"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    href="https://github.com/Mohib-FullStack"
                    target="_blank"
                  >
                    GitHub
                  </Button>
                </Box>
              </motion.div>
            </CardContent>
          </Card>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Experience Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: darkMode ? '#444' : '#f5f5f5',
              padding: 3,
              borderRadius: '16px',
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                Experience
              </Typography>

              {/* Full-Stack Developer */}
              <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
                Full-Stack Developer | SNCF Réseau
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Septembre 2022 – Présent
              </Typography>

              <ListItemText
                primary="Projet Egipte_lll : Refonte complète d’une application obsolète (Windev)"
                secondary="Conception et développement en React.js, Node.js et PostgreSQL. Création d’API RESTful, optimisation des performances, amélioration UX, et collaboration Agile."
              />
              {/* Business Manager */}
              <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 3 }}>
                Responsable Commercial | Login Informatique, Clinique
                Informatique, Mavisha Informatique
              </Typography>
              <Typography variant="body2" color="textSecondary">
                2015 – 2022
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    Analyse des données et stratégies de croissance
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Analyse des ventes avec Excel et Power BI. Augmentation du
                    chiffre d’affaires de 15%.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Gestion et optimisation des bases de données clients.
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: darkMode ? '#444' : '#f5f5f5',
              padding: 3,
              borderRadius: '16px',
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                Skills
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" color="primary" size="small">
                    React.js
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" size="small">
                    Node.js
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="success" size="small">
                    PostgreSQL
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="error" size="small">
                    MongoDB
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="info" size="small">
                    HTML
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="warning" size="small">
                    CSS
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" size="small">
                    JavaScript
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" size="small">
                    Angular
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="success" size="small">
                    Python (Django)
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="error" size="small">
                    API RESTful
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="info" size="small">
                    Power BI
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="warning" size="small">
                    Excel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" size="small">
                    NumPy
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" size="small">
                    Pandas
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="success" size="small">
                    Seaborn
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="error" size="small">
                    Matplotlib
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Languages Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: darkMode ? '#444' : '#f5f5f5',
              padding: 3,
              borderRadius: '16px',
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                Languages
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <TranslateIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="body1">🇬🇧 Anglais : Courant</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" mt={2}>
                <Grid item>
                  <TranslateIcon color="secondary" />
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    🇫🇷 Français : Professionnel
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" mt={2}>
                <Grid item>
                  <TranslateIcon color="success" />
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    🇧🇩 Bengali : Langue maternelle
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Education Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: darkMode ? '#444' : '#f5f5f5',
              padding: 3,
              borderRadius: '16px',
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                <School sx={{ color: '#4CAF50', mr: 1 }} /> Education
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                Développeur d’Applications Web & Intégrateur | 3W Academy, Paris
              </Typography>
              <Typography variant="body2" color="textSecondary">
                2022
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    400-hour intensive training on modern web technologies.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Mastery of React.js, Node.js, PostgreSQL, and MongoDB.
                  </Typography>
                </li>
              </ul>
              <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
                Master in Economics | National University of Bangladesh
              </Typography>
              <Typography variant="body2" color="textSecondary">
                2002
              </Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
                Bachelor of Arts (B.A.) | National University of Bangladesh
              </Typography>
              <Typography variant="body2" color="textSecondary">
                2001
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Download Section */}
        <Grid item xs={12}>
          <Card
            sx={{
              backgroundColor: darkMode ? '#444' : '#f5f5f5',
              padding: 3,
              borderRadius: '16px',
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                Download Resume & Motivation Letter
              </Typography>
              <Box display="flex" justifyContent="center" gap={4}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<GetAppIcon />}
                  href="/cv_fr.pdf"
                  download
                >
                  Download CV
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<GetAppIcon />}
                  href="/motivation_letter.pdf"
                  download
                >
                  Download Letter
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Resume;
