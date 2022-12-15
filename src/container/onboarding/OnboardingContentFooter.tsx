import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
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
    console.log("masuk sini");
    // showToolTip(event);
    console.log(submitRef?.current);
    submitRef?.current?.click();
    // onboardingStore.nextStep();
  };

  const handleClickPrevious = (event: React.MouseEvent<HTMLButtonElement>) => {
    showToolTip(event);
    onboardingStore.previousStep();
  };

  const showToolTip = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("trigger-tooltip");
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
            <Typography>Butuh Bantuan?</Typography>
          </Box>
          <Box className="item-footer">
            <img
              className={styles.youtubeLogo}
              src={youtubeLogo}
              alt="youtube"
            />
            <Typography>Melakukan Pengaturan Awal</Typography>
          </Box>
        </Box>
        <Box className={styles.buttonContainer}>
          <Popover childNode={anchorEl} onClose={handleClose} />
          <Button
            className={styles.buttonPrevious}
            variant={"contained"}
            name={"Sebelumnya"}
            onClick={handleClickPrevious}
            startIcon={
              <KeyboardArrowLeftIcon className={styles.buttonPreviousArrow} />
            }
          />
          <Button
            className={styles.buttonNext}
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
