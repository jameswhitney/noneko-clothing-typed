import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./cart-drop-down.styles.scss";

import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.comopnent";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropDown;
