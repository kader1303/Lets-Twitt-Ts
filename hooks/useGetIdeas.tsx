import LetsTwittApi from "../api/LetsTwittApi";


class IdeasDetailsImpl {
    async idea() {
        try {
            const response = await LetsTwittApi.get('/letstwitt/getideas');
            return response.data;
        } catch (error) {
            console.log('Error: ' + JSON.stringify(error.response?.data));
            const apierr = JSON.parse(JSON.stringify(error.response?.data));
            return Promise.resolve(apierr);
        }
    }
}

export const useGetIdeas = async () => {
    const ideasDetails = new IdeasDetailsImpl();
    const response = await ideasDetails.idea();
    return response.result.choices[0].text;
}
