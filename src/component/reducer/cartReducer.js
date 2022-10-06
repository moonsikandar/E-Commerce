import {
  ADD_To_CART,
  VIEW_CART,
  SEARCH,
  SELECTION_FILTER,
  DELETE_ITEM,
  AUTH_USER
} from "../action/action_type";
const initialState = {
  items: [],
  item: [],
  search: "",
  select: "",
  user:"",
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_To_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case VIEW_CART:
      return {
        ...state,
        item: [action.payload],
      };
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
    case DELETE_ITEM:
      const data = state.items.filter((e) => {
        console.log(e.id);
        return e.id !== action.payload;
      });
      return {
        ...state,
        items: data,
      };
      case AUTH_USER:
        return {
          ...state,
          user:action.payload
        }
    default:
      return state;
  }
};
