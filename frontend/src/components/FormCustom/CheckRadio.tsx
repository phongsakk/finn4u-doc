"use client";
import React, { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";

function CheckRadio({
  name,
  data,
  value,
  setForm,
}: {
  name: string;
  data: any[];
  value: any;
  setForm: (o: any) => void;
}) {
  const [check, setCheck] = useState<string>();
  const handleCheck = (e: any) => {
    setCheck(e.target.value);
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setCheck(String(value));
  }, [value]);

  return (
    <div className="form-check">
      {data.map((item, index) => (
        <FormCheck
          className="group gap-0 gap-ms-1 gap-lg-2 ms-1 ms-md-2 ms-lg-3"
          checked={check == String(item.value)}
          onChange={handleCheck}
          value={`${item.value}`}
          type="radio"
          key={index}
          id={`${name}-${index}`}
          name={name}
          label={item.label}
        />
      ))}
    </div>
  );
}

export default CheckRadio;
