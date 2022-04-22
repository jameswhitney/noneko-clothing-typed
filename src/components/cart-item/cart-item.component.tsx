import { CartItemContainer, ItemDetails, BaseSpan } from "./cart-item.styles";

type cartItemProps = {
  cartItem: {
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
  }
}

const CartItem = ({ cartItem }: cartItemProps) => {
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
