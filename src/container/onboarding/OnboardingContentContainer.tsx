import React from "react";
import Box from "@mui/material/Box";
import {
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingStep5,
  OnboardingStep6,
  OnboardingStep7,
  OnboardingStep8,
  OnboardingStep9,
  OnboardingStep10,
} from "./onboarding-steps";
const OnboardingContentContainer: React.FunctionComponent = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const onboardingSteps = [
    <OnboardingStep1 key={"Step-1"} />,
    <OnboardingStep2 key={"Step-2"} />,
    <OnboardingStep3 key={"Step-3"} />,
    <OnboardingStep4 key={"Step-4"} />,
    <OnboardingStep5 key={"Step-5"} />,
    <OnboardingStep6 key={"Step-6"} />,
    <OnboardingStep7 key={"Step-7"} />,
    <OnboardingStep8 key={"Step-8"} />,
    <OnboardingStep9 key={"Step-9"} />,
    <OnboardingStep10 key={"Step-10"} />,
  ];

  //   const handleNext = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };

  //   const handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   };

  //   const handleReset = () => {
  //     setActiveStep(0);
  //   };

  return (
    <Box
      sx={{
        boxShadow: 3,
        borderRadius: 3,
        bgcolor: "#FFFFFF",
        p: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {onboardingSteps[0]}
    </Box>
  );
};

export { OnboardingContentContainer };
