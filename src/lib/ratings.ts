import { IStatsHistory } from '../types';

export function currentVsLastPoints(statsHistory: IStatsHistory) {
  const lastMonth = statsHistory?.[statsHistory?.length - 1] ?? null;

  const lastMonthFilteredDriverPoints = lastMonth?.driverPoints.filter(points => points !== 0);
  const lastDriverPoints =
    lastMonthFilteredDriverPoints?.[lastMonthFilteredDriverPoints?.length - 1] ?? null;
  const previousDriverPoints =
    lastMonthFilteredDriverPoints?.[lastMonthFilteredDriverPoints?.length - 2] ?? null;

  const lastMonthFilteredMannerPoints = lastMonth?.mannerPoints.filter(points => points !== 0);
  const lastMannerPoints =
    lastMonthFilteredMannerPoints?.[lastMonthFilteredMannerPoints?.length - 1] ?? null;
  const previousMannerPoints =
    lastMonthFilteredMannerPoints?.[lastMonthFilteredMannerPoints?.length - 2] ?? null;

  return {
    lastDriverPoints,
    previousDriverPoints,
    lastMannerPoints,
    previousMannerPoints,
  };
}
