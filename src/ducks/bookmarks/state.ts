import { Bookmark } from "../../api/types";

export interface State {
  loading: {
    shown: boolean;
    message?: string;
  };
  error?: {
    message?: string;
  };
  auth?: {
    accessToken?: string;
    message?: string;
  };
  tags: string[];
  bookmark?: Partial<Bookmark>;
}

const initialState: State = {
  loading: {
    shown: true
  },
  tags: []
};

export default initialState;
