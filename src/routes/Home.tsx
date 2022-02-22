import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import preactLocalStorage from 'preact-localstorage';

import { gtsportStore } from '../lib/hooks/gtsportStore';

import Home from '../components/Home';
import { useSearchUserIdRequest } from '../lib/hooks/useGtsportRequest';

const HomeContainer: FunctionalComponent<{ username?: string }> = () => {
  const fromLocalStorage = preactLocalStorage.get('local-user-id', '');
  const setUserId = gtsportStore(state => state.setUserId);
  const userId = gtsportStore(state => state.userId);
  const setUserName = gtsportStore(state => state.setUserName);
  const userName = gtsportStore(state => state.userName);
  const setTrigger = gtsportStore(state => state.setTriggerRequest);
  const trigger = gtsportStore(state => state.triggerRequest);

  const hasUserId = userId || userId !== '';

  const searchUserId = async () => {
    const response = await useSearchUserIdRequest(userName);
    if (response.user_no !== "") {
      setUserId(response.user_no);
    }
  };

  useEffect(() => {
    if (userName) {
      setUserId(null);
      searchUserId();
    }
  }, [userName]);

  useEffect(() => {
    if (!hasUserId && fromLocalStorage && userId !== fromLocalStorage && !userName) {
      console.log('local found, setting state', { fromLocalStorage });
      setUserId(fromLocalStorage);
    }
    if (hasUserId) {
      console.log('writing to localstorage');
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

  return <Home userId={userId} userName={userName} setUserName={setUserName} onRenew={onRenew} />;
};

export default HomeContainer;
