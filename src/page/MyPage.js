import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";

const MyPage = () => {
  const dispatch = useDispatch();
  const {userOrder} = useSelector(state=>state.order);

  //오더리스트 들고오기
  useEffect(()=>{
    dispatch(orderActions.getOrder());
  },[])

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  if(userOrder.length <= 0)
  {
    return (
      <Container className="status-card-container">
        <h1>주문한 상품이 없습니다.</h1>
      </Container>
    );
  }

  return (
    <Container className="status-card-container">
    {
      userOrder.map((orderInfo, index)=> (
        <OrderStatusCard key={index} orderInfo={orderInfo}/>
      ))
    }
    </Container>
  );
};

export default MyPage;
