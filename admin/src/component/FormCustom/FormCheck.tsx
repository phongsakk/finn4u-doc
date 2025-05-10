import { Form } from "react-bootstrap";

export type FormInputProps = {
    groupClass?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean,
    value: any;
    type?: "radio" | "checkbox";
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

export const FormCheck = ({
    onChange,
    checked = false,
    groupClass = "col-lg-2",
    value,
    type = "radio",
    name,
    id,
    className = "ms-1 mx-2 font2",
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
                    {label} {required && <span className="text-require font2">*</span>}
                </Form.Label>
            )}
            <Form.Check
                onChange={onChange}
                checked={checked}
                type={type}
                value={value}
                name={name}
                id={inputId}
                className={className}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />
            {labelEnd !== undefined ? <label htmlFor={inputId} className="px-1">{labelEnd}</label> : ""}
            {invalid !== undefined ? <span className="text-danger">{invalid}</span> : ""}
        </Form.Group>
    );
};
