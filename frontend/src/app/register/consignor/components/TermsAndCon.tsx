"use client";

import StepButton from "@components/FormCustom/StepButton";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function TermsAndCon({
  setStep,
  checkStep,
}: {
  setStep: (num: number) => void;
  checkStep: boolean;
}) {
  const NextStep = 4;
  const [accept, setAccept] = useState<boolean>(false);
  
  useEffect(()=>{
    setAccept(checkStep);
  },[checkStep])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accept) {
      return alert("กรุณายอมรับเงื่อนไขและข้อตกลง");
    }
    setStep(4);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="detail-con">
        <h2 className="text-center text-primary mb-5 font2">
          เงื่อนไขและข้อตกลง
        </h2>

        <p className="fw-bold mt-5 font2">
          The standard Lorem Ipsum passage, used since the 1500s
        </p>
        <p className="font2">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
        <p className="fw-bold font2">
          Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero
          in 45 BC
        </p>
        <p className="font2">
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </p>
        <div className="mb-3 form-check">
          <input
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
            type="checkbox"
            className="form-check-input"
            id="accept"
          />

          <label className="form-check-label font2" htmlFor="accept">
            ยอมรับเงื่อนไขและข้อตกลงทั้งหมด
          </label>
        </div>
      </div>
      <div className="submit-group">
        <Button variant="white" onClick={() => setStep(2)}>
          ย้อนกลับ
        </Button>
        <StepButton
          checkStep={checkStep}
          NextStep={NextStep}
          setStep={setStep}
        />
      </div>
    </form>
  );
}
export default TermsAndCon;
