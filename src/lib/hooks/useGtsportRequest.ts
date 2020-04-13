import axios from 'axios';

const API_URL = process.env.API_URL;
const SEARCH_PROFILE_API = process.env.SEARCH_PROFILE_API;

export const useSearchUserIdRequest = async (username: string) => {
  const response = await axios.post(SEARCH_PROFILE_API, null, { params: { username } });
  return response.data;
};

export const useUserInfoRequest = async (user_no: string) => {
  const response = await axios.post(API_URL, null, { params: { job: '1', user_no } });
  return response.data;
};

export const useStatsDetailsRequest = async (user_no: string) => {
  const response = await axios.post(API_URL, null, { params: { job: '3', user_no } });
  return response.data;
};

export const useStatsHistoryRequest = async (user_no: string) => {
  const response = await axios.post(API_URL, null, {
    params: {
      job: '12',
      user_no,
      month_begin: '3',
      month_end: '4',
      year_begin: '2020',
      year_end: '2020',
    },
  });

  return response.data;
};
