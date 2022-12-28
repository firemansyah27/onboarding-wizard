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

export const concatAdressValue = (obj: ProfileData): string => {
    let result = "";
    const addressKeys = [
        "address",
        "district",
        "city",
        "state",
        "postcode",
        "country",
    ];
    for (const [key, value] of Object.entries(obj)) {
        if (addressKeys.includes(key) && value != "") {
            if (key == "address") {
                result += value;
            } else {
                result += `, ${value}`;
            }
        }
    }
    return result;
};

export const convertNullToEmptyString = (data: {
    [key: string]: string | null;
}) => {
    const formattedData = JSON.parse(
        JSON.stringify(data, function (key, value) {
            return value === null || value === "default" ? "" : value;
        })
    );
    return formattedData;
};

export const makeId = (length: number) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};
