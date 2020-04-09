import create, {
  StateCreator,
  SetState,
  GetState,
  StoreApi,
  PartialState,
} from 'zustand';
import produce from 'immer';
import { devtools } from 'zustand/middleware';

/*
 * (alias) function create<TState extends Record<string | number | * *  * symbol, any>>(createState: StateCreator<TState>): [UseStore<TState>, * StoreApi<TState>]
 */

interface GTState {
  text: string;
  setText: (input: string) => void;
}

const log = (config: StateCreator<GTState>) => (
  set: SetState<GTState>,
  get: GetState<GTState>,
  api: StoreApi<GTState>,
) =>
  config(
    (args) => {
      console.group('**** zustand store');
      console.log('  applying', args);
      set(args);
      console.log('  new state', get());
      console.groupEnd();
    },
    get,
    api,
  );

export const [gtsportStore] = create<GTState>(
  log(
    (set): GTState => ({
      text: 'initial',
      setText: (input: string) => set((state) => ({ text: input })),
    }),
  ),
);

// Turn the set method into an immer proxy
const immer = (config: StateCreator<GTState>) => (
  set: SetState<GTState>,
  get: GetState<GTState>,
  api: StoreApi<GTState>,
) => config((fn: any) => set(produce(fn)), get, api);
