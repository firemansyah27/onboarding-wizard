import React, { useContext } from "react";
import jubelioLogo from "./assets/jubelio.png";

import "./App.scss";
import VerticalStepper from "./components/Stepper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import OnboardingContent from "./container/Onboarding";
import StoreContext from "./stores";
import { observer } from "mobx-react";

const theme = createTheme({
    typography: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    },
    palette: {
        primary: { main: "#4B68EF" },
        text: {
            primary: "#163A50",
            secondary: "#4B68EF",
            disabled: "#E4E7EC",
        },
    },
    components: {
        MuiStepConnector: {
            styleOverrides: {
                lineVertical: {
                    minHeight: 32,
                },
            },
        },
    },
});

function App() {
    const { onboardingStore } = useContext(StoreContext);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className="logo-jubelio">
                    <img src={jubelioLogo} alt="logo" />
                </div>
                <div className="text-logo">
                    <Typography variant="subtitle1">
                        Pastikan Anda mengisi secara teliti agar tidak terjadi
                        pengulangan penginputan data ketika sudah live.
                    </Typography>
                </div>
                <div className="onboarding-container">
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <VerticalStepper
                                activeStep={onboardingStore.activeStep}
                                orientation={"vertical"}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <OnboardingContent />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default observer(App);
