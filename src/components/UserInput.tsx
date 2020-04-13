import { h, FunctionalComponent, Fragment } from 'preact';

interface Props {
  userId: string;
  setUserId: (input: string) => void;
  onRenew: () => void;
}

const UserInput: FunctionalComponent<Props> = ({ userId, setUserId, onRenew }) => (
  <Fragment>
    <div class="relative flex">ID</div>
    <div class="relative flex">
      <div class="text-orange-500 text-base">{userId}</div>
      <button
        class="bg-white rounded-lg p-2 ml-auto w-16 h-16 text-gray-600 leading-normal"
        onClick={onRenew}
      >
        (-)
      </button>
    </div>
  </Fragment>
);

export default UserInput;
