import React, { useContext, useRef } from "react";
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
import StoreContext from "../../stores";
import { observer } from "mobx-react";
import OnboardingContentFooter from "./OnboardingContentFooter";

const OnboardingContentContainer: React.FunctionComponent = () => {
  const { onboardingStore } = useContext(StoreContext);
  const submitRef1 = useRef(null);
  const submitRef2 = useRef(null);
  const submitRef3 = useRef(null);
  const submitRef4 = useRef(null);
  const submitRef5 = useRef(null);

  const submitRefs = [
    submitRef1,
    submitRef2,
    submitRef3,
    submitRef4,
    submitRef5,
  ];
  const onboardingSteps = [
    <OnboardingStep1 key={"Step-1"} submitRef1={submitRef1} />,
    <OnboardingStep2 key={"Step-2"} submitRef2={submitRef2} />,
    <OnboardingStep3 key={"Step-3"} submitRef3={submitRef3} />,
    <OnboardingStep4 key={"Step-4"} submitRef4={submitRef4} />,
    <OnboardingStep5 key={"Step-5"} submitRef5={submitRef5} />,
    <OnboardingStep6 key={"Step-6"} />,
    <OnboardingStep7 key={"Step-7"} />,
    <OnboardingStep8 key={"Step-8"} />,
    <OnboardingStep9 key={"Step-9"} />,
    <OnboardingStep10 key={"Step-10"} />,
  ];

  return (
    <>
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
        {onboardingSteps[onboardingStore.activeStep]}
      </Box>
      <OnboardingContentFooter
        submitRef={submitRefs[onboardingStore.activeStep]}
      />
    </>
  );
};

export default observer(OnboardingContentContainer);
