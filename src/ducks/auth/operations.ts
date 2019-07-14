/* global browser */
import actions from "./actions";
import { ThunkableDispatch } from "../useImmerReducer";

import API, { AuthError } from "../../api";

import { State } from "./state";

import debugFactory from "../../debug";
const debug: debug.IDebugger = debugFactory.extend("operations").extend("auth");

export default {};
