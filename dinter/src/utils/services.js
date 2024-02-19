import axios from "axios";

const baseUrl = `http://localhost:3008/api/v1`;

export const postRequest = async(url, body) => {
    await axios.post(baseUrl + url, body)
            .then(response => {return response})
            .catch(error => {return error.response})
};

export const getRequest = async(url) => {
    await axios.post(baseUrl + url)
            .then(response => {return response})
            .catch(error => {return error.response})
};