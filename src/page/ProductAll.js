import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  const {productList, totalPageNum} = useSelector((state)=> state.product);

  let [query, setQuery] = useSearchParams();
  // 처음 로딩하면 상품리스트 불러오기
  useEffect(()=> {
    dispatch(productActions.getProductList({name:query.get('name')})); // URI에  ?name={value}가  없으면 null 값 
  }, [query])

  return (
    <Container>
      <Row>
        {
          productList.length > 0 ?
            (
              productList.map((item, index) => (
                <Col key={index} md={3} sm= {12}>
                  <ProductCard item={item}/>
                </Col>
              ))
            ) :
            // <tr>No Data to show</tr>  -- <td> 태크 없이 <tr> 태크에 바로 텍스트를 넣으면 경고(에러)
            // <tr><td>No Data to show</td></tr> -- <table> <tbody>등 테이블 형식으로 되어 있지 않을 경우 경고(에러)
            (<table><tbody><tr><td>No Data to show</td></tr></tbody></table>) 
        }
      </Row>
    </Container>
  );
};

export default ProductAll;
