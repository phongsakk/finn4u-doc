import { Spinner } from "react-bootstrap"

function LoadingModal() {
    return (
        <div> <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
        /> loading data...</div>
    )
}
export default LoadingModal