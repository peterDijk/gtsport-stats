import { h, FunctionalComponent } from 'preact';

import UserInfo from '../containers/UserInfoContainer';
import StatsDetails from '../containers/StatsDetailsContainer';
import StatsHistory from '../containers/StatsHistoryContainer';
import UserInput from '../components/UserInput';

interface Props {
  userId: string;
  setUserId: (userId: string) => void;
  onRenew: () => void;
}

const Home: FunctionalComponent<Props> = ({ userId, setUserId, onRenew }) => (
  <div class="py-4 flex-col items-center text-white">
    <UserInput userId={userId} setUserId={setUserId} onRenew={onRenew} />
    <StatsHistory />
    <UserInfo />
    <StatsDetails />
  </div>
);

export default Home;
