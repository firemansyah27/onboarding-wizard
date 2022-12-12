import React from "react";
import logoJubelio from "./assets/jubelio.png";
import "./App.scss";
import VerticalStepper from "./components/Stepper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import OnboardingContent from "./container/onboarding";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
  },
  palette: {
    text: {
      primary: "#163A50",
      secondary: "#4B68EF",
      disabled: "#E4E7EC",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <div className="logo-jubelio">
            <img src={logoJubelio} alt="logo" />
          </div>
          <div className="text-logo">
            <Typography>
              Pastikan Anda mengisi secara teliti agar tidak terjadi pengulangan
              penginputan data ketika sudah live.
            </Typography>
          </div>
          <div className="onboarding-container">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <VerticalStepper />
              </Grid>
              <Grid item xs={9}>
                <OnboardingContent />
              </Grid>
            </Grid>
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
