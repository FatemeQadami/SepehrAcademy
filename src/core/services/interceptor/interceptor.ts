import axios from "axios";
import { getItem } from "../storage/storage";
import Toast from 'react-native-toast-message';

axios.interceptors.response.use(
  (response) => {
    console.log("با موفقیت انجام شد");
    return response;
  },
  async (error) => {
    // check if error is expected from backend
    try {
      const expectedError =
        error.response &&
        error.response.state >= 400 &&
        error.response.status < 500;

      // if error doesnt expected when we log it
      if (!expectedError) {
        // tweak it later
        // get error message from backend (see object of response later... maybe its changed)
        try {
          console.log(error.response.data.message[0].message);
          Toast.show({type:"error" , text1:error.response.data.message[0].message});
        } catch (err) {
          Toast.show({type:"error" , text1:error.response.data.message.message[0].message});
        }
      }
    } catch (error) {
      Toast.show({type:"error" , text1:"مشکلی پیش آمده است.لطفا مجددا امتحان نمایید."});
    }
    return Promise.reject(error);
  }
);

// will send token to headers request ( in x-auth-token body )
axios.interceptors.request.use((config) => {
  config.headers["x-auth-token"] = getItem("token");
  return config;
});

export default axios;