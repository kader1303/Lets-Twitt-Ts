import LetsTwittApi from "../api/LetsTwittApi";

class TwittDetailsImpl {
    async twitt(tema, description, creativity) {
        try {
            const response = await LetsTwittApi.put('/letstwitt/gettwitt', {
                tema,
                description,
                creativity
            });
            return response.data;
        } catch (error) {
            console.log('Error: ' + JSON.stringify(error.response?.data));
            const apierr = JSON.parse(JSON.stringify(error.response?.data));
            return Promise.resolve(apierr);
        }
    }
}

const useGetTwitt = async (tema, description, creativity) => {
    const twittDetails = new TwittDetailsImpl();
    const response = await twittDetails.twitt(tema, description, creativity);
    return response.result.choices[0].text;
};

export default useGetTwitt;