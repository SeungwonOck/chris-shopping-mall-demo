import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import ClipLoader from "react-spinners/ClipLoader";
import "../style/productDetail.style.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);

  const navigate = useNavigate();

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    if (size === "") {
      setSizeError(true);
      return;
    }
    // 아직 로그인을 안한유저라면 로그인페이지로
    if (!user) navigate("/login");
    // 카트에 아이템 추가하기
    dispatch(cartActions.addToCart({ id, size }))
  };
  const selectSize = (value) => {
    // 사이즈 추가하기
    setSize(value);
    if (sizeError) setSizeError(false)
  };

  useEffect(() => {
    //상품 디테일 정보 가져오기
    dispatch(productActions.getProductDetail(id))
  }, [id]);

  useEffect(() => {
    if (selectedProduct && selectedProduct._id) {
        let takeOut = localStorage.getItem("Recently Viewed");
        takeOut = takeOut ? JSON.parse(takeOut) : [];
        takeOut.push(selectedProduct._id);
        takeOut = Array.from(new Set(takeOut));
        if (takeOut.length > 10) {
            takeOut.shift();
        }
        localStorage.setItem("Recently Viewed", JSON.stringify(takeOut));
    }
  }, [selectedProduct]);


  if (loading || !selectedProduct)
    return (
      <div className="loading-spinner">
          <ClipLoader color="red" loading={loading} size={50} />
      </div>
  )

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img
            src={selectedProduct.image}
            className="w-100"
            alt="image"
          />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{selectedProduct.name}</div>
          <div className="product-info">$ {currencyFormat(selectedProduct.price)}</div>
          <div className="product-info">{selectedProduct.description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "Select a Size" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {Object.keys(selectedProduct.stock).length > 0 &&
                Object.keys(selectedProduct.stock).map((item) =>
                  selectedProduct.stock[item] > 0 ? (
                    <Dropdown.Item eventKey={item}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item eventKey={item} disabled={true}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  )
                )}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "Please choose a size"}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
