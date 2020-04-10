import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import preactLocalStorage from 'preact-localstorage';

import { MdAutorenew } from 'preact-icons/md';
import { gtsportStore } from '../lib/hooks/gtsportStore';
import UserInfo from '../components/UserInfo';
import StatsDetails from '../components/StatsDetails';
import { StatsHistory } from '../components/StatsHistory';
import UserInput from '../components/UserInput';

const Home: FunctionalComponent = () => {
  const fromLocalStorage = preactLocalStorage.get('local-user-id', '');
  const setUserId = gtsportStore(state => state.setUserId);
  const userId = gtsportStore(state => state.userId);
  const setTrigger = gtsportStore(state => state.setTriggerRequest);
  const trigger = gtsportStore(state => state.triggerRequest);

  const hasUserId = userId || userId !== '';

  useEffect(() => {
    if (!hasUserId && fromLocalStorage && userId !== fromLocalStorage) {
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

  return (
    <div class="py-4 flex-col items-center text-white">
      <UserInput userId={userId} setUserId={setUserId} onRenew={onRenew} />
      <StatsHistory />
      <UserInfo />
      <StatsDetails />
    </div>
  );
};

export default Home;
