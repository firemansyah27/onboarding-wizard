import {
    makeObservable,
    action,
    runInAction,
    observable,
    extendObservable,
    makeAutoObservable,
    toJS,
} from "mobx";
import { apiGet, apiPost, apiPut, apiDelete } from "../../utils";
import { concatAdressValue, convertNullToEmptyString } from "../../utils";

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

interface Adress {
    address: string | null;
    district: string | null;
    city: string | null;
    state: string | null;
    postcode: string | null;
    country: string | null;
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

type AccountSetting = "0" | "1" | "2";

export class OnboardingStore {
    activeStep: number = 1;
    profileData: ProfileData;
    address: string = "";
    provincesData: provincesData[] = [];
    citiesData: citiesData[] = [];
    districtsData: disctrictData[] = [];
    accountingSetting: AccountSetting = "0";
    image: File[] = [];
    imageUrl: string = "";

    constructor(profileData: ProfileData) {
        makeObservable(this, {
            activeStep: observable,
            profileData: observable,
            getProfileData: action,
            provincesData: observable,
            getProvincesData: action,
            citiesData: observable,
            getCitiesData: action,
            districtsData: observable,
            getDistrictsData: action,
            onSubmitFormAddress: action,
            accountingSetting: observable,
            setAccountingSetting: action,
            image: observable,
            imageUrl: observable,
            setImage: action,
            updateProfileData: action,
            setAdress: action,
            nextStep: action,
            previousStep: action,
        });
        this.profileData = profileData;
    }
    getProfileData = () => {
        const data = {
            company_name: "default",
            npwp: null,
            address: null,
            district: null,
            city: null,
            state: null,
            postcode: null,
            country: null,
            contact_person: null,
            email: null,
            phone1: null,
            phone2: null,
            fax: null,
            website: null,
            jne_loyalty_card: null,
            logo_url: null,
        };

        const newData = convertNullToEmptyString(data);
        this.profileData = newData;
        this.address = concatAdressValue(newData);
    };

