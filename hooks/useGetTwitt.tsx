import LetsTwittApi from "../api/LetsTwittApi";

class TwittDetailsImpl {
    async twitt(tema) {
        try {
            const response = await LetsTwittApi.put('/letstwitt/gettwitt', {
                tema: tema,
            });
            return response.data;
        } catch (error) {
            console.log('Error: ' + JSON.stringify(error.response?.data));
            const apierr = JSON.parse(JSON.stringify(error.response?.data));
            return Promise.resolve(apierr);
        }
    }
}

const useGetTwitt = async (tema) => {
    const twittDetails = new TwittDetailsImpl();
    const response = await twittDetails.twitt(tema);
    return response.result.choices[0].text;
};

export default useGetTwitt;