import { useContext } from "react";
import { accsesstoken } from "../../main";

function Logout() {
    const [token, setToken] = useContext(accsesstoken);
    setToken(null)
    // document.title="Shop | Logout"
    localStorage.clear();
    return (<div>logged out. see you soon... </div>)
}
export default Logout;