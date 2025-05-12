import { Form } from "react-bootstrap";

export type FormInputProps = {
  groupClass?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  type?: string;
  name: string;
  id?: string;
  data?: [];
  className?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  choose?: string;
  invalid?: string;
  disabled?: boolean;
};

export const FormSelectCustom = ({
  onChange,
  groupClass = "col-lg-4",
  value,
  name,
  id,
  data,
  className = "form-select font2",
  required = false,
  label,
  choose,
  invalid,
  disabled = false,
}: FormInputProps) => {
  const inputId = id ?? name;
  const textChoose = choose ?? label;

  return (
    <Form.Group className={groupClass}>
      {label && (
        <Form.Label className="form-label font2">
          {label} {required && <span className="text-require font2">*</span>}
        </Form.Label>
      )}
      <Form.Select
        onChange={onChange}
        value={value}
        name={name}
        id={inputId}
        className={className}
        required={required}
        disabled={disabled}
      >
        <option value="" disabled={required}>
          เลือก{textChoose}
        </option>
        {data?.map((item: any, index: number) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
      {invalid !== "" && <span className="text-danger">{invalid}</span>}
    </Form.Group>
  );
};
