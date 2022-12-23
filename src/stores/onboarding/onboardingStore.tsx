import { makeObservable, action, runInAction, observable } from "mobx";
import Swal from "sweetalert2";
import { number } from "yup";
import {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    concatAdressValue,
    convertNullToEmptyString,
    isResponseSuccess,
    setToken,
    getToken,
} from "../../utils";
import { isEqual } from "lodash";

interface ProfileData {
    company_name: string | null;
    website: string | null;
    npwp: string | null;
    address: string | null;
    district: string | null;
    city: string | null;
    state: string | null;
    postcode: string | null;
    country: string | null;
    contact_person: string | null;
    email: string | null;
    phone1: string | null;
    phone2: string | null;
    fax: string | null;
    jne_loyalty_card: string | null;
    logo_url: string | null;
}

interface provincesData {
    province_id: string;
    name: string;
}
interface citiesData {
    city_id: string;
    province_id: string;
    name: string;
}

interface disctrictData {
    city_id: string;
    district_id: string;
    name: string;
}

interface ObjectData {
    [key: string]: any;
}

type AccountSetting = "0" | "1" | "2";

const token = getToken("jwtToken");

export class OnboardingStore {
    isLoading: boolean = false;
    activeStep: number = 0;
    lastOnboardingStep: number = 0;
    onboardingLastModified: string = "";
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
    profileDataHelper: ProfileData = {
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
    provincesData: provincesData[] = [];
    citiesData: citiesData[] = [];
    districtsData: disctrictData[] = [];
    accountingSetting: AccountSetting = "0";
    accountingSettingHelper: AccountSetting = "0";
    image: File[] = [];
    imageUrl: string = "";
    listStore: ObjectData[] = [];

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            startLoading: action,
            finishedLoading: action,
            wipeData: action,
            activeStep: observable,
            lastOnboardingStep: observable,
            onboardingLastModified: observable,
            profileData: observable,
            getProfileData: action,
            saveProfileData: action,
            provincesData: observable,
            getProvincesData: action,
            citiesData: observable,
            getCitiesData: action,
            districtsData: observable,
            getDistrictsData: action,
            onSubmitFormAddress: action,
            accountingSetting: observable,
            getAccountingSetting: action,
            setAccountingSetting: action,
            listStore: observable,
            getListStore: action,
            image: observable,
            imageUrl: observable,
            setImage: action,
            updateProfileData: action,
            setAdress: action,
            nextStep: action,
            previousStep: action,
            authenticateUser: action,
            connectWoocommerce: action,
            connectBukalapak: action,
        });
    }

    startLoading = () => {
        this.isLoading = true;
    };

    finishedLoading = () => {
        this.isLoading = false;
    };

    wipeData = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await apiPost(
            "onboarding",
            "/tenant/wipe-data",
            {},
            headers
        );
        return res;
    };

    authenticateUser = async (data: any) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const res = await apiPost("core", "/login", data, headers);
        if (isResponseSuccess(res.status)) {
            setToken("jwtToken", res.data.token);
            return;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    getProfileData = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await apiGet("bff", "/systemsetting/profile", headers);
        if (isResponseSuccess(res.status)) {
            runInAction(() => {
                const formattedData = convertNullToEmptyString(
                    res.data.profile_setting
                );
                this.profileData = formattedData;
                this.profileDataHelper = formattedData;
                this.imageUrl = formattedData.logo_url;
                this.address = concatAdressValue(formattedData);

                const accountingSetting =
                    res?.data?.accounting_setting?.setup?.use_accounting;
                this.accountingSetting = accountingSetting.toString();
                this.accountingSettingHelper = accountingSetting.toString();
            });
            return this.profileData;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    saveProfileData = async () => {
        if (
            !isEqual(this.profileData, this.profileDataHelper) ||
            this.image[0]
        ) {
            const headers = {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            };
            const formData = new FormData();
            if (this.imageUrl != this.profileData.logo_url && this.image) {
                formData.append("logo", this.image[0]);
            }
            const data: ObjectData = {};

            for (const [key, value] of Object.entries(this.profileData)) {
                if (
                    [
                        "company_name",
                        "website",
                        "npwp",
                        "address",
                        "district",
                        "city",
                        "state",
                        "postcode",
                        "country",
                    ].includes(key)
                ) {
                    data[key] = value;
                }
            }
            formData.append("model", JSON.stringify(data));
            const res = await apiPost(
                "core",
                "/systemsetting/profile",
                formData,
                headers
            );
            if (!isResponseSuccess(res.status)) {
                Swal.fire("Failed!", res.data.error, "error");
                return;
            }
            this.image = [];
        }
        if (this.accountingSetting != this.accountingSettingHelper) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const data = {
                data: {
                    use_accounting: this.accountingSetting,
                },
            };

            const res = await apiPost(
                "onboarding",
                "/wizard/save-setup",
                data,
                headers
            );

            if (isResponseSuccess(res.status)) {
                return;
            } else {
                Swal.fire("Failed!", res.data.error, "error");
                return;
            }
        }
        if (this.lastOnboardingStep === 0) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const data = {
                lastOnboardingStep: `${this.lastOnboardingStep}`,
                onboardingLastModified: this.onboardingLastModified,
                increaseOrDecreaseStep: "INCREASE",
            };

            const res = await apiPost(
                "onboarding",
                "/wizard/update-step",
                data,
                headers
            );

            if (isResponseSuccess(res.status)) {
                this.nextStep();
                return;
            }
            Swal.fire("Failed!", res.data.error, "error");
            return;
        }

        this.nextStep();
    };

    getProvincesData = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await apiGet("core", "/region/provinces", headers);
        if (isResponseSuccess(res.status)) {
            runInAction(() => {
                this.provincesData = res.data;
            });
            return this.provincesData;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    getCitiesData = async (province_name: string) => {
        const province = this.provincesData.find((v) => {
            return v.name === province_name;
        });
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await apiGet(
            "core",
            `/region/cities?province_id=${province?.province_id}`,
            headers
        );
        if (isResponseSuccess(res.status)) {
            runInAction(() => {
                this.citiesData = res.data;
            });
            return this.citiesData;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    getDistrictsData = async (city_name: string) => {
        const city = this.citiesData.find((v) => {
            return v.name === city_name;
        });
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await apiGet(
            "core",
            `/region/districts?city_id=${city?.city_id}`,
            headers
        );
        if (isResponseSuccess(res.status)) {
            runInAction(() => {
                this.districtsData = res.data;
            });
            return this.districtsData;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    setAdress = (profileData: ProfileData) => {
        this.address = concatAdressValue(profileData);
    };
    setImage = (image: File) => {
        this.image[0] = image;
        this.imageUrl = URL.createObjectURL(image);
    };

    setAccountingSetting = (value: AccountSetting) => {
        this.accountingSetting = value;
    };

    getAccountingSetting = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const data = {
            columns: ["use_accounting"],
        };
        const res = await apiPost(
            "onboarding",
            `/wizard/get-setup`,
            data,
            headers
        );
        if (isResponseSuccess(res.status)) {
            const accountingSetting = res?.data?.setup?.use_accounting;
            if (res?.data?.setup?.use_accounting) {
                runInAction(() => {
                    this.accountingSetting = accountingSetting.toString();
                    this.accountingSettingHelper = accountingSetting.toString();
                });
            }
            return;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    updateProfileData = (key: keyof ProfileData, value: string | null) => {
        const newProfileData = { ...this.profileData };
        newProfileData[key] = value;
        this.profileData = newProfileData;
    };

    onSubmitFormAddress = (data: ProfileData) => {
        this.profileData = data;
    };

    nextStep = () => {
        this.activeStep++;
    };

    previousStep = () => {
        if (this.activeStep > 0) {
            this.activeStep--;
        }
    };

    getCurrentStep = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await apiGet(
            "onboarding",
            "/wizard/get-current-step",
            headers
        );
        if (isResponseSuccess(res.status)) {
            runInAction(() => {
                this.activeStep = res.data.lastOnboardingStep;
                this.lastOnboardingStep = res.data.lastOnboardingStep;
                this.onboardingLastModified = res.data.onboardingLastModified;
            });
            return;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    getListStore = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await apiGet(
            "onboarding",
            "/marketplace/get-channel-order-sync",
            headers
        );
        if (isResponseSuccess(res.status)) {
            runInAction(() => {
                this.listStore = res.data;
            });
            return;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    deleteSyncStore = async (store_id: number) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await apiPost(
            "onboarding",
            "/marketplace/unregister-channel",
            { storeId: store_id },
            headers
        );
        if (isResponseSuccess(res.status)) {
            await this.getListStore();
            return;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    connectWoocommerce = async (data: ObjectData) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await apiPost(
            "core",
            "/woocommerce/register",
            data,
            headers
        );
        if (isResponseSuccess(res.status)) {
            await this.getListStore();
            return;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    generateLinkShopee = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const res = await apiGet(
            "core",
            "/shopee/authorize?state_url=http://localhost:3000",
            headers
        );
        if (isResponseSuccess(res.status)) {
            window.location.replace(res.data.url);
            // window.open(
            //     res.data.url,
            //     "sharer",
            //     "toolbar=0,status=0,width=600,height=800"
            // );
            return;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    generateLinkBukalapak = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const res = await apiGet("core", "/bukalapak/authorize-url", headers);
        if (isResponseSuccess(res.status)) {
            window.location.replace(res.data.url);
            return;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };

    connectBukalapak = async (auth_code: string) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const data = {
            isNext: true,
            code: `${auth_code}`,
        };
        const res = await apiPost(
            "core",
            "/bukalapak/authorize",
            data,
            headers
        );
        if (isResponseSuccess(res.status)) {
            await this.getListStore();
            return;
        }
        Swal.fire("Failed!", res.data.error, "error");
    };
}
