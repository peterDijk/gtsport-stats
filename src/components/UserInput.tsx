import { h, FunctionalComponent, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useDebounce } from '../lib/hooks/useDebounce';

interface Props {
  userId: string;
  userName: string;
  setUserName: (input: string) => void;
  onRenew: () => void;
}

const UserInput: FunctionalComponent<Props> = ({ userId, userName, setUserName, onRenew }) => {
  const [input, setInput ] = useState();
  const debouncedSearchTerm: string = useDebounce<string>(input, 500);

  useEffect(() => {
    setUserName(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
  <Fragment>
    <div class="relative flex">PSN user name</div>
    <div class="relative flex">
      <input
        class="bg-white w-full focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 appearance-none leading-normal text-gray-600"
        type="text"
        placeholder="gran turismo user id"
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
      />
      <button
        class="bg-white rounded-lg p-2 ml-auto w-16 text-gray-600 leading-normal "
        onClick={onRenew}
      >
        (-)
      </button>
    </div>
    <div class="text-orange-500 text-base">{userId}</div>
  </Fragment>
)};

export default UserInput;
