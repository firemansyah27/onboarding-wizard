import { makeObservable, action, runInAction, observable } from "mobx";
import { apiGet, apiPost, apiPut, apiDelete } from "../../utils";

export class OnboardingStore {
  activeStep: number = 0;

  constructor() {
    makeObservable(this, {
      getCurrentStep: action,
    });
  }

  nextStep = () => {};

  async getCurrentStep() {
    console.log("get-current-step");
  }
}
