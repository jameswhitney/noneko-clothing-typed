import { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from '../../store/category/category.types';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.comopnent";

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

type ProductCardProps = {
  product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img alt={`${name}`} src={imageUrl} />
      <Footer>
        <Name>{name}</Name>
        <Price className="price">{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to Cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
