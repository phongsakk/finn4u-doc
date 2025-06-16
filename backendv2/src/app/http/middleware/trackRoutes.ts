import { CustomHandler } from "../../../types/extends";

const trackRoutes: CustomHandler = (req, _res, next) => {
    console.log(`${req.method.toUpperCase()} ${req.url}`);
    next();
}

export default trackRoutes;