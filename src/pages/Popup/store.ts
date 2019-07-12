import { reducers, initialState } from "../../ducks/bookmarks";
import makeStore from "../../ducks/makeStore";

const { Store, useDispatch, useState, useStore } = makeStore(
  initialState,
  reducers
);

export default useStore;
export { Store, useDispatch, useState };
