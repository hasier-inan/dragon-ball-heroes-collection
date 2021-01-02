import 'isomorphic-fetch';

const fetchResponse = (config) => {
    const {url, method} = config;
    return fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
    }).then((response) => {
        if (!response.ok) {
            return ({error: true});
        }
        return response.json();
    }).then((data) => {
        return data;
    }).catch(function (error) {
        return ({error: true, message: error});
    });
}

const url = "./dbh-";
const extension = ".json";

export const fetchCollection = (key) => {
    return fetchResponse({
        url: `${url}${key}${extension}`,
        method: 'GET'
    });
};
