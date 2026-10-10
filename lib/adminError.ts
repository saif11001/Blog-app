import axios from "axios";
import { toast } from "react-toastify";

// Shared error handling for the admin pages:
// an expired session sends the admin back to the login page, anything else shows a message
export function handleAdminError(error: unknown, fallback: string) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
        window.location.href = "/login";
        return;
    }

    const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.response?.data?.msg
        : undefined;

    toast.error(message || fallback);
}
