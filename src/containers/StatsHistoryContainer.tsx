import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import { gtsportStore } from '../lib/hooks/gtsportStore';
import { useStatsHistoryRequest } from '../lib/hooks/useGtsportRequest';
import { currentVsLastPoints } from '../lib/ratings';
import { parseStatsHistoryJson } from '../lib/fromJson';
import StatsHistory from '../components/StatsHistory';

const StatsHistoryContainer: FunctionalComponent = () => {
  const statsHistory = gtsportStore(state => state.statsHistory);
  const setStatsHistory = gtsportStore(state => state.setStatsHistory);
  const userId = gtsportStore(state => state.userId);
  const triggerRequest = gtsportStore(state => state.triggerRequest);

  const getStatsHistory = async () => {
    const response = await useStatsHistoryRequest(userId);
    const parsedStatsHistory = parseStatsHistoryJson(response);

    setStatsHistory(parsedStatsHistory);
  };

  useEffect(() => {
    if (userId) {
      getStatsHistory();
    }
  }, [userId]);

  useEffect(() => {
    if (triggerRequest && userId) {
      getStatsHistory();
    }
  }, [triggerRequest]);

  const {
    lastDriverPoints,
    previousDriverPoints,
    lastMannerPoints,
    previousMannerPoints,
  } = currentVsLastPoints(statsHistory);

  return (
    <StatsHistory
      lastDriverPoints={lastDriverPoints}
      previousDriverPoints={previousDriverPoints}
      lastMannerPoints={lastMannerPoints}
      previousMannerPoints={previousMannerPoints}
    />
  );
};

export default StatsHistoryContainer;
