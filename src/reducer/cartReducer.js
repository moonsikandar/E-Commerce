import {
  ADD_To_CART,
  VIEW_CART,
  DELETE_ITEM,
  DECREASE_QUANTITY,
} from "../action/action_type";
const initialState = {
  items: [],
  item: [],
};

const AdItem = (items, item) => {
  const index = items.findIndex((it) => it.id === item.id);
  if (index >= 0) {
    const itemsCopy = [...items];
    itemsCopy[index].quantity = itemsCopy[index].quantity + 1;
    return itemsCopy;
  } else {
    return [...items, item];
  }
};
const RemoveItem = (items, item) => {
  const index = items.findIndex((it) => it.id === item.id);
  if (index >= 0) {
    const itemsCopy = [...items];
    if (itemsCopy[index].quantity > 1) {
      itemsCopy[index].quantity = itemsCopy[index].quantity - 1;
    } else {
      return items.filter((it) => it.id !== item.id);
    }

    return itemsCopy;
  } else {
    return [...items];
  }
};
export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_To_CART:
      return {
        ...state,
        items: AdItem(state.items, action.payload),
      };
    case VIEW_CART:
      return {
        ...state,
        item: [action.payload],
      };
    case DELETE_ITEM:
      const data = state.items.filter((e) => {
        return e.id !== action.payload;
      });
      return {
        ...state,
        items: data,
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        items: RemoveItem(state.items, action.payload),
      };
    default:
      return state;
  }
};
