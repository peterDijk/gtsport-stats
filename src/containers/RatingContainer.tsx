import { h, FunctionalComponent } from 'preact';

// import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdAutorenew } from 'preact-icons/md';
import { Range } from '../types';
import Rating from '../components/Rating';
import { getCurrentRating, unknownRating } from '../lib/ratings';

interface Props {
  title: string;
  current: number;
  previous: number;
  ratingRange: Range[];
}

export enum Progress {
  INCREASE,
  DECREASE,
  EQUAL,
}

const RatingContainer: FunctionalComponent<Props> = ({ current, previous, ratingRange, title }) => {
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

  const currentRating: Range = getCurrentRating(ratingRange, current);

  const higherRating =
    (currentRating && ratingRange?.find(range => range.min === currentRating.max + 1)) ?? unknownRating;
  const lowerRating = currentRating && ratingRange?.find(range => range.max === currentRating.min - 1);

  const forecastText =
    progress === Progress.EQUAL
      ? `same same`
      : progress === Progress.INCREASE && higherRating
      ? `${higherRating.min - current} points until you reach ${higherRating?.rating}`
      : !lowerRating
      ? `lowest... :(`
      : `${current - lowerRating?.max} points until you reach ${lowerRating?.rating}`;

  return (
    <Rating
      indicator={indicator}
      title={title}
      rating={currentRating}
      current={current}
      forecastText={forecastText}
    />
  );
};

export default RatingContainer;
