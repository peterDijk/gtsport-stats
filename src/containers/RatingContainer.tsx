import { h, FunctionalComponent } from 'preact';

// import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdAutorenew } from 'preact-icons/md';
import { Range } from '../types';
import Rating from '../components/Rating';

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

  const unknownRating: Range = {
    rating: 'unknown',
    min: 0,
    max: 0,
  };

  const rating: Range =
    ratingRange?.find(range => current <= range.max && current >= range.min) ?? unknownRating;
  const higherRating =
    (rating && ratingRange?.find(range => range.min === rating.max + 1)) ?? unknownRating;
  const lowerRating = rating && ratingRange?.find(range => range.max === rating.min - 1);

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
      rating={rating}
      current={current}
      forecastText={forecastText}
    />
  );
};

export default RatingContainer;