    getProvincesData = () => {
        this.provincesData = [
            {
                province_id: "11",
                name: "ACEH",
            },
            {
                province_id: "12",
                name: "SUMATERA UTARA",
            },
            {
                province_id: "13",
                name: "SUMATERA BARAT",
            },
            {
                province_id: "14",
                name: "RIAU",
            },
            {
                province_id: "15",
                name: "JAMBI",
            },
            {
                province_id: "16",
                name: "SUMATERA SELATAN",
            },
            {
                province_id: "17",
                name: "BENGKULU",
            },
            {
                province_id: "18",
                name: "LAMPUNG",
            },
            {
                province_id: "19",
                name: "KEPULAUAN BANGKA BELITUNG",
            },
            {
                province_id: "21",
                name: "KEPULAUAN RIAU",
            },
            {
                province_id: "31",
                name: "DKI JAKARTA",
            },
            {
                province_id: "32",
                name: "JAWA BARAT",
            },
            {
                province_id: "33",
                name: "JAWA TENGAH",
            },
            {
                province_id: "34",
                name: "DAERAH ISTIMEWA YOGYAKARTA",
            },
            {
                province_id: "35",
                name: "JAWA TIMUR",
            },
            {
                province_id: "36",
                name: "BANTEN",
            },
            {
                province_id: "51",
                name: "BALI",
            },
            {
                province_id: "52",
                name: "NUSA TENGGARA BARAT",
            },
            {
                province_id: "53",
                name: "NUSA TENGGARA TIMUR",
            },
            {
                province_id: "61",
                name: "KALIMANTAN BARAT",
            },
            {
                province_id: "62",
                name: "KALIMANTAN TENGAH",
            },
            {
                province_id: "63",
                name: "KALIMANTAN SELATAN",
            },
            {
                province_id: "64",
                name: "KALIMANTAN TIMUR",
            },
            {
                province_id: "65",
                name: "KALIMANTAN UTARA",
            },
            {
                province_id: "71",
                name: "SULAWESI UTARA",
            },
            {
                province_id: "72",
                name: "SULAWESI TENGAH",
            },
            {
                province_id: "73",
                name: "SULAWESI SELATAN",
            },
            {
                province_id: "74",
                name: "SULAWESI TENGGARA",
            },
            {
                province_id: "75",
                name: "GORONTALO",
            },
            {
                province_id: "76",
                name: "SULAWESI BARAT",
            },
            {
                province_id: "81",
                name: "MALUKU",
            },
            {
                province_id: "82",
                name: "MALUKU UTARA",
            },
            {
                province_id: "91",
                name: "PAPUA",
            },
            {
                province_id: "92",
                name: "PAPUA BARAT",
            },
        ];
    };
    getCitiesData = () => {
        this.citiesData = [
            {
                city_id: "1101",
                province_id: "11",
                name: "KAB. ACEH SELATAN",
            },
            {
                city_id: "1102",
                province_id: "11",
                name: "KAB. ACEH TENGGARA",
            },
            {
                city_id: "1103",
                province_id: "11",
                name: "KAB. ACEH TIMUR",
            },
            {
                city_id: "1104",
                province_id: "11",
                name: "KAB. ACEH TENGAH",
            },
            {
                city_id: "1105",
                province_id: "11",
                name: "KAB. ACEH BARAT",
            },
            {
                city_id: "1106",
                province_id: "11",
                name: "KAB. ACEH BESAR",
            },
            {
                city_id: "1107",
                province_id: "11",
                name: "KAB. PIDIE",
            },
            {
                city_id: "1108",
                province_id: "11",
                name: "KAB. ACEH UTARA",
            },
            {
                city_id: "1109",
                province_id: "11",
                name: "KAB. SIMEULUE",
            },
            {
                city_id: "1110",
                province_id: "11",
                name: "KAB. ACEH SINGKIL",
            },
            {
                city_id: "1111",
                province_id: "11",
                name: "KAB. BIREUEN",
            },
            {
                city_id: "1112",
                province_id: "11",
                name: "KAB. ACEH BARAT DAYA",
            },
            {
                city_id: "1113",
                province_id: "11",
                name: "KAB. GAYO LUES",
            },
            {
                city_id: "1114",
                province_id: "11",
                name: "KAB. ACEH JAYA",
            },
            {
                city_id: "1115",
                province_id: "11",
                name: "KAB. NAGAN RAYA",
            },
            {
                city_id: "1116",
                province_id: "11",
                name: "KAB. ACEH TAMIANG",
            },
            {
                city_id: "1117",
                province_id: "11",
                name: "KAB. BENER MERIAH",
            },
            {
                city_id: "1118",
                province_id: "11",
                name: "KAB. PIDIE JAYA",
            },
            {
                city_id: "1171",
                province_id: "11",
                name: "KOTA BANDA ACEH",
            },
            {
                city_id: "1172",
                province_id: "11",
                name: "KOTA SABANG",
            },
            {
                city_id: "1173",
                province_id: "11",
                name: "KOTA LHOKSEUMAWE",
            },
            {
                city_id: "1174",
                province_id: "11",
                name: "KOTA LANGSA",
            },
            {
                city_id: "1175",
                province_id: "11",
                name: "KOTA SUBULUSSALAM",
            },
        ];
    };
    getDistrictsData = () => {
        this.districtsData = [
            {
                district_id: "110101",
                city_id: "1101",
                name: "Bakongan",
            },
            {
                district_id: "110102",
                city_id: "1101",
                name: "Kluet Utara",
            },
            {
                district_id: "110103",
                city_id: "1101",
                name: "Kluet Selatan",
            },
            {
                district_id: "110104",
                city_id: "1101",
                name: "Labuhan Haji",
            },
            {
                district_id: "110105",
                city_id: "1101",
                name: "Meukek",
            },
            {
                district_id: "110106",
                city_id: "1101",
                name: "Samadua",
            },
            {
                district_id: "110107",
                city_id: "1101",
                name: "Sawang",
            },
            {
                district_id: "110108",
                city_id: "1101",
                name: "Tapaktuan",
            },
            {
                district_id: "110109",
                city_id: "1101",
                name: "Trumon",
            },
            {
                district_id: "110110",
                city_id: "1101",
                name: "Pasi Raja",
            },
            {
                district_id: "110111",
                city_id: "1101",
                name: "Labuhan Haji Timur",
            },
            {
                district_id: "110112",
                city_id: "1101",
                name: "Labuhan Haji Barat",
            },
            {
                district_id: "110113",
                city_id: "1101",
                name: "Kluet Tengah",
            },
            {
                district_id: "110114",
                city_id: "1101",
                name: "Kluet Timur",
            },
            {
                district_id: "110115",
                city_id: "1101",
                name: "Bakongan Timur",
            },
            {
                district_id: "110116",
                city_id: "1101",
                name: "Trumon Timur",
            },
            {
                district_id: "110117",
                city_id: "1101",
                name: "Kota Bahagia",
            },
            {
                district_id: "110118",
                city_id: "1101",
                name: "Trumon Tengah",
            },
        ];
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

    updateProfileData = (key: keyof ProfileData, value: string | null) => {
        const newProfileData = this.profileData;
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

    getCurrentStep = () => {
        console.log("get-current-step");
    };
}
