export interface State {
  auth?: {
    accessToken?: string;
    message?: string;
  };
}

const initialState: State = {};

export default initialState;
