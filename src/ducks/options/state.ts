export interface State {
  accessToken?: string;
  debugFilter?: string;
  temporaryInstall?: boolean;
}

const InitialState: State = {};

export default InitialState;
