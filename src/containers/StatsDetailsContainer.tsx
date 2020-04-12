import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { gtsportStore } from '../lib/hooks/gtsportStore';
import { useUserInfoRequest, useStatsDetailsRequest } from '../lib/hooks/useGtsportRequest';
import StatsDetails from '../components/StatsDetails';

const StatsDetailsContainer: FunctionalComponent = () => {
  const statsDetails = gtsportStore(state => state.statsDetails);
  const setStatsDetails = gtsportStore(state => state.setStatsDetails);
  const userId = gtsportStore(state => state.userId);
  const triggerRequest = gtsportStore(state => state.triggerRequest);

  const getStatsDetails = async () => {
    const response = await useStatsDetailsRequest(userId);
    setStatsDetails(response.stats);
  };

  useEffect(() => {
    if (userId) {
      getStatsDetails();
    }
  }, [userId]);

  useEffect(() => {
    if (triggerRequest && userId) {
      getStatsDetails();
    }
  }, [triggerRequest]);

  return <StatsDetails statsDetails={statsDetails} />;
};

export default StatsDetailsContainer;
