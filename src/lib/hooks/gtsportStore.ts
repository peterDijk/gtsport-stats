import create, { StateCreator, SetState, GetState, StoreApi, PartialState } from 'zustand';
import produce from 'immer';
// import { devtools } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { UserInfo, JStatsDetails, IStatsHistory } from '../../types';

/*
 * (alias) function create<TState extends Record<string | number | * *  * symbol, any>>(createState: StateCreator<TState>): [UseStore<TState>, * StoreApi<TState>]
 */

interface GTState {
  userId: string;
  setUserId: (input: string) => void;
  userInfo: UserInfo;
  setUserInfo: (input: UserInfo) => void;
  statsDetails: JStatsDetails;
  setStatsDetails: (input: JStatsDetails) => void;
  statsHistory: IStatsHistory;
  setStatsHistory: (input: IStatsHistory) => void;
  triggerRequest: boolean;
  setTriggerRequest: (input: boolean) => void;
}

const log = (config: StateCreator<GTState>) => (
  set: SetState<GTState>,
  get: GetState<GTState>,
  api: StoreApi<GTState>,
) =>
  config(
    args => {
      console.group('**** zustand store');
      console.log('  applying', args);
      set(args);
      console.log('  new state', get());
      console.groupEnd();
    },
    get,
    api,
  );

export const [gtsportStore, store] = create<GTState>(
  log(
    (set): GTState => {
      console.log('  init state');
      return {
        userId: '',
        setUserId: (input: string) => set(state => ({ userId: input })),
        userInfo: {} as UserInfo,
        setUserInfo: (input: UserInfo) =>
          set(state => ({
            userInfo: input,
          })),
        statsDetails: {} as JStatsDetails,
        setStatsDetails: (input: JStatsDetails) => set(state => ({ statsDetails: input })),
        statsHistory: {} as IStatsHistory,
        setStatsHistory: (input: IStatsHistory) => set(state => ({ statsHistory: input })),
        triggerRequest: false,
        setTriggerRequest: (input: boolean) => set(state => ({ triggerRequest: input })),
      };
    },
  ),
);

if (process.env.NODE_ENV !== 'production') {
  mountStoreDevtool('Store', store);
}

// Turn the set method into an immer proxy
const immer = (config: StateCreator<GTState>) => (
  set: SetState<GTState>,
  get: GetState<GTState>,
  api: StoreApi<GTState>,
) => config((fn: any) => set(produce(fn)), get, api);
