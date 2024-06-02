import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try
  {
    dispatch({type: types.PRODUCT_GET_REQUEST});

    const response = await api.get("/product");
    if(response.status !== 200)
        throw new Error(response.error);
    
    dispatch({type: types.PRODUCT_GET_SUCCESS, payload: response.data.products});
    console.log("response.data.products", response.data.products);
  }catch(err)
  {
    dispatch({type: types.PRODUCT_GET_FAIL, payload: err.error});
  }
};
const getProductDetail = (id) => async (dispatch) => {};

const createProduct = (formData) => async (dispatch) => {
  try
  {
    dispatch({type: types.PRODUCT_CREATE_REQUEST});

    const response = await api.post('/product', formData);
    if(response.status !== 200)
      throw new Error(response.error);

    dispatch({type: types.PRODUCT_CREATE_SUCCESS});
    dispatch(commonUiActions.showToastMessage("상품 생성 완료", "success"));
  }catch(err)
  {
    console.log(err);
    dispatch({type: types.PRODUCT_CREATE_FAIL, payload: err.error});
    dispatch(commonUiActions.showToastMessage("이미 존재하는 상품이거나 알 수 없는 이유로 상품 생성에 실패 하였습니다.", "error"));
  }
};
const deleteProduct = (id) => async (dispatch) => {};

const editProduct = (formData, id) => async (dispatch) => {};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
