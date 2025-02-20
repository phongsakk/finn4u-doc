import api from "@utils/api";
import * as auth from "./auth";
import * as asset from "./asset";
import axios from "axios";

const healthCheck = async () => {
    const url = api("/");
    const response = await axios.get(url);
    return response;
}

export default {
    healthCheck: healthCheck,
    auth: auth,
    asset: asset
}