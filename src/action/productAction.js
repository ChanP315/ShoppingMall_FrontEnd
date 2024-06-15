import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try
  {
    dispatch({type: types.PRODUCT_GET_REQUEST});
    let response;
    if(query)
      response = await api.get("/product", {params: {...query}});
    else response = await api.get("/product");
    
    if(response.status !== 200)
        throw new Error(response.error);
    
    dispatch({type: types.PRODUCT_GET_SUCCESS, payload: response.data});//.productList});
    // console.log("response.data.products", response.data.productList);
  }catch(err)
  {
    dispatch({type: types.PRODUCT_GET_FAIL, payload: err.error});
  }
};

const getProductDetail = (id) => async (dispatch) => {
  try
  {
    dispatch({type: types.GET_PRODUCT_DETAIL_REQUEST});

    const response = await api.get(`/product/${id}`);
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: response.data.product});
  }catch(err)
  {
    dispatch({type: types.GET_PRODUCT_DETAIL_FAIL, payload: err.error});
  }
};

const createProduct = (formData) => async (dispatch) => {
  try
  {
    dispatch({type: types.PRODUCT_CREATE_REQUEST});

    const response = await api.post('/product', formData);
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.PRODUCT_CREATE_SUCCESS});
    dispatch(commonUiActions.showToastMessage("상품 생성 완료", "success"));
    
    dispatch(productActions.getProductList({page: 1}));
  }catch(err)
  {
    console.log(err);
    dispatch({type: types.PRODUCT_CREATE_FAIL, payload: err.error});
    dispatch(commonUiActions.showToastMessage("이미 존재하는 상품이거나 알 수 없는 이유로 상품 생성에 실패 하였습니다.", "error"));
  }
};

const deleteProduct = (id) => async (dispatch) => {
  try
  {
    dispatch({type: types.PRODUCT_DELETE_REQUEST});

    const response = await api.delete(`/product/${id}`);
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.PRODUCT_DELETE_SUCCESS, payload: response.data.product});
    dispatch(commonUiActions.showToastMessage("상품 삭제 완료", "success"));
    
    dispatch(productActions.getProductList({page: 1}));
  }catch(err)
  {
    console.log(err);
    dispatch({type: types.PRODUCT_DELETE_FAIL, payload: err.error});
    dispatch(commonUiActions.showToastMessage("상품 삭제를 실패하였습니다.", "error"));
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try
  {
    dispatch({type: types.PRODUCT_EDIT_REQUEST});

    const response = await api.put(`/product/${id}`, formData);
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.PRODUCT_EDIT_SUCCESS, payload: response.data.product});
    dispatch(commonUiActions.showToastMessage("상품 수정 완료", "success"));

    dispatch(productActions.getProductList({page: 1}));
  }catch(err)
  {
    console.log(err);
    dispatch({type: types.PRODUCT_EDIT_FAIL, payload: err.error});
    dispatch(commonUiActions.showToastMessage("상품 수정을 실패하였습니다.", "error"));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
