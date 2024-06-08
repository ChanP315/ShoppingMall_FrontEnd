import * as types from "../constants/cart.constants";
import {
  LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/user.constants";

const initialState = {
  loading: false,
  error: "",
  cartItemQty: 0,
  cartList: [],
  totalPrice: 0,
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type)
  {
    case types.ADD_TO_CART_REQUEST:
    case types.GET_CART_LIST_REQUEST:
    case types.GET_CART_QTY_REQUEST:
      return {...state, loading: true};

    case types.ADD_TO_CART_SUCCESS:
    case types.GET_CART_QTY_SUCCESS:
      console.log(payload);
      return {...state, loading: false, error: "", cartItemQty: payload};
    
    case types.GET_CART_LIST_SUCCESS:
      return {...state,
        loading: false,
        error: "",
        cartList: payload.cart.items,
        cartItemQty: payload.cartItemQty,
        totalPrice: payload.cart.items.reduce((total = 0, item) => (total += item.productId.price * item.qty)),
      };
    
    case types.ADD_TO_CART_FAIL:
    case types.GET_CART_LIST_FAIL:
    case types.GET_CART_QTY_FAIL:
      return {...state, loading: false, error: payload};
    
    case types.CART_INFO_INIT:
      return {...state, loading: false, error: "", cartItemQty: 0};
    
    default:
      return state;
  }
}
export default cartReducer;
