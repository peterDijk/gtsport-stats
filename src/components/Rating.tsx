import { h, FunctionalComponent } from 'preact';

// import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdAutorenew } from 'preact-icons/md';
import { Range } from '../types';

interface Props {
  title: string;
  current: number;
  previous: number;
  ratingRange: Range[];
}

enum Progress {
  INCREASE,
  DECREASE,
  EQUAL,
}

const Rating: FunctionalComponent<Props> = ({ current, previous, ratingRange, title }) => {
  const progress =
    current > previous
      ? Progress.INCREASE
      : current < previous
      ? Progress.DECREASE
      : Progress.EQUAL;

  const indicator = !current
    ? {
        icon: '', // <MdAutorenew />,
        color: 'text-gray-600',
        delta: '',
      }
    : progress === Progress.INCREASE || progress === Progress.EQUAL
    ? {
        icon: '', // <MdKeyboardArrowUp />,
        color: 'text-green-500',
        delta: `+ ${current - previous}`,
      }
    : {
        icon: '', // <MdKeyboardArrowDown />,
        color: 'text-red-500',
        delta: `- ${previous - current}`,
      };

  const rating = ratingRange.find(range => current <= range.max && current > range.min);
  const higherRating = rating && ratingRange.find(range => range.min === rating.max + 1);
  const lowerRating = rating && ratingRange.find(range => range.max === rating.min - 1);

  return (
    <div class="max-w flex mb-5 p-3 bg-white rounded-lg">
      <div class="w-20 flex flex-column items-center ">
        <div>
          {/* <div class={`text-4xl ${indicator.color}`}>{indicator.icon}</div> */}
          <div class="text-xl text-center text-gray-600">{indicator.delta}</div>
        </div>
      </div>
      <div class="ml-6 pt-1">
        <div class="text-xl text-gray-600 leading-normal">
          {title} - {rating?.rating}
        </div>
        <h4 class="text-xl text-gray-900 leading">{current || '--'}</h4>
        {current && (
          <div class="text-xl text-gray-600 mt-3">
            {progress === Progress.EQUAL
              ? `there ain't no higher!`
              : progress === Progress.INCREASE && higherRating
              ? `${higherRating.min - current} points until you reach ${higherRating?.rating}`
              : !lowerRating
              ? `lowest... :(`
              : `${current - lowerRating?.max} points until you reach ${lowerRating?.rating}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
