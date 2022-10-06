import {
  ADD_To_CART,
  VIEW_CART,
  SEARCH,
  SELECTION_FILTER,
  DELETE_ITEM,
  AUTH_USER,
} from "./action_type";

export const ADD = (item) => {
  return {
    type: ADD_To_CART,
    payload: item,
  };
};
export const View = (item) => {
  return {
    type: VIEW_CART,
    payload: item,
  };
};
export const searchItem = (filter) => {
  return {
    type: SEARCH,
    payload: filter,
  };
};
export const SelectionFilter = (filter) => {

  return {
    type: SELECTION_FILTER,
    payload: filter,
  };
};
export const DLT = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};
export const authUser = (user) => {

  return {type: AUTH_USER, payload: user };
};
