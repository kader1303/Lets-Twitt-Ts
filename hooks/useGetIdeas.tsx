import LetsTwittApi from "../api/LetsTwittApi";

interface ideaDetails {
    setIdea(objective: string): Promise<any>;
  }

class IdeasDetailsImpl {
    
    async setIdea(objective: string): Promise<any>{
        const objectiveEncoded = encodeURIComponent(objective);
        // console.log(`Theme encoded: ` + themeEncoded);
        try {
            const response = await LetsTwittApi.get(`/letstwitt/getideas?objectives=${objectiveEncoded}`);
            return response.data;
        } catch (error) {
            console.log('Error: ' + JSON.stringify(error.response?.data));
            const apierr = JSON.parse(JSON.stringify(error.response?.data));
            return Promise.resolve(apierr);
        }
    }
}

export const useGetIdeas = async (objective: string) => {
    const ideasDetails = new IdeasDetailsImpl();
    const response = await ideasDetails.setIdea(objective);
    return response.result.choices[0].text;
}
