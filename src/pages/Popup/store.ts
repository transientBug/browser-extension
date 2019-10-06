import makeStore from "../../ducks/makeStore";

import {
  reducers as bookmarkReducers,
  initialState as bookmarkInitialState
} from "../../ducks/bookmarks";
import { State as BookmarkState } from "../../ducks/bookmarks/state";
import { Payloads as BookmarkPayloads } from "../../ducks/bookmarks/actions";

import {
  reducers as authReducers,
  initialState as authInitialState
} from "../../ducks/auth";
import { State as AuthState } from "../../ducks/auth/state";
import { Payloads as AuthPayloads } from "../../ducks/auth/actions";

import {
  reducers as popupReducers,
  initialState as popupInitialState
} from "../../ducks/popup";
import { State as PopupState } from "../../ducks/popup/state";
import { Payloads as PopupPayloads } from "../../ducks/popup/actions";

type FullState = BookmarkState & AuthState & PopupState;
type FullPayloads = BookmarkPayloads | AuthPayloads | PopupPayloads;

const reducers = {
  ...bookmarkReducers,
  ...authReducers,
  ...popupReducers
};

const initialState = {
  ...bookmarkInitialState,
  ...authInitialState,
  ...popupInitialState
};

const { Store, useDispatch, useState, useStore } = makeStore<
  FullState,
  FullPayloads
>(initialState, reducers);

export default useStore;
export { Store, useDispatch, useState };
