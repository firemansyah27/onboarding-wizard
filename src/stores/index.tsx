import React from "react";
import { OnboardingStore } from "./onboarding/onboardingStore";

const onboardingStore = new OnboardingStore({
  company_name: "",
  npwp: "",
  address: "",
  district: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
  contact_person: "",
  email: "",
  phone1: "",
  phone2: "",
  fax: "",
  website: "",
  jne_loyalty_card: "",
  logo_url: "",
});

const StoreContext = React.createContext({
  onboardingStore,
});

export default StoreContext;
