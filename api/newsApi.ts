import axios from 'axios';

const newsApi = axios.create({
    baseURL: process.env.BASE_URL,
    params: {
        apikey: process.env.API_KEY,
        video: 0,
        removeduplicate: 1
    },
    timeout: 10000,
    timeoutErrorMessage: 'Request timed out',
});

export default newsApi;