import { h, FunctionalComponent } from 'preact';

import UserInfo from '../containers/UserInfoContainer';
import StatsDetails from '../containers/StatsDetailsContainer';
import StatsHistory from '../containers/StatsHistoryContainer';
import UserInput from '../components/UserInput';

interface Props {
  userId: string;
  userName: string;
  setUserName: (userName: string) => void;
  onRenew: () => void;
}

const Home: FunctionalComponent<Props> = ({ userId, userName, setUserName, onRenew }) => (
  <div class="py-4 flex-col items-center text-white">
    <UserInput userId={userId} userName={userName} setUserName={setUserName} onRenew={onRenew} />
    <StatsHistory />
    <UserInfo />
    <StatsDetails />
  </div>
);

export default Home;
