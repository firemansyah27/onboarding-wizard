import {
  makeObservable,
  action,
  runInAction,
  observable,
  computed,
} from "mobx";
import { apiGet, apiPost, apiPut, apiDelete } from "../../utils";
import { concatAdressValue } from "../../utils";
interface ProfileData {
  company_name: string;
  website: string;
  npwp: string;
  address: string;
  district: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  contact_person: string;
  email: string;
  phone1: string;
  phone2: string;
  fax: string;
  jne_loyalty_card: string;
  logo_url: string;
}

interface Adress {
  address: string;
  district: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}
export class OnboardingStore {
  activeStep: number = 0;
  profileData: ProfileData = {
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
  };
  address: string = "";

  constructor() {
    makeObservable(this, {
      activeStep: observable,
      profileData: observable,
      getProfileData: action,
      nextStep: action,
      previousStep: action,
    });
  }
  getProfileData = () => {
    this.profileData = {
      company_name: "testasdfdf1",
      npwp: "testasdfdf",
      address: "Jl adress",
      district: "district",
      city: "city",
      state: "state",
      postcode: "postcode",
      country: "coundtry",
      contact_person: "testasdfdf",
      email: "testasdfdf",
      phone1: "testasdfdf",
      phone2: "testasdfdf",
      fax: "testasdfdf",
      website: "testasdfdf",
      jne_loyalty_card: "testasdfdf",
      logo_url: "testasdfdf",
    };

    const addressObj: Adress = {
      address: this.profileData.address,
      district: this.profileData.district,
      city: this.profileData.city,
      state: this.profileData.state,
      postcode: this.profileData.postcode,
      country: this.profileData.country,
    };

    this.address = concatAdressValue(
      ["address", "district", "city", "state", "postcode", "country"],
      addressObj
    );
  };

  nextStep = () => {
    this.activeStep++;
  };

  previousStep = () => {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  };

  getCurrentStep = () => {
    console.log("get-current-step");
  };
}
