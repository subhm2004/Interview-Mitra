import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") || "dark";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: getInitialTheme() },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
        const html = document.documentElement;
        html.setAttribute("data-theme", action.payload);
        html.classList.toggle("theme-light", action.payload === "light");
        html.classList.toggle("theme-dark", action.payload === "dark");
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
        const html = document.documentElement;
        html.setAttribute("data-theme", state.theme);
        html.classList.toggle("theme-light", state.theme === "light");
        html.classList.toggle("theme-dark", state.theme === "dark");
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
