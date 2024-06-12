import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try
  {
    dispatch({type: types.CREATE_ORDER_REQUEST});

    const response = await api.post("/order", payload);
    if(response.status !== 200)
      throw new Error(response.error);


    dispatch({type: types.CREATE_ORDER_SUCCESS, payload: response.data.orderNum});
    dispatch(cartActions.getCartQty());
    navigate("/payment/success");
  }catch(err)
  {
    dispatch({type: types.CREATE_ORDER_FAIL});
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const getOrder = () => async (dispatch) => {
  try
  {
    dispatch({type: types.GET_ORDER_REQUEST});

    const response = await api.get("/order");
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.GET_ORDER_SUCCESS, payload: response.data.order});
  }catch(err)
  {
    dispatch({type: types.GET_ORDER_FAIL, payload: err.message});
  }
};
const getOrderList = (query) => async (dispatch) => {
  try
  {
    dispatch({type: types.GET_ORDER_LIST_REQUEST});

    let response;
    if(query)
      response = await api.get("/order/list", {params: {...query}});
    else response = await api.get("/order/list");
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.GET_ORDER_LIST_SUCCESS, payload: response.data});
  }catch(err)
  {
    dispatch({type: types.GET_ORDER_LIST_FAIL, payload: err.message});
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try
  {
    dispatch({type: types.UPDATE_ORDER_REQUEST});

    const response = await api.put('/order', {_id: id, status});
    console.log(response);
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.UPDATE_ORDER_SUCCESS}); //payload: response.data.order});
    dispatch(orderActions.getOrderList({page:1}));
  }catch(err)
  {
    dispatch({type: types.UPDATE_ORDER_FAIL, payload: err.message});
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
