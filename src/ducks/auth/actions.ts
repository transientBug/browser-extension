import ActionTypes from "./types";

const authenticate = (accessToken: string) =>
  ({ type: ActionTypes.Authenticate, payload: { accessToken } } as const);

const unauthenticate = (message: string) =>
  ({ type: ActionTypes.Unauthenticate, payload: { message } } as const);

const Actions = {
  [ActionTypes.Authenticate]: authenticate,
  [ActionTypes.Unauthenticate]: unauthenticate
};

export type Actions = typeof Actions;
export type Payloads = ReturnType<Actions[ActionTypes]>;
export default {
  authenticate,
  unauthenticate
};
