import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const OrderReceipt = ({cartList, totalPrice}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">Order Receipt</h3>
      <ul className="receipt-list">
        {cartList.map((item) => (
          <li>
          <div className="display-flex space-between">
              <div>{item.productId.name}</div>
              <div>{item.qty}</div>
            <div>₩ {currencyFormat(item.productId.price)}</div>
          </div>
        </li>
        ))}
      </ul>
      <div className="display-flex space-between receipt-title">
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>₩ {totalPrice}</strong>
        </div>
      </div>
      {location.pathname.includes("/cart") && (
        <Button
          variant="dark"
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          Continue Payment
        </Button>
      )}

      <div>
        Available payment methods and exact prices, including shipping fees, will be confirmed once you reach the checkout stage.
        <div>
          Review our return and refund policy, including the 30-day return window, return fees, and additional shipping charges for unclaimed items.
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
