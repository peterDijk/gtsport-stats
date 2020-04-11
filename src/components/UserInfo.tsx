import { h, FunctionalComponent } from 'preact';
import { UserInfo } from '../types';

export const UserInfoComp: FunctionalComponent<{ userInfo: UserInfo }> = ({ userInfo }) => (
  <div class="mt-6 w-full">
    <h2 class="text-base">user info: </h2>
    <div class="bg-orange-700 text-base whitespace-pre-wrap rounded-lg p-3">
      {JSON.stringify(userInfo, null, 1)}
    </div>
  </div>
);

export default UserInfoComp;
