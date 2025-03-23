import { Spinner } from "react-bootstrap"

function LoadingModal() {
    return (
        <div className="modal-body"> <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
        /> loading data...</div>
    )
}
export default LoadingModal