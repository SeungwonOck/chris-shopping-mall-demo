import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import { useNavigate } from 'react-router';

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //오더리스트 들고오기
  const { orderList } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.user)
  
  
  useEffect(() => {
    if (!user) {
      navigate("/");
      alert("You need to log in first!")
    } else {
      dispatch(orderActions.getOrder())
    }
  }, []);

  

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  if (orderList?.length === 0) {
    return (
      <Container className="no-order-box">
        <div>There are no orders in progress.</div>
      </Container>
    )
  }
  return (
    <Container className="status-card-container">
      {orderList.map((item) => (
        <OrderStatusCard
          orderItem={item}
          className="status-card-container"
          key={item._id}
        />
      ))}
    </Container>
  );
};

export default MyPage;
