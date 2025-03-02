import { blue, orange } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material";

const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: blue[500],
    light: blue[100],
    dark: blue[900],
    contrastText: "#fff",
  },
  secondary: {
    main: orange[500],
    light: orange[100],
    dark: orange[900],
    contrastText: "#fff",
  },
  background: {},
  text: {},
  action: {},
};

const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: blue[700],
    light: blue[500],
    dark: blue[900],
    contrastText: "#fff",
  },
  secondary: {
    main: orange[700],
    light: orange[500],
    dark: orange[900],
    contrastText: "#fff",
  },
  background: {},
  text: {},
  action: {},
};

const theme = {
  dark: darkPalette,
  light: lightPalette,
};

export default theme;
