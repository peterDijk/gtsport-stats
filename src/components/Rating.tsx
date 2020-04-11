import { h, FunctionalComponent } from 'preact';

// import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdAutorenew } from 'preact-icons/md';
import { Range } from '../types';
import { Progress } from '../containers/RatingContainer';

interface Props {
  indicator: {
    icon: unknown;
    color: string;
    delta: string;
  };
  title: string;
  rating: Range;
  current: number;
  forecastText: string;
}

const Rating: FunctionalComponent<Props> = ({
  indicator,
  title,
  rating,
  current,
  forecastText,
}) => (
  <div class="max-w flex mb-5 p-3 bg-white rounded-lg">
    <div class="w-8 flex flex-column items-center ">
      <div>
        {/* <div class={`text-4xl ${indicator.color}`}>{indicator.icon}</div> */}
        <div class="text-sm text-center text-gray-600">{indicator.delta}</div>
      </div>
    </div>
    <div class="ml-6 pt-1">
      <div class="text-base text-gray-600 leading-normal">
        {title} - {rating?.rating}
      </div>
      <h4 class="text-base text-gray-900 leading">{current || '--'}</h4>
      {current && <div class="text-base text-gray-600 mt-3">{forecastText}</div>}
    </div>
  </div>
);

export default Rating;
