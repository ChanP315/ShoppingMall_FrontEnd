import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";

const addToCart = ({ id, size }) => async (dispatch) => {
  try
  {
    dispatch({type: types.ADD_TO_CART_REQUEST});


    size = size.toLowerCase();
    const response = await api.post("/cart", {productId: id, size, qty: 1});
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type:types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty});
    dispatch(commonUiActions.showToastMessage("카트에 상품이 추가되었습니다.", "success"));
  }catch(err)
  {
    dispatch({type: types.ADD_TO_CART_FAIL, payload: err.error});
    dispatch(commonUiActions.showToastMessage("상품이 이미 장바구니에 있습니다.", "error"));
  }
};

const getCartList = () => async (dispatch) => {
  try
  {
    dispatch({type: types.GET_CART_LIST_REQUEST});

    const response = await api.get("/cart");
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.GET_CART_LIST_SUCCESS, payload: response.data});
  }catch(err)
  {
    dispatch({type: types.GET_CART_LIST_FAIL, payload: err.error});
  }
};
const deleteCartItem = (id) => async (dispatch) => {
  try
  {
    dispatch({type: types.DELETE_CART_ITEM_REQUEST});

    const response = await api.put("/cart/deleteItem", {cartInItemId: id});
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.DELETE_CART_ITEM_SUCCESS, payload: response.data});
    dispatch(commonUiActions.showToastMessage("카트에서 상품이 성공적으로 삭제 되었습니다.", "success"));
  }catch(err)
  {
    dispatch({type: types.DELETE_CART_ITEM_FAIL, payload: err.error});
    dispatch(commonUiActions.showToastMessage("카트에서 상품 삭제를 실패하였습니다.", "error"));
  }
};

const updateQty = (id, value) => async (dispatch) => {
  try
  {
    dispatch({type: types.UPDATE_CART_ITEM_REQUEST});
    
    const response = await api.put('/cart/updateItem', {cartInItemId: id, itemQty: value});
    console.log(response);
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.UPDATE_CART_ITEM_SUCCESS, payload: response.data});
  }catch(err)
  {
    dispatch({type: types.UPDATE_CART_ITEM_FAIL, payload: err.error});
  }
};
const getCartQty = () => async (dispatch) => {
  try
  {
    dispatch({type: types.GET_CART_QTY_REQUEST});

    const response = await api.get("/cart/qty");
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
