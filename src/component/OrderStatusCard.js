import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({orderInfo}) => {
  return (
    <div>
      <Row className="status-card">
        <Col xs={2}>
          <img
            src={orderInfo.items[0].productId.image}
            alt=""
            height={96}
          />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {orderInfo.orderNum}</strong>
          </div>

          <div className="text-12">{orderInfo.updatedAt}</div>

          <div>{orderInfo.items[0].productId.name} {
          orderInfo.items.length > 1 ? `외 ${orderInfo.items.length - 1}개`: ""}</div>
          <div>₩ {currencyFormat(orderInfo.totalPrice)}</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg="warning">{orderInfo.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
