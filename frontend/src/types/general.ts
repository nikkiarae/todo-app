import { PaletteOptions } from "@mui/material";

export interface CustomPalette {
    light: PaletteOptions;
    dark: PaletteOptions;
  }

  export interface Todo {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
  }