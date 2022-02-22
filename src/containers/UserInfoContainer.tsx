import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { gtsportStore } from '../lib/hooks/gtsportStore';
import { useUserInfoRequest } from '../lib/hooks/useGtsportRequest';
import UserInfo from '../components/UserInfo';

export const UserInfoContainer: FunctionalComponent = () => {
  const userInfo = gtsportStore(state => state.userInfo);
  const setUserInfo = gtsportStore(state => state.setUserInfo);
  const userId = gtsportStore(state => state.userId);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await useUserInfoRequest(userId);
      setUserInfo(response.profile);
    };
    if (userId) {
      getUserInfo();
    } else {
      setUserInfo(undefined);
    }
  }, [userId]);

  return <UserInfo userInfo={userInfo} />;
};

export default UserInfoContainer;
