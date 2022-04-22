import { ChangeEvent } from "react";

import { FormInputLabel, Input, Group } from "./form-input.styles";

// re-usable form component for any component which uses
// forms for submission of data

type FormInputProps = {
  label: string;
  type: string;
  name: string;
  value: [string];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  return (
    <Group>
      <Input {...otherProps} />
      {
        // only render label if the prop exists
        label && (
          <FormInputLabel shrink={otherProps.value.length}>
            {label}
          </FormInputLabel>
        )
      }
    </Group>
  );
};

export default FormInput;
