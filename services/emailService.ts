
import emailjs from '@emailjs/browser';

interface BookingDetails {
    name: string;
    company: string;
    email: string;
    phone: string;
    date: string;
    time: string;
}

// Initialize with public key
// We normally init this once, but putting it in the function is safer if the key loads late
// or we can init at top level if keys are guaranteed.
const getEnv = (key: string) => {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env[key];
    }
    return '';
};

const PUBLIC_KEY = getEnv('VITE_EMAILJS_PUBLIC_KEY') || 'YOUR_PUBLIC_KEY';
const SERVICE_ID = getEnv('VITE_EMAILJS_SERVICE_ID') || 'YOUR_SERVICE_ID';
const TEMPLATE_ID = getEnv('VITE_EMAILJS_TEMPLATE_ID') || 'YOUR_TEMPLATE_ID';

export const sendBookingEmail = async (details: BookingDetails): Promise<boolean> => {
    if (!PUBLIC_KEY || PUBLIC_KEY.includes('YOUR_')) {
        console.warn('EmailJS Public Key not found. Email will not be sent.');
        return false;
    }

    try {
        const templateParams = {
            name: details.name,
            company: details.company,
            email: details.email,
            phone: details.phone,
            date: details.date,
            time: details.time,
            to_name: "Vatalique Admin" // Optional, keeps context
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
};
