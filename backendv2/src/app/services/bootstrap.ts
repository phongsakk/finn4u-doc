import { connectDB } from "../../utils/prisma";

const bootstrap = async () => {
  await connectDB();
};

export default bootstrap;
