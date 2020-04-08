import { h, FunctionalComponent } from 'preact';

import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdAutorenew } from 'preact-icons/md';
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
        icon: <MdAutorenew />,
        color: 'text-gray-600',
        delta: '',
      }
    : progress === Progress.INCREASE || progress === Progress.EQUAL
    ? {
        icon: <MdKeyboardArrowUp />,
        color: 'text-green-500',
        delta: `+ ${current - previous}`,
      }
    : {
        icon: <MdKeyboardArrowDown />,
        color: 'text-red-500',
        delta: `- ${previous - current}`,
      };

  const rating = ratingRange.find(range => current <= range.max && current > range.min);
  const higherRating = rating && ratingRange.find(range => range.min === rating.max + 1);
  const lowerRating = rating && ratingRange.find(range => range.max === rating.min - 1);

  console.log({ title, rating, lowerRating });

  return (
    <div class="max-w-sm mx-auto flex p-6 m-6 bg-white rounded-lg shadow-xl">
      <div class="flex flex-column items-center ">
        <div>
          <div class={`text-4xl ${indicator.color}`}>{indicator.icon}</div>
          <div class="text-sm text-center text-gray-600">{indicator.delta}</div>
        </div>
      </div>
      <div class="ml-6 pt-1">
        <p class="text-base text-gray-600 leading-normal">
          {title} - {rating?.rating}
        </p>
        <h4 class="text-xl text-gray-900 leading-tight">{current || '--'}</h4>
        {current && (
          <p class="text-gray-600 leading-normal mt-3">
            {progress === Progress.EQUAL
              ? `there ain't no higher!`
              : progress === Progress.INCREASE
              ? `${higherRating?.min ?? current - current} points until you reach ${
                  higherRating?.rating
                }`
              : !lowerRating
              ? `lowest... :(`
              : `${current - lowerRating?.max} points until you reach ${lowerRating?.rating}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Rating;
