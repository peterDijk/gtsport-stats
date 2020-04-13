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
      <input
        class="bg-white w-full focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 appearance-none leading-normal text-gray-600"
        type="text"
        placeholder="gran turismo user id"
        value={userId}
        onChange={(e: any) => setUserId(e.target.value)}
      />
      {/* <div class="text-orange-500 text-base">{userId}</div> */}
      <button
        class="bg-white rounded-lg p-2 ml-6 w-16 text-gray-600 leading-normal "
        onClick={onRenew}
      >
        (-)
      </button>
    </div>
  </Fragment>
);

export default UserInput;
