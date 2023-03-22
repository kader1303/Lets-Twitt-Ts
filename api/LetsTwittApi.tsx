import axios from 'axios';

const LetsTwittApi = axios.create({
    baseURL: 'http://192.168.8.165:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default LetsTwittApi;