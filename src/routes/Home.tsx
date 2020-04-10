import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import preactLocalStorage from 'preact-localstorage';

import { MdAutorenew } from 'preact-icons/md';
import { gtsportStore } from '../lib/hooks/gtsportStore';
import UserInfo from '../components/UserInfo';
import StatsDetails from '../components/StatsDetails';
import { StatsHistory } from '../components/StatsHistory';

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
    <div>
      <div class="relative flex">ID</div>
      <div class="relative flex">
        <input
          class="bg-white w-full mr-12 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 appearance-none leading-normal text-gray-600"
          type="text"
          placeholder="gran turismo user id"
          value={userId}
          onChange={(e: any) => setUserId(e.target.value)}
        />
        <button
          class="bg-white rounded-lg p-2 ml-auto text-gray-600 leading-normal "
          onClick={onRenew}
        >
          (-)
        </button>
      </div>
      <StatsHistory />
      <UserInfo />
      <StatsDetails />
    </div>
  );
};

export default Home;
