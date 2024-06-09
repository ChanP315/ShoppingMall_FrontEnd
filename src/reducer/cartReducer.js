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
    case types.DELETE_CART_ITEM_REQUEST:
    case types.UPDATE_CART_ITEM_REQUEST:
      return {...state, loading: true};

    case types.ADD_TO_CART_SUCCESS:
    case types.GET_CART_QTY_SUCCESS:
      return {...state, loading: false, error: "", cartItemQty: payload};
    
    case types.GET_CART_LIST_SUCCESS:
    case types.DELETE_CART_ITEM_SUCCESS:
    case types.UPDATE_CART_ITEM_SUCCESS:
      return {...state,
        loading: false,
        error: "",
        cartList: payload.cart.items,
        cartItemQty: payload.cartItemQty,
        //reduce 함수 뒤쪽에 accTotal을 0초기화 해주지 않으면, 오브젝트가 연산되어버림
        totalPrice: payload.cart.items.reduce((accTotal, currentItem) => accTotal += (currentItem.productId.price * currentItem.qty), 0),
      };
    
    case types.ADD_TO_CART_FAIL:
    case types.GET_CART_LIST_FAIL:
    case types.GET_CART_QTY_FAIL:
    case types.DELETE_CART_ITEM_FAIL:
    case types.UPDATE_CART_ITEM_FAIL:
      return {...state, loading: false, error: payload};
    
    case types.CART_INFO_INIT:
      return {...state, loading: false, error: "", cartItemQty: 0};
    
    default:
      return state;
  }
}
export default cartReducer;
