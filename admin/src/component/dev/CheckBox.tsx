import { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";

function CheckBox({
  status,
  itemId,
  handleChange,
}: {
  status: boolean;
  itemId: number;
  handleChange: (status: boolean, itemId: number) => void;
}) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(status);
  }, [status]);

  const handleCheck = (stt: boolean) => {
    setCheck(stt);
    handleChange?.(stt, itemId);
  };

  return (
    <FormCheck
      checked={check}
      onChange={(e) => handleCheck(e.target.checked)}
    />
  );
}

export default CheckBox;
