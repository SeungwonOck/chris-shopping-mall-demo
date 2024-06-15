import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query, menu) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST })
    const params = { ...query };
    console.log("menu: " + menu)
    if (menu) {
      params.menu = menu
    }
    const response = await api.get("/product", { params })
    console.log("response", response)
    dispatch({type: types.PRODUCT_GET_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({type: types.PRODUCT_GET_FAIL, payload: error})
  }
};

const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST })
    const response = await api.get(`/product/${id}`);
    dispatch({ type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, "error"))

  }
};

const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST })
    const response = await api.post("/product", formData)
    dispatch({ type: types.PRODUCT_CREATE_SUCCESS })
    dispatch(commonUiActions.showToastMessage("Product Successfully Created!", "success"))
    // Fetching the updated productList
    dispatch(getProductList({ page: 1, name: "" }))
  } catch (error) {
    dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};
const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST });
    const response = await api.delete(`/product/${id}`);
    dispatch({ type: types.PRODUCT_DELETE_SUCCESS });
    dispatch(commonUiActions.showToastMessage("Product Deleted!", "success"));

    dispatch(getProductList({ page: 1, name: "" }));
  } catch (error) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_EDIT_REQUEST })
    const response = await api.put(`/product/${id}`, formData)
    dispatch({ type: types.PRODUCT_EDIT_SUCCESS, payload: response.data.data })
    dispatch(commonUiActions.showToastMessage("Product Edited!", "success"))
    dispatch(getProductList({page: 1, name:""}))
  } catch (error) {
    dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
