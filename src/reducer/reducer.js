import { combineReducers } from "redux";

import {CartReducer} from './cartReducer'
import { blogReducer } from "./blogReducer";

export default  combineReducers({
    cartProduct:CartReducer,
    product:blogReducer
})