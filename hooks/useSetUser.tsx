import type { AxiosError } from "axios";
import LetsTwittApi from "../api/LetsTwittApi";
import type { UserInfo, UserInfoClass } from '../interface/userinterface';

interface userDetails {
  setUser(user: UserInfoClass): Promise<UserInfo>;
}

class UserDetail implements userDetails {
    
  async setUser(user: UserInfoClass): Promise<UserInfo>{

      try{
        const response = await LetsTwittApi.post('/letstwitt/postuserinfo', user);
          return Promise.resolve(response.data);
      } catch (error) {
          let errorResponse = (error as AxiosError);
          console.log('Error: ' + JSON.stringify(errorResponse.response?.data));
          const apierr:UserInfo = JSON.parse(JSON.stringify(errorResponse.response?.data));
          return Promise.resolve(apierr); 
      }
  }
  
}

const useSetUser = async (user: UserInfoClass) => {
    const twittDetails = new UserDetail();
    const response = await twittDetails.setUser(user);
    return response.userInfo;
};

export default useSetUser;