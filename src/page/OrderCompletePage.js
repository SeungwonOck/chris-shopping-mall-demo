import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.style.css";

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state) => state.order)
  //만약 주문번호가 없는상태로 이페이지에 왔다면 다시 메인페이지로 돌아가기
  if (orderNum === "") {
    return (
      <Container className="confirmation-page">
        <h1>Order Failed</h1>
        <div>
          Please Go to Main Page 
        </div>
          <Link to={"/"}>Go to Main Page</Link>
      </Container>
    )
  }
  
  return (
    <Container className="confirmation-page">
      <img
        src="/image/greenCheck.png"
        width={100}
        className="check-image"
        alt="greenCheck.png"
      />
      <h2>Your Order is Complete!</h2>
      <div>Order Number:{orderNum}</div>
      <div>
        Please check the reservation on "My Order" menu
        <div className="text-align-center">
          <Link to={"/account/purchase"}>Go to My Order</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;
