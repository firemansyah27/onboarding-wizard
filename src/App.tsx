import React, { useContext, useEffect } from "react";
import jubelioLogo from "./assets/jubelio.png";

import "./App.scss";
import VerticalStepper from "./components/Stepper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import OnboardingContent from "./container/Onboarding";
import StoreContext from "./stores";
import { observer } from "mobx-react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
    useEffect(() => {
        const authentication = async () => {
            // await onboardingStore.authenticateUser({
            //     email: "rickrkop25@gmail.com",
            //     password: "Jadipedagang27!",
            // });
            await onboardingStore.getCurrentStep();
        };
        authentication();
    }, []);

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
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={onboardingStore.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </ThemeProvider>
    );
}

export default observer(App);
