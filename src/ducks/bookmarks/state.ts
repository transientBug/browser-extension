import { Bookmark } from "../../bookmarks";

export interface State {
  isLoading: boolean;
  hasError?: boolean;
  errorDetails?: any;
  bookmark?: Bookmark;
}

const initialState: State = {
  isLoading: true
};

export default initialState;
