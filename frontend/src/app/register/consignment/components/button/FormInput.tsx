import { Form } from "react-bootstrap";

type FormInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  name: string;
  id?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  invalid?: string;
};

export const FormInput = ({
  onChange,
  value,
  type = "text",
  name,
  id,
  className = "form-control font2",
  placeholder,
  required = false,
  label,
  invalid,
}: FormInputProps) => {
  const inputId = id ?? name;
  return (
    <div className="col-lg-4">
      <Form.Group className="mb-3">
        {label && (
          <Form.Label className="form-label font2">
            {label} {required && <span className="text-require font2">*</span>}
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
        />
        {invalid !== "" && <span className="text-danger">{invalid}</span>}
      </Form.Group>
    </div>
  );
};
