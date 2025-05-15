import { Form } from "react-bootstrap";

export type FormInputProps = {
  groupClass?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  name: string;
  id?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  labelEnd?: string;
  invalid?: string;
  disabled?: boolean;
};

export const FormInput = ({
  onChange,
  groupClass = "col-lg-4",
  value,
  type = "text",
  name,
  id,
  className = "form-control font2",
  placeholder,
  required = false,
  label,
  labelEnd,
  invalid,
  disabled = false,
}: FormInputProps) => {
  const inputId = id ?? name;
  return (
    <Form.Group className={groupClass}>
      {label && (
        <Form.Label className="form-label font2">
          {label} {required && <span className="text-danger font2">*</span>}
        </Form.Label>
      )}
      <Form.Control
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        id={inputId}
        className={className}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {labelEnd !== undefined ? <span className="px-1">{labelEnd}</span> : ""}
      {invalid !== undefined ? <span className="text-danger">{invalid}</span> : ""}
    </Form.Group>
  );
};
