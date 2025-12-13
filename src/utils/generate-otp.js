import { generate } from 'otp-generator';

export const generateOTP = () => {
    const otp = generate(6, {
        specialChars: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false
    });
    return otp
}