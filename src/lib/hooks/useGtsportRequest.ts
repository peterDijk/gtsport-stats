import axios from 'axios';

const API_URL = '/.netlify/functions/gt-sport-profile';

export const useUserInfoRequest = async (user_no: string) => {
  const response = await axios.post(API_URL, null, { params: { job: '1', user_no } });
  return response.data;
};
