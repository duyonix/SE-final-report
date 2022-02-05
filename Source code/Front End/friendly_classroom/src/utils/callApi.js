import { api } from "./config";
import axios from 'axios';
export const callApi = (uri, method = "GET", data, headers) => {
    return axios({
        method,
        url: api + "/" + uri,
        data,
        headers
    })
}
