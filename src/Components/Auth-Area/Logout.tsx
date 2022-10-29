import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../../Services/AuthServices";
import notifyService from "../../Services/NotifyService";

function Logout(): JSX.Element {
    const logout = async () => {
        await authServices.logout();
        notifyService.error("Logged-out...");
    }
    useEffect(() => {
        logout();
    });
    return null
}

export default Logout;
