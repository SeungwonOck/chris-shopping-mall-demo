import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.style.css";

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state) => state.order)
  //If user come to this page without an order number, return to the main page
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
