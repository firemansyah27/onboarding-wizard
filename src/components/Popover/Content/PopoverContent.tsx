import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import styles from "./PopoverContent.module.scss";
import StoreContext from "../../../stores";
import { observer } from "mobx-react";

const PopoverContent1 = () => {
    const { onboardingStore } = useContext(StoreContext);
    const warningTexts = [
        "Anda belum dapat melanjutkan step jika belum melengkapi data informasi perusahaan.",
        "Integrasikan minimal 1 channel untuk melanjutkan step.",
    ];
    return (
        <>
            <Typography className={styles.content1}>Opps!</Typography>
            <Typography className={styles.content1Detail}>
                {warningTexts[onboardingStore.activeStep]}
            </Typography>
        </>
    );
};

export default observer(PopoverContent1);
