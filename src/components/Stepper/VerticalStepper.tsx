import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepConnector from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import styles from "./VerticalStepper.module.scss";
// import { createTheme, ThemeProvider } from "@mui/material";

// const theme = createTheme({ typography: { fontSize: 20 } });
// import StepContent from "@mui/material/StepContent";
// import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";

const steps = [
  {
    label: "Informasi Perusahaan",
  },
  {
    label: "Integrasi Channel",
  },
  {
    label: "Pemilihan Toko Master",
  },
  {
    label: "Download Produk Toko Non Master",
  },
  {
    label: "Penggabungan SKU",
  },
  {
    label: "Pengaturan Produk Bundle",
  },
  {
    label: "Pengaturan Lokasi dan Stock",
  },
  {
    label: "Singkronisasi Pesanan",
  },
  {
    label: "Konfirmasi Data Onboarding",
  },
  {
    label: "Selesai",
  },
];

const VerticalStepper: React.FunctionComponent = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  //   const handleNext = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };

  //   const handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   };

  //   const handleReset = () => {
  //     setActiveStep(0);
  //   };

  const getLabelColor = (index: number) => {
    if (index === activeStep) {
      return "text.secondary";
    }
    return "text.disabled";
  };

  return (
    <Box sx={{ boxShadow: 3, borderRadius: 3, bgcolor: "#FFFFFF", p: 3 }}>
      <Stepper
        activeStep={activeStep}
        connector={<StepConnector sx={{ ml: 1.7 }} />}
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconProps={{ sx: { fontSize: 30 } }}>
              <Typography
                className={styles.stepperLabel}
                color={getLabelColor(index)}
              >
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export { VerticalStepper };
