import { authServices } from "../../Services/AuthServices";
import notifyService from "../../Services/NotifyService";

async function Logout() {
    await authServices.logout();
    notifyService.error("Logged-out...");
}


export default Logout;
