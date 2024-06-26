import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import RecentlyViewed from '../component/RecentlyViewed';

const ProductAll = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const [query, setQUery] = useSearchParams();
  const { menu } = useSelector((state) => state.product)
  const name = query.get("name");
  // 처음 로딩하면 상품리스트 불러오기
  useEffect(() => {
    const menuLowerCase = menu ? menu.toLowerCase() : "";
    dispatch(
      productActions.getProductList(
        {name}, menuLowerCase
      )
    );
  }, [query]);

  return (
    <Container>
      <RecentlyViewed/>
      <Row>
        {productList && productList.length > 0 ? (
          productList.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div>
            {name === "" ? (
              <h2>There are no registered products</h2>
            ) : (
              <h2>No product matches with {name}</h2>
            )}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default ProductAll;
