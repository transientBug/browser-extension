export interface State {
  isLoading: boolean;
  hasError?: boolean;
  errorDetails?: any;
  bookmark?: {
    title?: string;
    tags?: string[];
    description?: string;
  };
}

const initialState: State = {
  isLoading: true
};

export default initialState;
