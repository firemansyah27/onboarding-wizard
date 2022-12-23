import React, { useEffect, useContext } from "react";
import { Box, Divider, Typography } from "@mui/material";
import CustomTabs from "./Tabs";
import styles from "./OnboardingStep2.module.scss";
import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react";
import StoreContext from "../../../../stores";

interface Props {
    submitRef2?: React.LegacyRef<HTMLButtonElement> | undefined;
}

const OnboardingStep2: React.FunctionComponent<Props> = ({ submitRef2 }) => {
    const { onboardingStore } = useContext(StoreContext);
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const auth_code = searchParams.get("code");
        if (auth_code) {
            onboardingStore.connectBukalapak(auth_code);
        }
    }, []);

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

export default observer(OnboardingStep2);
