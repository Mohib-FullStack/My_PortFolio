import {
  AccountCircle as AccountCircleIcon,
  Article as BlogIcon,
  ContactMail as ContactMailIcon,
  Brightness4 as DarkModeIcon,
  ExitToApp as ExitToAppIcon,
  Home as HomeIcon,
  Language as LanguageIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  Description as ResumeIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Hook for translation
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logo } from "../../assets"; // Import the logo
import { setLanguage } from "../../features/language/languageSlice"; // Import the action

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const loggedIn = false; // Replace with actual authentication logic
  const { t, i18n } = useTranslation(); // Translation hook
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.language); // Get the current language from Redux store

  const navItems = [
    { label: t("home"), path: "/", icon: <HomeIcon color="primary" /> },
    { label: t("about"), path: "/about", icon: <AccountCircleIcon color="secondary" /> },
    { label: t("projects"), path: "/projects", icon: <WorkIcon color="success" /> },
    { label: t("experience"), path: "/experience", icon: <WorkIcon color="info" /> },
    { label: t("blog"), path: "/blog", icon: <BlogIcon color="warning" /> },
    { label: t("contact"), path: "/contact", icon: <ContactMailIcon color="error" /> },
    { label: t("contact-admin"), path: "/contact-admin", icon: <ContactMailIcon color="error" /> },
    { label: t("resume"), path: "/resume", icon: <ResumeIcon color="primary" /> },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("Logged out");
    handleMenuClose();
  };

  // Handle initial dark mode state from localStorage or a default value
  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      toggleDarkMode(true);
    }
  }, [toggleDarkMode]);

  // Handle the dark mode toggle
  const handleDarkModeToggle = () => {
    toggleDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode); // Store the preference in localStorage
  };

  // Handle language change
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    dispatch(setLanguage(selectedLanguage)); // Dispatch the language change to Redux
    i18n.changeLanguage(selectedLanguage); // Change the language using i18n
    localStorage.setItem('language', selectedLanguage); // Store the language preference
  };

  // Set initial language from localStorage or default to 'fr'
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    i18n.changeLanguage(savedLanguage);
    dispatch(setLanguage(savedLanguage)); // Set the initial language in Redux
  }, [i18n, dispatch]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginLeft: 10 }} />
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              {t("fullStackDeveloper")}
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button key={item.label} color="inherit" component={Link} to={item.path} startIcon={item.icon}>
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Language Selection */}
          <FormControl sx={{ minWidth: 120, marginRight: 2 }} size="small">
            <InputLabel id="language-select-label" sx={{ color: "white" }}>
              <LanguageIcon sx={{ marginRight: 1 }} />
              {t("language")}
            </InputLabel>
            <Select
              labelId="language-select-label"
              value={currentLanguage} // Use the current language from Redux
              onChange={handleLanguageChange}
              label={t("language")}
              sx={{ color: "white", borderColor: "white" }}
            >
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="en">English</MenuItem>
         
            </Select>
          </FormControl>

          {/* Dark Mode Toggle */}
          <IconButton onClick={handleDarkModeToggle} color="inherit">
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {/* Login/Profile Menu */}
          {loggedIn ? (
            <>
              <IconButton edge="end" onClick={handleMenuOpen} color="inherit">
                <Avatar alt="User" src="/assets/images/default-avatar.png" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
                <MenuItem component={Link} to="/profile">
                  <AccountCircleIcon /> {t("profile")}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon /> {t("logout")}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              {t("login")}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;

//! original
// import {
//   AccountCircle as AccountCircleIcon,
//   Article as BlogIcon,
//   ContactMail as ContactMailIcon,
//   Brightness4 as DarkModeIcon,
//   ExitToApp as ExitToAppIcon,
//   Home as HomeIcon,
//   Language as LanguageIcon,
//   Brightness7 as LightModeIcon,
//   Menu as MenuIcon,
//   Description as ResumeIcon,
//   Work as WorkIcon,
// } from "@mui/icons-material";
// import {
//   AppBar,
//   Avatar,
//   Box,
//   Button,
//   Drawer,
//   FormControl,
//   IconButton,
//   InputLabel,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Menu,
//   MenuItem,
//   Select,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next"; // Hook for translation
// import { Link } from "react-router-dom";
// import { logo } from "../../assets"; // Import the logo




// const Navbar = ({ darkMode, toggleDarkMode }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const isMenuOpen = Boolean(anchorEl);
//   const loggedIn = false; // Replace with actual authentication logic
//   const { t, i18n } = useTranslation(); // Translation hook



//   const navItems = [
//     { label: t("home"), path: "/", icon: <HomeIcon color="primary" /> },
//     { label: t("about"), path: "/about", icon: <AccountCircleIcon color="secondary" /> },
//     { label: t("projects"), path: "/projects", icon: <WorkIcon color="success" /> },
//     { label: t("experience"), path: "/experience", icon: <WorkIcon color="info" /> },
//     { label: t("blog"), path: "/blog", icon: <BlogIcon color="warning" /> },
//     { label: t("contact"), path: "/contact", icon: <ContactMailIcon color="error" /> },
//     { label: t("resume"), path: "/resume", icon: <ResumeIcon color="primary" /> },
//   ];

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };
//   const handleLogout = () => {
//     console.log("Logged out");
//     handleMenuClose();
//   };

//   // Handle initial dark mode state from localStorage or a default value
//   useEffect(() => {
//     if (localStorage.getItem('darkMode') === 'true') {
//       toggleDarkMode(true);
//     }
//   }, [toggleDarkMode]);

//   // Handle the dark mode toggle
//   const handleDarkModeToggle = () => {
//     toggleDarkMode(!darkMode);
//     localStorage.setItem('darkMode', !darkMode); // Store the preference in localStorage
//   };

//   // Handle language change
//   const handleLanguageChange = (event) => {
//     const selectedLanguage = event.target.value;
//     i18n.changeLanguage(selectedLanguage); // Change the language using i18n
//     localStorage.setItem('language', selectedLanguage); // Store the language preference
//   };

//   // Set initial language from localStorage or default to 'fr'
//   useEffect(() => {
//     const savedLanguage = localStorage.getItem('language') || 'fr';
//     i18n.changeLanguage(savedLanguage);
//   }, [i18n]);

//   return (
//     <>
//       <AppBar position="fixed">
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           {/* Logo */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
//               <MenuIcon />
//             </IconButton>
//             <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginLeft: 10 }} />
//             <Typography variant="h6" sx={{ marginLeft: 2 }}>
//               {t("fullStackDeveloper")}
//             </Typography>
//           </Box>

//           {/* Desktop Navigation */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//             {navItems.map((item) => (
//               <Button key={item.label} color="inherit" component={Link} to={item.path} startIcon={item.icon}>
//                 {item.label}
//               </Button>
//             ))}
//           </Box>

//           {/* Language Selection */}
//           {/* <FormControl sx={{ minWidth: 120, marginRight: 2 }} size="small">
//             <InputLabel id="language-select-label" sx={{ color: "white" }}>
//               <LanguageIcon sx={{ marginRight: 1 }} />
//               {t("language")}
//             </InputLabel>
//             <Select
//               labelId="language-select-label"
//               value={i18n.language}
//               onChange={handleLanguageChange}
//               label={t("language")}
//               sx={{ color: "white", borderColor: "white" }}
//             >
//               <MenuItem value="fr">Français</MenuItem>
//               <MenuItem value="en">English</MenuItem>
//               {/* <MenuItem value="zh">中文 (Chinese)</MenuItem> */}
//             {/* </Select>
//           </FormControl>  */}

//           {/* Language Selection */}
//           <FormControl sx={{ minWidth: 120, marginRight: 2 }} size="small">
//             <InputLabel id="language-select-label" sx={{ color: "white" }}>
//               <LanguageIcon sx={{ marginRight: 1 }} />
//               {t("language")}
//             </InputLabel>
//             <Select
//               labelId="language-select-label"
//               value={currentLanguage} // Use the current language from Redux
//               onChange={handleLanguageChange}
//               label={t("language")}
//               sx={{ color: "white", borderColor: "white" }}
//             >
//               <MenuItem value="fr">Français</MenuItem>
//               <MenuItem value="en">English</MenuItem>
//               <MenuItem value="zh">中文 (Chinese)</MenuItem>
//             </Select>
//           </FormControl>


//           {/* Dark Mode Toggle */}
//           <IconButton onClick={handleDarkModeToggle} color="inherit">
//             {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
//           </IconButton>

//           {/* Login/Profile Menu */}
//           {loggedIn ? (
//             <>
//               <IconButton edge="end" onClick={handleMenuOpen} color="inherit">
//                 <Avatar alt="User" src="/assets/images/default-avatar.png" />
//               </IconButton>
//               <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
//                 <MenuItem component={Link} to="/profile">
//                   <AccountCircleIcon /> {t("profile")}
//                 </MenuItem>
//                 <MenuItem onClick={handleLogout}>
//                   <ExitToAppIcon /> {t("logout")}
//                 </MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <Button color="inherit" component={Link} to="/login">
//               {t("login")}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
//         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//           <List>
//             {navItems.map((item) => (
//               <ListItem button key={item.label} component={Link} to={item.path}>
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.label} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;

//! with english
// import {
//   AccountCircle as AccountCircleIcon,
//   Menu as MenuIcon,
//   ExitToApp as ExitToAppIcon,
//   Home as HomeIcon,
//   Work as WorkIcon,
//   ContactMail as ContactMailIcon,
//   Article as BlogIcon,
//   Description as ResumeIcon,
//   Brightness4 as DarkModeIcon,
//   Brightness7 as LightModeIcon,
// } from "@mui/icons-material";
// import {
//   AppBar,
//   Avatar,
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Menu,
//   MenuItem,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { logo } from "../../assets"; // Import the logo

// const Navbar = ({ darkMode, toggleDarkMode }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const isMenuOpen = Boolean(anchorEl);
//   const loggedIn = false; // Replace with actual authentication logic

//   const navItems = [
//     { label: "Home", path: "/", icon: <HomeIcon color="primary" /> },
//     { label: "About", path: "/about", icon: <AccountCircleIcon color="secondary" /> },
//     { label: "Projects", path: "/projects", icon: <WorkIcon color="success" /> },
//     { label: "Experience", path: "/experience", icon: <WorkIcon color="info" /> },
//     { label: "Blog", path: "/blog", icon: <BlogIcon color="warning" /> },
//     { label: "Contact", path: "/contact", icon: <ContactMailIcon color="error" /> },
//     { label: "Resume", path: "/resume", icon: <ResumeIcon color="primary" /> },
//   ];

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };
//   const handleLogout = () => {
//     console.log("Logged out");
//     handleMenuClose();
//   };

