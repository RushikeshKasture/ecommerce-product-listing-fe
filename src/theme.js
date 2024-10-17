import { createTheme } from "@mui/material/styles";
import { grey, indigo, green, red, amber, blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    secondary: {
      main: indigo[500],
    },
    success: {
      main: green[500],
    },
    danger: {
      main: red[500],
    },
    warning: {
      main: amber[500],
    },
    info: {
      main: blue[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: grey[500],
          color: "#fff",
          "&:hover": {
            backgroundColor: grey[700],
          },
        },
        outlined: {
          borderColor: grey[500],
          color: grey[500],
          "&:hover": {
            backgroundColor: grey[50],
          },
        },
      },
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          "& .MuiBox-root": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30vw",
            height: "40vh",
            backgroundColor: grey[200],
            borderRadius: "8px",
            borderColor: grey[500],
            boxShadow: 24,
            padding: "1rem",
          },
        },
      },
    },
  },
});

export default theme;
