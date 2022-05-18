import { FC } from 'react';
import { CartItemContainer, ItemDetails, BaseSpan } from "./cart-item.styles";

import { CartItem as TCartItem} from '../../store/cart/cart.types'

type CartItemProps = {
  cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
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
