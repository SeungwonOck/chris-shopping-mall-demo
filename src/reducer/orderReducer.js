import * as types from "../constants/order.constants";

const initialState = {
  loading: false,
  error: "",
  orderNum: "",
  totalPageNum: 1,
  orderList: [],
  selectedOrder: {},
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) { 
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
      return { ...state, loading: true }
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, error: "", orderNum: payload }
    case types.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: payload.data,
        totalPageNum: payload.totalPageNum,
      }
    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state;
  }
}
export default orderReducer;
