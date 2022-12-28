import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import Cookies from "js-cookie";

interface ObjectData {
    [key: string]: any;
}

export const isAuthed = (): boolean => {
    const accessToken = Cookies.get("jwtToken");

    if (!accessToken) {
        return false;
    }
    const isAccessExp = isExpired(accessToken);
    if (!isAccessExp) {
        return true;
    }
    return false;
};

const isExpired = (token: string) => {
    try {
        const tokenData: ObjectData = jwt_decode(token);
        return dayjs.unix(tokenData.exp).diff(dayjs()) < 1;
    } catch (e) {
        return true;
    }
};
