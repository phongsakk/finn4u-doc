import { Button, Spinner } from "react-bootstrap";

const StepButton = ({ checkStep, submit = false, NextStep, setStep }: any) => {
    if (!checkStep) {
        return (
            <Button variant="primary" type="submit" disabled={submit}>
                {submit ? (
                    <>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        กำลังตรวจสอบข้อมูล
                    </>
                ) : (
                    "ถัดไป"
                )}
            </Button>
        );
    }

    return (
        <Button variant="primary" onClick={() => setStep(NextStep)}>
            ถัดไป
        </Button>
    );
};

export default StepButton;
