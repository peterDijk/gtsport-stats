import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import preactLocalStorage from 'preact-localstorage';

import { gtsportStore } from '../lib/hooks/gtsportStore';

import Home from '../components/Home';
import { useSearchUserIdRequest } from '../lib/hooks/useGtsportRequest';

const HomeContainer: FunctionalComponent<{ username?: string }> = ({ username }) => {
  const fromLocalStorage = preactLocalStorage.get('local-user-id', '');
  const setUserId = gtsportStore(state => state.setUserId);
  const userId = gtsportStore(state => state.userId);
  const setTrigger = gtsportStore(state => state.setTriggerRequest);
  const trigger = gtsportStore(state => state.triggerRequest);

  const hasUserId = userId || userId !== '';

  const searchUserId = async () => {
    const response = await useSearchUserIdRequest(username);
    setUserId(response.user_no);
  };

  useEffect(() => {
    if (username) {
      searchUserId();
    }
  }, [username]);

  useEffect(() => {
    if (!hasUserId && fromLocalStorage && userId !== fromLocalStorage && !username) {
      console.log('local found, setting state', { fromLocalStorage });
      setUserId(fromLocalStorage);
    }
    if (hasUserId) {
      console.log('writing to local');
      preactLocalStorage.set('local-user-id', userId);
    }
  }, [fromLocalStorage, userId]);

  useEffect(() => {
    if (trigger) {
      setTrigger(false);
    }
  }, [trigger]);

  const onRenew = () => {
    setTrigger(true);
  };

  return <Home userId={userId} setUserId={setUserId} onRenew={onRenew} />;
};

export default HomeContainer;
