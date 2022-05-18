import { InputHTMLAttributes, FC } from "react";

import { FormInputLabel, Input, Group } from "./form-input.styles";

type FormInputProps = {label: string} & InputHTMLAttributes<HTMLInputElement>

// re-usable form component for any component which uses
// forms for submission of data
const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {
        // only render label if the prop exists
        label && (
          <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}>
            {label}
          </FormInputLabel>
        )
      }
    </Group>
  );
};

export default FormInput;
