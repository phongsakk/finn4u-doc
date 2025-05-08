"use client";
import AddFormComponent from "@components/consignor/AddFormComponent";

function AddAsset({
  setStep,
  checkStep,
}: {
  setStep: (num: number) => void;
  checkStep: boolean;
}) {
  return (
    <AddFormComponent
      typeform={"register"}
      setStep={setStep}
      checkStep={checkStep}
    />
  );
}

export default AddAsset;
