import { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";

function CheckBox({
  className,
  status,
  itemId,
  name,
  id,
  handleChange,
}: {
  className?: string
  status: boolean;
  itemId: number;
  name?: string;
  id?: string;
  handleChange: (status: boolean, itemId: number) => void;
}) {
  const [check, setCheck] = useState(false);
  const CheckBoxId = id ?? name;
  useEffect(() => {
    setCheck(status);
  }, [status]);

  const handleCheck = (stt: boolean) => {
    setCheck(stt);
    handleChange?.(stt, itemId);
  };

  return (
    <FormCheck
      name={name}
      id={CheckBoxId}
      className={className}
      checked={check}
      onChange={(e) => handleCheck(e.target.checked)}
    />
  );
}

export default CheckBox;
