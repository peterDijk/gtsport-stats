import { h, FunctionalComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import Router from 'preact-router';
import Match from 'preact-router/match';

import preactLocalStorage from 'preact-localstorage';

import { MdAutorenew } from 'preact-icons/md';
// import { useUserInfoContext } from '../../components/UserInfoProvider/UserInfoProvider';
import Rating from '../components/Rating';
import { DriverRatingRanges, MannerRatingRanges } from '../types';
import { gtsportStore } from '../lib/hooks/gtsportStore';
import { useUserInfoRequest, useStatsDetailsRequest } from '../lib/hooks/useGtsportRequest';

export const StatsDetails: FunctionalComponent = () => {
  const statsDetails = gtsportStore(state => state.statsDetails);
  const setStatsDetails = gtsportStore(state => state.setStatsDetails);
  const userId = gtsportStore(state => state.userId);
  const triggerRequest = gtsportStore(state => state.triggerRequest);

  useEffect(() => {
    const getStatsDetails = async () => {
      const response = await useStatsDetailsRequest(userId);
      setStatsDetails(response.stats);
    };
    if (userId) {
      getStatsDetails();
    }
  }, [userId]);

  return (
    <div class="mt-6">
      <h2 class="text-base text-xl">stats details: </h2>
      <div class="bg-orange-900 text-xl whitespace-pre-wrap rounded-lg p-3">
        {JSON.stringify(statsDetails, null, 1)}
      </div>
    </div>
  );
};

export default StatsDetails;
