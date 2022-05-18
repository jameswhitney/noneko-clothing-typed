import { FC, ButtonHTMLAttributes } from 'react';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";

// object used to render specific styling based on
// button type props
export enum BUTTON_TYPE_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// re-usable button with will render different button styles from various components based on props
const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
