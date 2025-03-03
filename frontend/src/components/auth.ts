import { auth } from "@libs/auth";
import { log } from "./helpers";

export const AccessAuth = async () => {
    const session = await auth();
    log("USER: " + JSON.stringify(session));
  
    if (!session) {
      log("Not authenticated");
      return { error: "Not authenticated", status: 401 };
    }
  
    if (!session.user || !session.user.refreshToken) {
      log("User not found");
      return { error: "User not found", status: 404 };
    }
    log("GET USER");
    return { ...session.user, status: 200 };
  };
  