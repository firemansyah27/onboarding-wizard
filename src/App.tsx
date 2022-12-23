import React, { useContext, useEffect, useState } from "react";
import jubelioLogo from "./assets/jubelio.png";

import "./App.scss";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import StoreContext from "./stores";
import { observer } from "mobx-react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import routes from "./routes";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomDialogs from "./components/Dialog/Dialog";
import JubelioIcon from "./assets/jubelio-icon.png";
import styles from "./App.module.scss";
import { CustomButton } from "./components/Button/Button";
import { isResponseSuccess } from "./utils";
import Swal from "sweetalert2";

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
    const [open, setOpen] = useState(false);
    const { onboardingStore } = useContext(StoreContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const authentication = async () => {
            const lng = navigator.language;
            i18n.changeLanguage(lng);

            onboardingStore.startLoading();
            await onboardingStore.authenticateUser({
                email: "rickrkop25@gmail.com",
                password: "Jadipedagang27!",
            });
            onboardingStore.getCurrentStep();
            await onboardingStore.getProfileData();
            if (
                onboardingStore.activeStep === 0 &&
                onboardingStore.profileData.company_name === ""
            ) {
                onboardingStore.startLoading();
                const res = await onboardingStore.wipeData();
                if (isResponseSuccess(res.status)) {
                    setOpen(true);
                } else {
                    Swal.fire("Failed!", res.data.error, "error");
                }
            }
            onboardingStore.finishedLoading();
        };
        authentication();
    }, []);

    const handleOnClick = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className="logo-jubelio">
                    <img src={jubelioLogo} alt="logo" />
                </div>
                <div className="text-logo">
                    {t("title")}
                    <Typography variant="subtitle1"></Typography>
                </div>
                <div className="onboarding-container">
                    <Routes>
                        {routes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Routes>
                </div>
            </div>

            {/* <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={onboardingStore.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop> */}

            <CustomDialogs
                open={open}
                fullWidth
                dividers={false}
                titleElement={<></>}
                content={
                    <Box
                        sx={{
                            px: 6,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 5,
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                height: "100%",
                                maxWidth: 200,
                                mb: 5,
                            }}
                            alt="The house from the offer."
                            src={JubelioIcon}
                        />
                        <Typography className={styles.dialogTitle}>
                            Selamat Datang diproses Onboarding Jubelio
                        </Typography>
                        <Typography className={styles.dialogDescription}>
                            Sebelum memulai proses onboarding
                        </Typography>
                        <Typography className={styles.dialogDescription}>
                            kami telah menghapus data data trial sebelumnya.
                        </Typography>
                        <CustomButton
                            className={styles.dialogButton}
                            variant={"contained"}
                            name={"Mulai Sekarang"}
                            size={"large"}
                            onClick={handleOnClick}
                        />
                    </Box>
                }
                actionContent={<></>}
            />
        </ThemeProvider>
    );
}

export default observer(App);
