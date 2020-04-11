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

  useEffect(() => {
    const getStatsDetails = async () => {
      const response = await useStatsDetailsRequest(userId);
      setStatsDetails(response.stats);
    };
    if (userId) {
      getStatsDetails();
    }
  }, [userId]);

  return <StatsDetails statsDetails={statsDetails} />;
};

export default StatsDetailsContainer;
