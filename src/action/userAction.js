import api from "../utils/api";
import * as userTypes from "../constants/user.constants";
import * as cartTypes from "../constants/cart.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
import { cartActions } from "./cartAction";

const loginWithToken = () => async (dispatch) => {
  try
  {
    dispatch({type: userTypes.LOGIN_WITH_TOKEN_REQUEST});
    
    const response = await api.get('/user/info');
    if(response.status !== 200)
      throw new Error(response.error);

    // console.log("Login response", response);
    dispatch({type: userTypes.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data});
    dispatch(cartActions.getCartQty());
  }catch(err)
  {
    dispatch({type: userTypes.LOGIN_WITH_TOKEN_FAIL, payload: err.message});
    dispatch(logout());
  }
};

const loginWithEmail = ({email, password}) => async (dispatch) => {
  try
  {
    dispatch({type: userTypes.LOGIN_REQUEST});

    const response = await api.post("/auth/login", {email, password});
    if(response.status !== 200)
        throw new Error(response.error);

    sessionStorage.setItem("token", response.data.token);
    dispatch({type: userTypes.LOGIN_SUCCESS, payload: response.data});
    dispatch(cartActions.getCartQty());
  }catch(err)
  {
    dispatch({type: userTypes.LOGIN_FAIL, payload: err.error});
  }
};
const logout = () => async (dispatch) => {
  // user 정보를 지우고
  dispatch({type: userTypes.LOGOUT});
  dispatch({type: cartTypes.CART_INFO_INIT});

  //sesstion token을 지운다.
  sessionStorage.removeItem("token"); // sessionStorage.clear();
};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
  // ({ email, name, password }, navigate) =>
  (formData, navigate) =>
async (dispatch) => {
  try
  {
    dispatch({type: userTypes.REGISTER_USER_REQUEST});

    const response = await api.post("/user", {email: formData.email, name: formData.name, password: formData.password}); 
    if(response.status !== 200)
      throw new Error(response.error);

    console.log(response.data);
    dispatch({type: userTypes.REGISTER_USER_SUCCESS});
    dispatch(commonUiActions.showToastMessage("회원가입을 완료 했습니다!", "success"));
    navigate("/login");

  }catch(err)
  {
    console.log(err);
    dispatch(commonUiActions.showToastMessage("이미 가입 되어 있는 회원 이메일입니다.", "error"));
    dispatch({type: userTypes.REGISTER_USER_FAIL, payload: err.error});
  }
};

export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};


