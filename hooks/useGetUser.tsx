import type { AxiosError } from "axios";
import LetsTwittApi from "../api/LetsTwittApi";
import type { UserInfo, UserInfoClass } from '../interface/userinterface';

interface userDetails {
  getUser(userID: string): Promise<UserInfo>;
}

class getUserDetail implements userDetails {
    
  async getUser(userID: string): Promise<UserInfo>{

      try{
        const response = await LetsTwittApi.get(`/letstwitt/getuser?userId=${userID}`);
          return Promise.resolve(response.data);
      } catch (error) {
          let errorResponse = (error as AxiosError);
          console.log('Error: ' + JSON.stringify(errorResponse.response?.data));
          const apierr:UserInfo = JSON.parse(JSON.stringify(errorResponse.response?.data));
          return Promise.resolve(apierr); 
      }
  }
  
}

const useGetUser = async (userID: string) => {
    const twittDetails = new getUserDetail();
    const response = await twittDetails.getUser(userID);
    return response.userInfo;
};

export default useGetUser;