import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";

// re-usable form component for any component which uses
// forms for submission of data
const FormInput = ({ label, ...otherProps }) => {
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
