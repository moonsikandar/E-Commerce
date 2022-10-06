import { combineReducers } from "redux";

import {CartReducer} from './cartReducer'

export default  combineReducers({
    carts:CartReducer
})