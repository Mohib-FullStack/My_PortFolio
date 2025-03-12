import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Update with your preferred color
    },
    secondary: {
      main: "#dfd9ff",
    },
  },
  typography: {
    heroHeadText: {
      fontWeight: 900,
      color: "white",
      fontSize: {
        xs: "40px",
        sm: "50px",
        md: "60px",
        lg: "80px",
      },
      lineHeight: {
        lg: "98px",
      },
      mt: 2,
    },
    heroSubText: {
      color: "#dfd9ff",
      fontWeight: 500,
      fontSize: {
        xs: "16px",
        sm: "20px",
        md: "26px",
        lg: "30px",
      },
      lineHeight: {
        lg: "40px",
      },
    },
    sectionHeadText: {
      color: "white",
      fontWeight: 900,
      fontSize: {
        xs: "30px",
        sm: "40px",
        md: "50px",
        lg: "60px",
      },
    },
    sectionSubText: {
      textTransform: "uppercase",
      letterSpacing: "wider",
      color: "secondary.main",
      fontSize: {
        xs: "14px",
        sm: "18px",
      },
    },
  },
  // Corrected spacing configuration
  spacing: 8, // Use a number here, which will be multiplied by the provided factor (e.g., theme.spacing(2) will give you 16px)

});

export default theme;
