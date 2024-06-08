import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";

const addToCart = ({ id, size }) => async (dispatch) => {
  try
  {
    dispatch({type: types.ADD_TO_CART_REQUEST});

    const response = await api.post("/cart", {productId: id, size, qty: 1});
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type:types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty});
    dispatch(commonUiActions.showToastMessage("카트에 상품이 추가되었습니다.", "success"));
  }catch(err)
  {
    dispatch({type: types.ADD_TO_CART_FAIL, payload: err.error});
    dispatch(commonUiActions.showToastMessage("상품 추가를 실패하였습니다.", "error"));
  }
};

const getCartList = () => async (dispatch) => {
  try
  {
    dispatch({type: types.GET_CART_LIST_REQUEST});

    const response = await api.get("/cart");
    console.log(response);
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type:types.GET_CART_LIST_SUCCESS, payload: response.data});
  }catch(err)
  {
    dispatch({type: types.GET_CART_LIST_FAIL, payload: err.error});
  }
};
const deleteCartItem = (id) => async (dispatch) => {};

const updateQty = (id, value) => async (dispatch) => {};
const getCartQty = () => async (dispatch) => {
  try
  {
    dispatch({type: types.GET_CART_QTY_REQUEST});

    const response = await api.get("/cart/qty");
    console.log(response);
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type:types.GET_CART_QTY_SUCCESS, payload: response.data.cartItemQty});
  }catch(err)
  {
    dispatch({type: types.GET_CART_QTY_FAIL, payload: err.error});
  }
};
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
