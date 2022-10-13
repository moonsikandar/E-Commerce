import { SEARCH, SELECTION_FILTER, AUTH_USER } from "../action/action_type";
const initialState = {
  search: "",
  select: "",
  user: "",
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SELECTION_FILTER:
      return {
        ...state,
        select: action.payload,
      };

    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
