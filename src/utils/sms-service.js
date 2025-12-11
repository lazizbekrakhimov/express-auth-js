import { envConfig } from "../config/env.js";
import { ApiError } from "./custom-error.js";

export const sendSMS = async (phoneNumber) => {
    const formdata = new FormData();
    formdata.append("mobile_phone", phoneNumber);
    formdata.append("message", "Bu Eskiz dan test");
    formdata.append("from", "4546");
    formdata.append("callback_url", "http://0000.uz/test.php");
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${envConfig.SMS_TOKEN}`
        },
        body: formdata,
        redirect: 'follow'
    };

    const res = await fetch("https://notify.eskiz.uz/api/message/sms/send", requestOptions);
    const data = await res.json();
    if (!data || data?.status === 'error') {
        throw new ApiError(data?.message || 'Error on sending SMS', 400);
    }
}