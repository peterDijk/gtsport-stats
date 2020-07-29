import { JStatsHistory, IStatsHistory } from '../types';

export function parseStatsHistoryJson(input: JStatsHistory): IStatsHistory {
  const statsHistory = input?.stats_history?.
    filter(month => month.stats12).
    map(month => ({
      year: month.year,
      month: month.month,
      driverPoints: month?.stats12?.map(driver => parseInt(driver)),
      mannerPoints: month?.stats13?.map(manner => parseInt(manner)),
    }));

  return statsHistory;
}
