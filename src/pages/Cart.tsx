import React, { VFC } from "react";
import "../App.css";
interface CartProps {
  products: any;
}

export const Cart: VFC<CartProps> = (props) => {
  return (
    <div className="App">
      <div className="wrap-products-cart">
        {props.products &&
          props.products.map((product: any, index: number) => (
            <div key={index} className="wrap-product-cart">
              <div>
                <img className="imgProduct-cart" src={product.icon} alt="" />
              </div>

              <div className="title-cart-product">{product.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
