import React from "react";
import { OnboardingStore } from "./onboarding/onboardingStore";

const onboardingStore = new OnboardingStore();

const StoreContext = React.createContext({
  onboardingStore,
});

export default StoreContext;
