import { useContext } from "react";
import { AuthContext } from "store/AuthContext";

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth
}

export default useAuth