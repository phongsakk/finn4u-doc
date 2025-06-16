import { closeDB } from "../../utils/prisma";

const clearSession = async () => {
  await closeDB();
};
export default clearSession;
