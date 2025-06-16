import { env } from "../../settings/env";

export default () => {
  console.log("Server is running at http://localhost:" + env.PORT);
};
