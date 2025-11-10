import { Resend } from "resend";

let resendPromise: Resend | null;

const getResend = () => {
    if (!resendPromise) {
        resendPromise = new Resend(process.env.RESEND_API_KEY);
    }
    return resendPromise;
};

export default getResend;
