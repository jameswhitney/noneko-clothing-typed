import {
  CartItemContainer,
  ItemDetails,
  BaseSpan,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <BaseSpan>{name}</BaseSpan>
        <BaseSpan>
          {quantity} x ${price}
        </BaseSpan>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
