export interface State {
  loading: {
    shown: boolean;
    message?: string;
  };
  tags: string[];
}

const initialState: State = {
  loading: {
    shown: true
  },
  tags: []
};

export default initialState;
