import React from "react";
import { OnboardingStore } from "./onboarding/onboardingStore";

const onboardingStore = new OnboardingStore();

export const StoreContext = React.createContext({
  onboardingStore,
});
