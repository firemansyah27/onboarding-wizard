import React from "react";

interface Props {
  submitRef2?: React.LegacyRef<HTMLButtonElement> | undefined;
}

const OnboardingStep2: React.FunctionComponent<Props> = ({ submitRef2 }) => {
  return <p>Step 2</p>;
};

export default OnboardingStep2;
