import { h, FunctionalComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import Router from 'preact-router';
import Match from 'preact-router/match';

import preactLocalStorage from 'preact-localstorage';

import { MdAutorenew } from 'preact-icons/md';
// import { useUserInfoContext } from '../../components/UserInfoProvider/UserInfoProvider';
import Rating from '../components/Rating';
import { DriverRatingRanges, MannerRatingRanges, JStatsDetails } from '../types';
import { gtsportStore } from '../lib/hooks/gtsportStore';
import { useUserInfoRequest, useStatsDetailsRequest } from '../lib/hooks/useGtsportRequest';

interface Props {
  statsDetails: JStatsDetails;
}

const StatsDetails: FunctionalComponent<Props> = ({ statsDetails }) => (
  <div class="mt-6 mb-0">
    <h2 class="text-base">stats details: </h2>
    <div class="bg-orange-900 break-words rounded-lg p-3">
      {JSON.stringify(statsDetails, null, 1)}
    </div>
  </div>
);

export default StatsDetails;
