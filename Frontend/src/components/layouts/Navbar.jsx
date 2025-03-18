import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  ContactMail as ContactMailIcon,
  Article as BlogIcon,
  Description as ResumeIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets"; // Import the logo

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const loggedIn = false; // Replace with actual authentication logic

  const navItems = [
    { label: "Home", path: "/", icon: <HomeIcon color="primary" /> },
    { label: "About", path: "/about", icon: <AccountCircleIcon color="secondary" /> },
    { label: "Projects", path: "/projects", icon: <WorkIcon color="success" /> },
    { label: "Experience", path: "/experience", icon: <WorkIcon color="info" /> },
    { label: "Blog", path: "/blog", icon: <BlogIcon color="warning" /> },
    { label: "Contact", path: "/contact", icon: <ContactMailIcon color="error" /> },
    { label: "Resume", path: "/resume", icon: <ResumeIcon color="primary" /> },
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
              Full-Stack-Developer
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
                  <AccountCircleIcon /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
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
