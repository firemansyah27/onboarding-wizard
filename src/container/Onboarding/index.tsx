import React, { useContext } from "react";
import OnboardingContentContainer from "./OnboardingContentContainer";
import VerticalStepper from "../../components/Stepper";
import Grid from "@mui/material/Grid";
import { observer } from "mobx-react";
import StoreContext from "../../stores";
import { Skeleton } from "@mui/material";

const OnboardingContainer = () => {
    const { onboardingStore } = useContext(StoreContext);
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                {onboardingStore.isLoading ? (
                    <Skeleton
                        animation="wave"
                        height={"80vh"}
                        variant="rectangular"
                    />
                ) : (
                    <VerticalStepper
                        activeStep={onboardingStore.activeStep}
                        orientation={"vertical"}
                    />
                )}
            </Grid>
            <Grid item xs={8}>
                {onboardingStore.isLoading ? (
                    <Skeleton
                        animation="wave"
                        height={"70vh"}
                        variant="rectangular"
                    />
                ) : (
                    <OnboardingContentContainer />
                )}
            </Grid>
        </Grid>
    );
};

export default observer(OnboardingContainer);
