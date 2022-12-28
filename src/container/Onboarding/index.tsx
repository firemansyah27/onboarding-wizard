import React, { useContext, useEffect, useState } from "react";
import OnboardingContentContainer from "./OnboardingContentContainer";
import VerticalStepper from "../../components/Stepper";
import Grid from "@mui/material/Grid";
import { observer } from "mobx-react";
import StoreContext from "../../stores";
import { Skeleton, Typography, Box } from "@mui/material";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import jubelioLogo from "../../assets/jubelio.png";
import { isResponseSuccess } from "../../utils";
import CustomDialogs from "../../components/Dialog/Dialog";
import JubelioIcon from "../../assets/jubelio-icon.png";
import { CustomButton } from "../../components/Button/Button";
import Swal from "sweetalert2";

const OnboardingContainer = () => {
    const [open, setOpen] = useState(false);
    const { onboardingStore } = useContext(StoreContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);

        const initData = async () => {
            onboardingStore.startLoading();
            await onboardingStore.getCurrentStep();
            if (onboardingStore.activeStep === 0) {
                await onboardingStore.getProfileData();
            }
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
        initData();
    }, []);

    const handleOnClick = () => {
        setOpen(false);
    };
    return (
        <>
            {onboardingStore.isLoading ? (
                <div className={styles.App}>
                    <div className={styles.logoJubelio}>
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            sx={{
                                minWidth: 300,
                                minHeight: 45,
                                borderRadius: 10,
                            }}
                        />
                    </div>
                    <div className={styles.textLogo}>
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            sx={{
                                minWidth: 639,
                                minHeight: 19,
                                borderRadius: 10,
                            }}
                        />
                    </div>
                    <div className={styles.onboardingContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Skeleton
                                    animation="wave"
                                    height={"80vh"}
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Skeleton
                                    animation="wave"
                                    height={"70vh"}
                                    variant="rectangular"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            ) : (
                <div className={styles.App}>
                    <div className={styles.logoJubelio}>
                        <img src={jubelioLogo} alt="logo" />
                    </div>
                    <div className={styles.textLogo}>{t("title")}</div>
                    <div className={styles.onboardingContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <VerticalStepper
                                    activeStep={onboardingStore.activeStep}
                                    orientation={"vertical"}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <OnboardingContentContainer />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )}

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
        </>
    );
};

export default observer(OnboardingContainer);
