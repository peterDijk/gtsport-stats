import { h, FunctionalComponent } from 'preact';
import RatingContainer from '../containers/RatingContainer';
import { DriverRatingRanges, MannerRatingRanges } from '../types';

interface Props {
  lastDriverPoints: number;
  previousDriverPoints: number;
  lastMannerPoints: number;
  previousMannerPoints: number;
}

const StatsHistory: FunctionalComponent<Props> = ({
  lastDriverPoints,
  previousDriverPoints,
  lastMannerPoints,
  previousMannerPoints,
}) => (
  <div class="mt-6">
    <h2 class="text-base">stats history: </h2>
    <RatingContainer
      title="Driver rating"
      current={lastDriverPoints}
      previous={previousDriverPoints}
      ratingRange={DriverRatingRanges}
    />
    <RatingContainer
      title="Sportsmanship rating"
      current={lastMannerPoints}
      previous={previousMannerPoints}
      ratingRange={MannerRatingRanges}
    />
  </div>
);

export default StatsHistory;
