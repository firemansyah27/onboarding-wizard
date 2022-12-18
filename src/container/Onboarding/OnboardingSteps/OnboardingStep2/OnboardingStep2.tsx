import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";
import CustomTabs from "./Tabs";
import styles from "./OnboardingStep2.module.scss";
interface Props {
    submitRef2?: React.LegacyRef<HTMLButtonElement> | undefined;
}

const OnboardingStep2: React.FunctionComponent<Props> = ({ submitRef2 }) => {
    return (
        <Box className={styles.step1Container}>
            <Typography className={styles.title}>Integrasi Channel</Typography>
            <Typography className={styles.titleDescription}>
                Lengkapi informasi umum perusahaan dan tentukan pencatatan
                keuangan Anda.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <CustomTabs />
        </Box>
    );
};

export default OnboardingStep2;
