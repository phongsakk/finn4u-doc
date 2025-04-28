"use client";

import AddFormComponent from "@components/consignor/AddFormComponent";

function AddForm() {
  return (
    <div className="consignment-form">
      <div className="container register-seller">
        <div className="card-form-main">
          <h4 className="title-main mb-5">ข้อมูลทรัพย์สินที่ต้องการขายฝาก</h4>
          <AddFormComponent typeform={"auth"} />
        </div>
      </div>
    </div>
  );
}
export default AddForm;
