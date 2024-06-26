import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    //카트리스트 불러오기
    dispatch(cartActions.getCartList())
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          {user && cartList.length > 0 ? (
            cartList.map((item) => (<CartProductCard item={item} key={item._id} />
            ))
          ) : (    
            <div className="text-align-center empty-bag">
              <h2>Your cart is empty</h2>
              <div>Please add the product</div>
            </div>
          )}
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
