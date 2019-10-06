import { Bookmark } from "../../api/types";

export interface State {
  error?: {
    message?: string;
  };
  bookmark?: Partial<Bookmark>;
}

const initialState: State = {};

export default initialState;
