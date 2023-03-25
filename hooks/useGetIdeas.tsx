import LetsTwittApi from "../api/LetsTwittApi";

interface ideaDetails {
    setIdea(theme: string): Promise<any>;
  }

class IdeasDetailsImpl {
    
    async setIdea(theme: string): Promise<any>{
        const themeEncoded = encodeURIComponent(theme);
        // console.log(`Theme encoded: ` + themeEncoded);
        try {
            const response = await LetsTwittApi.get(`/letstwitt/getideas?ideas=${themeEncoded}`);
            return response.data;
        } catch (error) {
            console.log('Error: ' + JSON.stringify(error.response?.data));
            const apierr = JSON.parse(JSON.stringify(error.response?.data));
            return Promise.resolve(apierr);
        }
    }
}

export const useGetIdeas = async (theme: string) => {
    const ideasDetails = new IdeasDetailsImpl();
    const response = await ideasDetails.setIdea(theme);
    return response.result.choices[0].text;
}
