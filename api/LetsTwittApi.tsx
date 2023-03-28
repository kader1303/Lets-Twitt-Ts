import axios from 'axios';

const LetsTwittApi = axios.create({
    baseURL: 'https://a-manyar.com:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default LetsTwittApi;