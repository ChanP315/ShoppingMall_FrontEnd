import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    console.log(id);
    navigate(`/product/${id}`);
  };

  return (
    // <div className="card" onClick={() => showProduct("hard_code")}>
    <div className="card" onClick={() => showProduct(item._id)}>
      <img
        src={item.image}
        alt=""
      />
      <div>{item.name}</div>
      <div>₩ {item.price}</div>
    </div>
    // <div className="card" onClick={() => showProduct("hard_code")}>
    //   <img
    //     src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR7Y-PpT3y2cDeX8n3MO8ZES6qbL_MUtixaXnc4BJB02BziddOiuKok9MFs0wFkzLNoLBeqDe4DUsI-rlmQdVbNg8ece8x4KJ1VKJ5j-iMS73SbP3eqAFE2yA&usqp=CAc"
    //     alt=""
    //   />
    //   <div>리넨셔츠</div>
    //   <div>₩ 45,000</div>
    // </div>
  );
};

export default ProductCard;
