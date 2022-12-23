import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "../../components/Button";
import Popover from "../../components/Popover/Popover";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import whatsappLogo from "../../assets/whatsapp.png";
import youtubeLogo from "../../assets/youtube.png";
import styles from "./OnboardingContentFooter.module.scss";
import StoreContext from "../../stores";
import { observer } from "mobx-react";

interface Props {
    submitRef?: React.RefObject<HTMLButtonElement>;
}

const OnboardingContentFooter: React.FunctionComponent<Props> = ({
    submitRef,
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const { onboardingStore } = useContext(StoreContext);

    const handleClickNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isShowTooltips()) {
            showToolTip(event);
            return;
        }
        submitRef?.current?.click();
    };

    const handleClickPrevious = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onboardingStore.previousStep();
    };

    const showToolTip = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const isShowTooltips = (): boolean => {
        let showToolTip = false;
        switch (onboardingStore.activeStep) {
            case 0:
                showToolTip = isShowTooltipStep1();
                break;
            case 1:
                showToolTip = isShowTooltipStep2();
                break;
            default:
                break;
        }
        return showToolTip;
    };

    const isShowTooltipStep1 = (): boolean => {
        let showToolTip = false;
        const profileData = onboardingStore.profileData;
        const imageUrl = onboardingStore.imageUrl;
        const listTocheck = [
            "company_name",
            "address",
            "district",
            "city",
            "state",
            "postcode",
            "country",
        ];

        for (const [key, value] of Object.entries(profileData)) {
            if (listTocheck.includes(key)) {
                if (value === "") {
                    showToolTip = true;
                }
            }
        }

        return showToolTip || imageUrl === "";
    };

    const isShowTooltipStep2 = (): boolean => {
        return onboardingStore.listStore.length === 0;
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                mt: 0.5,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box className="footer-container">
                <Box className="footer-container">
                    <Box className="item-footer">
                        <img
                            className={styles.whatsappLogo}
                            src={whatsappLogo}
                            alt="whatsapp"
                        />
                        <Link href="https://www.jubelio.com" variant="body2">
                            <Typography className={styles.footerText}>
                                Butuh Bantuan?
                            </Typography>
                        </Link>
                    </Box>
                    <Box className="item-footer">
                        <img
                            className={styles.youtubeLogo}
                            src={youtubeLogo}
                            alt="youtube"
                        />
                        <Link href="https://www.jubelio.com" variant="body2">
                            <Typography className={styles.footerText}>
                                Melakukan Pengaturan Awal
                            </Typography>
                        </Link>
                    </Box>
                </Box>
                <Box className={styles.buttonContainer}>
                    <Popover childNode={anchorEl} onClose={handleClose} />
                    {onboardingStore.activeStep > 0 && (
                        <Button
                            className={styles.buttonPrevious}
                            variant={"contained"}
                            name={"Sebelumnya"}
                            onClick={handleClickPrevious}
                            startIcon={
                                <KeyboardArrowLeftIcon
                                    className={styles.buttonPreviousArrow}
                                />
                            }
                        />
                    )}
                    <Button
                        className={
                            isShowTooltips()
                                ? styles.buttonNextDisabled
                                : styles.buttonNext
                        }
                        variant={"contained"}
                        name={"Selanjutnya"}
                        onClick={handleClickNext}
                        endIcon={<KeyboardArrowRightIcon />}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default observer(OnboardingContentFooter);
