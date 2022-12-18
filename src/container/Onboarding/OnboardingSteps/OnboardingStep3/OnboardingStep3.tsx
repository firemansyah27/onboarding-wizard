import React from "react";

interface Props {
  submitRef3?: React.LegacyRef<HTMLButtonElement> | undefined;
}
const OnboardingStep3: React.FunctionComponent<Props> = ({ submitRef3 }) => {
  return <p>Step 3</p>;
};

export default OnboardingStep3;
