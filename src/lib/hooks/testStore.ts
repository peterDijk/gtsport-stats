import create, { StateCreator, SetState, GetState, StoreApi } from 'zustand';
import produce from 'immer';

interface State {
  text: string;
}

// Log every time state is changed
const log = (config: StateCreator<State>) => (
  set: SetState<State>,
  get: GetState<State>,
  api: StoreApi<State>,
) =>
  config(
    args => {
      console.log('  applying', { args });
      set(args);
      console.log('  new state', get());
    },
    get,
    api,
  );

// Turn the set method into an immer proxy
const immer = (config: StateCreator<State>) => (
  set: SetState<State>,
  get: GetState<State>,
  api: StoreApi<State>,
) => config((fn: any) => set(produce(fn)), get, api);

export const [testStore] = create(set => ({
  text: 'hello',
  setText: (input: string) =>
    set(state => {
      state.text = input;
    }),
}));
