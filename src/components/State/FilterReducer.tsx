export enum FilterState {
  ALL,
  COMPLETED,
  INCOMPLETED
}

export interface FilterAction {
  type: string;
}

export const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SHOW_ALL":
      return FilterState.ALL;
    case "SHOW_COMPLETE":
      return FilterState.COMPLETED;
    case "SHOW_INCOMPLETE":
      return FilterState.INCOMPLETED;
    default:
      throw new Error();
  }
};
