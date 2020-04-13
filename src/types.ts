export interface UserInfo {
  id: string; // psn name
  status: string;
  number: string; // gt user_no
  country: string;
}

export interface JStatsDetails {
  user_no: string;
  manufacturer_id: string;
  stats: {
    achievement_arcade: string[];
    achievement_history: string[];
    achievement_history_raw: string[];
    buy_car_count: number;
    campaign_progress: string[];
    car_count: number;
    credit_earned: number;
    delivery_reward_car_ticket: number;
    level: number;
    level_progress: number;
    livery_count: number;
    login_count: number;
    mileage_earned: number;
    nickname: string;
    photo_count: number;
    profile_color: number;
    ride_car_id: number;
    total_running_meter: number;
    xp: number;
  };
  ugc_all_count: number;
  ugc_photo_3_count: number;
  ugc_photo_11_count: number;
  ugc_livery_1_count: number;
  ugc_livery_2_count: number;
  ugc_livery_3_count: number;
  ugc_decal_count: number;
  ugc_replay_count: number;
  comment: number;
  driver_class: number;
  driver_point: number;
  manner_point: number;
  race_count: number;
  driver_point_up_rate: number;
  driver_photo_id: number;
  follower_count: number;
}

export interface JStatsMonth {
  year: string;
  month: string;
  stats1: unknown;
  stats2: unknown;
  stats3: unknown;
  stats4: unknown;
  stats5: unknown;
  stats6: unknown;
  stats7: unknown;
  stats11: unknown;
  stats12: JDriverRating[];
  stats13: JSportsmanShipRating[];
}

export interface JStatsHistory {
  stats_history: JStatsMonth[];
}

type JDriverRating = string;
type JSportsmanShipRating = string;

export type IDriverRating = number;
export type ISportsmanShipRating = number;

export interface IStatsMonth {
  year: string;
  month: string;
  driverPoints: IDriverRating[];
  mannerPoints: ISportsmanShipRating[];
}

export type IStatsHistory = IStatsMonth[];

export type Range = {
  rating: string;
  min: number;
  max: number;
};

export const DriverRatingRanges: Range[] = [
  {
    rating: 'A+',
    min: 50000,
    max: 75000,
  },
  {
    rating: 'A',
    min: 30000,
    max: 49999,
  },
  {
    rating: 'B',
    min: 10000,
    max: 29999,
  },
  {
    rating: 'C',
    min: 4000,
    max: 9999,
  },
  {
    rating: 'D',
    min: 1,
    max: 3999,
  },
  {
    rating: 'E',
    min: 1,
    max: 1999,
  },
];

export const MannerRatingRanges: Range[] = [
  {
    rating: 'S',
    min: 80,
    max: 99,
  },
  {
    rating: 'A',
    min: 65,
    max: 79,
  },
  {
    rating: 'B',
    min: 40,
    max: 64,
  },
  {
    rating: 'C',
    min: 20,
    max: 39,
  },
  {
    rating: 'D',
    min: 10,
    max: 19,
  },
  {
    rating: 'E',
    min: -100,
    max: 9,
  },
];
