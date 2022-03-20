import "./form-input.styles.scss";

// re-usable form component for any component which uses
// forms for submission of data
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {
        // only render label if the prop exists
        label && (
          <label
            className={`${
              otherProps.value.length ? "shrink" : null
            } form-input-label`}
          >
            {label}
          </label>
        )
      }
    </div>
  );
};

export default FormInput;