//   // Handle initial dark mode state from localStorage or a default value
//   useEffect(() => {
//     if (localStorage.getItem('darkMode') === 'true') {
//       toggleDarkMode(true);
//     }
//   }, [toggleDarkMode]);

//   // Handle the dark mode toggle
//   const handleDarkModeToggle = () => {
//     toggleDarkMode(!darkMode);
//     localStorage.setItem('darkMode', !darkMode); // Store the preference in localStorage
//   };

//   return (
//     <>
//       <AppBar position="fixed">
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           {/* Logo */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
//               <MenuIcon />
//             </IconButton>
//             <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginLeft: 10 }} />
//             <Typography variant="h6" sx={{ marginLeft: 2 }}>
//               Full-Stack-Developer
//             </Typography>
//           </Box>

//           {/* Desktop Navigation */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//             {navItems.map((item) => (
//               <Button key={item.label} color="inherit" component={Link} to={item.path} startIcon={item.icon}>
//                 {item.label}
//               </Button>
//             ))}
//           </Box>

//           {/* Dark Mode Toggle */}
//           <IconButton onClick={handleDarkModeToggle} color="inherit">
//             {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
//           </IconButton>

//           {/* Login/Profile Menu */}
//           {loggedIn ? (
//             <>
//               <IconButton edge="end" onClick={handleMenuOpen} color="inherit">
//                 <Avatar alt="User" src="/assets/images/default-avatar.png" />
//               </IconButton>
//               <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
//                 <MenuItem component={Link} to="/profile">
//                   <AccountCircleIcon /> Profile
//                 </MenuItem>
//                 <MenuItem onClick={handleLogout}>
//                   <ExitToAppIcon /> Logout
//                 </MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <Button color="inherit" component={Link} to="/login">
//               Login
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
//         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//           <List>
//             {navItems.map((item) => (
//               <ListItem button key={item.label} component={Link} to={item.path}>
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.label} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;
