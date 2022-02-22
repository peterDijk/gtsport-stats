import axios from 'axios';
import moment from 'moment';
moment().format();

const API_URL = process.env.API_URL;
const SEARCH_PROFILE_API = process.env.SEARCH_PROFILE_API;

export const useSearchUserIdRequest = async (username: string) => {
  const response = await axios.post(SEARCH_PROFILE_API, null, { params: { online_id: username } });
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
  const curr_month = moment().month() + 1;
  const curr_year = moment().year();

  const response = await axios.post(API_URL, null, {
    params: {
      job: '12',
      user_no,
      month_begin: '1',
      month_end: curr_month,
      year_begin: curr_year - 3,
      year_end: curr_year,
    },
  });

  return response.data;
};
