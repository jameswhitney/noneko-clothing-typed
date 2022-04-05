import { useContext } from "react";

import Button from "../button/button.comopnent";
import { CartContext } from "../../contexts/cart.context";

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCartContainer>
      <img alt={`${name}`} src={imageUrl} />
      <Footer>
        <Name>{name}</Name>
        <Price className="price">{price}</Price>
      </Footer>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to Cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
